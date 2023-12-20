import React from 'react'
import {  Link, NavLink } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../../Images/dtellogo.png'
import GetReport from '../GetReport';
import { useState, useContext } from 'react';
import MyContext from '../MyContext';
import Cookies from 'js-cookie';


const WelcomeHeader = () => {
const [activeTab, setActiveTab] = useState(-1);

    const HeaderLi = styled.li`
        margin: 0px 20px 0px 0px;
    `;
  
    //weblogin
    const WebLogin = styled.button`
        padding: 8px 22px;
        background-color: white;
        border-radius: 12px;
        color: #fff;
        textDecoration: none;
    `;

    
    //active function call
  
//json fake api
    const welcomeHeaderMenus = [
        {
          path: "/",
          name: "Add Groups",
          icon: <i className="fa fa-plus" aria-hidden="true"></i>,
        },
        {
          path: "/quicktalks",
          name: "Quick Talks",
          icon: <i className="fas fa-phone-alt"></i>,
        },
        // {
        //   path: "/searchconf",
        //   name: "Search",
        //   icon: <i className="fa fa-search"></i>,
        // },
        {
          path: "/recharge",
          name: "Recharge",
          icon: <i className="fa fa-credit-card" aria-hidden="true"></i>,
        },
        {
          path: "/profile",
          name: "Profile",
          icon: <i className="fa fa-user" aria-hidden="true"></i>,
        },
        {
          path: "/gerreport",
          name: "Report",
          icon: <i className="fa fa-user" aria-hidden="true"></i>,
        },
        {
          path: "/weblogin",
          name: "Logout",
          icon: <i className="fa fa-user" aria-hidden="true"></i>,
        }
      ];



  const handleActiveTab=(index)=>{
    if(index==5){
      Cookies.remove('authToken'); //removing the cookies from the users machine, i.e. token //
      localStorage.removeItem('globalState');
      window.location.href = '/ConvoxMeetConference'; //'/public'    /weblogin
    }
    setActiveTab(index === activeTab ? -1 : index); // Toggle active tab
  }

    return (
        <>
           <section style={{backgroundColor:'#192A53'}}>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/welcome">Logo</Link> */}
                    {/* <Link className="navbar-brand" to="/welcome"> <img style={{height:"50px", width:'50px', borderRadius:'50%'}} src={logo}/></Link> */}
                    <div className="navbar-brand" ><Link  to={`/`}><img style={{height:"50px", width:'50px', borderRadius:'50%'}} src={logo}/></Link></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                  {/* {<GetReport/>} */}
                  <div><h4 style={{color:'#fff', fontWeight:'bold'}}>ConVoxMeet</h4></div>
                  {/* <Link to="/gerreport"><button className='btn btn-primary'>Get Report</button></Link> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto  mb-lg-0 ">
                            {
                                welcomeHeaderMenus.map((val , key) => {
                                    return(
                                        <HeaderLi><li key={key} className="nav-item">
                                        <NavLink  onClick={()=>handleActiveTab(key)} className="nav-link text-light"  aria-current="page" to={val.path}>{val.name}</NavLink>
                                        </li></HeaderLi>
                                    )
                                })
                            }
                           
                        </ul>
                       {/* { <div>
                            < WebLogin onClick={handleLogout} type='button' className=" text-primary btn btn-warning" >Logout</WebLogin>
                        </div>} */}
                        
                       
                    </div>
                </div>
            </nav>
           </section>
        </>
    )
}

export default WelcomeHeader
