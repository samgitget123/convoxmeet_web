import React, { useContext, useState } from 'react'
import MyContext from '../../../MyContext';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { Modal } from "react-bootstrap";
import { MyServerContext } from '../../../Contexts/SeverContexts';
const SuccessView = (props) => {
  const {baseurl} = useContext(MyServerContext);
    const myValue = useContext(MyContext);
    const data = props.data;
    const filteredData = props.filteredData;
    ////////////states//////////////
    const [activeTab, setActiveTab] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [noconf, setConf] = useState(false);
    const [uniqueId, setUniqueId] = useState("");
    const [groupChangeModal, setGroupechangemodal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successupload, setsuccessupload] = useState('');
    const [withAdmin, setWithAdmin] = useState(false);
    const [confuniqueid, setconfuniqueid] = useState("");
    // const [data, setData] = useState([]);
    const [live, setLive] = useState(() => {
        const storedLive = localStorage.getItem("live");
        return storedLive ? JSON.parse(storedLive) : "";
      });
    const [liveArray, setLiveArray] = useState(() => {
        const storedLive = localStorage.getItem("liveArray");
        return storedLive ? JSON.parse(storedLive) : "";
      });
    ////////////functions////////////
    const handleTabClick = (index) => {
        setActiveTab(index === activeTab ? "" : index);
    };
     //group name setting top //
  const callerHeader = (value) => {
    setGroupName(value);
  };
  //setting group id
  const settingGroupId = (id, uniqueid) => {
    setGroupId(id);
    setUniqueId(uniqueid);
  };
  //handle group change
  const handleGroupchange = (groupId, groupname) => {
    setGroupechangemodal(!groupChangeModal);
    setGroupId(groupId);
    setGroupName(groupname);

  }
  //IT WILL SET GROUP ID
  const handleGroupId = (id) => {
    setGroupId(id);
  }
   //calling button called //
   const handleGroupCalls = (groupId) => {
    setShowModal(!showModal);
    setGroupId(groupId);
  };
  //closemutetoggle
  const CloseGroupnameToggle = () => {
    setGroupechangemodal(!groupChangeModal);
    setsuccessupload("");
  }
  //changename
  const changeName = (e) => {
    setGroupName(e.target.value);
  }
   //update group name
   const updateGroupname = async (groupName, groupId) => {
    //${baseurl}/updategroupname?gid=84&mobile=9848851443&gname=productTest
    try {
      const updateGroupnameurl = `${baseurl}/updategroupname?gid=${groupId}&mobile=${myValue.userMobile}&gname=${groupName}`;
      const response = await fetch(updateGroupnameurl);
      const usersJson = await response.json();
      const jsonRes = JSON.parse(JSON.stringify(usersJson));
      if(jsonRes){
        setsuccessupload('Group Name has been updated');
      }else{
        setsuccessupload('Unable to update group name');
      }

    } catch (error) {
      console.log(error);
    }
  }
  //making call
  const checking = () => {
    data.forEach((eachOne) => {
      if (eachOne.group_id === groupId) {
        setLive(eachOne.group_id);
       //liveArray.push(eachOne.group_id);
        setLiveArray([...liveArray , eachOne.group_id]);
      } else {
        setLive("");
      }
    });
  };

  const makingCall = async () => {
    try {
      const adminflag = withAdmin === true ? 1 : '';
      const url = `${baseurl}/groupcall?group_id=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&mute=&ismute=0&handrise=0&conf_id=${uniqueId}&isadmininclude=${adminflag}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const getConfUniqueId = jsonres.messages.success.conf_unique_id;
      setconfuniqueid(getConfUniqueId);
      checking();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }

  };
  const ModalToggle = () => {
    setShowModal(!showModal);
  };
  const includesAdmin = (event) => {
    setWithAdmin(true);
  }
  const noConfclose = () => {
    setConf(false);
  };
  //styled components
  const Addgroupdiv = styled.div`
  margin: 0px 0px;
  padding: 0px 0px;
  border-bottom: 0.25px solid #f8f9fa;
  width: 330px;
`;

const Addgrouplistdiv = styled.div`
  background-color: #192a53;
  color: #fff;
  width: 330px;
`;
    return(
        <>
          {data.length > 0 ? (
            <ul className="handle-overflow" style={{ paddingLeft: "2px" }}>
              {filteredData.length > 0 ? (
                <div>
                  {" "}
                  {filteredData.map((val, key) => {
                    return (
                      <div>
                        <div className="">
                          <Addgroupdiv className="y-scroll">
                            {/* // className={`tab ${index === activeTab ? 'active' : ''}` */}
                            <div
                              style={{
                                backgroundColor:
                                  activeTab === key ? "#000" : "transparent",
                              }}
                              className="callerlist p-2"
                            >
                              {/* <div onClick={()=>getBackgroundcolor(val.group_id , key)} className="callerlist p-2" style={{backgroundColor: backgroundColor}}> */}
                              <li onClick={() => handleTabClick(key)} key={key}>
                                <Link
                                  to={`viewcallers/${val.group_id}`}
                                  onClick={() => callerHeader(val.group_name)}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div
                                    className="d-flex flex-row justify-content-around align-items-center text-light"
                                   
                                  >
                                    <div className="mx-2">
                                      <MdGroups
                                        style={{ width: "40px", height: "40px" }}
                                      />
                                    </div>
                                    <div
                                      onClick={() =>
                                        settingGroupId(
                                          val.group_id,
                                          val.cm_unique_id
                                        )
                                      }
                                      className="mx-1"
                                    >
                                      <div style={{ fontSize: "17px" }} >
                                        <span onDoubleClick={() => { handleGroupchange(val.group_id, val.group_name) }}> {val.group_name}</span>
                                      </div>
  
                                      <span style={{ fontSize: "13px" }}>
                                        created on {val.created_on}
                                      </span>
                                    </div>
                                    <div>
                                      {liveArray.length > 0 && liveArray.includes(val.group_id) ? (
                                        <Link to={`calling/${val.group_id}`} key={val.group_id}>
                                          <div
                                            onClick={() => { handleGroupId(val.group_id) }}
                                            className="text-center"
                                            style={{
                                              background: "red",
                                              color: "#fff",
                                              fontSize: "12px",
                                              paddingLeft: "5px",
                                              paddingRight: "5px",
                                              borderRadius: "5px",
                                              fontWeight: "bold",
                                              textDecoration: "none",
                                            }}
                                          >
                                            LIVE
                                          </div>
                                        </Link>
                                      ) : (
                                        <button
                                          onClick={() => handleGroupCalls(val.group_id)}
                                          style={{
                                            background: "none",
                                            border: "none",
                                            color: "white",
                                          }}
                                          key={val.group_id}
                                        >
                                          <IoCallSharp
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                            }}
                                          />
                                        </button>
                                      )}
  
                                    </div>
                                    {/*contextmenu */}
  
                                  </div>
                                </Link>
                                {/*change group name  */}
                                {groupChangeModal && (
                                  <Modal show={true}>
                                    <Modal.Header style={{ marginBottom: "0" }}>
                                      <button
                                        type="button"
                                        className="btn-close p-3"
                                        aria-label="Close"
                                        onClick={CloseGroupnameToggle}
                                      ></button>
                                    </Modal.Header>
  
                                    <Modal.Body>
                                      <div className="my-5">
                                        <h6 className="text-center">
                                          Update your Group Name
                                        </h6>
                                        <div className="text-center my-2">
                                          <div className="my-2">
                                            <form className="d-flex" role="search">
                                              <input
                                                onChange={changeName}
                                                type="text"
                                                placeholder="Enter Names "
                                                class="form-control"
                                                id="validationCustom01"
                                                value={groupName}
  
                                              />
                                            </form>
  
                                          </div>
                                          <button
                                            onClick={()=>{updateGroupname(groupName, groupId)}}
                                            style={{ border: "1px solid black" }}
                                            className="btn m-2"
                                          >
                                            Update
                                          </button>
                                          <button
                                            onClick={CloseGroupnameToggle}
                                            style={{ border: "1px solid black" }}
                                            className="btn m-2"
                                          >
                                            Cancel
                                          </button>
                                          <span>{successupload}</span>
                                        </div>
                                        
                                      </div>
                                    </Modal.Body>
                                  </Modal>
                                )}
                                {showModal && (
                                  <Modal show={true}>
                                    <Modal.Header style={{ marginBottom: "0" }}>
                                      <button
                                        type="button"
                                        className="btn-close p-3"
                                        aria-label="Close"
                                        onClick={ModalToggle}
                                      ></button>
                                    </Modal.Header>
  
                                    <Modal.Body>
                                      <div className="my-5">
                                        <h4 className="text-center">
                                          Are you sure you want to dial the call?
                                        </h4>
                                        <div className="text-center my-5">
                                          <div className="my-2">
                                            <input id="admin" type="checkbox" onChange={includesAdmin} />
                                            <label
                                              style={{
                                                marginLeft: "5px",
                                                color: "#192A53",
                                              }}
                                              for="admin"
                                            >
                                              Includes Admin
                                            </label>
                                          </div>
  
                                          {/* { <button onClick={getCountalert} className="btn btn-primary m-2"> Make Call</button> }  */}
                                          {
                                            <Link to={`calling/${groupId}`} onClick={makingCall}>
                                              <button
                                                // onClick={makingCall}
                                                className="btn btn-primary m-2"
                                              >
                                                <IoCallSharp
                                                  style={{
                                                    width: "30px",
                                                    height: "30px",
                                                  }}
                                                />
                                              </button>
                                            </Link>
                                          }
  
                                          {/* { <button onClick={getCountalert} className="btn btn-primary m-2"> Mute Call</button> } */}
                                          {/*
                                            <Link to={`calling/${groupId}`}>
                                              <button
                                                onClick={handleMute}
                                                className="btn btn-primary m-2"
                                              >
                                                {" "}
                                                Mute Call
                                              </button>
                                            </Link>
                                        */}
  
                                          <button
                                            onClick={ModalToggle}
                                            style={{ border: "1px solid black" }}
                                            className="btn m-2"
                                          >
                                            Cancel
                                          </button>
                                          {/* <Link to={`calling/${groupId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Make Call</button></Link>
                                    <Link to={`calling/${groupId}`}><button onClick={handleMute} className="btn btn-secondary m-2">Mute Call</button></Link> */}
                                        </div>
                                      </div>
                                    </Modal.Body>
                                  </Modal>
                                )}
                                {/* //no conf */}
                                {noconf && (
                                  <Modal show={true}>
                                    <Modal.Header>
                                      <button
                                        type="button"
                                        class="btn-close p-3"
                                        aria-label="Close"
                                        onClick={noConfclose}
                                      ></button>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <h4 class="text-success text-center">
                                        No Contact Found For Conference
                                      </h4>
                                    </Modal.Body>
                                  </Modal>
                                )}
                              </li>
                            </div>
                          </Addgroupdiv>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  style={{
                    color: "yellow",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                  className="text-center"
                >
                  No Group Found!
                </div>
              )}
            </ul>
          ) : (
            <div
              style={{ color: "yellow", fontSize: "15px", fontWeight: "bold" }}
              className="text-center my-5"
            >
              Create Your Group!
            </div>
          )}
        </>
    );
}

export default SuccessView