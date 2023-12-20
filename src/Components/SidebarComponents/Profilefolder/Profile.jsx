import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Subaccount  from './Subaccount';
import Accountmanager from './Accountmanager';


//stylecomponents
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
  height: 100vh;
  width: 330px;
`;

const Addgroupinnerdiv = styled.div`
  
`;

const Profile_img = {
  width: "150px",
  height: "150px",
  borderRadius: "50%"
}

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

//button below css
const ProfileBtn = {
  padding: "8px 16px",
  borderRadius: "16px",
  backgroundColor: "slateblue",
  color: "white",
  textDecoration: "none",

}
const SubAccount = {
  padding: "8px 16px",
  borderRadius: "16px",
  backgroundColor: "slateblue",
  color: "white",
  textDecoration: "none"
}
const AccountManager = {
  padding: "8px 16px",
  borderRadius: "16px",
  backgroundColor: "slateblue",
  color: "white",
  textDecoration: "none"
}


const Profile = () => {
  return (
    <>

      <Addgrouplistdiv>
        <div className="header-top text-dark" style={TopHeader}>
          Profile
        </div>
        <section className='d-flex justify-content-center '>
          <div className="profile_img_upload p-3">
            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile" style={Profile_img} />
          </div>
        </section>
        <section className=''>
          <div className="categories text-center mb-5 mt-3">
            <Link to={`profilesdisplay`} className="profilebtn" style={ProfileBtn}>Profile</Link>
          </div>
          
           <div className="categories text-center mb-5">
           <Subaccount/>
            {/* <Link to={'profilesdisplay'} className=" subaccount " style={SubAccount}>Sub Account</Link> */}
          </div>
          <div className="categories text-center">
            <Accountmanager/>
            {/* <Link to={'profilesdisplay'} className=" accountmanager " style={AccountManager}>Account Manager</Link> */}
          </div>
        </section>
      </Addgrouplistdiv>

      <div className='addgroup_output' style={{ width: "calc(100% - 330px - 82px)" }}>
        <Outlet />
      </div>
    </>
  )
}

export default Profile