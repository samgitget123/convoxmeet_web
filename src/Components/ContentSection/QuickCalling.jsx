import React , {useContext} from 'react'
import { useParams } from 'react-router-dom';
//import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
//import { MdAddCall } from 'react-icons/md';
import { SlCallEnd } from 'react-icons/sl';
//import { HiHandRaised } from 'react-icons/hi2';
import {  Tab,  Nav } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import MyContext from '../MyContext';
//import { FaBeer } from 'react-icons/fa';
import {  Outlet } from "react-router-dom";
// import { IoCallSharp } from 'react-icons/io5';
// import { IoMdRepeat } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { ThreeDots } from 'react-loader-spinner';
import { MyServerContext } from '../Contexts/SeverContexts';


const QuickCalling = () => {
  const {baseurl} = useContext(MyServerContext);
  const [liveData, setLiveData] = useState([]);
  const [apiStatus, setApiStatus] = useState('inProgress');
  const myValue = useContext(MyContext);
  //live call dashboard //
  const fetchLiveData = async () => {
    const url = `${baseurl}/livequickcalldata?uid=${myValue.userId}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const usersmessage = jsonres.messages;
      if (jsonres.status === 201 || jsonres.status === 401) {
        setLiveData(usersmessage.data);
        setApiStatus('success');

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLiveData()
    }, 1000)

    //clearing the interval when unmount//
    return () => {
      clearInterval(intervalId);
    };

  }, [liveData]);

  const params = useParams()
  const groupId = params.id;

  const getColor = (status) => {
    if (status === 'DISCONNECTED') {
      return 'red';
    } else if (status === 'ONCALL') {
      return 'steelblue';
    } else {
      return 'green';
    }
  }

  //each call end button functionality //
  const singleCallEnd = async (liveId) => {
    const url = `${baseurl}/singlepartyend?liveid=${liveId}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };

  const loadingView = () => (
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

  const successView = () => {
    return <>
      <Tab.Container defaultActiveKey="Groups" transition={false} id="noanim-tab-example">
        <div >
          <Tab.Content style={{ height: '70vh', overflowY: 'auto' }}>
            <Tab.Pane eventKey="Groups">
              <section>
                <div className='container'>
                  <div className='row'>
                    <div className='col-12'>
                      <div style={{ height: '70vh', overflowY: 'auto' }} className='card'>
                        <table class="table  table-stripped">
                          <tbody>
                            {liveData.map((eachCall, index) => (

                              <tr>
                                <td style={{ marginRight: '0px', paddingRight: '0px' }}><BsPersonCircle style={{ height: '30px', width: '30px' }} /></td>

                                <td style={{ marginRight: '0px', paddingRight: '0px' }}><p style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginBottom: '0px' }} >{eachCall.contact_display_name}</p>
                                  <span style={{ color: 'grey', fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.phone_number}</span></td>
                                <td><span style={{ color: getColor(eachCall.status), fontSize: '13px', fontWeight: '400', marginTop: '0px' }} >{eachCall.status}</span></td>
                                {eachCall.phone_number === myValue.userMobile && <td><button style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '13px', color: 'grey' }}>ADMIN</span></button></td>}
                                {eachCall.phone_number !== myValue.userMobile && <td><button onClick={() => singleCallEnd(eachCall.live_id)} style={{ background: 'none', border: 'none' }}><span style={{ fontSize: '20px', color: 'red' }}><SlCallEnd /></span></button></td>}
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
            <Nav.Link className="notification-icon" eventKey="Groups" >
              <div >
                <MdGroups style={{ fontSize: '25px', color: 'grey' }} />
                <span className="notification-count">{liveData.length}</span>
              </div></Nav.Link>
          </Nav.Item>
        </Nav>
      </Tab.Container>
      <div className="addgroup_output" style={{ width: "calc(100% - 330px - 82px)" }} >
        <Outlet />
      </div>
    </>
  }
  const renderGroups = () => {
    switch (apiStatus) {
      case 'inProgress':
        return loadingView();
        break;
      case 'success':
        return successView()
        break;
      default:
        return null;
    }
  }

  return (
    <>
      {renderGroups()}
    </>
  )
}
export default QuickCalling

