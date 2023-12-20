import React from 'react'
import Qrcode from './Qrcode'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Googleplay = styled.a`
text-decoration: none;
padding: 8px 16px;
margin: 0px 30px;
background-color: #fff;
color: grey;
border-radius: 22px;
border: 1px solid steelblue;
`;
const WebLogin = () => {
 
  return (
    <>
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-7">
              <div className='my-3'>
                <h4>To Access Web, Scan QR Here!!!</h4>
              </div>
              <div className='mb-5'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, odio atque? Eaque necessitatibus hic maxime! Sapiente veritatis
                  dolorum omnis distinctio
                  explicabo nisi! Error asperiores eaque amet veniam officia.</p>
              </div>
              <div className="buttons_playstore mt-5 ">
                <Googleplay><Link to={'#'} className="googleplay " style={{ textDecoration: "none", color: "grey" }}><span><i class='fab fa-google-play' style={{ fotnSize: "20px", marginRight: "4px" }}></i>
                  Google Play</span></Link></Googleplay>
                {/* <Googleplay><Link to={'#'} className="applystore" style={{ textDecoration: "none", color: "grey" }}><span><i class="fa fa-apple" style={{ fotnSize: "20px", marginRight: "4px" }}></i>Apple Store</span></Link></Googleplay> */}
                <Googleplay><Link to={'/sidebar'}  className="applystore" style={{ textDecoration: "none", color: "grey" }}><span><i class="fa fa-apple" style={{ fotnSize: "20px", marginRight: "4px" }}></i>Login</span></Link></Googleplay>
              </div>
            </div>
            <div className="col-lg-5">
              {
                <Qrcode/>
                /*<Qrscannercode/>*/
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WebLogin