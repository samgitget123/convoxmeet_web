import React, { useState, useEffect , useContext } from 'react'
import { NavLink, Tab, Tabs } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';
import styled from 'styled-components'
import MyContext from '../MyContext';
import papa from 'papaparse';
//import csvtojson from 'csvtojson';
import { FaFileDownload } from 'react-icons/fa';
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


const NavTabs = () => {
    const {baseurl} = useContext(MyServerContext);
    const [next, setNext] = useState(1);
    const [groupname, setgroupname] = useState("")
    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showSuccessPopupmem, setShowSuccessPopupmem] = useState(false);

    const [groupId, setgroupId] = useState("");
    const [confid, setconfId] = useState("");
    const [agendainfo, setAgendainfo] = useState("");
    const [scheduling, setScheduling] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactError, setContactError] = useState("")
    const [contactPhone, setContactPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [msg, setMsg] = useState("");
    const [groupmsg, setGroupmsg] = useState("");
    const [contactmsg, setContactmsg] = useState("");
    const [scheduleinfomesage, setScheduleinfomessage] = useState("");
    const [designation, setDesignation] = useState("");
    const [desigError, setDesigError] = useState("");

    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState("");

    const [state, setState] = useState("");
    const [stateError, setStateError] = useState("");

    ////Enable tabs
    const [addMembersEnabled, setAddMembersEnabled] = useState(false);
    const [addScheduleEnabled, setaddScheduleEnabled] = useState(false);

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

    //Accessing the useContext mobile variable //
    const myValue = useContext(MyContext);
    // console.log(myValue.userMobile )

    const changeContactName = (e) => {
        setContactName(e.target.value);
    }

    const changeDesignation = (e) => {
        setDesignation(e.target.value);
    }

    const changeLocation = (e) => {
        setLocation(e.target.value);
    }

    const changeState = (e) => {
        setState(e.target.value);
    }







    const changeContactPhone = (e) => {
        const input = e.target.value;
        const numericInput = input?.replace(/\D/g, ''); // Remove non-digit characters
        const trimmedInput = numericInput?.slice(0, 10); // Limit to 10 digits
        setContactPhone(trimmedInput);
    }
    //restruct phone input to 10 digits only
    // const changeContactPhone = (event) => {
    //     const input = event.target.value;
    //     const numericInput = input.replace(/\D/g, ''); // Remove non-digit characters
    //     const trimmedInput = numericInput.slice(0, 10); // Limit to 10 digits

    //     setContactPhone(trimmedInput);
    //   };

    //submitting create group
    // const onSubmitCreateGroup = async () => {
    //     // e.preventDefault();
    //     if (groupname == "") {
    //         setError("Please Enter Group Name");
    //     } else {
    //         try {
    //              // const fetchdata = async () => {
    //             const url = `${baseurl}/creategroup?gname=${groupname}&schedule=1&active=1&mobile=${myValue.userMobile}`;
    //             console.log(url , 'creategroup');
    //             const response = await fetch(url);
    //             const usersjson = await response.json();
    //             const jsonres = await JSON.parse(JSON.stringify(usersjson));
    //             const usersmessage = jsonres.messages;
    //             const returnSuccessMessage =  usersmessage.success;
    //             if(jsonres.messages && jsonres.messages.success){
    //                 const { group_id, cm_unique_id } = jsonres.messages;
    //                 setAddMembersEnabled(true); //enable next tab
    //                 setgroupId(group_id)
    //                 setconfId(cm_unique_id);
    //                 setGroupmsg(returnSuccessMessage);
    //             }else if (jsonres.messages && jsonres.messages.fail){
    //                 setGroupmsg(jsonres.messages.fail);
    //             }else {
    //                 // Handle unexpected response structure here
    //                 throw new Error("Unexpected response structure");
    //               }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //         setShowSuccessPopup(true);
    //         setError("");
    //         // fetchdata();
    //     }
    // }
    const onSubmitCreateGroup = async () => {
        // e.preventDefault();
        if (groupname == "") {
            setError("Please Enter Group Name");
        } else {
            try {
                const url = `${baseurl}/creategroup?gname=${groupname}&schedule=1&active=1&mobile=${myValue.userMobile}`;
                console.log(url , 'CREATEGROUP');
                const response = await fetch(url);
                const usersjson = await response.json();
                const jsonres = JSON.parse(JSON.stringify(usersjson));
                console.log(jsonres , 'creategroupjson');
                const usersmessage = jsonres.messages;
                const returnSuccessMessage =  usersmessage.success;
                if (returnSuccessMessage) {
                    setAddMembersEnabled(true);
                    setGroupmsg(returnSuccessMessage);
                }
                console.log(returnSuccessMessage, 'Messageforgroup');
                const returnFailureMessage = usersmessage.fail;
                if (returnFailureMessage) {
                    setGroupmsg(returnFailureMessage);
                }
                console.log(returnFailureMessage, 'Messageforgroup');
                const id = usersmessage.group_id;
                const confid = usersmessage.conf_id;
                console.log(id)
                setgroupId(id)
                setconfId(confid);
            } catch (error) {
                console.log(error);
            }
            setShowSuccessPopup(true);
            setError("");
            // fetchdata();
        }
    }
    const changeGroupName = (e) => {
        setgroupname(e.target.value)

    }
    //close
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
        } else if (designation == "") {
            setPhoneError("");
            setDesigError("Designation Required");

        } else if (location == "") {
            setDesigError("");
            setLocationError("Location Required");
        } else if (state == "") {
            setLocationError("");
            setStateError("State is Required");
        }

        else if (contactPhone.length <= 0 ) {
            setPhoneError("Please Enter Valid Phone Number");
        } else {
            const url = `${baseurl}/addgroupM?mobile=${myValue.userMobile}&gid=${groupId}&phone=${contactPhone}&name=${contactName}&confid=${confid}&location=${location}&state=${state}&desig=${designation}`;
            console.log(url , 'VIEWCALLERS');
            try {
                const response = await fetch(url);
                const usersjson = await response.json();
                const jsonres = JSON.parse(JSON.stringify(usersjson));
                console.log(jsonres);
                const Messagereturn = jsonres.messages.success;
                const Messagereturnfail = jsonres.messages.fail;
                console.log(Messagereturn, 'Message Return');
                if (Messagereturn) {
                    setContactmsg(Messagereturn);
                    setaddScheduleEnabled(true);
                }
                if (Messagereturnfail) {
                    setContactmsg(Messagereturnfail);
                }

            } catch (error) {
                console.log(error);
            }
            //  setShowSuccessPopupmem(true);

            setContactError("");
            setPhoneError("");
            setContactName("");
            setContactPhone("");
            setLocation("");
            setDesignation("");
            setState("");
            setLocationError("");
            setStateError("");
            setDesigError("");
        }
    }
    // handleFile
    const [csvFile, setCsvFile] = useState(null);

    // const handleFileUpload = async () => {
    //   if (csvFile === null) {
    //     console.error('No CSV file selected.');
    //     return;
    //   }

    //   const file = event.target.files[0];

    //   const formData = new FormData();
    //   formData.append('file', csvFile);

    //   try {
    //     const response = await fetch('${baseurl}/uploadcsvfile', {
    //       method: 'POST',
    //       body: formData,
    //     });

    //     if (response.ok) {
    //       console.log('CSV file uploaded successfully!');
    //     } else {
    //       console.error('Failed to upload CSV file.');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    ///scheduling time 
    const onChangescheduling = (e) => {
        
        const input = e.target.value;
        const yearMatch = input.match(/^(\d{4})-\d{2}-\d{2}T\d{2}:\d{2}$/);
        if(yearMatch){
            const year = yearMatch[1]; // Extracted year
            console.log(year.length,  'year')
            if (year.length === 4) {
                setScheduling(e.target.value);
                console.log(`${year} yearformat`);
            } else {
                console.log('Error: Year should have exactly 4 digits.');
                // Optionally, you can clear the input field or take other actions.
                // setScheduling('');
            }
        }else {
            console.log('Error: Invalid date format.');
            // Optionally, you can clear the input field or take other actions.
            // setScheduling('');
        }
        // const arr = input.split("-");
        // const year = arr[0].split(",");
       

    }
    const getAgenda = (e) => {
        setAgendainfo(e.target.value);
    }

    const savetheschedule = async () => {
        if (setScheduling == "") {
            setContactError("Date Is Mandatory");
        }
        else if (setAgendainfo == "") {
            setContactError("");
            setPhoneError("Please add Agenda");
        } else {
            const schedulingParts = scheduling.split('T');
            const datePart = schedulingParts[0];
            const timePart = schedulingParts[1];
            const [year, month, day] = datePart.split('-');
        
            if (year.length !== 4) {
                setContactError("Year should be 4 digits");
              return; // Stop processing
            }
        
            // Continue with the rest of your code
             const scheduledDate = `${year}-${month}-${day}T${timePart}`;
            const scheuleurl = `${baseurl}/schedules?gid=${groupId}&schedule_date=${scheduledDate}&mobile=${myValue.userMobile}&agenda=${agendainfo}`;
            console.log(scheuleurl, 'SCHEDULED URL FOR SCHEDULING');
            try {
                const response = await fetch(scheuleurl);
                const usersjson = await response.json();
                const jsonres = JSON.parse(JSON.stringify(usersjson));
                console.log(jsonres , 'schedulejson');
                const Messagereturn = jsonres.messages.success;
                const Messagereturnfail = jsonres.messages.fail;
                console.log(Messagereturn, 'Message Return');
                if (Messagereturn) {
                    setScheduleinfomessage(Messagereturn);
                    console.log(contactmsg, 'contact msg');
                }
                // if(Messagereturnfail){
                //     setContactmsg(Messagereturnfail);
                // }

            } catch (error) {
                console.log(error);
            }
            setShowSuccessPopupmem(true);

            setContactError("");
            setPhoneError("");
            setContactName("");
            setContactPhone("");

        }
    }
    /////////////////////////////
    const [data, setData] = useState([]);
    const [columnArray, setColumn] = useState([]);
    const [valueArray, setValues] = useState([]);
    //warnings
    const [csvParsingError, setCsvParsingError] = useState('');
    const [invalidCSVFormat, setInvalidCSVFormat] = useState('');
    const [mergedCellsDetected, setMergedCellsDetected] = useState('');
    const [successupload, setsuccessupload] = useState('');

    const handleFile = async (event) => {
        const file = event.target.files[0];
        console.log(file, 'FILE');
        try {
            const result = await new Promise((resolve, reject) => {
                papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    error: reject,
                    complete: resolve,
                });
            });
            console.log(result, 'RESULT');
            if (result.errors.length > 0) {
                console.error('CSV parsing error:', result.errors);
                setCsvParsingError('CSV parsing error');
                return; 
            }
    
            const isValid = validateCSV(result.data);
    
            if (!isValid) {
                console.error('Invalid CSV format.');
                setInvalidCSVFormat('Invalid CSV format');
                return; 
            }
    
            setData(result.data);
            console.log(JSON.stringify(result.data) , 'csvdata');
            const firstDataRow = result.data[0];
            if (firstDataRow) {
                setColumn(Object.keys(firstDataRow));
                setValues(result.data.map((d) => Object.values(d)));
            }

            const formData = new FormData();
            formData.append('data', JSON.stringify(result.data));
            formData.append('gid', groupId);
            formData.append('uid', myValue.userId);

            const response = await fetch(`${baseurl}/uploadcsvfile`, {
                method: 'POST',
                body: formData,
            });
           
            if(response.ok){
                console.log('CSV data uploaded successfully!');
                setsuccessupload('CSV data uploaded successfully!');
                setaddScheduleEnabled(true);
            }else{
                console.log('Failed to upload CSV data.');
                setsuccessupload('Failed to upload CSV data.');
                console.log(response , 'csvresponse');
            }
        }catch(error) {
            console.log(error);
        }
    };
    console.log(data , 'RESULTDATA');
    // const validateCSV = (csvData) => {
    //     const phoneNumbers = new Set();
    //     // Check for merged cells (simplified example)
    //     for (const row of csvData) {
    //         for (const value of Object.values(row)) {
    //             if (value === '') {
    //                 console.error('Merged cell detected. CSV has empty cells.');
    //                 alert('Merged cell detected. CSV has empty cells.')
    //                 return false;
    //             }
    //         }

    //         //check dublicates
    //            // Assuming "contact" is the column containing phone numbers
    //     const phoneNumber = row['contact'];
    //     console.log(phoneNumber,'phoneNumber');
    //     if (phoneNumber && phoneNumber.has(phoneNumber)) {
    //         console.error('Duplicate phone number detected:', phoneNumber);
    //         alert('Duplicate phone number detected: ' + phoneNumber);
    //         return false;
    //     }

    //     if (phoneNumber) {
    //         phoneNumber.add(phoneNumber); // Add the phone number to the set
    //     }
    //     }

    //     // Check for proper format (simplified example)
    //     const firstDataRow = csvData[0];
    //     if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
    //         console.error('CSV does not have the expected format.');
    //         return false;
    //     }

    //     return true; // Validation passed
    // };

    const validateCSV = (csvData) => {
        const phoneNumbers = new Set();
        
        // Check for merged cells (simplified example)
        for (const row of csvData) {
            for (const value of Object.values(row)) {
                if (value === '') {
                    console.error('Merged cell detected. CSV has empty cells.');
                    alert('Merged cell detected. CSV has empty cells.');
                    return false;
                }
            }
    
            // Check for duplicates
            // Assuming "contact" is the column containing phone numbers
            const phoneNumber = row['contact'];
            console.log(phoneNumber, 'phoneNumber');
            if (phoneNumber && phoneNumbers.has(phoneNumber)) {
                console.error('Duplicate phone number detected:', phoneNumber);
                alert('Duplicate phone number detected');
                return false;
            }
    
            if (phoneNumber) {
                phoneNumbers.add(phoneNumber); // Add the phone number to the set
            }
        }
    
        // Check for proper format (simplified example)
        const firstDataRow = csvData[0];
        if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
            console.error('CSV does not have the expected format.');
            return false;
        }
    
        return true; // Validation passed
    };
    
    //download csv template
    const downloadTemplate = () => {
        const csvHeader = ['name', 'contact', 'location', 'state', 'designation' /* Add other headers here */];
        const csvRows = [];

        const csvContent = [csvHeader, ...csvRows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'template.csv';
        link.click();

        URL.revokeObjectURL(url);
    };

    //////////////////////
    //actual
    // const [data, setData] = useState([]);
    // const [columnArray, setColumn] = useState([]);
    // const [valueArray, setValues] = useState([]);
    // const handleFile = (event) => {
    //     const file = event.target.files[0];
    //     papa.parse(file, {
    //         header: true,
    //         skipEmptyLines: true,
    //         complete: async (result) => {
    //                     result.data.map((d) => {
    //                     columnArray.push(Object.keys(d));
    //                     valueArray.push(Object.values(d));
    //                     });
    //             setData(result.data);
    //             setColumn(columnArray[0]);
    //             setValues(valueArray);
    //             const formData = new FormData();
    //             formData.append('data', JSON.stringify(result.data));
    //             formData.append('gid' , groupId); //group id
    //             formData.append('uid' , myValue.userId); //group id
    //             console.log(result , 'result csv');
    //             // console.log(groupId , 'groupid---srinivas');
    //             // console.log(myValue.userId , 'Userid------srinivas');
    //              try {
    //                 const response = await fetch(`${baseurl}/uploadcsvfile`, {
    //                   method: 'POST',

    //                   body: formData,
    //                 });
    //                 console.log(response.text() , 'response========================');
    //                 if (response.ok) {
    //                   console.log(data,'CSV data uploaded successfully!');
    //                 } else {
    //                   console.error('Failed to upload CSV data.');
    //                 }
    //               } catch (error) {
    //                 console.error(error);
    //               }              
    //         }
    //     })
    // }

    return (
        <div>
            <div className="NavTabs">
                <Tabs
                    defaultActiveKey="CreateGroup"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="CreateGroup" title="Create Group">
                        <div className="creategroups">
                            {
                                next === 1 && (
                                    <section >
                                        <div className=''>
                                            <form  >
                                                <div className="">
                                                    <div className='mb-3'>
                                                        {/*<input type="file" className='form-control' />*/}
                                                    </div>
                                                    <div className='mb-3'>
                                                        <input value={groupname} type="text" className='form-control' placeholder='Enter Your GroupName' onChange={changeGroupName} />
                                                        <span className="error">{error}</span>
                                                    </div>

                                                    {showSuccessPopup && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                                        <strong style={{ color: "#000" }}>{groupmsg}</strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>}

                                                    <button onClick={()=>{onSubmitCreateGroup()}} type='button' className='btn btn-primary'>Create Group</button>

                                                </div>
                                            </form>

                                        </div>
                                    </section>
                                )
                            }

                            {
                                next === 2 && (
                                    <section >
                                        <div className=''>
                                            <h4>The Next Step Form, If it is!!!</h4>
                                        </div>
                                    </section>
                                )
                            }

                            {
                                next === 3 && (
                                    <section>
                                        <div className=''>
                                            <h4>The Last Step Form, Click Submit Now</h4>
                                        </div>


                                    </section>
                                )
                            }

                        </div>
                        <div className="d-flex">


                            {/* <div className='mx-3'>
                            <button onClick={CompleteFormBackStep} className="btn btn-primary">Back</button>
                        </div> */}

                            {/* <div>
                            <button onClick={CompleteFormStep} className="btn btn-primary">Next</button>
                        </div>*/}
                            <div>
                                {/* {SubmitRenderButton()} */}
                            </div>
                        </div>

                    </Tab>
                    <Tab eventKey="AdMembers" title="Add Members" disabled={addMembersEnabled == true ? false : true}>
                        <div>
                            <ul className="nav nav-tabs" id="myTab">
                                <li className="nav-item">
                                    <NavLink href="#phonecontact" className="nav-link active" data-bs-toggle="tab">Phone Contacts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href="#addcontact" className="nav-link" data-bs-toggle="tab">Add Contacts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink href="#uploadcsv" className="nav-link" data-bs-toggle="tab">Upload CSV</NavLink>
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
                                            </div> </CallerListDiv> */}
                                            {/* <CallerListDiv> <div className="caller d-flex">
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
                                            <form action="">
                                                <div className="">
                                                    {/*<div className='mb-3'>
                                                        <input type="file" className='form-control' />
                                        </div>*/}
                                                    <div className='mb-3'>
                                                        <input onChange={changeContactName} value={contactName} type="text" className='form-control' placeholder='*Enter Your Name' />
                                                        <span className="error">{contactError}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div className='mb-3'>
                                                            <input onChange={changeContactPhone} value={contactPhone} type="number" className='form-control' placeholder='*Enter Contact Number' />
                                                            <span className="error">{phoneError}</span>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <input onChange={changeDesignation} value={designation} type="text" className='form-control' placeholder='*Enter Designation' />
                                                            <span className="error">{desigError}</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div className='mb-3'>
                                                            <input onChange={changeLocation} value={location} type="text" className='form-control' placeholder='*Enter Location' />
                                                            <span className="error">{locationError}</span>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <input onChange={changeState} value={state} type="text" className='form-control' placeholder='*Enter State' />
                                                            <span className="error">{stateError}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                                {contactmsg && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                                    <strong style={{ color: "#000" }}>{contactmsg}</strong>
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                <div className="">
                                                    <input type="submit" value="AddContact" className='btn btn-primary' onClick={submitContact} />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/* UPLOAD CSV */}
                                <div className="tab-pane fade" id="uploadcsv">
                                    <div className="addcobtact">
                                        <div className='mt-3'>
                                            <form action="" >
                                                <div className='mb-3'>
                                                    <input type="file" name='files' className='form-control' accept='.csv' onChange={handleFile} />
                                                    <div style={{ marginTop: 10 }} ><span>Download file Template</span><FaFileDownload onClick={downloadTemplate} style={{ fontSize: 18 }} /></div>
                                                </div>
                                                {successupload && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                                                    <strong style={{ color: "#000" }}>{successupload}</strong>
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                {csvParsingError && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                    <strong style={{ color: "#000" }}>{csvParsingError}</strong>
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                {invalidCSVFormat && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                    <strong style={{ color: "#000" }}>{invalidCSVFormat}</strong>
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                {mergedCellsDetected && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                                    <strong style={{ color: "#000" }}>{mergedCellsDetected}</strong>
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>}
                                                {msg}
                                                {/* <div className="">
                                                    <input type="submit"  value="Upload" className='btn btn-primary' />
                                                </div> */}
                                            </form>
                                        </div>
                                        <div>
                                            {/*

                                                <table class="table">
                                                    <thead>
                                                        <tr>
                                                            {columnArray.map((col, i) => (
                                                                <th key={i}>{col}</th>
                                                            ))}
                                                        </tr>


                                                    </thead>
                                                    <tbody>
                                                        {valueArray.map((v, i) => (
                                                            <tr key={i}>
                                                                {v.map((valueArray, i) => (
                                                                    <td scope="col" key={i}>{valueArray}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>

                                                                */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Tab>
                    {/****************************** */}
                    <Tab eventKey="Schedules" title="Schedules" disabled={addScheduleEnabled == true ? false : true}>
                        <div>
                            <ul className="nav nav-tabs" id="myTab">
                                <li className="nav-item">
                                    <NavLink href="#schedules" className="nav-link active" data-bs-toggle="tab">Add Schedules</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink href="#groupsettings" className="nav-link" data-bs-toggle="tab">Group Settings</NavLink>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="schedules ">
                                    <div className="my-3">
                                        <div className="scheduletime mb-3">
                                            <label htmlFor="">Schedule Date and Time</label>
                                            <input type="datetime-local" className='form-control' onChange={onChangescheduling} value={scheduling} />
                                        </div>
                                        <label htmlFor="">Add Agenda Of conference</label>
                                        <div className="agenda mb-3">

                                            <textarea name="" id="" cols="32" rows="4" className='form-control' onChange={getAgenda} value={agendainfo} required >

                                            </textarea>
                                        </div>
                                        <div>
                                            <button onClick={savetheschedule} className='btn btn-success'>Save</button>
                                        </div>
                                        {scheduleinfomesage && <div class="alert alert-primary alert-dismissible fade show mt-3" role="alert">
                                            <strong style={{ color: "#000" }}>{scheduleinfomesage}, Group call will be initiated at saved scheduled.</strong>
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="groupsettings">
                                    <div className="settings">
                                        <div className="row">
                                            {/* <div className="col">
                                                <div className='d-flex justify-content-between'>
                                                    <div className=''>
                                                        <h6>Dial in Only</h6>
                                                        <span style={{ opacity: 0.5 }}>Auto Will Be Stopped and Members can dial in</span>
                                                    </div>
                                                    <div className="togle">
                                                        <span><i className="fa fa-toggle-off"></i></span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <hr />
                                        {/* <div className="row mt-3">
                                            <div className="col">
                                                <div className='d-flex justify-content-between'>
                                                    <div className=''>
                                                        <h6>All Non Members</h6>
                                                        <span style={{ opacity: 0.5 }}>Members who are not added to the group can also dial in using a PIN</span>
                                                    </div>
                                                    <div className="togle">
                                                        <span><i className="fa fa-toggle-off"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <hr /> */}
                                        <div className="row mt-3">
                                            <div className="col">
                                                <div className='d-flex justify-content-between'>
                                                    <div className=''>
                                                        <h6>Mute Dial</h6>
                                                        <span style={{ opacity: 0.5 }}>All Members Will be Joined the conference in mute mode</span>
                                                    </div>
                                                    <div className="togle">
                                                        <span><i className="fa fa-toggle-off"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-2'>
                                            <button className='btn btn-success'>Save</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default NavTabs
