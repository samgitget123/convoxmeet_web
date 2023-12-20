import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ImDownload3 } from "react-icons/im";
import { CSVLink } from "react-csv";
import { MyServerContext } from "./Contexts/SeverContexts";
//import { each } from "chart.js/dist/helpers/helpers.core";

const Summary = () => {
  const { baseurl } = useContext(MyServerContext);
  const params = useParams();
  const callerId = params.id;
  console.log(callerId, "raju");
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

  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const filteredData =
    data.length > 0
      ? data.filter((eachItem) =>
        eachItem.contact_display_name
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        eachItem.phone_number
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        eachItem.dialer_status
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        eachItem.entry_date
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        eachItem.end_date
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        eachItem.uniqueid
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
      : [];

  console.log(filteredData, "cnu");

  const uniqueIds = Array.from(new Set(data.map((obj) => obj.uniqueid)));
  console.log(uniqueIds, "raj");

  console.log(data, "raj");

  useEffect(() => {
    handleData();
  }, []);

  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };
  const handleData = async () => {
    const url = `${baseurl}/cdrdetailreport?cuid=${callerId}`;
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
        setData(usersresult); //masterdata
      } else {
        setData([]); //clear the group data
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getConferenceMatch = (eachItem, val) => {
  //   if (val === 0 || eachItem.uniqueid !== data[val - 1].uniqueid) {
  //     return val + 1;
  //   }
  //   return val;
  // };

  const getConferenceMatch = (eachItem, val) => {
    const index = uniqueIds.indexOf(eachItem.uniqueid);
    return index + 1;
  };

  const getPulses = (endTime, startTime) => {
    const timestamp1 = new Date(endTime);
    const timestamp2 = new Date(startTime);
    // console.log(timestamp2, 'stamp');

    const timeDifferenceInSeconds = (timestamp1 - timestamp2) / 1000;
    console.log("Time difference in seconds:", timeDifferenceInSeconds);
    return timeDifferenceInSeconds;
  };

  function formatDate(inputDateStr) {
    // Create a Date object from the input string
    const inputDate = new Date(inputDateStr);

    // Extract the components (year, month, day, hours, minutes, seconds)
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getSeconds()).padStart(2, "0");

    // Create the desired formatted string
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }


  ////conver csv file and import////////
  const csvHeaders = [
    { label: 'CallerId', key: 'CallerId' },
    { label: 'Name', key: 'Name' },
    { label: 'ContactNumber', key: 'ContactNumber' },
    { label: 'Status', key: 'Status' },
    { label: 'EntryDate', key: 'EntryDate' },
    { label: 'EndDate', key: 'EndDate' },
  ];

  function prepareCSVData(detailedreport) {

    console.log(detailedreport, 'detailedreport');
    const csvData = [];
    //Loop through the values of the conferenceSummaries object
    //const recordings = detailedreport.recordings || []; // Ensure recordings is an array or initialize it as an empty array
    console.log(detailedreport.dialer_status, 'UNIQUEID')
    data.forEach((detailedreport) => {
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

    return { data: csvData, headers: csvHeaders }; // Use csvHeaders here
  }

  return (
    <div style={{ width: "90vw", textAlign: "center", padding: "25px" }}>
      <div className="d-flex flex-row justify-content-around">
        <h4 style={{ color: "green", fontSize: "22px" }}>
          Conference Detailed Report
        </h4>
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
            data={prepareCSVData(data).data}
            headers={csvHeaders} // Use csvHeaders here
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
        <Link to={`/gerreport`}>
          <button className="btn btn-primary my-2">Back</button>
        </Link>
      </div>
      <div style={tableResponsiveStyle}>

        <table class="table  table-bordered">
          <thead style={{ ...tableHeadThStyle, background: "#192A53", color: "#fff", position: 'sticky', top: '0' }} className="text-center">
            <tr style={{ fontSize: "14px", background: "grey", color: "white" }}>
              <th style={{ fontWeight: "normal" }} scope="col">
                S.No
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Unique Caller Id
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Name
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Contact No
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Status
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Entry Date
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                End Date
              </th>
              <th style={{ fontWeight: "normal" }} scope="col">
                Pulses
              </th>
              {/* <th scope="col">Server Ip</th>    */}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData.map((eachItem, val) => (
                <tr style={{ height: "0", fontSize: "12px" }}>
                  <td>{val + 1}</td>
                  <td>{eachItem.uniqueid}</td>
                  <td>{eachItem.contact_display_name}</td>
                  <td>{eachItem.phone_number}</td>
                  <td>
                    {eachItem.dialer_status === 'CANCEL' ? 'UNANSWERED' :
                      eachItem.dialer_status === 'CHANUNAVAIL' ? 'NOT AVAILABLE' :
                        eachItem.dialer_status === 'CONGESTION' ? 'BUSY' : eachItem.dialer_status}
                  </td>
                  <td>{formatDate(eachItem.entry_date)}</td>
                  <td>{formatDate(eachItem.end_date)}</td>
                  <td>{getPulses(eachItem.end_date, eachItem.entry_date)}</td>
                  {/* <td>{eachItem.server_ip}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
