import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
// import { MdAddCall } from 'react-icons/md';
import { SlCallEnd } from 'react-icons/sl';
import { HiHandRaised } from 'react-icons/hi2';
import { Tab, Nav, Modal } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import MyContext from '../MyContext';
// import { FaBeer } from 'react-icons/fa';
import { Outlet } from "react-router-dom";
import { IoCallSharp } from 'react-icons/io5';
import { IoMdRepeat } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import { MyServerContext } from '../Contexts/SeverContexts';

///Testing/////
const Calling = () => {
  const { baseurl } = useContext(MyServerContext);
  const params = useParams()
  const groupId = params.id;
  const [liveData, setLiveData] = useState([]);
  const [apiStatus, setApiStatus] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const myValue = useContext(MyContext);
  const [hangupSearch, setHanupSearch] = useState("");

  const [blink, setBlink] = useState(false);
 
  const fetchLiveData = async () => {
    try {
      const url = `${baseurl}/livecalldata?groupid=${groupId}&mobile=${myValue.userMobile}&uid=${myValue.userId}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const jsonres = await response.json();
  
      const mess = jsonres.messages;
      const jsondata = mess.data;

      setLiveData(jsondata);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user or retry the request.
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
      fetchLiveData();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [groupId]); //groupId, myValue.userMobile, myValue.userId
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setBlink((prevBlink) => !prevBlink);
  //     fetchLiveData();
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [liveData]); //params.id

  ///////give conference session close alert//////////////

  const closeConference = () => {
    let hanguplist = hangUpData.length;
    let livelist = liveData.length;
    if (livelist === hanguplist) {
      alert('close');
    }
  }

  ////////////////////////////////////////////
  const muteData = liveData.filter(eachCall => eachCall.mute_flag == 1);
  const handRiseData = liveData.filter(eachCall => eachCall.hand_raise_flag == 1);
  const hangUpData = liveData.filter(eachCall => eachCall.status == 'DISCONNECTED');

  //Hangupcase
  const hangUpDataAfterSearch = hangUpData.filter((eachCall) =>
    eachCall.phone_number.includes(hangupSearch) ||
    eachCall.contact_display_name.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.location.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.designation.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.state.toLowerCase().includes(hangupSearch.toLowerCase())
  );

  //Mute case 
  const muteUpDataAfterSearch = muteData.filter((eachCall) =>
    eachCall.phone_number.includes(hangupSearch) ||
    eachCall.contact_display_name.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.location.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.designation.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.state.toLowerCase().includes(hangupSearch.toLowerCase())
  );

  //Handrise case 
  const handRiseDataAfterSearch = handRiseData.filter((eachCall) =>
    eachCall.phone_number.includes(hangupSearch) ||
    eachCall.contact_display_name.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.location.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.designation.toLowerCase().includes(hangupSearch.toLowerCase()) ||
    eachCall.state.toLowerCase().includes(hangupSearch.toLowerCase())
  );

  const getColor = (status) => {
    if (status == 'DISCONNECTED') {
      return 'red';
    } else if (status == 'ONCALL') {
      return 'steelblue';
    } else {
      return 'green';
    }

  }

  //each call end button functionality //
  const singleCallEnd = (liveId) => {
    const endingSingleCall = async () => {
      const url = `${baseurl}/singlepartyend?liveid=${liveId}`;
      try {
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
      } catch (error) {
        console.log(error);
      }
    };
    endingSingleCall();
  }


/////mute and unmute functionality for single callers
  const grouphandleMute = async (id , muteFlag) => {
    try {
      const url = `${baseurl}/mutestatus?gid=${groupId}&Userno=${id}&MUTE=${muteFlag == 1 ? 'unmute' : 'mute'}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };

  

  const muteCall = async (id) => {
    const url = `${baseurl}/mutestatus?gid=${groupId}&Userno=${id}&MUTE=unmute`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };
  //this will call handrise mute
  const handrisehandleMute = async (id) => {
    const url = `${baseurl}/mutestatus?gid=${groupId}&Userno=${id}&MUTE=unmute`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };


  const singleRidial = async (gId, uId, phone, phoneNm, livId, uniqueId) => {
    const url = `${baseurl}/redial?gid=${gId}&user_id=${uId}&usermobile=${myValue.userMobile}&contactnumber=${phone}&name=${phoneNm}&lid=${livId}&mute=&handrise=0&conf_id=${uniqueId}&isadmininclude=`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  }


  const redialAll = async () => {
  //conf_unique_id
  const getids = hangUpData.filter((el)=>el.status === 'DISCONNECTED');
  const confuniqueid = getids.map((el)=>el.conf_unique_id);
  const uniqueId = [...new Set(confuniqueid)];

    const url = `${baseurl}/redialgroup?gid=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&name=&mute=1&handrise=0&conf_id=${uniqueId}&isadmininclude=`;

    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };

  //conference closed
  const ConfClosed = () => {
    return (
      <div className="text-center my-5">
        <div className='d-flex flex-row justify-content-center align-items-center'>
          <Modal>
            <Modal.Header>
              <button
                type="button"
                className="btn-close p-3"
                aria-label="Close"
              ></button>
            </Modal.Header>
            <Modal.Body>
              <span>close</span>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
  const loadingView = () => {
    return (
      <div className="text-center my-5">
        <div className='d-flex flex-row justify-content-center align-items-center'>
          <span style={{ color: '#192A53', marginRight: '25px' }}>Calling</span>
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    )
  }



  
  const handleFilterChange = (event) => {
    const newFilterText = event.target.value;
    setFilterText(newFilterText);
    const filteredLiveData = liveData.filter(
      (eachCall) =>
        eachCall.phone_number.includes(newFilterText) ||
        eachCall.contact_display_name.toLowerCase().includes(newFilterText.toLowerCase()) ||
        eachCall.location.toLowerCase().includes(newFilterText.toLowerCase()) ||
        eachCall.designation.toLowerCase().includes(newFilterText.toLowerCase()) ||
        eachCall.state.toLowerCase().includes(newFilterText.toLowerCase())
    );

    const hostData = filteredLiveData.find(
      (eachCall) => eachCall.phone_number == myValue.userMobile
    );

    if (hostData) {
      const filteredWithoutHost = filteredLiveData.filter(
        (eachCall) => eachCall.phone_number != myValue.userMobile
      );
      setFilteredData([hostData, ...filteredWithoutHost]);
    } else {
      setFilteredData(filteredLiveData);
    }
  };
  const handleHangupSearch = (e) => {
    setHanupSearch(e.target.value);
  }
  // Filter host data from the array
  const hostData = liveData.filter(eachCall => eachCall.phone_number == myValue.userMobile);
  // Filter non-host data from the array
  const nonHostData = liveData.filter(eachCall => eachCall.phone_number != myValue.userMobile);
  // Concatenate the host data followed by non-host data
  const arrangedData = [...hostData, ...nonHostData];

  return (
    <>
      {liveData?.length > 0 ? (
        <Tab.Container defaultActiveKey="Groups" transition={false} id="noanim-tab-example">
          <div >
            <Tab.Content style={{ height: '70vh', overflowY: 'auto' }}>
              <Tab.Pane eventKey="Groups">
                <section>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6'>
                        <form className="d-flex" role="search">
                          <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={filterText}
                            onChange={handleFilterChange}
                          />
                        </form>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <div style={{ height: '60vh', overflowY: 'auto' }} className='card'>
                          <table class="table  table-stripped">
                            <tbody>
                              {filterText.trim() == '' ? liveData.map((eachCall, index) => (
                                <tr key={index}>
                                  <td style={{ display: "flex", flexDirection: "column" }}><BsPersonCircle style={eachCall.is_talking == 1 ? { color: '#192A53', height: '40px', width: '40px' } : { color: 'grey', height: '40px', width: '40px' }} />{eachCall.is_talking == 1 && eachCall.status == 'ONCALL' ? (
                                    <span style={{ fontSize: 10 }}>Speaking...</span>
                                  ) : eachCall.is_talking != 1 && eachCall.status == 'ONCALL' ? (
                                    <span style={{ fontSize: 10 }}>Listener...</span>
                                  ) : eachCall.is_talking != 1 && eachCall.status == 'DISCONNECTED' ? (
                                    <span style={{ fontSize: 10 }}>Disconnected...</span>
                                  ) : null}</td>
                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginBottom: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                    <span style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span>,
                                    <span style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} > {eachCall.designation}</span></td>
                                  <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td>
                                  {/* <p style={{color:'blue', fontSize:'13px', marginTop:'0px' }}>Disconnected</p> */}
                                  {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => grouphandleMute(eachCall.party_number , eachCall.mute_flag)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>}
                                  {eachCall.phone_number == myValue.userMobile && <td><button onClick={() => grouphandleMute(eachCall.party_number , eachCall.mute_flag)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>}
                                  {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>}
                                  {eachCall.phone_number == myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>}
                                  {eachCall.status == 'DISCONNECTED' && <td><button onClick={() => singleRidial(eachCall.group_id, eachCall.user_id, eachCall.phone_number, eachCall.contact_display_name, eachCall.live_id ,  eachCall.conf_unique_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', fontWeight: '400', color: 'red' }}><IoMdRepeat style={{ fontSize: '20px', color: 'green' }} /></span></button></td>}
                                </tr>
                              )) : filteredData.length > 0 ? (
                                filteredData.map((eachCall, index) => (
                                  <tr>
                                    <td style={{ display: "flex", flexDirection: "column" }}><BsPersonCircle style={eachCall.is_talking == 1 ? { color: '#192A53', height: '40px', width: '40px' } : { color: 'grey', height: '40px', width: '40px' }} />{eachCall.is_talking == 1 && eachCall.status == 'ONCALL' ? (
                                      <span style={{ fontSize: 10 }}>Speaking...</span>
                                    ) : eachCall.is_talking != 1 && eachCall.status == 'ONCALL' ? (
                                      <span style={{ fontSize: 10 }}>Listener...</span>
                                    ) : eachCall.is_talking != 1 && eachCall.status == 'DISCONNECTED' ? (
                                      <span style={{ fontSize: 10 }}>Disconnected...</span>
                                    ) : null}</td>

                                    <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={eachCall.phone_number == myValue.userMobile ? { color: '#000', fontSize: '13px', fontWeight: '400', marginBottom: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                      <span style={eachCall.phone_number == myValue.userMobile ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span>,
                                      <span style={eachCall.phone_number == myValue.userMobile ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} > {eachCall.designation}</span>
                                    </td>
                                    <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td>

                                    {/* <p style={{color:'blue', fontSize:'13px', marginTop:'0px' }}>Disconnected</p> */}

                                    {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => grouphandleMute(eachCall.party_number , eachCall.mute_flag)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>}
                                    {eachCall.phone_number == myValue.userMobile && <td><button onClick={() => grouphandleMute(eachCall.party_number , eachCall.mute_flag)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>}
                                    {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>}
                                    {eachCall.phone_number == myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>}
                                    {eachCall.status == 'DISCONNECTED' && <td><button onClick={() => singleRidial(eachCall.group_id, eachCall.user_id, eachCall.phone_number, eachCall.contact_display_name, eachCall.live_id ,  eachCall.conf_unique_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', fontWeight: '400', color: 'red' }}><IoMdRepeat style={{ fontSize: '20px', color: 'green' }} /></span></button></td>}
                                  </tr>
                                ))
                              ) : (
                                <tr style={{ display: "flex", justifyContent: 'center', alignItems: "center", marginTop: 50 }}>
                                  <h4 style={{ color: "red" }}>No such caller found</h4>
                                </tr>
                              )}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="Muted">
                <section>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6'>
                        <input onChange={handleHangupSearch} value={hangupSearch} placeholder='Search' className='form-control ' type='text' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>

                        <div style={{ height: '70vh', overflowY: 'auto' }} className='card'>
                          <table class="table  table-stripped">

                            <tbody>
                              {muteUpDataAfterSearch.map((eachCall, index) => (

                                <tr>
                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><BsPersonCircle style={{ height: '30px', width: '30px' }} /></td>

                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                    <span style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span>,
                                    <span style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} > {eachCall.designation}</span></td>
                                  {/* <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td> */}

                                  {/* <p style={{color:'blue', fontSize:'13px', marginTop:'0px' }}>Disconnected</p> */}

                                  <td><button onClick={() => muteCall(eachCall.party_number)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>
                                  {/* <td><button style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', color: 'grey' }}>ADMIN</span></button></td> */}
                                  {/* {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>} */}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="handraise">
                <section>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6'>
                        <input onChange={handleHangupSearch} value={hangupSearch} placeholder='Search' className='form-control ' type='text' />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <div style={{ height: '70vh', overflowY: 'auto' }} className='card'>
                          <table class="table  table-stripped">

                            <tbody>
                              {handRiseDataAfterSearch.map((eachCall, index) => (

                                <tr>
                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><BsPersonCircle style={{ height: '30px', width: '30px' }} /></td>

                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                    <span style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span>,
                                    <span style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} > {eachCall.designation}</span></td>
                                  <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td>

                                  {/* <p style={{color:'blue', fontSize:'13px', marginTop:'0px' }}>Disconnected</p> */}

                                  {eachCall.phone_number != myValue.userMobile && <td><button onClick={() => handrisehandleMute(eachCall.party_number)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px' }}>{eachCall.mute_flag == 1 ? <BsFillMicMuteFill style={{ color: 'grey' }} /> : <BsFillMicFill style={{ color: 'grey' }} />}</span></button></td>}
                                  {eachCall.phone_number == myValue.userMobile && <td><button style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', color: 'grey' }}>ADMIN</span></button></td>}

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="hangup">
                <section>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-6'>
                        <input onChange={handleHangupSearch} value={hangupSearch} placeholder='Search' className='form-control ' type='text' />
                      </div>
                    </div>
                    <div className='row'>

                      <div className='col-12'>

                        <div style={{ height: '70vh', overflowY: 'auto' }} className='card'>
                          {hangUpData.length > 0 ?
                            <div className='text-right' style={{ display: 'flex', justifyContent: 'end' }}>
                              <button onClick={redialAll} className='m-3 text-center btn btn-info' title='Redial All' ><IoMdRepeat style={{ fontSize: '25px', color: 'green' }} /></button>
                            </div> : null
                          }


                          <table class="table  table-stripped">
                            <tbody >
                              {hangUpDataAfterSearch.map((eachCall, index) => (
                                <tr>
                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><BsPersonCircle style={{ height: '30px', width: '30px' }} /></td>

                                  <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                    <span style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span>,
                                    <span style={eachCall.is_talking == 1 ? { color: '#000', fontSize: '13px', fontWeight: '400', marginTop: '0px' } : { color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} > {eachCall.designation}</span></td>
                                  <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td>

                                  {/* <p style={{color:'blue', fontSize:'13px', marginTop:'0px' }}>Disconnected</p> */}


                                  {/* {eachCall.phone_number == myValue.userMobile && <td><button style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', color: 'grey' }}>ADMIN</span></button></td>} */}
                                  <td><button onClick={() => singleRidial(eachCall.group_id, eachCall.user_id, eachCall.phone_number, eachCall.contact_display_name, eachCall.live_id, eachCall.conf_unique_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><IoMdRepeat style={{ fontSize: '20px', color: 'green' }} /></span></button></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Tab.Pane>
            </Tab.Content>
          </div>
          <Nav variant="tabs" className='d-flex flex-row justify-content-around '>
            <Nav.Item>
              <Nav.Link className="notification-icon live-dashboard" eventKey="Groups" >
                <div >
                  <MdGroups style={{ fontSize: '25px', color: 'grey' }} />
                  <span className="notification-count">{liveData.length}</span>
                </div></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="notification-icon" eventKey="Muted">
                <div>
                  <BsFillMicMuteFill style={{ fontSize: '25px', color: 'grey' }} />
                  <span className="notification-count">{muteData.length}</span>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="notification-icon" eventKey="handraise">
                <div>
                  <HiHandRaised className={handRiseData.length > 0 ? 'blinking-dot' : ''} style={{ fontSize: '25px', color: 'grey' }} />
                  <p className="notification-count">

                    {handRiseData.length}
                  </p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="notification-icon" eventKey="hangup">
                <div>
                  <IoCallSharp style={{ fontSize: '25px', color: 'red' }} />
                  <span className="notification-count">{hangUpData.length}</span>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>) : loadingView()}
      <div className="addgroup_output" style={{ width: "calc(100% - 330px - 82px)" }} >
        <Outlet />
      </div>
    </>
  )
}

export default Calling
