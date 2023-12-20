import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GrSort } from 'react-icons/gr';
import { useContext } from 'react';
import MyContext from '../../MyContext';
import { RotatingLines } from  'react-loader-spinner';
import { MdSearchOff } from 'react-icons/md';
import { IoIosPhonePortrait} from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MyServerContext } from '../../Contexts/SeverContexts';


const QuickTalkContent = () => {
  const {baseurl} = useContext(MyServerContext);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [apiStatus, setApiStatus] = useState('inProgress');

  console.log(contacts, 'srinivas');



  const filteredQuickTalkContents = contacts.length>0 ?  contacts.filter(val => val.contact_display_name.toLowerCase().includes(search.toLowerCase())) :[];


  //usecontext props passed //
  const myValue = useContext(MyContext);
  // console.log(myValue.userId )

  const params = useParams();
  const callerId = params.id

  const quickTalkid = params.id
  
  const deleteSingleContact=async (mobilevalue)=>{
    const confirmed = window.confirm('Are you sure you want to delete this contact?');
    if(confirmed){
      const url = `${baseurl}/deletesingleuser?phone_number=${mobilevalue}&uid=${myValue.userId}&qid=${callerId} `;
      console.log(url);
      try {
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        //console.log(jsonres, 'yamuna group');
        
      } catch (error) {
        console.log(error);
      }
    }
    
  }


const handleSearch=(e)=>{
  setSearch(e.target.value)
}

useEffect(()=>{
  fetchQuickTalkContent();
}, [contacts]);

  const fetchQuickTalkContent = async () => {
  const url = `${baseurl}/viewsingleusers?uid=${myValue.userId}&quickid=${callerId}`;  
   console.log(url, 'srinivas');
  try {
    const response = await fetch(url);
    const usersjson = await response.json();
    const jsonres = JSON.parse(JSON.stringify(usersjson));
    console.log(jsonres);
    if(jsonres.status==201){
    const usersmessage = jsonres.messages;
    const usersresult = usersmessage.success;
    setContacts(usersresult); //masterdata
    setApiStatus('success');
    }else{
      setContacts([]); //clear the initial array result //
      setApiStatus('failure');
    }

  } catch (error) {
    console.log(error);
  }
};



const loadingView = () => (

  <div className="text-center my-5">  
  <RotatingLines
   strokeColor="grey"
   strokeWidth="5"
   animationDuration="0.75"
   width="60"
   visible={true}
  /></div>
  )

  const failureView=()=>(
    <div style={{color:'#192A53', fontSize:'24px'}} className='my-5 text-center'>No Contacts Available!</div>
    
  )

  const successView=()=>{
   return <> {filteredQuickTalkContents.length>0 ? 
      <div className='row'>
        {filteredQuickTalkContents.map((eachContact) => (
          <div className='col-4'>
            <div className='card mb-2 shadow'>

              {/* <p>{callerId}</p> */}
              <div className='card-body'>
                <div className='row'>
                <div className='d-flex justify-content-end'>
                    <RiDeleteBin5Line onClick={()=>deleteSingleContact(eachContact.phone_number)} style={{color:'grey', cursor:'pointer', outline:'none'}}/>
                    </div>
                  <div className='col-3'>
                    <img style={{ height: '50px', width: '50px' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalfwXTZ4k0gu2uAFtI09jjyTGjntLVzzWjBMIsExCuSVW45O1mjkqD1ce438eq3YpWC0&usqp=CAU' alt="image" />
                  </div>
                  <div className='col-7'>
                    <h4 style={{ color: '#000', fontFamily: 'Roboto', fontSize: '18px' }}>{eachContact.contact_display_name} </h4>
                    <div className='d-flex'>
                      {/* <i style={{ color: "grey", marginRight: "5px" }} class="fa-solid fa-mobile "></i> */}
                      <IoIosPhonePortrait style={{ color: "#192A53", marginRight: "5px", marginTop:'1px',  }}/>
                      <span style={{ color: "grey", fontSize: "15px" }}>{eachContact.phone_number}</span>
                    </div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>

        ))} </div>: 
        <div className='my-5 text-center'><MdSearchOff style={{color:'#192A53', height:'100%', width:'120px'}}/>
      <div style={{color:'#192A53', fontSize:'24px'}}>Not Found</div>
      </div>}</>
  }

  const renderGroups=()=>{
    switch(apiStatus){
      case 'inProgress':
        return loadingView();
        break;
      case 'success':
      return  successView()
      break;
    case 'failure':
      return failureView();
      break;
    default:
      return null;
   } 
   }


  return (
    <div style={{width:"100%", overflow:"hidden", textAlign:"justify", padding:"20px 40px", background:"#d5e8e7", minHeight:"100vh"}}>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form className="d-flex mb-3" role="search">
              <input onChange={handleSearch} value={search} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              
              <label style={{ height: '40px', width: '120px', backgroundColor: '#192A53', color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '12px' }}>{filteredQuickTalkContents.length} Members</label>
            </form>
          </div>
         {renderGroups()}


        </div>

      </div>
    </div>
  )
}

export default QuickTalkContent
