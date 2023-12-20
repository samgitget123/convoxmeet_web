import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { FcAbout } from "react-icons/fc";




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
};
const Tophead = styled.div`
  background-color: "grey";
`;

const Buttonstyle = styled.div`
  padding: 8px 4px;
  border-radius: 12px;
  background-color: white;
`;



const SearchConference = () => {
  return (
    <>
    
      <Addgrouplistdiv className="col-sm-12">
        <div className="header-top text-dark " style={TopHeader}>Search By ConferenceName</div>
        <Tophead>
          <div className="top_header py-5">
            <div className=" d-flex px-3">
              <div className="mx-3">
                <select name="" id="">
                  <option value="">This Month</option>
                </select>
              </div>
              <div>
                <select name="" id="">
                  <option value="">Main-Account</option>
                </select>
              </div>
            </div>
            <div className="tabs d-flex justify-content-evenly mt-3">
              <button className="btn btn-sm btn-primary">Search</button>
              <button className="btn btn-sm btn-success">Summarized</button>
              <button className="btn btn-sm btn-warning">Detailed</button>
            </div>
          </div>
        </Tophead>

        <hr />

       <div className="d-flex mb-3">
          <div className="mx-5">
            <button style={{width:'100px'}} className="btn btn-sm btn-primary">Minutes:0</button>
          </div>
          <div>
            <button style={{width:'100px'}} className="btn btn-sm btn-success">Amount:0.00</button>
          </div>
        </div>
        <div className="d-flex">
          <div className="mx-5">
            <button style={{width:'100px'}} className="btn btn-sm btn-warning">calls:0</button>
          </div>
          <div>
            <button style={{width:'100px'}} className="btn btn-sm btn-danger">Members:0</button>
          </div>
  </div>

        <hr />
        <h4 className="text-center">No calls Found!</h4>
        
      </Addgrouplistdiv>
      <div className="addgroup_output d-flex flex-column justify-content-center col-sm-12" style={{ width: "calc(100% - 330px - 82px)" }} >
      <div  className="d-flex flex-column justify-content-center align-items-center ml-4 "  >
        <FcAbout style={{height:'100px', width:'100px', marginBottom:'25px'}}/>
        <h3 style={{color:'#184e5e', fontWeight:'bold', fontFamily:'roboto'}}>No calls Found!</h3>
        <p style={{color:'gray'}}>Please try searching again.</p>
        <Outlet />
      </div>
      </div>
    </>
  );
};

export default SearchConference;



