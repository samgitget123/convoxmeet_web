import React, { useState, useEffect } from "react";
import { NavLink } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import QuickTalkPopup from '../QuickTalkPopup';
import { useContext } from "react";
import MyContext from "../../MyContext";
import { MdGroups, MdDelete } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';
import { IoCallSharp, IoSettingsOutline } from 'react-icons/io5';
import { Modal } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom'
import { HiUserRemove } from "react-icons/hi";
import { MyServerContext } from "../../Contexts/SeverContexts";
//styledcomponentscss
const Addgroupdiv = styled.div`
  margin: 0px 0px;
  padding: 0px 0px;
  border-bottom: 0.25px solid #f8f9fa;
  width: 330px;
  
`;

const Addgrouplistdiv = styled.div`
  background-color: #192A53;
  color: #fff;
  width: 330px;
  height:100vh;
`;

const TopHeader = {
  height: "64px",
  width: "330px",
  backgroundColor: "#F8F9FA",
  opacity: "0.8",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const TopHeaderForContentBlock = {
  height: "64px",
  width: "100%",
  backgroundColor: "#fff",
  opacity: "1",
  display: 'flex',
  flexdirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '25px'

  //top space //

}
const QuickTalks = () => {
  const { baseurl } = useContext(MyServerContext);
  const [search, setSearch] = useState('');
  const params = useParams();
  const callerId = params.id
  // const [quickId, setQuickId] = useState(''); //quickid is actually generated at quicktalktabs, we have taken from there and set here to pass api //
  const [quickTalkList, setQuickTalkList] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [apiStatus, setApiStatus] = useState('inProgress');

  const [showModal, setShowModal] = useState(false);
  const [quickId, setQuickId] = useState('');
  const [showForAdding, setShowForAdding] = useState(false);
  //set contact error msg and alerts
  const [contactmsg, setContactmsg] = useState("");
  const [contactError, setContactError] = useState("")
  const [noconf, setConf] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [contacts, setContacts] = useState([]);
  //remove alert auto
  useEffect(() => {
    if (contactmsg !== '') {
      const timeout = setTimeout(() => {
        setContactmsg('');
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [contactmsg]);
  //live variable storing in the local storage //
  const [quicklive, setquicklive] = useState(() => {
    const storedLive = localStorage.getItem('quicklive');
    return storedLive ? JSON.parse(storedLive) : "";
  });

  const [msg, setMsg] = useState("");
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState("");


  const [timer, setTimer] = useState('');

  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const [designation, setDesignation] = useState("");
  const [desigError, setDesigError] = useState("");

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");




  // console.log(quickTalkList, "quick talks..........");

  //props from useContext to access userid //
  const myValue = useContext(MyContext);
  // console.log(myValue.userId )



  // console.log(quickId, "it's rare")

  //this id is accessed from the the quickTalkTabs //
  // const handleQuickId=(id)=>{
  //   setQuickId(id)
  // }


  const currentPath = window.location.pathname;
  console.log(currentPath, 'current path,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
  const quickContentPage = currentPath.includes('/quickTalkContent') //accessing the path of the window //
  const quickCallingPage = currentPath.includes('/quickcalling'); //accessing the path of the window //


  useEffect(() => {
    updateTimer();
  });


  //timer updating show //
  const updateTimer = async () => {

    const url = `${baseurl}/quickcalldurationtime?qid=${quicklive}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres, 'timer');
      const usersmessage = jsonres.messages;
      const usersresult = usersmessage.Quickcallduration;
      setTimer(usersresult); //masterdata
    } catch (error) {
      console.log(error);
    }
  };


  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };


  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

  // const addingNewNumber = async () => {
  // const url = `${baseurl}/addintoconf?gid=${quickId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&contactnumber=${mobile}&name=${name}&mute=0&handrise=0`;

  //   try {
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //     console.log(jsonres);
  //     const usersmessage = jsonres.messages;
  //     const usersresult = usersmessage.success;
  //     setMsg(usersresult); //masterdata
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == "") {
      setNameError("Name is Required");
    }
    else if (mobile == '') {
      setNameError("");
      setContactError('Contact Number is Required');
    } else if (designation == "") {
      setContactError("");
      setDesigError("Designation Required");

    } else if (location == "") {
      setDesigError("");
      setLocationError("Location Required");
    } else if (state == "") {
      setLocationError("");
      setStateError("State is Required");
    } else {
      setStateError("");
      try {
        const url = `${baseurl}/addintoconf?gid=${quickId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&contactnumber=${mobile}&name=${name}&mute=0&handrise=0`;
        console.log(url, 'QUICKURL');
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres, 'abc');
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.success;
        if (usersresult) {
          setContactmsg(usersresult);
        }

      } catch (error) {
        console.log(error);
      }
      // setShowSuccessPopupmem(true);
    }
    setContactError('');
    // addContact();
    setName('');
    setMobile('');
  }


  //not in live//
  // const addingNewNumberNotLive = async () => {
  //   const url = `${baseurl}/addMquickgroup?qid=${quickId}&user_id=1&mobile=${myValue.userMobile}&phone=${mobile}&name=${name}&mute=0&handrise=0`;

  //   try {
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //     console.log(jsonres, 'abc');
  //      const usersmessage = jsonres.messages;
  //      const usersresult = usersmessage.success;
  //      setMsg(usersresult); //masterdata
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleMobile = (e) => {
    const input = e.target.value;
    const numericInput = input?.replace(/\D/g, ''); // Remove non-digit characters
    const trimmedInput = numericInput?.slice(0, 10); // Limit to 10 digits
    setMobile(trimmedInput)
  }

  const addingContactForGroup = async (e) => {
    e.preventDefault();
    if (name == "") {
      setNameError("Name is Required");
    }
    else if (mobile == '') {
      setNameError("");
      setContactError('Contact Number is Required');
    } else if (designation == "") {
      setContactError("");
      setDesigError("Designation Required");

    } else if (location == "") {
      setDesigError("");
      setLocationError("Location Required");
    } else if (state == "") {
      setLocationError("");
      setStateError("State is Required");
    } else {
      setStateError("");
      try {
        const url = `${baseurl}/addMquickgroup?qid=${quickId}&user_id=1&mobile=${myValue.userMobile}&phone=${mobile}&name=${name}&mute=0&handrise=0`;
        console.log(url, 'quickkkkkk');
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres, 'abc');
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.success;
        console.log(usersresult, 'USER RESULT===============>')
        if (usersresult) {
          setContactmsg(usersresult);
        }

        //masterdata
      } catch (error) {
        console.log(error);
      }
      // addContact();
      setContactError("");
      setName("");
      setMobile("");
      setLocation("");
      setState("");
      setDesignation("");
      setNameError("");
      setStateError("");

    }
  }

  //delete quick group  quickId
  const deleteQuickgroup = async () => {
    //https://convoxmeet.deepijatel.in/convoxmeet/api/deletequickgroup?uid=1&qid=15
    try {
      const url = `${baseurl}/deletequickgroup?uid=${myValue.userId}&qid=${quickId}`;
      console.log(url, 'deletequickgrooup');
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error)
    }
  }

  //adding new contact/ new number to the specific group //

  const addContact = () => {
    setShowForAdding(!showForAdding)
    setContactError('');
  }

  //deleting the group //
  const deleteGroup = async (quickId) => {
    const url = `${baseurl}/deleteallsingleuser?&uid=${myValue.userId}&qid=${quickId} `;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres);
      // const usersmessage = jsonres.messages;
      // const usersresult = usersmessage.success;
      // setData(usersresult); //masterdata


    } catch (error) {
      console.log(error);
    }
  };

  const settingQuickId = (id) => {
    setQuickId(id);
  }

  const handleGroupCalls = (id) => {
    setShowModal(!showModal);
    setQuickId(id);
  }

  //get count alert
  const getCountalert = () => {
    setShowModal(!showModal);
    // alert('No contact Found for Conf!!!');
    setConf(true);
  }

  const noConfclose = () => {
    setConf(false);
  }
  const checking = () => {
    //console.log(data.some(eachOne=>eachOne.group_id==groupId), 'each')
    if (quickTalkList.some(eachOne => eachOne.id == quickId)) {
      setquicklive(quickId);
    } else {
      setquicklive('');
    }
  }

  const makingCall = async () => {
    try {
      const url = `${baseurl}/runsinglecall?uid=${myValue.userId}&mute=0&handrise=0&name=contatname&usermobile=${myValue.userMobile}&quickid=${quickId}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres);
    } catch (error) {
      console.log(error);
    }
    checking()
    setShowModal(!showModal);
  }

  //  const call = async () => {
  //   try {
  //     const url = `${baseurl}/runsinglecall?uid=${myValue.userId}&mute=0&handrise=0&name=contatname&usermobile=${myValue.userMobile}&quickid=${quickId}`;  
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //     console.log(jsonres);
  //     // const usersmessage = jsonres.messages;
  //     // const usersresult = usersmessage.success;
  //     // setData(usersresult); //masterdata
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const ModalToggle = () => {
    setShowModal(!showModal);
  }



  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  }
  // get quick calls in group count
  // useEffect(()=>{
  //   fetchQuickTalkContent();
  // });

  //   const fetchQuickTalkContent = async () => {
  //   const url = `${baseurl}/viewsingleusers?uid=${myValue.userId}&quickid=${quickId}`;  
  //    console.log(url, 'srinivas====================');
  //   try {
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //     console.log(jsonres);
  //     if(jsonres.status==201){
  //     const usersmessage = jsonres.messages;
  //     const usersresult = usersmessage.success;
  //     setContacts(usersresult); //masterdata
  //     // setApiStatus('success');
  //     }else{
  //       setContacts([]); //clear the initial array result //
  //       // setApiStatus('failure');
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //this will fetch quick groups
  useEffect(() => {
    localStorage.setItem('quicklive', JSON.stringify(quicklive));
    fetchQuickTalk();

  });
  const fetchQuickTalk = async () => {
    const url = `${baseurl}/listofquickgroups?uid=${myValue.userId}`;;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      if (jsonres.status == 201) {
        console.log(jsonres, "it's from quicktas");
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.listofserials;
        setQuickTalkList(usersresult); //masterdata
        setApiStatus('success');
      } else {
        setApiStatus('failure');
        setQuickTalkList([]);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? -1 : index);
  }


  const loadingView = () => (

    <div className="text-center my-5">  <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="60"
      visible={true}
    /></div>
  )

  const successView = () => {
    return <>
      {quickTalkList.length > 0 ?
        <ul className="handle-overflow" style={{ paddingLeft: "2px" }}>
          {quickTalkList.map((eachQuickTalk, index) => {
            return (
              <div >
                <div >
                  <Addgroupdiv >
                    <div style={{ backgroundColor: activeTab === index ? '#000' : 'transparent' }} className="callerlist p-2">
                      <li onClick={() => handleTabClick(index)} key={index}>
                        <Link
                          to={`quickTalkContent/${eachQuickTalk.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="d-flex flex-row justify-content-around align-items-center text-light">
                            <div className="mx-2">
                              <MdGroups style={{ width: "40px", height: "40px" }} />
                            </div>
                            <div onClick={() => settingQuickId(eachQuickTalk.id)} className="mx-1">
                              <div style={{ fontSize: "17px" }}>Quick Talk {index + 1}</div>
                              <span style={{ fontSize: "13px" }}>Created on {eachQuickTalk.created_on}</span>
                            </div>
                            <div>{quicklive == eachQuickTalk.id ? <Link to={`quickcalling/${eachQuickTalk.id}`}><div className="text-center " style={{ background: '#ffffff', color: 'red', fontSize: '12px', paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px', fontWeight: 'bold', textDecoration: 'none' }}>LIVE</div></Link> : <div><button onClick={() => handleGroupCalls(eachQuickTalk.id)} style={{ background: "none", border: "none", color: "white" }}><IoCallSharp style={{ width: "30px", height: "30px" }} /></button></div>}</div>
                          </div>
                        </Link>
                        {showModal &&
                          <Modal show={true}>
                            <Modal.Header style={{ marginBottom: '0' }}>
                              <button type="button" className="btn-close p-3" aria-label="Close" onClick={ModalToggle}></button>
                            </Modal.Header>
                            <Modal.Body>
                              <div className='my-5'>
                                <h4 className='text-center'>Are you sure want to make Quick call?</h4>
                                <div className='text-center my-5'>
                                  {/* <Link to={`quickcalling/${quickId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Quick Call</button></Link> */}
                                  {/* {contacts.length == 0 && <button onClick={getCountalert} className="btn btn-primary m-2"> Quick Call</button> } */}
                                  {/* {contacts.length > 0 &&  <Link to={`quickcalling/${quickId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Quick Call</button></Link> } */}
                                  <Link to={`quickcalling/${quickId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Quick Call</button></Link>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>}
                        {/* //no conf */}
                        {noconf && <Modal show={true} >
                          <Modal.Header>
                            <button type="button" class="btn-close p-3" aria-label="Close" onClick={noConfclose}></button>
                          </Modal.Header>
                          <Modal.Body>
                            <h4 class="text-success text-center">No Contact Found For Conference</h4>
                          </Modal.Body>
                        </Modal>}
                      </li>
                    </div>
                  </Addgroupdiv>
                </div>
              </div>)
          }

          )
          }
        </ul> : <div>no quick talks</div>}
    </>
  }


  const failureView = () => (
    <div style={{ color: 'yellow', fontWeight: '500' }} className="text-center my-5">Create Your Quick Talks</div>
  )

  const renderGroups = () => {
    switch (apiStatus) {
      case 'inProgress':
        return loadingView();
        break;
      case 'success':
        return successView();
        break
      case 'failure':
        return failureView();
        break;
      default:
        return null;
    }
  }

  //hangup the group call //
  const handleClosingCall = () => {
    localStorage.removeItem('quicklive');
    closeQuickCall();
  }

  const closeQuickCall = async () => {
    const url = `${baseurl}/singlepartygroupend?userid=${myValue.userId}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres);
      setquicklive("");
      // const usersmessage = jsonres.messages;
      // const usersresult = usersmessage.success;
      // setData(usersresult); //masterdata


    } catch (error) {
      console.log(error);
    }
  };





  return (
    <>
      <Addgrouplistdiv >
        <div className="header-top text-dark" style={TopHeader}>Quick Talks</div>

        <QuickTalkPopup />
        <hr style={{ margin: "0px 0px 10px 0px" }} />
        <div className="mb-3" >
          <div style={{ padding: "10px 0px 0px 0px", margin: "0px 0px 0px 10px" }}>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={onChangeHandler}
              />
            </form>
          </div>
        </div>
        {renderGroups()}
      </Addgrouplistdiv>

      <div className="addgroup_output" style={{ width: "calc(100% - 330px - 82px)" }} >
        {quickCallingPage &&
          <div className="header-top text-dark " style={TopHeaderForContentBlock}>
            <div>
              <p style={{ color: 'steelblue', fontSize: '15px', marginBottom: '0' }} className="col-6">QuickTalks</p>
              <span style={{ color: 'grey', fontSize: '12px', marginTop: '0' }}>HOST: {myValue.userMobile}</span>
            </div>
            <div className="d-flex flex-row justify-content-around align-items-center col-6">
              <Link to={`quickTalkContent/${quickId}`}> <button onClick={handleClosingCall} style={{ border: 'none', background: 'none' }}><IoCallSharp title="Hang Up" style={{ fontSize: '25px', color: 'red' }} /></button></Link>
              {/* <button title="Mute" onClick={handleMuteAll} style={{ border: 'none', background: 'none' }}>  <BsFillMicMuteFill style={{ color: 'grey', fontSize: '25px' }} /></button> */}
              <button title="Add Contact" onClick={addContact} style={{ border: 'none', background: 'none' }}><AiOutlineUserAdd style={{ fontSize: '25px', color: 'grey' }} /></button>
              {showForAdding && <Modal show={true}>
                <Modal.Header>
                  <button type="button" className="btn-close p-3" aria-label="Close" onClick={addContact}></button>
                </Modal.Header>
                <Modal.Body >
                  <form class="row g-3 needs-validation" novalidate>

                    <div >

                      <input onChange={handleName} type="text" class="form-control" id="validationCustom01" placeholder="Enter Name" value={name} required />
                      <span className="error">{nameError}</span>
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>
                    <div class="col-md-6">

                      <input onChange={handleMobile} maxLength="10" type="number" class="form-control" placeholder="Enter Contact" id="validationCustom02" value={mobile} required />
                      <span className="error">{contactError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleDesignation}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={designation}
                        placeholder="Enter Designation"

                      />
                      <span className="error">{desigError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleLocation}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={location}
                        placeholder="Enter Location"

                      />
                      <span className="error">{locationError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleState}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={state}
                        placeholder="Enter State"

                      />
                      <span className="error">{stateError}</span>
                    </div>
                    {contactmsg && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                      <strong style={{ color: "#000" }}>{contactmsg}</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                    <div class="col-12">
                      <input type="submit" value="Add Contact" className='btn btn-primary' onClick={handleSubmit} />
                      {/* <button style={{ marginRight: '15px' }} class="btn btn-primary" type="submit">Submit</button> */}
                      <button onClick={addContact} class="mx-5 btn btn-secondary" type="button">Close </button>
                    </div>
                  </form>

                </Modal.Body>
              </Modal>}

              <button

                style={{ border: "none", background: "none" }}
              >
                <HiUserRemove
                  title="delete All contacts"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>

              <div className="vertical-line"></div>
              <div className="text-center d-flex flex-column"><p style={{ color: 'steelblue', fontSize: '25px', marginBottom: '0', fontWeight: '600' }}>{timer}</p>
                <span style={{ color: 'grey', fontSize: '15px', marginTop: '0', fontWeight: '600' }}>HH : MM : SS</span>

              </div>
            </div>
          </div>}

        {quickContentPage &&
          <div className="header-top text-dark " style={TopHeaderForContentBlock}>
            <p style={{ color: 'steelblue', fontSize: '20px' }} className="col-6">QuickTalk</p>
            <div className="d-flex flex-row justify-content-around col-6">
              <button onClick={() => handleGroupCalls(quickId)} style={{ border: 'none', background: 'none' }}><IoCallSharp title="make call" style={{ fontSize: '25px', color: 'green' }} /></button>
              <button onClick={addContact} style={{ border: 'none', background: 'none' }}><AiOutlineUserAdd title="add contact" style={{ fontSize: '25px', color: 'grey' }} /></button>
              <button onClick={()=>{deleteQuickgroup()}} style={{ border: 'none', background: 'none' }}><MdDelete title="delete quickgroup" style={{ fontSize: '25px', color: 'grey' }} /></button>
              {showForAdding && <Modal show={true} centered  className="transparent-modal-background">
                <Modal.Header>
                  <button type="button" className="btn-close p-3" aria-label="Close" onClick={addContact}></button>
                </Modal.Header>
                <Modal.Body >
                  <form class="row g-3 needs-validation" novalidate>
                    <div >

                      <input onChange={handleName} type="text" class="form-control" id="validationCustom01" placeholder="Enter Name" value={name} required />
                      <span className="error">{nameError}</span>
                      <div class="valid-feedback">
                        Looks good!
                      </div>
                    </div>
                    <div class="col-md-6">

                      <input onChange={handleMobile} maxLength="10" type="number" class="form-control" placeholder="Enter Contact" id="validationCustom02" value={mobile} required />
                      <span className="error">{contactError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleDesignation}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={designation}
                        placeholder="Enter Designation"

                      />
                      <span className="error">{desigError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleLocation}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={location}
                        placeholder="Enter Location"

                      />
                      <span className="error">{locationError}</span>
                    </div>
                    <div class="col-md-6">
                      <input
                        onChange={handleState}
                        type="text"
                        class="form-control"
                        id="validationCustom01"
                        value={state}
                        placeholder="Enter State"

                      />
                      <span className="error">{stateError}</span>
                    </div>
                    {/* <p style={{color:'green'}}>{msg}</p> */}
                    {contactmsg && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                      <strong style={{ color: "#000" }}>{contactmsg}</strong>
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}
                    <div class="col-12">
                      <input type="submit" value="Add Contact" className='btn btn-primary' onClick={addingContactForGroup} />
                      <button onClick={addContact} class="mx-5 btn btn-secondary" type="button">Close</button>

                    </div>

                  </form>


                </Modal.Body>
              </Modal>}
              {/*<button
                onClick={() => deleteGroup(quickId)}
                style={{ border: "none", background: "none" }}
              >
                <HiUserRemove
                  title="delete All contacts"
                  style={{ fontSize: "25px", color: "grey" }}
                />
        </button>*/}
            </div>
          </div>}
        <Outlet />
      </div>
    </>
  );
};

export default QuickTalks;
