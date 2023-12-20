import React, { useContext , useState  , useEffect} from 'react'
import { Link, NavLink  } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../../Images/dtellogo.png'
import { MyServerContext } from '../Contexts/SeverContexts';

const WelcomePage = (props) => {
const {baseurl} = useContext(MyServerContext);
const ListItem = styled.li`
color:white;
margin-right:30px;
font-weight:500;
`
  
    //weblogin
    const WebLogin = styled.a`
        padding: 8px 22px;
        background-color: white;
        border-radius: 12px;
        color: #fff;
        textDecoration: none;
    `;

const [mobile, setMobile] = useState("");
const [error, setError] = useState("");
const [otp, setOtp] = useState("");
const [enterOtp, setEnterOtp] = useState("");
const [token, setToken] = useState("");
const [invalidOtp, setInvalidOtp] = useState("");

console.log(token)
console.log(mobile)

//validate otp
const validateOtp=()=>{
    const fetchdata = async () => {
        const url = `${baseurl}/verifyotp?mobile=${mobile}&deviceid=123456789&otp=${enterOtp}`;  
        try {
          const response = await fetch(url);
          const usersjson = await response.json();
          const jsonres = JSON.parse(JSON.stringify(usersjson));
          console.log(jsonres);
          const usersmessage = jsonres.messages;
          // console.log(usersmessage.userid.user_id)
        //   const usersresult = usersmessage.token;
        //   props.updateToken(usersresult);
        //   setToken(usersresult); //masterdata
        if(usersmessage.token){
        props.updateToken(usersmessage.token, mobile, usersmessage.userid );
        }else{
            setInvalidOtp(usersmessage.fail)
        }                     
    
        } catch (error) {
          console.log(error);
        }
      };

      fetchdata();


}

const handlEnterOtp=(e)=>{
    setEnterOtp(e.target.value);
}

const changeMobile=(e)=>{
    setMobile(e.target.value)
}

//login otp
const handleLogin=()=>{
    const mobileRegex = /^[6-9]\d{9}$/;

    if(mobile==""){
    setError("Enter Mobile Number!")
    return false;
    }
    if(!mobileRegex.test(mobile)){
    setError("Enter 10 digit Mobile starting 6/7/8/9")
    return false;
    }
    else{
    setError("");
    const fetchdata = async () => {
        const url = `${baseurl}/generateotp?mobile=${mobile}&deviceid=123456789`; 
        console.log(url , 'generate otp') 
        try {
          const response = await fetch(url);
          const usersjson = await response.json();
          const jsonres = JSON.parse(JSON.stringify(usersjson));
          // console.log(jsonres);
          const usersmessage = jsonres.messages;
          const usersresult = usersmessage.otp;
          setOtp(usersresult); //masterdata
         
        } catch (error) {
          console.log(error);
        }
      };

      fetchdata();

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
    const apkfile = `http://172.16.12.138/apk/convoxmeet_android.apk`;
  return (
    <>
        <section >
      

        <nav style={{backgroundColor:'#192A53'}} className="navbar navbar-expand-lg  pt-3">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/welcome">Logo</Link> */}
                    <div className="navbar-brand" > <img style={{height:"50px", width:'50px', borderRadius:'50%'}} src={logo}/></div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div><h4 style={{color:'#fff', fontWeight:'bold'}}>Convoxmeet</h4></div>
                  {/* {<GetReport/>} */}
                 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mt-3 mb-lg-0 ">
                           <ListItem >Book a Demo</ListItem>
                           <ListItem>Features</ListItem>
                           <ListItem>How it works</ListItem>
                           <ListItem>Pricing</ListItem>
                          
                           <ListItem >Resources </ListItem>
                           
                          
                         
                           
                        </ul>

                       { <div>
                            < WebLogin><Link to={'/'} className=" text-primary" style={{textDecoration: "none"}}>WebLogin</Link></WebLogin>
                        </div>}
                        
                       
                    </div>
                </div>
            </nav>

  
            
           <div style={{
            backgrpundColor: "white"
        }} className="container p-5">
                <div className='mt-5'>
                <div className="row d-flex flex-row justify-content-around">
                    <div  className="col-lg-5 col-md-7 col-sm-12 col-xs-12">
                        
                        <div>
                        <ContentMainText>
                               <h5 style={{fontSize: "1.5rem"}}>Scan Code To access ConVoxtalk on Your Desktop</h5> 
                               <h6 style={{fontSize: "1.5rem"}}>Lets Login By Clicking WebLogin</h6> 
                          </ContentMainText>
                        </div>
                        <div className='mt-5'>
                            <h6>convoxmeet is a audio confernce platform.</h6>
                            Get in Touch More , using convoxmeet App. click below Google play link for app download.
                        </div>
                        <div className="buttons_playstore mt-5 ">
                          <Googleplay><a href={apkfile} className="googleplay " style={{textDecoration: "none" , color: "grey"}}><span><i class='fab fa-google-play'  style={{fotnSize:"20px" , marginRight: "4px"}}></i>
                           Google Play</span></a></Googleplay>
                          {/* <Googleplay><Link to={'#'} className="applystore" style={{textDecoration: "none" , color: "grey"}}><span><i class="fa fa-apple" style={{fotnSize:"20px" , marginRight: "4px"}}></i>Apple Store</span></Link></Googleplay> */}
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                       { <img src={'Photos/scan.png'} alt="image"  className='img-fluid'/>} 
                    </div>
                </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default WelcomePage
