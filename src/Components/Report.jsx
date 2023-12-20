import React, { useEffect, useState, useContext } from "react";
import MyContext from "./MyContext";
import { Link } from 'react-router-dom';
import { ImDownload3 } from 'react-icons/im';
import { CSVLink } from "react-csv";
import { MyServerContext } from "./Contexts/SeverContexts";
import Summary from "./Summary";
import { RotatingLines } from "react-loader-spinner";
import { RiDeleteBin5Line } from 'react-icons/ri';
//import axios from "axios";

import DataTable from 'react-data-table-component';

const customStyles = {
  headRow: {
    style: {
      background: "#192A53",
      color: "white"
    }
  },
  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: "500",
      textTransform: "uppercase"

    }
  },
  cells: {
    style: {
      fontSize: "12px",


    }
  }
}


const Report = () => {

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      sortable: true,
      headerClass: 'custom-header-class', // Add this line
    },
    {
      name: 'Unique Caller Id',
      selector: row => row.uniqueid,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.contact_display_name,
      sortable: true,
    },
    {
      name: 'Contact No',
      selector: row => row.phone_number,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <div>
          {row.dialer_status === 'CANCEL' ? 'UNANSWERED' :
            row.dialer_status === 'CHANUNAVAIL' ? 'NOT AVAILABLE' :
              row.dialer_status === 'CONGESTION' ? 'BUSY' : row.dialer_status}
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Entry Date',
      selector: row => row.entry_date,
      sortable: true,


    },
    {
      name: 'End Date',
      selector: row => row.end_date,
      sortable: true,


    },
    {
      name: 'Pulses',
      selector: row => row.duration,
      sortable: true,


    },
  ];


  const { baseurl } = useContext(MyServerContext);
  const [groupId, setGroupId] = useState("")
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [groupName, setGroupName] = useState("");
  //const [uniqueVal , setUniqueData] = useState([]);

  const [apiStatus, setApiStatus] = useState(0);
  //summery
  const [count, setCount] = useState('');
  const [callerId, setCallerId] = useState("");

  const [dataSummary, setDataSummary] = useState([]);

  console.log(dataSummary, "ddddddddd");
  const [searchInput, setSearchInput] = useState("");

  const [showSummary, setShowSummary] = useState(true);


  const getPulses = (endTime, startTime) => {
    const timestamp1 = new Date(endTime);
    const timestamp2 = new Date(startTime);
    // console.log(timestamp2, 'stamp');

    const timeDifferenceInSeconds = (timestamp1 - timestamp2) / 1000;
    console.log("Time difference in seconds:", timeDifferenceInSeconds);
    return timeDifferenceInSeconds;
  };

  const filteredData =
    dataSummary.length > 0
      ? dataSummary.filter(eachItem =>{
       return ( eachItem.contact_display_name
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase()) ||
        eachItem.phone_number
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase()) ||
        (
          eachItem.dialer_status === 'CANCEL' && 'UNANSWERED'?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
          eachItem.dialer_status === 'CHANUNAVAIL' && 'NOT AVAILABLE'?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
          eachItem.dialer_status === 'CONGESTION' && 'BUSY'?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
          eachItem.dialer_status?.toLowerCase()?.includes(searchInput?.toLowerCase())
        ) ||
        eachItem.entry_date
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase()) ||
        eachItem.end_date
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase()) ||
        eachItem.uniqueid
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase()) ||
        eachItem.duration
          ?.toLowerCase()
          ?.includes(searchInput?.toLowerCase())
          
      )})
      : [];


  const tableResponsiveStyle = {
    overflowY: "auto",  // Enable vertical scrolling
    height: "60vh",   // Set a maximum height for the scrollable area
    overflowX: "hidden", /* Hide horizontal overflow */
  };

  const tableHeadThStyle = {
    position: "sticky",   // Keep the table header fixed
    top: 0,               // Stick to the top of the scrollable area
    backgroundColor: "#192A53",
    color: "#fff",
    zIndex: 1             // Ensure the header is above the scrolling content
  };


  console.log(groupData, 'sampath');
  const handleGroupName = () => {
    const gettingArray = groupData.length > 0 ? groupData.filter(eachOne => eachOne.group_id == groupId) : [];
    if (gettingArray.length > 0) {
      setGroupName(gettingArray[0].group_name)
    }
  }
  //accessing the context values like userid and mobile //
  const myValue = useContext(MyContext);
  //console.log(myValue.userMobile);
  console.log(data, "wednesday");
  useEffect(() => {
    handleGroupData();
    // handleData();
  }, []);


  const renderGroups = () => {
    switch (apiStatus) {
      case 0:
        return loadingView();
      case 1:
        return successView();
      default:
        return null;
    }
  };


  const successView = () => {

    return (
      <DataTable
        columns={columns}
        data={filteredData.length > 0 ? filteredData : ""}
        customStyles={customStyles}
        pagination
        
      >
      </DataTable>

    )

  }


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


  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };


  useEffect(() => {
    //handleGroupData();
    handleData();
  }, [dataSummary]);

  const handleData = async () => {
    const url = `${baseurl}/cdrdetailreport?cuid=${callerId}`;
    console.log(url, "ooooooooo");
    console.log(url);

    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      // console.log(jsonres, 'addgroups');
      if (jsonres.status == 201) {
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.Report;
        console.log(usersresult, "this is add groups....");
        setDataSummary(usersresult); //masterdata
        setApiStatus(1);
      } else {
        setDataSummary([]); //clear the group data
      }
    } catch (error) {
      console.log(error);
    }
  };

  //passing mobile to the api, which accessed from useContext //
  const handleGroupData = async () => {
    const url = `${baseurl}/viewusergroups?mobile=${myValue.userMobile}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      // console.log(jsonres, 'addgroups');
      if (jsonres.status == 201) {
        const usersmessage = jsonres.messages;
        const usersresult = usersmessage.success;
        console.log(usersresult, "this is add groups....")
        setGroupData(usersresult); //masterdata
      } else {
        setGroupData([]); //clear the group data 
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data, 'summaryreport');
  const gettingReports = async () => {
    handleGroupName();
    try {
      const url = `${baseurl}/conferencesummaryreport?gid=${groupId}`;
      console.log(url, 'summaryurl');
      const response = await fetch(url);
      const usersjson = await response.json();
      const jsonres = JSON.parse(JSON.stringify(usersjson));
      console.log(jsonres, 'JSONRES')
      const usersmessage = jsonres.messages;
      const usersresult = usersmessage.Report;
      console.log(usersresult, 'REPORTJSON');
      if (jsonres.status == 201) {
        setData(usersresult); //masterdata
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(data, 'summarydata');
  // const handleGroupId = (e) => {
  //   setGroupId(e.target.value)
  //   console.log(setGroupId, 'SETGROUPID');
  // }
  const groupIdChange = (e) => {
    setGroupId(e.target.value)
  }
 
  //download wave file
  const downloadwavefile = (file) => {
    //http://172.16.12.138/convoxmeet_recordings/16_20230924231946_98488514431695577778.wav
    console.log(file, 'file');
    const wavfile = `http://192.168.1.92/convoxmeet_recordings/${file}.wav`;
    console.log(wavfile, 'wavefile');
    return wavfile;
  }
  // const filepath = (file) => {
  //   const wavfile = `${file}.wav`;
  //   return wavfile;
  // }

  const accessid = data.length > 0 ? data.filter(item => item.recordings !== null) : "";
  

  const changing = (id) => {
    setCallerId(id);
    setShowSummary(!showSummary);
  }

  const changing1 = () => {

    setShowSummary(!showSummary);
  }

  //time diff of minites and seconds
  const minutes = (entry, end) => {
    const entry_date = new Date(entry);
    const end_date = new Date(end);

    const timeDiff = end_date.getTime() - entry_date.getTime(); // Difference in milliseconds

    const minutesDiff = Math.floor(timeDiff / 60000); // Difference in minutes
    return minutesDiff;

  }

  //converting to seconds 

  const seconds = (entry, end) => {
    const entry_date = new Date(entry);
    const end_date = new Date(end);

    const timeDiff = Math.abs(end_date.getTime() - entry_date.getTime()); // Difference in milliseconds

    const secondsDiff = Math.floor(timeDiff / 1000); // Difference in seconds
    return secondsDiff;
    //console.log(secondsDiff); // Output: 25
  }

 
  const conferenceSummaries = {};

  console.log(conferenceSummaries, 'summary');


  // Loop through the data and organize it by unique conferences within the group
  data.forEach(item => {
    const conferenceId = item.conf_unique_id;

    // Create a summary object if not already present
    if (!conferenceSummaries[conferenceId]) {
      conferenceSummaries[conferenceId] = {
        uniqueId: conferenceId,
        completedCalls: 0,
        canceledCalls: 0,
        totalCalls: 0,
        entry_date: "",
        end_date: "",
        min: 0,
        sec: 0,
        recordings: []
      };
    }

    // Update the summary statistics for the conference
    const summary = conferenceSummaries[conferenceId];
    summary.completedCalls += item.dialer_status === 'COMPLETED' ? 1 : 0;
    summary.canceledCalls += item.dialer_status === 'CANCEL' ? 1 : 0;
    summary.totalCalls++;
    summary.entry_date = item.entry_date;
    summary.end_date = item.conf_end_time;

    // Calculate the duration in minutes and seconds
    const startTime = new Date(item.entry_date);
    console.log(startTime, 'start');

    const endTime = new Date(item.conf_end_time);
    console.log(endTime, "end");

    // Calculate duration in milliseconds


    const durationInSeconds = Math.floor(endTime - startTime) / 1000;
    console.log(durationInSeconds, "abc");
    summary.min = Math.floor(durationInSeconds / 60);
    summary.sec = durationInSeconds;

    // Add recording if available
    if (item.recordings !== null) {
      summary.recordings.push(item.recordings);
    }
  });

 
  const getEntryDate = (entry_date) => {
    const dateObj = new Date(entry_date);

    // Get hours, minutes, and seconds
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // Determine AM or PM
    const amPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${amPm}`;
    return formattedTime;
  }

  const calculateTimeDifference = (startTime, endTime) => {

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const timeDifferenceInMilliseconds = endDate - startDate;
    const totalSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeDifference = {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };

    const formattedTimeDifference = `${timeDifference.hours.toString().padStart(2, '0')}:${timeDifference.minutes.toString().padStart(2, '0')}:${timeDifference.seconds.toString().padStart(2, '0')}`;
    return formattedTimeDifference;

  };


  function formatDate(inputDateStr) {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateStr);

    // Extract the components (year, month, day, hours, minutes, seconds)
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    const seconds = String(inputDate.getSeconds()).padStart(2, '0');

    // Create the desired formatted string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

 /////////////////delete all reports///////////////////////
 const deleteallreports = async () => {
  handleGroupName();
  const confirmResult = window.confirm('Are you sure you want to delete reports?');
  if (confirmResult) {
    const deletegrouprecords = `${baseurl}/deletereportall?gid=${groupId}`;
    console.log(deletegrouprecords, 'deletegrouprecords')
    const response = await fetch(deletegrouprecords);
    const usersjson = await response.json();
    const jsonres = JSON.parse(JSON.stringify(usersjson));
    console.log(jsonres, 'reportdelete');
    if (jsonres) {
      alert('group report ahs been deleted');
      setData([]);
    }
  }

}
const deleteconfreport = async (cuid) => {
  handleGroupName();
  const confirmResult = window.confirm('Are you sure you want to delete report?');
  if (confirmResult) {
    const deleteconfreport = `${baseurl}/deletereportsingle?gid=${groupId}&cuid=${cuid}`;
    console.log(deleteconfreport, 'deleteconfreport')
    const response = await fetch(deleteconfreport);
    const usersjson = await response.json();
    const jsonres = JSON.parse(JSON.stringify(usersjson));
    console.log(jsonres, 'reportdelete');
    if (jsonres) {
      alert('conference report ahs been deleted');
      gettingReports();
    }
  }

}
////////////////////////////////////////////////////////////////////
  ////conver csv file and import////////
  const csvHeaders = [
    { label: 'Conference ID', key: 'ConferenceId' },
    { label: 'Start Time', key: 'entry_date' },
    { label: 'End Time', key: 'end_date' },
    { label: 'Completed Calls', key: 'completedCalls' },
    { label: 'Canceled Calls', key: 'canceledCalls' },
    { label: 'Total Calls', key: 'totalCalls' },
    { label: 'Duration (Minutes)', key: 'min' },
    { label: 'Duration (Seconds)', key: 'sec' },
    { label: 'Recordings', key: 'recordings' },
  ];

  function prepareCSVData(conferencestatus) {
    console.log(conferencestatus, 'statusdetails')
    const csvData = [];
    csvData.push({
      ConferenceId: conferencestatus.conf_unique_id, // Use the conferenceId as the uniqueId
      entry_date: conferencestatus.start_time,
      end_date: conferencestatus.end_time,
      completedCalls: conferencestatus.answered_count,
      canceledCalls: (conferencestatus.total_count - conferencestatus.answered_count),
      totalCalls: conferencestatus.total_count,
      sec: conferencestatus.duration,
      recordings: conferencestatus.recording_file
    });
    console.log(csvData.recordings, 'csvdata');
    return { data: csvData, headers: csvHeaders }; // Use csvHeaders here
  }



  function prepareCSVData1(detailedreport) {

    console.log(detailedreport, 'detailedreport');
    const csvData = [];
    //Loop through the values of the conferenceSummaries object
    //const recordings = detailedreport.recordings || []; // Ensure recordings is an array or initialize it as an empty array
    console.log(detailedreport.dialer_status, 'UNIQUEID')
    dataSummary.forEach((detailedreport) => {
      console.log(detailedreport.contact_display_name, 'detailedreport')
      csvData.push({
        CallerId: detailedreport.conf_unique_id, // Use the conferenceId as the uniqueId
        Name: detailedreport.contact_display_name,
        ContactNumber: detailedreport.phone_number,
        Status: detailedreport.dialer_status,
        EntryDate: detailedreport.entry_date,
        EndDate: detailedreport.end_date,

      });

    })

    return { data: csvData, headers: csvHeaders1 }; // Use csvHeaders here
  }


  const csvHeaders1 = [
    { label: 'CallerId', key: 'CallerId' },
    { label: 'Name', key: 'Name' },
    { label: 'ContactNumber', key: 'ContactNumber' },
    { label: 'Status', key: 'Status' },
    { label: 'EntryDate', key: 'EntryDate' },
    { label: 'EndDate', key: 'EndDate' },
  ];

  ////////////////////////////////////////////////////////////////////
  return (
    <>

      {showSummary &&
        <div className="container">
          <div className="row">
            <table className="table   table-striped">
              <thead>
                <tr >
                  <td colSpan={7}>Conference Summary Report : <span style={{ color: "#000", fontWeight: "400" }}> {groupName}</span></td>
                  <td colSpan={2}><select style={{ fontSize: "14px" }} className="form-control" onChange={groupIdChange} name="group" id="group">
                    <option value="">Select Group</option>
                    {groupData.map(eachGroup =>
                      <option style={{ fontSize: "14px" }} className="form-control p-2" value={eachGroup.group_id}>{eachGroup.group_name}</option>
                    )}
                  </select></td>
                  <td colSpan={2}>
                    <button style={{ fontSize: "14px" }} className="btn btn-primary" onClick={gettingReports}>Submit</button>
                  </td>
                  <td > <button style={{ fontSize: "14px" }} className="btn btn-primary" onClick={() => { deleteallreports() }}>
                    Delete All<ImDownload3 style={{ marginLeft: "5px" }} />
                  </button></td>
                </tr>
              </thead>
            </table>
            <div style={tableResponsiveStyle}>
              <table style={{ fontSize: "13px" }} className="table table-bordered table-striped">

                <thead style={{ ...tableHeadThStyle, background: "#192A53", color: "#fff", position: 'sticky', top: '0' }} className="text-center">
                  <tr>
                    <td>S.No</td>
                    <td>Start Time</td>
                    <td>End Time</td>
                    <td>Total Time</td>
                    <td>Members</td>
                    <td>Answered</td>
                    <td>Un-Answered</td>
                    <td>Pulses</td>
                    <td>Participations %</td>
                    <td style={{ width: '10%' }}>Recordings</td>
                    <td>View</td>
                    <td>Download</td>
                    <td>Action</td>
                  </tr>
                </thead>
                {data.length > 0 ? (
                  <tbody>
                    {data.map((conference, index) => (
                      <React.Fragment key={index}>
                        <tr className="text-center">
                          <td>{index + 1}</td>
                          <td>{conference.start_time}</td>
                          <td>{conference.end_time}</td>
                          <td>{calculateTimeDifference(conference.start_time, conference.end_time)}</td>
                          <td>{conference.total_count}</td>
                          <td>{(conference.answered_count)}</td>
                          <td>{(conference.total_count - conference.answered_count)}</td>
                          <td>{conference.duration} SEC</td>
                          <td style={{ color: ((conference.answered_count / conference.total_count) * 100) >= 50 ? "green" : "red" }}>{((conference.answered_count / conference.total_count) * 100).toFixed(1)}%</td>
                          <td>
                            {conference.recording_file ? (<audio style={{ width: '102px', height: '10px' }} src={downloadwavefile(conference.recording_file)} controls></audio>) : <span>No recording</span>}
                          </td>
                          <td>
                            <button
                              style={{
                                background: "#4CAF50",
                                color: "white",
                                borderRadius: "5px",
                                padding: "5px",
                                border: "none",
                                fontSize: "11px"
                              }}

                              onClick={() => changing(conference.conf_unique_id)}
                            >
                              Show
                            </button>
                          </td>
                          <td>
                            {/* Add the CSV export button */}
                            <CSVLink
                              data={prepareCSVData(conference).data}
                              headers={csvHeaders} // Use csvHeaders here
                              filename={`conference_summary_${conference.conf_unique_id}.csv`}
                            >
                              Export CSV
                            </CSVLink>
                          </td>
                          <td><RiDeleteBin5Line style={{color:"red" , fontSize:"16px"}} onClick={()=>{deleteconfreport(conference.conf_unique_id)}}/></td>
                        </tr>
                        <tr>
                          <td style={{ background: "#EEE8AA"  , borderBottom: "2px solid #000"}} colSpan={13}>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                              <div>Conference: <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{conference.conf_unique_id}</span></div>
                              <div>Total Members: <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{conference.total_count}</span></div>
                              <div>Answered: <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{conference.answered_count}</span></div>
                              <div>Unanswered: <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{conference.total_count - conference.answered_count}</span></div>
                              <div>Created date: <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{conference.start_time}</span></div>
                              <div>Recording: <span >{conference.recording_file ? (<span style={{ color: 'green', fontWeight: "bold" }}>Yes</span>) : (
                                <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>No</span>
                              )}</span></div>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    {/* Render a message for when data.length is 0 */}
                    <tr className="text-center">
                      <td colSpan={13} style={{ color: "red", fontSize: "500" }}>No data available</td>
                    </tr>
                  </tbody>
                )}

              </table>
            </div>
          </div>
        </div>}

      {!showSummary &&

        <div style={{ width: "90vw", textAlign: "center", padding: "25px" }}>
          <div className="d-flex flex-row justify-content-around">
            <h6 style={{ color: "green", fontSize: "22px" }}>
              Conference Detailed Report : <span style={{ color: "#000", fontWeight: "400" }}>{groupName}</span>
            </h6>
            <div>
              <input
                placeholder="Search"
                className="form-control"
                type="text"
                value={searchInput}
                onChange={handleInput}
              />
            </div>
            <button style={{ fontSize: "14px", color: "#fff" }} className="btn btn-primary">
              <CSVLink
                style={{ color: "#fff" }}
                data={prepareCSVData1(dataSummary).data}
                headers={csvHeaders1} // Use csvHeaders here
                filename={`detailed_report.csv`}
              >
                CSV
              </CSVLink>

              <ImDownload3 style={{ marginLeft: "5px" }} />
            </button>
          </div>
          <div>

          </div>
          <div style={{ textAlign: "right", marginTop: "-47px" }}>

            <button onClick={() => changing1()} className="btn btn-primary my-2">Back</button>

          </div>
          

          {renderGroups()}


        </div>}
    </>
  )
}

export default Report

