import React, { useEffect, useState } from 'react'
import { NavLink, Tab, Tabs } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import styled from 'styled-components'
import { useContext } from 'react';
import MyContext from '../MyContext';
import { MyServerContext } from '../Contexts/SeverContexts';


const CallerListDiv = styled.div`
    border: 1px solid black;
    padding: 10px;
    margin: 0px 0px 10px 0px;
    `;

const ProfileCaller = {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
}


const QuickTalkTabs = () => {
    const { baseurl } = useContext(MyServerContext);
    const [next, setNext] = useState(1);

    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);



    const [contactName, setContactName] = useState("");
    const [contactError, setContactError] = useState("")
    const [contactPhone, setContactPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [msg, setMsg] = useState("")
    const [quickid, setQuickId] = useState("");
    const [contactmsg, setContactmsg] = useState("");



    const [state, setState] = useState("");
    const [stateError, setStateError] = useState("");

    const [designation, setDesignation] = useState("");
    const [desigError, setDesigError] = useState("");

    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");
    //remove alert auto
    useEffect(() => {
        if (contactmsg !== '') {
            const timeout = setTimeout(() => {
                setContactmsg('');
            }, 1500);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [contactmsg]);



    //props from useContext //
    const myValue = useContext(MyContext);
    // console.log(myValue.userId )



    useEffect(() => {
        fetchdata();

    }, [])

    const fetchdata = async () => {
        const url = `${baseurl}/createquickserial?user_id=${myValue.userId}`;
        // console.log(url)
        try {
            const response = await fetch(url);
            const usersjson = await response.json();
            const jsonres = JSON.parse(JSON.stringify(usersjson));
            //   console.log(jsonres);
            const usersmessage = jsonres.messages;
            const usersresult = usersmessage.quickid;
            setQuickId(usersresult); //masterdata



        } catch (error) {
            console.log(error);
        }
    };


    const handleState = (e) => {
        setState(e.target.value);
    };

    const handleLocation = (e) => {
        setLocation(e.target.value);
    };


    const handleDesignation = (e) => {
        setDesignation(e.target.value);
    };


    const changeContactName = (e) => {
        setContactName(e.target.value);
    }

    const changeContactPhone = (e) => {
        const input = e.target.value;
        const numericInput = input?.replace(/\D/g, ''); // Remove non-digit characters
        const trimmedInput = numericInput?.slice(0, 10); // Limit to 10 digits
        setContactPhone(trimmedInput);
    }











    //next
    const CompleteFormStep = () => {
        setNext(cur => cur + 1);
    }

    //back
    const CompleteFormBackStep = () => {
        setNext(cur => cur - 1);
    }

    //final submit button render conditionally
    const SubmitRenderButton = () => {
        if (next === 3) {
            return (
                <button className="btn btn-primary">Finished</button>
            )

        }
        else {
            return (
                <button onClick={CompleteFormStep} className="btn btn-primary">Next</button>
            )

        }
    }


    //submitting phone and name button
    const submitContact = async (e) => {
        e.preventDefault();
        if (contactName == "") {
            setContactError("Contact Name is Required");
        }
        else if (contactPhone == "") {
            setContactError("");
            setPhoneError("Contact Number is Required");
        } else if (contactPhone.length <= 0 || contactPhone.length < 10) {
            setPhoneError("Please Enter Valid Phone Number");
        }
        else if (designation == "") {
            setPhoneError("");
            setDesigError("Designation Required");

        } else if (location == "") {
            setDesigError("");
            setLocationError("Location Required");
        } else if (state == "") {
            setLocationError("");
            setStateError("State is Required");
        }
        else {

            try {
                const url = `${baseurl}/insertquickcall?user_id=${myValue.userId}&phone_number=${contactPhone}&name=${contactName}&quick_id=${quickid}`;
                console.log(url, 'quickcallll');
                const response = await fetch(url);
                const usersjson = await response.json();
                const jsonres = JSON.parse(JSON.stringify(usersjson));
                console.log(jsonres);
                const Messagereturn = jsonres.messages.success;
                const Messagereturnfail = jsonres.messages.fail;
                console.log(Messagereturn, 'Message Return');
                if (Messagereturn) {
                    setContactmsg(Messagereturn);
                }
                if (Messagereturnfail) {
                    setContactmsg(Messagereturnfail);
                }



            } catch (error) {
                console.log(error);
            }


            setContactError("");
            setPhoneError("");
            setContactName("");
            setContactPhone("");
            setContactError("");

            setLocation("");
            setState("");
            setDesignation("");

            setStateError("");



        }
    }


    return (

        <div>
            <ul className="nav nav-tabs" id="myTab">
                <li className="nav-item">
                    <NavLink href="#phonecontact" className="nav-link active" data-bs-toggle="tab">Phone Contacts</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink href="#addcontact" className="nav-link" data-bs-toggle="tab">Add Contacts</NavLink>
                </li>

            </ul>
            <div className="tab-content">
                <div className="tab-pane fade show active" id="phonecontact">
                    <div className='my-3'>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                    </div>
                    <div className="contactsList">
                        <div className='d-flex flex-wrap justify-content-evenly'>
                            {/* <CallerListDiv> <div className="caller d-flex ">
                                <div className='mx-2'>
                                    <img src="https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png" alt="profile" style={ProfileCaller} />
                                </div>
                                <div>
                                    <span><i className="fa fa-phone" aria-hidden="true"></i><b>98566342725</b></span>

                                </div>
                            </div> </CallerListDiv>
                            <CallerListDiv> <div className="caller d-flex">
                                <div className='mx-2'>
                                    <img src="https://p.kindpng.com/picc/s/497-4973038_profile-picture-circle-png-transparent-png.png" alt="profile" style={ProfileCaller} />
                                </div>
                                <div>
                                    <span><i className="fa fa-phone" aria-hidden="true"></i><b>98566342725</b></span>

                                </div>
                            </div> </CallerListDiv> */}
                            <div style={{ color: 'grey' }}>No Contacts</div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="addcontact">
                    <div className="addcobtact">
                        <div className='mt-3'>
                            <form className='row' action="">

                                {/* <div className='mb-3'>
                                        <input type="file" className='form-control' />
                        </div>*/}
                                <div className='mb-3 col-md-12'>
                                    <input onChange={changeContactName} value={contactName} type="text" className='form-control' placeholder='Enter Your Name ' />
                                    <span className="error">{contactError}</span>
                                </div>
                                <div className='mb-3 col-md-6'>
                                    <input onChange={changeContactPhone} value={contactPhone} type="number" className='form-control' placeholder='Enter Your Contact Number' />
                                    <span className="error">{phoneError}</span>
                                </div>
                                <div class="col-md-6">
                                    <input
                                        onChange={handleDesignation}
                                        type="text"
                                        class="form-control"
                                        id="validationCustom01"
                                        value={designation}
                                        placeholder="Enter Designation"

                                    />
                                    <span className="error">{desigError}</span>
                                </div>
                                <div class="col-md-6">
                                    <input
                                        onChange={handleLocation}
                                        type="text"
                                        class="form-control"
                                        id="validationCustom01"
                                        value={location}
                                        placeholder="Enter Location"

                                    />
                                    <span className="error">{locationError}</span>
                                </div>
                                <div class="col-md-6">
                                    <input
                                        onChange={handleState}
                                        type="text"
                                        class="form-control"
                                        id="validationCustom01"
                                        value={state}
                                        placeholder="Enter State"

                                    />
                                    <span className="error">{stateError}</span>
                                </div>

                                {contactmsg && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                    <strong>{contactmsg}</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>}




                                <div style={{ marginTop: "11px" }} className="">
                                    <input type="submit" value="AddContact" className='btn btn-primary' onClick={submitContact} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default QuickTalkTabs
