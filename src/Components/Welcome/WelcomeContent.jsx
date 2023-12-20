import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useState } from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import "animate.css/animate.min.css";
import Cookies from 'js-cookie';
import { MyServerContext } from '../Contexts/SeverContexts';

const WelcomeContent = (props) => {
  const {baseurl} = useContext(MyServerContext);
  console.log(baseurl , 'BASEURL');
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [enterOtp, setEnterOtp] = useState("");
  const [token, setToken] = useState("");
  const [invalidOtp, setInvalidOtp] = useState("");



  console.log(token)
  console.log(mobile)

  const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // current time + 30 days in milliseconds

  //validate otp
  const validateOtp = () => {
    const fetchdata = async () => {
      const url = `${baseurl}/verifyotp?mobile=${mobile}&deviceid=123456789&otp=${enterOtp}`;
     console.log(url , 'loginurl')
      try {
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        console.log(jsonres);
        const usersmessage = jsonres.messages;
        if (jsonres.status === 201 ) {
          props.updateToken(mobile, usersmessage.userid);
          Cookies.set('authToken', usersmessage.token, { expires: expiryDate }); //setting cookie in user's machine //
        }

        else {
          setInvalidOtp(usersmessage.fail)
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();


  }

  const handlEnterOtp = (e) => {
    setEnterOtp(e.target.value);
  }

  const changeMobile = (e) => {
    setMobile(e.target.value)
  }

  //login otp
  const handleLogin = async() => {
    const mobileRegex = /^[6-9]\d{9}$/;

    if (mobile === "") {
      setError("Enter Mobile Number!")
      return false;
    }
    // if (!mobileRegex.test(mobile)) {
    //   setError("Please Valid Mobile Number")
    //   return false;
    // }
    else {
      setError("");
        try {
          const url = `${baseurl}/generateotp?mobile=${mobile}&deviceid=123456789`;
          console.log(url , 'gernerateotp');
          const response = await fetch(url);
          const usersjson = await response.json();
          const jsonres = JSON.parse(JSON.stringify(usersjson));
           console.log(jsonres);
          const usersmessage = jsonres.messages;
          const usersresult = usersmessage.otp;
          setOtp(usersresult); //masterdata
        } catch (error) {
          console.log(error);
        }
    }

  }

  //styled css
  const ContentMainText = styled.div`
        font-size: 60px;
        font-weight: bold;
    `;

  const Googleplay = styled.a`
        text-decoration: none;
        padding: 8px 16px;
        margin: 0px 30px;
        background-color: #fff;
        color: grey;
        border-radius: 22px;
        border: 1px solid steelblue;
    `;
  return (
    <>
      <section style={{
        backgrpundColor: "white"
      }}>

        <div className="container p-5">
          <div className='mt-5'>
            <div className="row d-flex flex-row justify-content-around">
              <div className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
                <AnimationOnScroll animateIn="animate__fadeInLeftBig">
                  <div style={{ minHeight: "250px" }} className='card p-3'>
                    <div className="mb-5">
                      <h4 style={{ color: "#232F6F", fontWeight: "bold", marginBottom: "26px" }}>Sign In</h4>
                      <input maxLength="10" value={mobile} onChange={changeMobile} placeholder='Enter Mobile Number' type='text' />
                      <button onClick={handleLogin} style={{ marginLeft: "12px" }} className='btn btn-primary'>Login</button>
                      <p className='error'>{error}</p>
                      {otp ?
                        <div><p>Enter OTP: {otp}</p>
                          <input placeholder='Enter OTP' onChange={handlEnterOtp} value={enterOtp} type="text" />
                          <button onClick={validateOtp} className='btn btn-secondary' style={{ marginLeft: "12px" }}>Validate OTP</button>
                        </div> : null}
                      <p className='error'>{invalidOtp}</p>
                    </div>
                  </div>
                </AnimationOnScroll>
              </div>
              <div className='col-12 text-center mt-5'>
                <ContentMainText >
                  <h5 style={{ fontSize: "2.25rem" }}>Scan Code To access ConVoxtalk on Your Desktop</h5>
                </ContentMainText>
              </div>
            </div>
            <div className=' text-center'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Et possimus culpa nisi molestias blanditiis laboriosam cum iure quibusdam fuga voluptas.

            </div>
            <div className="buttons_playstore mt-3  text-center">
              <Googleplay><Link to={'#'} className="googleplay " style={{ textDecoration: "none", color: "grey" }}><span><i class='fab fa-google-play' style={{ fotnSize: "20px", marginRight: "4px" }}></i>
                Google Play</span></Link></Googleplay>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WelcomeContent