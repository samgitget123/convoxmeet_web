import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import styled from "styled-components";
import { Modal } from 'react-bootstrap';
import { MyServerContext } from '../../Contexts/SeverContexts';


//stylecomponents
const Addgroupdiv = styled.div`
  margin: 0px 0px;
  padding: 0px 0px;
  border-bottom: 0.25px solid #f8f9fa;
  width: 330px;
`;

const Addgrouplistdiv = styled.div`
background-color: #192A53;
  color: #fff;
  min-height: 100vh;
  width: 330px;
  

`;

const Labelel = styled.label`
height:12px,
width:12px,
background-color:blue
`;
const TopHeader = {
  height: "64px",
  width: "330px",
  backgroundColor: "#F8F9FA",
  opacity: "0.8",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black"
}

const card1={
  height:"300px",
   //width:'850px',
  border:'1px solid lightgreen',
  background:"#fff",
  
  borderRadius:'12px',
   
}

const card2={
  height:"100px",
   //width:'850px',
  border:'1px solid lightgreen',
  background:"#fff",
  margin:'auto',
  borderRadius:'12px',
  marginTop:'25px'
   
}

const Recharge = () => {
  const {baseurl} = useContext(MyServerContext);
  const [showModal, setShowModal] = useState(true);
  const [contactData, setContactData] = useState({});

  const handleContact = async () => {
    const url = `${baseurl}/contactus`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres, 'contact');
      const usersmessage = jsonres.messages;
      const usersresult = usersmessage.data;
      setContactData(usersresult); //masterdata
      

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    handleContact();

  },[]);

  const handleModal=()=>{
    setShowModal(false)

  }


  

  return (
    <>
      <Addgrouplistdiv>
        <div className="header-top" style={TopHeader}>
          Recharge
        </div>
        <form className=' p-2 '>
          <h4 style={{ color: 'lightgrey', fontSize: '15px', margin: '30px', textAlign: 'center' }}>Recharge with paytm</h4>

          <input type="text" placeholder='Enter Amount' className='form-control me-2' />



          <div className='m-5'>

            <p className='d-flex justify-content-between'>Amount: <span>0</span></p>
            <p className='d-flex justify-content-between'>Tax (18%): <span>0</span></p>
            <p className='d-flex justify-content-between'>Total Amount: <span>0</span></p>
          </div>
          <input type="text" placeholder='Enter Valid Transaction ID' className='form-control me-2' />
          <div className='text-center m-5   '>
            <button type='button' className='btn btn-success btn-lg '>Proceed</button>
          </div>
        </form>
      </Addgrouplistdiv>
      {showModal && 
      <Modal show={true} centered  className="transparent-modal-background">
                <Modal.Header>
                  <button type="button" className="btn-close p-3" aria-label="Close" onClick={handleModal}></button>
                </Modal.Header>
                <Modal.Body >
                 
                  <div style={{height:'200px', paddingLeft:'25px'}}>
                    <p style={{color:'green', textDecoration:'underline', textAlign:'center'}}>For more info, Please Contact the Below details</p>
                   <div className=' container'>
                    <div className='row p-'>
                    <p className='col-6' style={{color:'grey'}}>Address</p>
                    <p className='col-6' style={{color:'grey'}}>{contactData.address}</p>
                    <p className='col-6' style={{color:'grey'}}>Company Name</p>
                    <p className='col-6' style={{color:'grey'}}>{contactData.companyname}</p>
                    <p className='col-6' style={{color:'grey'}}>Contact Mobile</p>
                    <p className='col-6' style={{color:'grey'}}>{contactData.contacts}</p>
                    <p className='col-6' style={{color:'grey'}}>Contact Email</p>
                    <p className='col-6' style={{color:'grey'}}>{contactData.email_id}</p>
                    </div>
                    </div>
                  </div>
                

                </Modal.Body>
               
              </Modal>}
          

      <div className='addgroup_output y-scroll' style={{ width: "calc(100% - 330px - 82px)" }}>
        <div className='container-fluid'>
          <div className='row'>
          <p style={{height:'48px', padding:'20px', color:'blue'}}>Recharge & History</p>
          <div style={{background:'#D5E8E7', height:'100vh',  padding:'30px'}}>

<div className='col-12 col-sm-12' style={card1} >
  <div style={{background:'#22325A', borderRadius:'12px', color:'white'}} className='d-flex flex-row justify-content-around align-items-center pt-3'>
    <p>Account Balance</p>
    <p>Lines</p>
  </div>
<div className='d-flex flex-row justify-space-around'>
  <div style={{width:'600px'}}></div>
  <div>
  <div>
    <div className='d-flex align-items-center mt-5'>
    <div style={{height:'12px', width:'12px', background:'blue', marginRight:'12px'}}></div>
      <span>Lines Used</span>
    </div>
  </div>
  <div>
    <div className='d-flex align-items-center mt-3'>
    <div style={{height:'12px', width:'12px', background:'grey', marginRight:'12px'}}></div>
      <span>Allotted Lines</span>
    </div>
  </div>
  </div>
</div>
</div>
<div className='col-12 col-sm-12' style={card2} >
  <div style={{background:'#31476b', borderRadius:'12px', color:'white', paddingLeft:'12px', opacity:'0.5'}} className='d-flex flex-row  align-items-center pt-3 ml-2'>
    <p>Recharges</p>
   
  </div>
<div className='d-flex flex-row justify-space-around'>
  <div style={{width:'600px'}}></div>
  <div>
  
 
  </div>
</div>
</div>

          </div>
        </div>
       
      </div>
      </div>
    </>
  )
}

export default Recharge
