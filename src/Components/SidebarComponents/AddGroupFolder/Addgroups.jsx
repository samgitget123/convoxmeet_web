import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import Adddashboardpop from "../Adddashboardpop";
import SuccessView from "./AddDashboardFolder/SuccessView";
import { MdGroups, MdDelete } from "react-icons/md";
import MyContext from "../../MyContext";
import { IoCallSharp, IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import papa from 'papaparse';
import { FaFileDownload } from 'react-icons/fa';
import { BsFillMicFill, BsFillMicMuteFill, BsFillCalendar2PlusFill, } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";
import { MyServerContext } from "../../Contexts/SeverContexts";
import { Functioncontexts } from "../../Contexts/Functioncontexts";

//stylecomponents
const Addgroupdiv = styled.div`
  margin: 0px 0px;
  padding: 0px 0px;
  border-bottom: 0.25px solid #f8f9fa;
  width: 330px;
  
`;

const Addgrouplistdiv = styled.div`
  background-color: #192a53;
  color: #fff;
  width: 330px;
  height: 100vh;
`;

const ContentDisplay = styled.div`
width: "calc(100% - 330px - 82px);
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
};

const TopHeaderForContentBlock = {
  height: "64px",
  width: "100%",
  backgroundColor: "#fff",
  opacity: "1",
  display: "flex",
  flexdirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "25px",
};

const Addgroups = () => {
  const { baseurl } = useContext(MyServerContext);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupChangeModal, setGroupechangemodal] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [showForAdding, setShowForAdding] = useState(false);
  const [showForSchedule, setshowForSchedule] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");

  const [state, setState] = useState("");
  const [stateError, setStateError] = useState("");

  const [designation, setDesignation] = useState("");
  const [desigError, setDesigError] = useState("");

  const [agenda, setAgenda] = useState("");
  const [scheduleDate, setScheduleData] = useState("");
  //adding the input after click the edit schedule
  const [showInput, setShowInput] = useState(true);
  const [editDateValue, setEditDateValue] = useState("");
  const [editAgendaValue, setAgendaValue] = useState("");


  const [activeTab, setActiveTab] = useState("");
  const [apiStatus, setApiStatus] = useState(0);

  const [contactError, setContactError] = useState("");
  const [contactmsg, setContactmsg] = useState("");
  const [addinconf, setAddinconf] = useState("");
  const [phoneError, setPhoneError] = useState("");
  //const [callercount, setCallercount] = useState([]);
  const [noconf, setConf] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  //schedule
  const [agendainfo, setAgendainfo] = useState("");
  const [scheduling, setScheduling] = useState("");
  const [scheduleinfomesage, setScheduleinfomessage] = useState("");
  const [dateError, setDateError] = useState("");
  const [agendaError, setAgendaError] = useState("");
  const [confuniqueid, setconfuniqueid] = useState("");
  const [withAdmin, setWithAdmin] = useState(false);
  //exclude
  const [excludeadmin , setExcludeAdmin] = useState(null);
  // const [liveArray, setLiveArray] = useState(() => {
  //   const storedLive = localStorage.getItem("liveArray");
  //   return storedLive ? JSON.parse(storedLive) : "";
  // });
  const [liveArray, setLiveArray] = useState([]);
  const [showSchedule, setShowSchedule] = useState(true);
  //change group name
  const [changeGroupname, setChangegroupname] = useState(false);

  //const [liveData, setLiveData] = useState([]);
  const [ismutecall, setIsmutecall] = useState(""); // It is taken from live data, is mute call
  //const [scheduleGroupId, setScheduleGroupId] = useState("");
  //context menus
  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  // const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [valueArray, setValues] = useState([]);
  //warnings
  const [csvParsingError, setCsvParsingError] = useState('');
  const [invalidCSVFormat, setInvalidCSVFormat] = useState('');
  const [mergedCellsDetected, setMergedCellsDetected] = useState('');
  const [successupload, setsuccessupload] = useState('');
  //handlefile mesages
  const [message, setMessage] = useState(null);
  const [handlefileError, setHandlefileerror] = useState(null);
  const [numbers, setNumbers] = useState([]); //for single caller validation
  const handleFile = async (event) => {
    try {
      const file = event.target.files[0];
  
  
      // Check if a file is selected
      if (!file) {
        console.error('No file selected.');
        setMessage('No file selected.');
        return;
      }
  
      // Check if the selected file is a CSV file
      if (!file.type || !file.type.includes('csv')) {
        console.error('Invalid file type. Please upload a CSV file.');
        setMessage('Invalid file type. Please upload a CSV file.');
        return;
      }
  
      // Fetch existing contacts
      const existingContacts = (await getExistingcontacts(groupId)) || [];
  
  
      const result = await new Promise((resolve, reject) => {
        papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          error: reject,
          complete: resolve,
        });
      });
      
  
      if (result.errors.length > 0) {
        console.error('CSV parsing error:', result.errors);
        setMessage('CSV parsing error');
        return;
      }
  
      const isValid = validateCSV(result.data);
  
      if (!isValid) {
        console.error('Invalid CSV format.');
        setMessage('Invalid CSV format');
        return;
      }
  
      // Check for duplicates within the uploaded CSV
      const encounteredPhoneNumbers = new Set();
      result.data = result.data.filter((row) => {
        const phoneNumber = row['contact'];
        if (encounteredPhoneNumbers.has(phoneNumber)) {
          return false; // Duplicate, skip this row
        }
        encounteredPhoneNumbers.add(phoneNumber);
        return true;
      });
  
      // Check for duplicates between CSV and existing contacts
      const existingPhoneNumbers = existingContacts.map((contact) => contact.phone_number);
      const duplicateWithExisting = result.data.filter((row) => existingPhoneNumbers.includes(row.contact));
  
      if (duplicateWithExisting.length > 0) {
        console.warn('Duplicate phone numbers with existing contacts:', duplicateWithExisting);
        setMessage('Duplicate phone numbers detected with existing contacts. Removing duplicates.');
        // Filter out duplicate rows from the CSV data, keeping the first occurrence
        result.data = result.data.filter((row) => !duplicateWithExisting.some((existingRow) => existingRow.contact === row.contact));
      }
  
      setData(result.data);
      const firstDataRow = result.data[0];
      if (firstDataRow) {
        setColumn(Object.keys(firstDataRow));
        setValues(result.data.map((d) => Object.values(d)));
      }
  
      // Ensure result.data is an array and is not empty before proceeding
      if (!Array.isArray(result.data) || result.data.length === 0) {
        console.error('No valid data remaining after duplicate removal.');
        setHandlefileerror('No valid data remaining after duplicate removal.');
        return;
      }
  
      const formData = new FormData();
      formData.append('data', JSON.stringify(result.data));
      formData.append('gid', groupId);
      formData.append('uid', myValue.userId);
  
      const response = await fetch(`${baseurl}/uploadcsvfile`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
      
        setMessage('CSV data uploaded successfully!');
      } else {
        console.error('Failed to upload CSV data.');
        setHandlefileerror('Failed to upload CSV data.');
       
      }
    } catch (error) {
      console.error(error);
      setHandlefileerror(error.message);
    }
  };
  
  ///CHECK EXISTING CONTACTS/////
  const getExistingcontacts = async (groupId) => {
    try {
      const url = `${baseurl}/viewgroupM?phone=${myValue.userMobile}&gid=${groupId}`;
    
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const existContacts = jsonres.messages.success;
   
      return existContacts;
    } catch (error) {
      console.log(error);
    }
  };
  ////////////FIND DUPLICATES////////////
  // Function to find duplicates in an array based on a specified key
  function findDuplicates(array, key) {
    const values = new Set();
    const duplicates = [];

    for (const item of array) {
      const value = item[key];
      if (values.has(value)) {
        duplicates.push(item);
      } else {
        values.add(value);
      }
    }

    return duplicates;
  }

  const validateCSV = (csvData) => {
    const phoneNumbers = new Set();
    // Check for merged cells (simplified example)
    for (const row of csvData) {
      for (const value of Object.values(row)) {
        if (value === '') {
          console.error('Merged cell detected. CSV has empty cells.');
          setMessage('Merged cell detected. CSV has empty cells.');
          return false;
        }
      }

      // Check for duplicates
      // Assuming "contact" is the column containing phone numbers
      const phoneNumber = row['contact'];
   
      if (phoneNumber && phoneNumbers.has(phoneNumber)) {
        console.error('Duplicate phone number detected:', phoneNumber);
        setMessage('Duplicate phone number detected');

      }

      if (phoneNumber) {
        phoneNumbers.add(phoneNumber); // Add the phone number to the set
      }
    }

    // Check for proper format (simplified example)
    const firstDataRow = csvData[0];
    if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
      console.error('CSV does not have the expected format.');
      setHandlefileerror('CSV does not have the expected format.')

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
  const fetchNumbers = async () => {
    try {
      const url = `${baseurl}/viewgroupM?phone=${myValue.userMobile}&gid=${groupId}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      if (jsonres.status === 201) {
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.success;
          setNumbers(usersresult); //masterdata
        
      } else {
        
        setNumbers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNumbers();
  }, [numbers]); //viewCallersdata
  // const handleFile = async (event) => {
  //   const file = event.target.files[0];
  //   try {
  //     const result = await new Promise((resolve, reject) => {
  //       papa.parse(file, {
  //         header: true,
  //         skipEmptyLines: true,
  //         error: reject,
  //         complete: resolve,
  //       });
  //     });

  //     if (result.errors.length > 0) {
  //       console.error('CSV parsing error:', result.errors);
  //       setCsvParsingError('CSV parsing error');
  //       return;
  //     }

  //     const isValid = validateCSV(result.data);

  //     if (!isValid) {
  //       console.error('Invalid CSV format.');
  //       setInvalidCSVFormat('Invalid CSV format');
  //       return;
  //     }

  //     setData(result.data);

  //     const firstDataRow = result.data[0];
  //     if (firstDataRow) {
  //       setColumn(Object.keys(firstDataRow));
  //       setValues(result.data.map((d) => Object.values(d)));
  //     }

  //     const formData = new FormData();
  //     formData.append('data', JSON.stringify(result.data));
  //     formData.append('gid', groupId);
  //     formData.append('uid', myValue.userId);

  //     const response = await fetch(`${baseurl}/uploadcsvfile`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       setsuccessupload('Data Uploaded Successfully!')
  //     } else {
  //       console.error('Failed to upload CSV data.');
  //       setsuccessupload('Failed to upload  data.')
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const validateCSV = (csvData) => {
  //   // Check for merged cells (simplified example)
  //   for (const row of csvData) {
  //     for (const value of Object.values(row)) {
  //       if (value === '') {
  //         console.error('Merged cell detected. CSV has empty cells.');
  //         alert('Merged cell detected. CSV has empty cells.')
  //         return false;
  //       }
  //     }
  //   }

  //   // Check for proper format (simplified example)
  //   const firstDataRow = csvData[0];
  //   if (!firstDataRow || Object.keys(firstDataRow).length === 0) {
  //     console.error('CSV does not have the expected format.');
  //     return false;
  //   }

  //   return true; // Validation passed
  // };


  // //download csv template
  // const downloadTemplate = () => {
  //   const csvHeader = ['name', 'contact', 'location', 'state', 'designation' /* Add other headers here */];
  //   const csvRows = [];

  //   const csvContent = [csvHeader, ...csvRows].map(row => row.join(',')).join('\n');
  //   const blob = new Blob([csvContent], { type: 'text/csv' });
  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'template.csv';
  //   link.click();

  //   URL.revokeObjectURL(url);
  // };
  //////////////////////

  const handleEditValue = (e) => {
    setEditDateValue(e.target.value)
  }

  const handleAgendaValue = (e) => {
    setAgendaValue(e.target.value)
  }


  const updateSchedule = async () => {
    const url = `${baseurl}/Updatechedules?mobile=${myValue.userMobile}&agenda=${editAgendaValue}&gid=${groupId}&status=NEW&newscheduledate=${editDateValue}`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      setEditDateValue("");
      setAgendaValue("");
      setShowInput(!showInput);
    } catch (error) {
      console.log(error);
    }

  }


  //IT WILL SET GROUP ID
  const handleGroupId = (id) => {
    setGroupId(id);
  }
  const deleteSchedule = async () => {
    const url = `${baseurl}/Deleteschedules?mobile=${myValue.userMobile}&gid=${groupId}&status=NEW`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      setAgenda("");
    } catch (error) {
      console.log(error);
    }

  }

  const editSchedule = async () => {
    setShowInput(!showInput);
  }


  useEffect(() => {
    if (contactmsg != "") {
      const timeout = setTimeout(() => {
        setContactmsg("");
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [contactmsg]);
  useEffect(() => {
    if (addinconf != "") {
      const timeout = setTimeout(() => {
        setAddinconf("");
      }, 1500);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [addinconf]);
  //live variable storing in the local storage //
  const [live, setLive] = useState(() => {
    const storedLive = localStorage.getItem("live");
    return storedLive ? JSON.parse(storedLive) : "";
  });
  //call update timer
  const [timer, setTimer] = useState(0);

  const [msg, setMsg] = useState("");

  const [groupmuteToggle, setGroupMute] = useState(true);  //for make call toggle used
  const [groupunmuteToggle, setGroupunMute] = useState(true);  //for mute call toggle used
  const noConfclose = () => {
    setConf(false);
  };
  const currentPath = window.location.pathname;
  const viewCallerPage = currentPath.includes("/viewcallers"); //accessing the path of the window //
  const callingPage = currentPath.includes("/calling"); //accessing the path of the window //
  const settingGroupId = (id, uniqueid) => {
    setGroupId(id);
    setUniqueId(uniqueid);
  };

  //adding groupId when click on LIVE TeXt
  useEffect(() => {
    livestatus(); //itstatus will check the live 
  },[liveArray])
  const livestatus = async () => {
    try {
      const liveurl = `${baseurl}/conferenceLivestatuspijatel.in/convoxmeet/api/?status=RUNNING&uid=${myValue.userId}`;
      const response = await fetch(liveurl);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      if (jsonres.messages && jsonres.messages.status && jsonres.messages.status.length > 0) {
        const livestatusids = jsonres.messages.status.map(status => status.group_id);
        if (livestatusids.length === 0) {
          setLiveArray([]);
        }
     
        setLiveArray(livestatusids);
      } else {
        setLiveArray([]);
      
      }
    } catch (error) {
      console.log(error)
    }
  }
 

  //calling button called //
  const handleGroupCalls = (groupId) => {
    setShowModal(!showModal);
    setGroupId(groupId);
  };

  const handleGroupchange = (groupId, groupname) => {
    setGroupechangemodal(!groupChangeModal);
    setGroupId(groupId);
    setGroupName(groupname);

  }

  const showmodalHandle = (value) => {
    setShowModal(value);
  };

  // Accessing the mobile throgh useContext //
  const myValue = useContext(MyContext);
  // const filteredData =
  //   data.length > 0
  //     ? data.filter((val) =>
  //       val.group_name.toLowerCase().includes(search.toLowerCase())
  //     )
  //     : [];
  const filteredData =
    data && data.length > 0
      ? data.filter((val) => val.group_name && val.group_name.toLowerCase().includes(search.toLowerCase()))
      : [];

  // const filteredData = data.length > 0 ? data.filter((val) => val.group_name.toLowerCase().includes(search.toLowerCase())) : [];
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };;




  
  const updateTimer = async () => {
    try {
      const url = `${baseurl}/calldurationtime?gid=${groupId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const jsonres = await response.json();
      const usersmessage = jsonres.messages;
      const usersresult = usersmessage.Groupcallduration.map((timer) => timer.conf_duration);
      setTimer(usersresult);
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user or retry the request.
    }
  };

  useEffect(() => {
    updateTimer();
  }, [timer, groupId]);

  // useEffect(() => {
  //   const storedTimers = JSON.parse(localStorage.getItem('timers')) || {};
  //   setTimer(storedTimers);
  // }, []);

  //passing mobile to the api, which accessed from useContext //
  // const fetchdata = async () => {
  //   const url = `${baseurl}/viewusergroups?mobile=${myValue.userMobile}`;
  //   try {
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //     if (jsonres.status === 201) {
  //       const usersmessage = jsonres.messages;
  //       const usersresult = usersmessage.success;
  //       setData(usersresult); //masterdata
  //       setApiStatus(1);
  //     } else {
  //       setData([]);
  //       setApiStatus(2);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchdata = async () => {
    const url = `${baseurl}/viewusergroups?mobile=${myValue.userMobile}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonres = await response.json();
      if (jsonres.status === 201) {
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.success;
        setData(usersresult); // masterdata
        setApiStatus(1);
      } else {
        setData([]);
        setApiStatus(2);
      }
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user or retry the request.
    }
  };
  useEffect(() => {
    // localStorage.setItem('timers', JSON.stringify(timer));
    fetchdata();
  }, [data]);
  const checking = () => {
    data.forEach((eachOne) => {
      if (eachOne.group_id === groupId) {
        setLive(eachOne.group_id);
        //liveArray.push(eachOne.group_id);
        setLiveArray([...liveArray, eachOne.group_id]);
      } else {
        setLive("");
      }
    });
  };

  const makingCall = async () => {
    try {
      const adminflag = withAdmin == true ? 1 : '';
      const url = `${baseurl}/groupcall?group_id=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&mute=&ismute=0&handrise=0&conf_id=${uniqueId}&isadmininclude=${adminflag}`;
      console.log(url, 'groupcallurl')
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const getConfUniqueId = await jsonres.messages.success.conf_unique_id;
      setconfuniqueid(getConfUniqueId);
      checking();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }

  };

  const ModalToggle = () => {
    setShowModal(!showModal);
    // setWithAdmin(!withAdmin);
  };
  const CloseGroupnameToggle = () => {
    setGroupechangemodal(!groupChangeModal);
    setsuccessupload("");
  }

  const handleMute = () => {
    mute();
    checking();
    setShowModal(!showModal);
  };

  //group name setting top //
  const callerHeader = (value) => {
    setGroupName(value);
  };

  const mute = async () => {
    try {
      const adminflag = withAdmin ? 1 : '';
      const url = `${baseurl}/groupcall?group_id=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&mute=1&ismute=1&handrise=0conf_id=${uniqueId}&isadmininclude=${adminflag}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const getConfUniqueId = await jsonres.messages.success.conf_unique_id;
      setconfuniqueid(getConfUniqueId);
      checking();
      setShowModal(!showModal);
    } catch (error) {
      console.log(error);
    }
  };

  //hangup the group call //
  const localRemoveItems = async () => {
    // localStorage.removeItem("liveArray");
    // setLiveArray(liveArray.filter(el => el !== groupId));
    const confirmResult = window.confirm('Are you sure you want to close the conference?');
    if (confirmResult) {
      // localStorage.removeItem("liveArray");
      setLiveArray(liveArray.filter(el => el !== groupId));
    }
  }
  const handleClosingCall = async () => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to Discoonect all Members?");
      if (isConfirmed) {
        await closeGroupCall(confuniqueid);
        setTimer("");
        setWithAdmin(false);
        alert('All calls have been Hanged up');
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const closeGroupCall = async (confuniqueid) => {
    const url = `${baseurl}/grouppartyend?groupid=${groupId}&cuid=${confuniqueid}`;
    console.log(url , 'hangupall');
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = await JSON.parse(JSON.stringify(usersjson));
      if (jsonres) {
        setLiveArray(liveArray.filter(el => el !== groupId));
      }
      setTimer("");
      setWithAdmin(!withAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  //mute all calls//
  const muteAll = async () => {
    setGroupMute(!groupmuteToggle); // Toggle between true and false
  };
  const handleMuteAll = async () => {
    //const groupMuteState = ismutecall === 1 ? (groupmuteToggle ? "Mute" : "Unmute") : (groupmuteToggle ? "Unmute" : "Mute");
    const groupMuteState = groupmuteToggle == true ? "mute" : "unmute";
    try {
      await muteAll();
      const url = `${baseurl}/muteall?gid=${groupId}&MUTE=${groupMuteState}&usermobile=${myValue.userMobile}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  };

  const unmuteAll = async () => {
    setGroupunMute(!groupunmuteToggle); // Toggle between true and false
  };
  const handleMuteformutecall = async () => {
    const groupMuteState = groupunmuteToggle == false ? "unmute" : "mute";
    try {
      await unmuteAll();
      const url = `${baseurl}/Groupmuteformutecall?gid=${groupId}&MUTE=${groupMuteState}&usermobile=${myValue.userMobile}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
    } catch (error) {
      console.log(error);
    }
  }


  //adding new contact/ new number to the specific group //

  const addContact = () => {
    setShowForAdding(!showForAdding);
    setContactError("");
    setNameError("");
    setMobile("");
    setLocation("");
    setHandlefileerror(null);
    setMessage(null);
    // setsuccessupload("");
    // setInvalidCSVFormat("");
    // setCsvParsingError("");

  };

  const addSchedule = () => {
    setshowForSchedule(!showForSchedule);
    setAgendaError('');
    setDateError('');
    setAgendainfo('');
    setScheduleinfomessage('');
  };

  //submitting the new input name and mobile //

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Contact Name is Required");
    } else if (mobile === "") {
      setNameError("");
      setContactError("Contact Number is Required");
    } else if (designation === "") {
      setContactError("");
      setDesigError("Designation Required");

    } else if (location === "") {
      setDesigError("");
      setLocationError("Location Required");
    } else if (state === "") {
      setLocationError("");
      setStateError("State is Required");
    } else if (mobile.length <= 0) {
      setPhoneError("Please Enter Valid Phone Number");
      setStateError("");

    } else {
      try {
        // const url = `${baseurl}/addintoconf?gid=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&contactnumber=${mobile}&name=${name}&mute=0&handrise=0`;
        const url = `${baseurl}/addintoconf?gid=${groupId}&user_id=${myValue.userId}&usermobile=${myValue.userMobile}&contactnumber=${mobile}&name=${name}&mute=0&handrise=0&location=${location}&state=${state}&desig=${designation}&cuid=${confuniqueid}`;
        //  ${baseurl}/addintoconf?gid=1&user_id=1&usermobile=9848851443&contactnumber=8790023271&name=cnu&mute=0&handrise=0&location=hyderabad&state=telanagana&desig=engineer
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        const Messagereturn = jsonres.messages.success;
        // const Messagereturnfail = jsonres.messages.fail;
        if (Messagereturn) {
          setAddinconf(Messagereturn);
        }
        // if(Messagereturnfail){
        //     setContactmsg(Messagereturnfail);
        // }
      } catch (error) {
        console.log(error);
      }

      setContactError("");
      setPhoneError("");
      setName("");
      setMobile("");
      setLocation("");
      setDesignation("");
      setState("");
    }

    // addContact();

  };

  const addingContactForGroup = async (e) => {

    e.preventDefault();
    if (name === "") {
      setNameError("Contact Name is Required");
    } else if (mobile === "") {
      setNameError("");
      setPhoneError("Contact Number is Required");
    } else if (designation === "") {
      setPhoneError("");
      setDesigError("Designation Required");

    } else if (location === "") {
      setDesigError("");
      setLocationError("Location Required");
    } else if (state == "") {
      setLocationError("");
      setStateError("State is Required");
    } else if (mobile.length <= 0) {
      setPhoneError("Please Enter Valid Phone Number");
    } else {
      try {
        const url = `${baseurl}/addgroupM?mobile=${myValue.userMobile}&gid=${groupId}&phone=${mobile}&name=${name}&conf_id=${uniqueId}&location=${location}&state=${state}&desig=${designation}`;

        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        const Messagereturn = jsonres.messages.success;
        const Messagereturnfail = jsonres.messages.fail;
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
      setName("");
      setMobile("");
      setLocation("");
      setState("");
      setDesignation("");
    }

    //addContact();


  };


  const handleName = (e) => {
    setName(e.target.value);
  };

  const changeName = (e) => {
    setGroupName(e.target.value);
  }

  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };


  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };




  const handleMobile = (e) => {
    const input = e.target.value;
    const numericInput = input?.replace(/\D/g, ""); // Remove non-digit characters
    const trimmedInput = numericInput?.slice(0, 10); // Limit to 10 digits
    setMobile(trimmedInput);
  };

  const handleTabClick = (index) => {
    setActiveTab(index === activeTab ? "" : index);
  };

  const deleteGroupContacts = async (groupId) => {
    const confirmation = window.confirm('Are you sure you want to delete Group Contacts?');
    if (!confirmation) {
      // The user clicked 'Cancel' in the confirmation dialog
      return;
    }
    try {
      const url = `${baseurl}/deletegroupcontacts?gid=${groupId}&mobile=${myValue.userMobile}`;
      const response = await fetch(url);
      const usersjson = await response.json();
      const failurecase = usersjson.messages.fail;
      if (failurecase) {
        alert('No contact is available to delete')
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete group
  // const fetchViewCallers = async () => {
  //   try {
  //     const url = `https://convoxmeet.deepijatel.in/convoxmeet/api/viewgroupM?phone=${myValue.userMobile}&gid=${groupId}`;
  //     console.log(url , 'viewcallers');
  //     const response = await fetch(url);
  //     const usersjson = await response.json();
  //     const jsonres = JSON.parse(JSON.stringify(usersjson));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const deleteGroup = async (groupId) => {
    //${baseurl}/deletegroup?gid=1&mobile=9848851443
    if (!groupId) {
      return alert('No group for deletion')
    } else {
      const confirmation = window.confirm('Are you sure you want to delete Group?');

      if (!confirmation) {
        // The user clicked 'Cancel' in the confirmation dialog
        return;
      }
      try {
        const url = `${baseurl}/deletegroup?gid=${groupId}&mobile=${myValue.userMobile}`;
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const scheduleArray = data.length > 0 ? data.map(item => item.group_id) : [];


  //live call dashboard json getting //

  useEffect(() => {
    fetchLiveData(scheduleArray);
  }, [live]);


  const fetchLiveData = async (scheduleArray) => {
    // const baseUrl = 'https://convoxmeet.deepijatel.in/convoxmeet/api/';
    // Or use quickcall endpoint: const baseUrl = '${baseurl}/livequickcalldata';
    try {
      for (const scheduleId of scheduleArray) {
        const url = `${baseurl}/livecalldata?groupid=${scheduleId}&mobile=${myValue.userMobile}&uid=${myValue.userId}`;
        const response = await fetch(url);
        const usersJson = await response.json();
        const jsonRes = JSON.parse(JSON.stringify(usersJson));
        const usersMessage = jsonRes.messages;
        if (jsonRes.status === 201) {
          //setIsmutecall(usersMessage.data[0].ismutecall);
          setLive(usersMessage.data[0].group_id);
          break; // Exit the loop if status code 201 is received
        }
      }
    } catch (error) {
      console.log(error);
    }
  };



  const excludesAdmin = async(event) => {
    //https://convoxmeet.deepijatel.in/convoxmeet/api/excludeadmins?gid=46&mobile=9848851443
   //setWithAdmin(!withAdmin);
   try{
    const excludeadminurl = `${baseurl}/excludeadmins?gid=${groupId}&mobile=${myValue.userMobile}`;
    console.log(excludeadminurl , 'excludeadminurl');
    const response = await fetch(excludeadminurl);
    const usersJson = await response.json();
    const jsonRes = JSON.parse(JSON.stringify(usersJson));
    const is_checkadmin = jsonRes.is_checkadmin;
    console.log(is_checkadmin,'is_checkadmin')
      setExcludeAdmin(is_checkadmin);
    console.log(jsonRes , 'excludeadminjson');
   }catch(error){
    console.log(error);
   }
  }

  //update group name 
  const updategroupname = () => {
    setChangegroupname(true);
    alert('chnage group name');
  }
  //update group name
  const updateGroupname = async (groupName, groupId) => {
    //${baseurl}/updategroupname?gid=84&mobile=9848851443&gname=productTest
    try {
      const updateGroupnameurl = `${baseurl}/updategroupname?gid=${groupId}&mobile=${myValue.userMobile}&gname=${groupName}`;
      const response = await fetch(updateGroupnameurl);
      const usersJson = await response.json();
      const jsonRes = JSON.parse(JSON.stringify(usersJson));
      if (jsonRes) {
        setsuccessupload('Group Name has been updated');
      } else {
        setsuccessupload('Unable to update group name');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const successView = () => {
    return (
      <>
        {data.length > 0 ? (
          <ul className="handle-overflow" style={{ paddingLeft: "2px" }}>
            {filteredData.length > 0 ? (
              <div>
                {" "}
                {filteredData.map((val, key) => {
                  return (
                    <div>
                      <div className="">
                        <Addgroupdiv className="y-scroll">
                          {/* // className={`tab ${index === activeTab ? 'active' : ''}`} */}
                          <div
                            style={{
                              backgroundColor:
                                activeTab === key ? "#000" : "transparent",
                            }}
                            className="callerlist p-2"
                          >
                            {/* <div onClick={()=>getBackgroundcolor(val.group_id , key)} className="callerlist p-2" style={{backgroundColor: backgroundColor}}> */}
                            <li onClick={() => handleTabClick(key)} key={key}>
                              <Link
                                to={`viewcallers/${val.group_id}`}
                                onClick={() => {
                                  callerHeader(val.group_name);

                                }}

                                style={{ textDecoration: "none" }}
                              >
                                <div
                                  className="d-flex flex-row justify-content-around align-items-center text-light"

                                >
                                  <div className="mx-2">
                                    <MdGroups
                                      style={{ width: "40px", height: "40px" }}
                                    />
                                  </div>
                                  <div
                                    onClick={() =>
                                      settingGroupId(
                                        val.group_id,
                                        val.cm_unique_id
                                      )
                                    }
                                    className="mx-1"
                                  >
                                    <div style={{ fontSize: "17px" }} >
                                      <span onDoubleClick={() => { handleGroupchange(val.group_id, val.group_name) }}> {val.group_name}</span>
                                    </div>

                                    <span style={{ fontSize: "13px" }}>
                                      created on {val.created_on}
                                    </span>
                                  </div>
                                  <div>
                                    {liveArray.length > 0 && liveArray.includes(val.group_id) ? (
                                      <Link to={`calling/${val.group_id}`} key={val.group_id}>
                                        <div
                                          onClick={() => { handleGroupId(val.group_id) }}
                                          className="text-center"
                                          style={{
                                            background: "red",
                                            color: "#fff",
                                            fontSize: "12px",
                                            paddingLeft: "5px",
                                            paddingRight: "5px",
                                            borderRadius: "5px",
                                            fontWeight: "bold",
                                            textDecoration: "none",
                                          }}
                                        >
                                          LIVE
                                        </div>
                                      </Link>
                                    ) : (
                                      <button
                                        onClick={() => handleGroupCalls(val.group_id)}
                                        style={{
                                          background: "none",
                                          border: "none",
                                          color: "white",
                                        }}
                                        key={val.group_id}
                                      >
                                        <IoCallSharp
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                        />
                                      </button>
                                    )}

                                  </div>
                                  {/*contextmenu */}

                                </div>
                              </Link>
                              {/*change group name  */}
                              {groupChangeModal && (
                                <Modal show={true} centered >
                                  <Modal.Header style={{ marginBottom: "0" }}>
                                    <button
                                      type="button"
                                      className="btn-close p-3"
                                      aria-label="Close"
                                      onClick={CloseGroupnameToggle}
                                    ></button>
                                  </Modal.Header>

                                  <Modal.Body>
                                    <div className="my-5">
                                      <h6 className="text-center">
                                        Update your Group Name
                                      </h6>
                                      <div className="text-center my-2">
                                        <div className="my-2">
                                          <form className="d-flex" role="search">
                                            <input
                                              onChange={changeName}
                                              type="text"
                                              placeholder="Enter Names "
                                              class="form-control"
                                              id="validationCustom01"
                                              value={groupName}

                                            />
                                          </form>

                                        </div>
                                        <button
                                          onClick={() => { updateGroupname(groupName, groupId) }}
                                          style={{ border: "1px solid black" }}
                                          className="btn m-2 btn-primary"
                                        >
                                          Update
                                        </button>
                                        <button
                                          onClick={CloseGroupnameToggle}
                                          style={{ border: "1px solid black" }}
                                          className="btn m-2"
                                        >
                                          Cancel
                                        </button>
                                        <span>{successupload}</span>
                                      </div>

                                    </div>
                                  </Modal.Body>
                                </Modal>
                              )}
                              {showModal && (
                                <Modal show={true} centered   >
                                  <Modal.Header style={{ marginBottom: "0" }}>
                                    <button
                                      type="button"
                                      className="btn-close p-3"
                                      aria-label="Close"
                                      onClick={ModalToggle}
                                    ></button>
                                  </Modal.Header>

                                  <Modal.Body>
                                    <div className="my-5">
                                      <h4 className="text-center">
                                        Are you sure you want to dial the call?
                                      </h4>
                                      <div className="text-center my-5">
                                     
                                        <div className="my-2">
                                        <input id="admin" type="checkbox" checked={excludeadmin == 1} onChange={excludesAdmin} />
                                        <label
                                          style={{
                                            marginLeft: "5px",
                                            color: "#192A53",
                                          }}
                                          for="admin"
                                        >
                                         Exclude Admin
                                        </label>
                                      </div>
                                    
                                        
                                        {numbers.length>1 ? <Link to={`calling/${groupId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Make Call</button></Link>:""}
                                        {numbers.length>1 ?  <Link to={`calling/${groupId}`}><button onClick={handleMute} className="btn btn-secondary m-2">Mute Call</button></Link>:""}

                                        {numbers.length==1 && withAdmin  ? <Link to={`calling/${groupId}`}><button onClick={makingCall} className="btn btn-primary m-2"> Make Call</button></Link>:""}
                                        {numbers.length==1 && withAdmin ?  <Link to={`calling/${groupId}`}><button onClick={handleMute} className="btn btn-secondary m-2">Mute Call</button></Link>:""}
                                        <button
                                          onClick={ModalToggle}
                                          style={{ border: "1px solid black" }}
                                          className="btn m-2"
                                        >
                                          Cancel
                                        </button>
                                        {numbers.length <=1 && <p style={{color:'green'}}>Please add contacts for Conference!</p>}
                                      </div>
                                    </div>
                                  </Modal.Body>
                                </Modal>
                              )}
                              {/* //no conf */}
                              {noconf && (
                                <Modal show={true} centered className="transparent-modal-background">
                                  <Modal.Header>
                                    <button
                                      type="button"
                                      class="btn-close p-3"
                                      aria-label="Close"
                                      onClick={noConfclose}
                                    ></button>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <h4 class="text-success text-center">
                                      No Contact Found For Conference
                                    </h4>
                                  </Modal.Body>
                                </Modal>
                              )}
                            </li>
                          </div>
                        </Addgroupdiv>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                style={{
                  color: "yellow",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
                className="text-center"
              >
                No Group Found!
              </div>
            )}
          </ul>
        ) : (
          <div
            style={{ color: "yellow", fontSize: "15px", fontWeight: "bold" }}
            className="text-center my-5"
          >
            Create Your Group!
          </div>
        )}
      </>
    );
  };

  const loadingView = () => (
    <div className="text-center my-5">
      {" "}
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="60"
        visible={true}
      />
    </div>
  );

  const failureView = () => (
    <div
      style={{ color: "yellow", fontWeight: "500" }}
      className="text-center my-5"
    >
      Create Your Groups
    </div>
  );

  const renderGroups = () => {
    switch (apiStatus) {
      case 0:
        return loadingView();
      case 1:
        return successView();
      case 2:
        return failureView();
      default:
        return null;
    }
  };
  //deleting the group //

  const onChangescheduling = (e) => {
    setScheduling(e.target.value);
  };
  const getAgenda = (e) => {
    setAgendainfo(e.target.value);
  };
 
  const savetheschedule = async () => {
    if (scheduling === "") {
      setDateError("Date Is Mandatory");
    } else if (agendainfo == "") {
      setDateError("");
      setAgendaError("Please add Agenda");
    } else {
      // Ensure that the year is always 4 digits
      const schedulingParts = scheduling.split('T');
      const datePart = schedulingParts[0];
      const timePart = schedulingParts[1];
      const [year, month, day] = datePart.split('-');

      if (year.length !== 4) {
        setDateError("Year should be 4 digits");
        return; // Stop processing
      }

      // Continue with the rest of your code
      const scheduledDate = `${year}-${month}-${day}T${timePart}`;
      const scheuleurl = `${baseurl}/schedules?gid=${groupId}&schedule_date=${scheduledDate}&mobile=${myValue.userMobile}&agenda=${agendainfo}&uid=${myValue.userId}`;
     
      try {
        const response = await fetch(scheuleurl);
        const usersjson = await response.json();
        const jsonres = await JSON.parse(JSON.stringify(usersjson));
        if (jsonres.messages && jsonres.messages.success) {
          setScheduleinfomessage('Conference has been scheduled')
        }

      } catch (error) {
        console.log(error);
      }
      //setShowSuccessPopupmem(true);
      setAgendainfo("");
      setScheduling("");
      setDateError(" ");

    }
  };


  const handleShowSchedules = async () => {
    setShowSchedule(!showSchedule);
    await viewSchedules();
  }

  const viewSchedules = async () => {
    const url = `${baseurl}/Viewschedules?mobile=${myValue.userMobile}&gid=${groupId}&status=NEW`;
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      const usersmessage = jsonres.messages.View;
      const usersresult1 = usersmessage[0].agenda;
      const usersresult2 = usersmessage[0].schedule_date;
      setAgenda(usersresult1);
      setScheduleData(usersresult2)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Addgrouplistdiv>
        <div className="header-top text-dark " style={TopHeader}>
          Add Groups
        </div>

        {<Adddashboardpop />}
        <hr style={{ margin: "0px 0px 10px 0px" }} />
        <div className="mb-3" style={{ marginLeft: "10px" }}>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={onChangeHandler}
            />
          </form>
        </div>
        {renderGroups()}
      </Addgrouplistdiv>
      <div
        className="addgroup_output"
        style={{ width: "calc(100% - 330px - 82px)" }}
      >
        {/* using the window path, we show the group name accordingly. */}
        {callingPage && (
          <div
            className="header-top text-dark "
            style={TopHeaderForContentBlock}
          >
            <div>
              <p
                style={{
                  color: "steelblue",
                  fontSize: "20px",
                  marginBottom: "0",
                }}
                className="col-6"
              >
                {groupName}
              </p>
              <span style={{ color: "grey", fontSize: "12px", marginTop: "0" }}>
                Admin: {myValue.userMobile}
              </span>
            </div>
            <div></div>
            <div className="d-flex flex-row justify-content-around align-items-center col-6">
              {/*<Link to={`viewcallers/${groupId}`}>
                <button
                  onClick={handleClosingCall}
                  style={{ border: "none", background: "none" }}
                >
                  <IoCallSharp
                    title="Hang Up"
                    style={{ fontSize: "25px", color: "red" }}
                  />
                </button>
              </Link>*/}
              <button
                onClick={handleClosingCall}
                style={{ border: "none", background: "none" }}
              >
                <IoCallSharp
                  title="Hang Up"
                  style={{ fontSize: "25px", color: "red" }}
                />
              </button>
              <button
                title={groupmuteToggle ? "Mute" : "Unmute"}
                onClick={handleMuteAll}
                style={{ border: "none", background: "none" }}
              >
                {groupmuteToggle == false ? (
                  <BsFillMicMuteFill style={{ color: "#000", fontSize: "25px" }} />
                ) : (
                  <BsFillMicFill style={{ color: "grey", fontSize: "25px" }} />
                )}
              </button>

              {/*<button
                title="Group unmute for mute call"
                onClick={handleMuteformutecall}
                style={{ border: "none", background: "none" }}
              >
                {" "}
                {groupunmuteToggle === true ? (
                  <BsFillMicFill style={{ color: "grey", fontSize: "25px" }} />
                ) : (
                  <BsFillMicMuteFill
                    style={{ color: "grey", fontSize: "25px" }}
                  />
                )}
                </button> */}
              <button
                title="Add Contact"
                onClick={addContact}
                style={{ border: "none", background: "none" }}

              >
                <AiOutlineUserAdd style={{ fontSize: "25px", color: "grey" }} />
              </button>

              <button
                title="Close Conference"
                style={{ border: "none", background: "none" }}

              >
                <Link to={`/viewcallers/${groupId}`}>
                  <AiOutlineCloseCircle style={{ fontSize: "25px", color: "red" }} />
                </Link>

              </button>

              {/*  <button
                onClick={() => deleteGroupContacts(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <HiUserRemove
                  title="delete All conf contacts"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>
              <button
                onClick={() => deleteGroup(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <MdDelete
                  title="delete Group"
                  style={{ fontSize: "25px", color: "grey" }}
                />
            </button> */}
              {showForAdding && (
                <Modal show={true} centered className="transparent-modal-background">
                  {/* adding number into conf */}
                  <Modal.Header>
                    <button
                      type="button"
                      className="btn-close p-3"
                      aria-label="Close"
                      onClick={addContact}
                    ></button>
                  </Modal.Header>
                  <Modal.Body>
                    <form class="row g-3 needs-validation" novalidate>
                      <div class="col-md-12">
                        {/* <label for="validationCustom01" class="form-label">
                          Contact Name
                        </label> */}
                        <input
                          onChange={handleName}
                          type="text"
                          placeholder="Enter Names "
                          class="form-control"
                          id="validationCustom01"
                          value={name}

                        />
                        <span className="error">{nameError}</span>
                        {/* <div class="valid-feedback">Looks good!</div> */}
                      </div>
                      <div class="col-md-6">
                        {/* <label for="validationCustom02" class="form-label">
                          Mobile Number
                        </label> */}
                        <input
                          onChange={handleMobile}
                          placeholder="Enter Mobile Number"
                          type="number"
                          class="form-control"
                          id="validationCustom02"
                          value={mobile}

                        />
                        <span className="error">{contactError}</span>
                      </div>
                      <div class="col-md-6">
                        {/* <label for="validationCustom01" class="form-label">
                          Contact Name
                        </label> */}
                        <input
                          onChange={handleDesignation}
                          type="text"
                          placeholder="Enter Designation "
                          class="form-control"
                          id="validationCustom01"
                          value={designation}

                        />
                        <span className="error">{desigError}</span>
                        {/* <div class="valid-feedback">Looks good!</div> */}
                      </div>
                      <div class="col-md-6">
                        {/* <label for="validationCustom01" class="form-label">
                          Contact Name
                        </label> */}
                        <input
                          onChange={handleLocation}
                          type="text"
                          placeholder="Enter Location"
                          class="form-control"
                          id="validationCustom01"
                          value={location}

                        />
                        <span className="error">{locationError}</span>
                        {/* <div class="valid-feedback">Looks good!</div> */}
                      </div>
                      <div class="col-md-6">
                        {/* <label for="validationCustom01" class="form-label">
                          Contact Name
                        </label> */}
                        <input
                          onChange={handleState}
                          type="text"
                          placeholder="Enter State"
                          class="form-control"
                          id="validationCustom01"
                          value={state}

                        />
                        <span className="error">{stateError}</span>
                        {/* <div class="valid-feedback">Looks good!</div> */}
                      </div>

                      {addinconf && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          <strong style={{ color: "#000" }}>{addinconf}</strong>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          ></button>
                        </div>
                      )}
                      <div class="col-12">
                        <input
                          type="submit"
                          value="Add Contact"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        />
                        {/* <button style={{ marginRight: '15px' }} class="btn btn-primary" type="submit">Submit</button> */}
                        <button
                          onClick={addContact}
                          class=" mx-5 btn btn-secondary"
                          type="button"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              )}
              {/* <button style={{border:'none', background:'none'}}><BsFillCalendar2CheckFill style={{fontSize:'25px', color:'grey'}}/></button>
        <button style={{border:'none', background:'none'}}><MdDelete style={{fontSize:'25px',color:'grey'}}/></button> */}
              {/*<button style={{ border: "none", background: "none" }}>
                <IoSettingsOutline
                  style={{ fontSize: "25px", color: "grey" }}
                />
      </button>*/}
              <div className="vertical-line"></div>
              <div className="text-center d-flex flex-column">
                <p
                  style={{
                    color: "steelblue",
                    fontSize: "25px",
                    marginBottom: "0",
                    fontWeight: "600",
                  }}
                >
                  {timer}
                </p>
                <span
                  style={{
                    color: "grey",
                    fontSize: "15px",
                    marginTop: "0",
                    fontWeight: "600",
                  }}
                >
                  HH : MM : SS
                </span>
              </div>
            </div>
          </div>
        )}

        {viewCallerPage && (
          <div
            className="header-top text-dark "
            style={TopHeaderForContentBlock}
          >
            <p
              style={{ color: "steelblue", fontSize: "20px" }}
              className="col-6"
            >
              {groupName}
            </p>
            <div className="d-flex flex-row justify-content-around col-6">
              <button
                onClick={() => handleGroupCalls(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <IoCallSharp
                  title="make call"
                  style={{ fontSize: "25px", color: "green" }}
                />
              </button>
              <button
                onClick={addContact}
                style={{ border: "none", background: "none" }}
              >
                <AiOutlineUserAdd
                  title="add contact"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>
              <button
                onClick={() => deleteGroupContacts(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <HiUserRemove
                  title="delete All contacts"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>
              <button
                onClick={() => deleteGroup(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <MdDelete
                  title="delete Group"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>
              {showForAdding && (
                <Modal show={true} centered>
                  <Modal.Header>
                    <button
                      type="button"
                      className="btn-close p-3"
                      aria-label="Close"
                      onClick={addContact}
                    ></button>
                  </Modal.Header>
                  <Modal.Body>
                    <form class="row g-3 needs-validation" novalidate>
                      <div class="col-md-12">
                        <input
                          onChange={handleName}
                          type="text"
                          class="form-control"
                          id="validationCustom01"
                          value={name}
                          placeholder="*Enter Name"
                        />
                        <span className="error">{nameError}</span>
                        {/* <div class="valid-feedback">Looks good!</div> */}
                      </div>
                      <div class="col-md-6">
                        {/* <label for="validationCustom02" class="form-label">
                          Mobile Number
                        </label> */}
                        <input
                          onChange={handleMobile}
                          maxLength="10"
                          type="number"
                          class="form-control"
                          id="validationCustom02"
                          value={mobile}
                          placeholder="*Enter Contact Number"

                        />
                        <span className="error">{phoneError}</span>
                      </div>

                      <div class="col-md-6">
                        <input
                          onChange={handleDesignation}
                          type="text"
                          class="form-control"
                          id="validationCustom01"
                          value={designation}
                          placeholder="*Enter Designation"

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
                          placeholder="*Enter Location"

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
                          placeholder="*Enter State"

                        />
                        <span className="error">{stateError}</span>
                      </div>
                      <div class="col-md-12">
                        <div className='mb-3'>
                        <input type="file" name='files' className='form-control' accept='.csv' onChange={handleFile} />
                          <div style={{ marginTop: 10 }} ><span>Download file Template</span><FaFileDownload onClick={downloadTemplate} style={{ fontSize: 18 }} /></div>
                        </div>
                        {message && <div class="alert alert-primary alert-dismissible fade show" role="alert">
                          <strong style={{ color: "#000" }}>{message}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                        {handlefileError && <div class="alert alert-danger alert-dismissible fade show" role="alert">
                          <strong style={{ color: "#000" }}>{handlefileError}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}

                      </div>
                      <p style={{ color: "green" }}>{msg}</p>
                      {contactmsg && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          <strong style={{ color: "#000" }}>
                            {contactmsg}
                          </strong>
                        </div>
                      )}

                      <div class="col-12">
                        <input
                          type="submit"
                          value="Add Contact"
                          className="btn btn-primary"
                          onClick={addingContactForGroup}
                        />
                        <button
                          onClick={addContact}
                          class="mx-5 btn btn-secondary"
                          type="button"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              )}

              {/* <button><BsFillCalendar2PlusFill/></button> */}
              <button
                onClick={() => addSchedule(groupId)}
                style={{ border: "none", background: "none" }}
              >
                <BsFillCalendar2PlusFill
                  title="calender"
                  style={{ fontSize: "25px", color: "grey" }}
                />
              </button>
              {showForSchedule && (
                <Modal show={true} centered>
                  <Modal.Header>
                    <h4>Schedule</h4>

                    <button
                      type="button"
                      className="btn-close p-3"
                      aria-label="Close"
                      onClick={addSchedule}
                    ></button>
                  </Modal.Header>
                  {showSchedule ? <Modal.Body>
                    <div className="my-3">
                      <div className="scheduletime mb-3">
                        <label htmlFor="">Schedule Date and Time</label>
                        <input
                          type="datetime-local"
                          className="form-control"
                          onChange={onChangescheduling}
                          value={scheduling}
                        />
                        <span className="error">{dateError}</span>
                      </div>
                      <label htmlFor="">Add Agenda Of conference</label>
                      <div className="agenda mb-3">
                        <textarea
                          name=""
                          id=""
                          cols="32"
                          rows="4"
                          className="form-control"
                          onChange={getAgenda}
                          value={agendainfo}
                          required
                        ></textarea>
                        <span className="error">{agendaError}</span>
                      </div>
                      <div>
                        <button
                          onClick={savetheschedule}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={addSchedule}
                          class=" mx-5 btn btn-secondary"
                          type="button"
                        >
                          Close
                        </button>
                        <button onClick={handleShowSchedules} className="btn btn-primary">Show Schedules</button>
                      </div>
                      {scheduleinfomesage && (
                        <div
                          class="alert alert-primary alert-dismissible fade show"
                          role="alert"
                        >
                          <strong style={{ color: "#000" }}>
                            {scheduleinfomesage}, Group call will be initiated
                            at saved scheduled.
                          </strong>

                        </div>
                      )}
                    </div>
                    {/* <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          ></button> */}

                  </Modal.Body> :
                    <div style={{ padding: "12px" }}><table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <td>Agenda</td>
                          <td>Time</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {agenda && <tr>
                          {showInput ? <td>{agenda}</td> : <td><input onChange={handleAgendaValue} value={editAgendaValue} type="text" /></td>}
                          {showInput ? <td>{scheduleDate}</td> : <td><input onChange={handleEditValue} value={editDateValue} type="datetime-local" /></td>}
                          <td>
                            <button onClick={editSchedule} title="Edit Schedule" style={{ border: "none" }}><FaEdit /></button>
                            <button title="Delete Schedule" style={{ border: "none", color: "red", marginLeft: "12px" }}><MdOutlineDeleteOutline onClick={deleteSchedule} /></button>
                          </td>
                        </tr>}
                        {!agenda && <tr style={{ textAlign: "center" }}>
                          <td className="text-centre" style={{ color: "red", fontSize: "12px" }} colSpan="3">No schedules</td>
                        </tr>}
                      </tbody>
                    </table>
                      <button className="btn btn-primary" onClick={handleShowSchedules}>back</button>
                      {!showInput && <button style={{ marginLeft: "12px" }} onClick={updateSchedule} className="btn btn-primary" >Update</button>}
                    </div>
                  }
                </Modal>
              )}
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
};

export default Addgroups;
