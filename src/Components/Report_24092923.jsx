import React, { useEffect, useState, useContext } from "react";
import MyContext from "./MyContext";
import { Link } from 'react-router-dom';
import { ImDownload3 } from 'react-icons/im';
import { CSVLink } from "react-csv";
import { MyServerContext } from "./Contexts/SeverContexts";
//import axios from "axios";





const Report = () => {
  const { baseurl } = useContext(MyServerContext);
  const [groupId, setGroupId] = useState("")
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [groupName, setGroupName] = useState("");
  //const [uniqueVal , setUniqueData] = useState([]);
  //summery
  const [count, setCount] = useState('');





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
  }, []);

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

  const gettingReports = async () => {
    handleGroupName();
    try {
      const url = `${baseurl}/conferencesummaryreport?gid=${groupId}`;
       console.log(url, 'conferencestatus');
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
  // const handleGroupId = (e) => {
  //   setGroupId(e.target.value)
  //   console.log(setGroupId, 'SETGROUPID');
  // }
  const groupIdChange = (e) => {
    setGroupId(e.target.value)
  }
  //console.log(groupId, 'SETGROUPID');
  //this will get count of participates in the conference
  // const getcountofmembers = (gid , unique_id) => {
  //   const getcount = `${baseurl}/cdrreport?uid=3&gid=${gid}&uniqueid=${unique_id}`;
  //   console.log(getcount , 'GETCOUNT');

  // }

  //get dialer status, connected percentage
  // const getdialerstatus = async(gid , unique_id) => {
  //   const getconnected = `${baseurl}/cdrreport?uid=3&gid=${gid}&uniqueid=${unique_id}`;
  //   console.log(getconnected , 'getconeectedurl');
  // }

  // const getansweredcount = (gid , unique_id , uid) => {
  //   console.log(gid , 'ANSWEREDCOUNT');
  //   const getconnected = `172.16.12.138/convoxmeet/api/cdrreport?uid=${uid}&gid=${gid}&uniqueid=${unique_id}`;
  //   console.log(getconnected , 'GETCONNECTED')
  // }
  // //get unanswer status percentage
  // const getunanswerstatus = (gid) => {
  //   console.log(gid);

  // }

  // const getunansweredcount = (list) => {
  //   const status = list.filter(el => el.dialer_status === 'CANCEL');
  //   console.log(status.length, 'status-------count-----');
  //   const getstatus = status.map(el => el.dialer_status);
  //   const getcountofunanswered = getstatus.length;
  //   console.log(getcountofunanswered, 'UNANSERDCOUNT');
  //   return getcountofunanswered;
  // }

  // //this will get minutes of the conference
  // const getminutes = (start, end) => {
  //   const date1 = new Date(start);
  //   const date2 = new Date(end);
  //   const differenceInMilliseconds = date2 - date1;
  //   const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  //   return differenceInMinutes;
  // }

  //get seconds
  // const getseconds = (start, end) => {
  //   const date1 = new Date(start);
  //   const date2 = new Date(end);
  //   const differenceInSeconds = Math.floor((date2 - date1) / 1000);
  //   return differenceInSeconds
  // }

  //download wave file
  const downloadwavefile = (file) => {
    const wavfile = `http://172.16.12.138/convoxmeet_recordings/${file}.wav`;
    return wavfile;
  }
  // const filepath = (file) => {
  //   const wavfile = `${file}.wav`;
  //   return wavfile;
  // }

  const accessid = data.length > 0 ? data.filter(item => item.recordings !== null) : "";
  //console.log(accessid, 'srinivas');

  // const handleDownload = (file) => {
  //   const url = `http://172.16.12.138/convoxmeet_recordings/${file}.wav`;
  //   const anchor = document.createElement('a');
  //   anchor.href = url;
  //   anchor.download = `${file}.wav`;
  //   anchor.click();
  // };

  // //download using axios
  // const handleDownloadfile = (file) => {
  //   const files = '121_20230601221818_98488514431685638090.wav';
  //   console.log(file, 'wavfile');
  // };




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

  // const identity = data.length>0 ? data[data.length-1].uniqueid: "";
  // const identityArray = data.length > 0 ? data.filter((item)=>item.uniqueid===identity): [];

  //   const summaryStats = {
  //     uniqueId:identity , 
  //     completedCalls: identityArray.filter((item) => item.dialer_status === 'COMPLETED').length,
  //     canceledCalls: identityArray.filter((item) => item.dialer_status === 'CANCEL').length,
  //     totalCalls: identityArray.length,
  //     entry_date: data.length>0 ? data[data.length-1].conf_start_time:"",
  //     end_date: data.length>0 ?  data[data.length-1].conf_end_time: "",
  //     min :  minutes(data.length>0 ? data[data.length-1].conf_start_time:"", data.length>0 ?  data[data.length-1].conf_end_time: ""),
  //     sec :  seconds(data.length>0 ? data[data.length-1].conf_start_time:"", data.length>0 ?  data[data.length-1].conf_end_time: ""),
  //     recordings : identityArray.map(item => item.recordings)
  //   };
  // console.log(identityArray, 'srinivas');
  ////////////////////////summary report/////////////////////////////
  // Assuming 'data' contains the retrieved CDR data

  // Create an object to store conference summaries
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

  // Now 'conferenceSummaries' contains summarized data for all conferences within the group


  // return etnry date in correct format

  // const getEntryDate=(entry_date)=>{
  //       //const timestamp = "2023-08-30 12:30:24";
  //       const dateObj = new Date(entry_date);

  //       // Get hours, minutes, and seconds
  //       const hours = dateObj.getHours();
  //       const minutes = dateObj.getMinutes();
  //       const seconds = dateObj.getSeconds();

  //       // Determine AM or PM
  //       const amPm = hours >= 12 ? 'PM' : 'AM';
  //       const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  //      const formattedTime = `${formattedHours}:${minutes}:${seconds} ${amPm}`;
  //      return formattedTime;

  //       //console.log(formattedTime); // Output: 12:30:24 PM
  // }

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

  function prepareCSVData(conferenceSummaries) {
    const csvData = [];
    // Loop through the values of the conferenceSummaries object
    const recordings = conferenceSummaries.recordings || []; // Ensure recordings is an array or initialize it as an empty array
    console.log(conferenceSummaries, 'UNIQUEID')
    csvData.push({
      ConferenceId: conferenceSummaries.conf_unique_id, // Use the conferenceId as the uniqueId
      entry_date: conferenceSummaries.entry_date,
      end_date: conferenceSummaries.end_date,
      completedCalls: conferenceSummaries.completedCalls,
      canceledCalls: conferenceSummaries.canceledCalls,
      totalCalls: conferenceSummaries.totalCalls,
      min: conferenceSummaries.min,
      sec: conferenceSummaries.sec,
      recordings: recordings.join(', '), // Join recordings array into a string
    });
    console.log(csvData.recordings, 'csvdata');
    return { data: csvData, headers: csvHeaders }; // Use csvHeaders here
  }

  ////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="container">
        <div className="row">
          <table className="table   table-striped">
            <thead>
              <tr >
                <td colSpan={7}>Conference Summary Report</td>
                <td colSpan={2}><select style={{ fontSize: "14px" }} className="form-control" onChange={groupIdChange} name="group" id="group">
                  <option value="">Select Group</option>
                  {groupData.map(eachGroup =>
                    <option style={{ fontSize: "14px" }} className="form-control p-2" value={eachGroup.group_id}>{eachGroup.group_name}</option>
                  )}
                </select></td>
                <td colSpan={2}>
                  <button style={{ fontSize: "14px" }} className="btn btn-primary" onClick={gettingReports}>Submit</button>
                </td>
                <td> <button style={{ fontSize: "14px" }} className="btn btn-primary">
                  Excel<ImDownload3 style={{ marginLeft: "5px" }} />
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
                  <td>Minutes</td>
                  <td>Pulses</td>
                  <td>Participations %</td>
                  <td style={{ width: '10%' }}>Recordings</td>
                  <td>Actions</td>
                  <td>Download</td>

                </tr>
              </thead>
              {data?.length > 0 ? (
                <tbody >
                  {Object.values(conferenceSummaries).map((summaryStats, index) => (
                    <React.Fragment key={index}>
                      <tr className="text-center" key={index}>
                        <td><Link to={`getsummary/${summaryStats.uniqueId}`}>{index + 1}</Link></td>
                        <td>{getEntryDate(summaryStats.entry_date)}</td>
                        <td>{getEntryDate(summaryStats.end_date)}</td>
                        <td>{calculateTimeDifference(summaryStats.entry_date, summaryStats.end_date)}</td>
                        <td>{summaryStats.totalCalls}</td>
                        <td>{summaryStats.completedCalls}</td>
                        <td>{summaryStats.canceledCalls}</td>
                        <td>{summaryStats.min} Min</td>
                        <td>{summaryStats.sec} Sec</td>
                        <td style={{ color: summaryStats.completedCalls / summaryStats.totalCalls * 100 >= 50 ? "green" : "red" }}>{(summaryStats.completedCalls / summaryStats.totalCalls * 100).toFixed(1)}%</td>
                        <td>
                          {summaryStats.recordings.length > 0 ? (
                            <audio style={{ width: '102px', height: '10px' }} src={downloadwavefile(summaryStats.recordings[0])} controls></audio>
                          ) : (
                            <span style={{ color: 'red' }}>No</span>
                          )}
                        </td>
                        <td><button style={{ background: "#4CAF50", color: "white", borderRadius: "5px", padding: "5px", border: "none", fontSize: "11px" }}><Link style={{ color: "inherit" }} to={`getsummary/${summaryStats.uniqueId}`}>Show</Link></button></td>
                        <td>
                          {/* Add the CSV export button */}
                          <CSVLink
                            data={prepareCSVData(summaryStats).data}
                            headers={csvHeaders} // Use csvHeaders here
                            filename={`conference_summary_${summaryStats.uniqueId}.csv`}
                          >
                            Export CSV
                          </CSVLink>

                        </td>

                      </tr>
                      <tr>
                        <td style={{ background: "#EEE8AA" }} colSpan={13}>
                          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div>Conference:  <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{index + 1}</span></div>
                            <div>Total Members <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{summaryStats.totalCalls}</span></div>
                            <div>Answered <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{summaryStats.completedCalls}</span></div>
                            <div>Unanswered <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{summaryStats.canceledCalls}</span></div>
                            <div>Created date <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>{formatDate(summaryStats.entry_date)}</span></div>
                            <div>Recording : <span >{summaryStats.recordings.length > 0 ? (<span style={{ color: 'green' }}>Yes</span>) : (
                              <span style={{ color: "#DD5A6E", fontWeight: "bold" }}>No</span>
                            )}</span>

                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr style={{ borderWidth: '0px' }}><div style={{ background: "#fff" }}></div></tr>
                    </React.Fragment>

                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr className="text-center ">
                    <th colSpan={12} className="text-danger">
                      No Record
                    </th>
                  </tr>
                </tbody>
              )}

            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report

