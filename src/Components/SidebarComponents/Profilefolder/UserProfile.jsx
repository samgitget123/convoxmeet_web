import React from 'react'
import styled from "styled-components";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineMail, AiOutlineMobile } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { BsGenderFemale } from 'react-icons/bs';
import { useContext } from 'react';
import MyContext from '../../MyContext';



//styled
const UserProfilediv = styled.div`
width: 100%;
overflow: hidden;
text-align: justify;
padding: 20px 40px;
background-color:#d5e8e7;
height:100vh;
`;

const UserProfile = () => {


//accessing the mobile of the use through the useContext hook//

  const myValue = useContext(MyContext);
//console.log(myValue.userMobile )


  return (
    <>

      <div className='container '>
        <div className='row'>
          <div className=' col-12  bg-light d-flex flex-row justify-content-between align-items-center pt-3' style={{  height: '64px' }}>
            <p style={{ color: 'blue' }}>Profile</p>
            <p>Selected Time Zone: </p>
          </div>

          <div className='col-6 p-5' style={{ background: "#D5E8E7", height:'100vh' }}>

            <div style={{ width: '250px' }}>
              <label htmlFor='name'>Full Name</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>
                <CgProfile style={{ color: 'grey', marginRight: '15px' }} />
                <input className='form-control' id="name" type="text" placeholder='Username' style={{ border: 'none' }} />
              </div>

            </div>

            <div style={{ width: '250px' }}>
              <label htmlFor='email'>Email</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>
                <AiOutlineMail style={{ color: 'grey', marginRight: '15px' }} />
                <input className='form-control' id="email" type="text" placeholder='Email' style={{ border: 'none' }} />
              </div>

            </div>

            <div style={{ width: '250px' }}>
              <label htmlFor='date'>Date of Birth</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>

                <input  className='d-flex form-control' id="date" type="date" style={{ border: 'none', color: 'grey' }} />
              </div>

            </div>



          </div>
          <div className='col-6 p-5' style={{ background: "#D5E8E7" }}>
            <div style={{ width: '250px' }}>
              <label htmlFor='mobilenumber'>Mobile Number</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>
                <AiOutlineMobile style={{ color: 'grey', marginRight: '15px' }} />
                <input value={myValue.userMobile} className='form-control no-highlight' readonly id="mobilenumber" type="text" placeholder='Mobile Number' style={{ border: 'none',color:'grey', caretColor: 'transparent' }} />
              </div>

            </div>

            <div style={{ width: '250px' }}>
              <label htmlFor='location'>Location</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>
                <GoLocation style={{ color: 'grey', marginRight: '15px' }} />
                <input value='India' className='form-control no-highlight' id="location" readonly type="text" placeholder='Location' style={{ border: 'none', color:'grey', caretColor: 'transparent'  }} />
              </div>




            </div>

            <div style={{ width: '250px' }}>
              <label htmlFor='location'>Gender</label>
              <div className='form-control h20 d-flex align-items-center mb-4 mt-2'>
                <BsGenderFemale style={{ color: 'grey', marginRight: '15px' }} />

                <select className='form-control' none name="gender" id='gender'  style={{border:'none', width:'100% ', color:'grey'}}> 
                  <option value="male">Male</option>
                  <option value="female">Female</option>

                </select>


              </div>




            </div>

            <button className='btn btn-primary mt-4'>Save Changes</button>
          </div>
         




        </div>
      </div>

    </>
  )
}

export default UserProfile

