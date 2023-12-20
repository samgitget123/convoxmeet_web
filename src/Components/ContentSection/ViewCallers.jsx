import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import styled from 'styled-components'
//import { GrSort } from 'react-icons/gr';
import MyContext from '../MyContext';
import { RotatingLines } from 'react-loader-spinner';
import { MdSearchOff } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { HiUserRemove } from 'react-icons/hi';
import {CgProfile} from 'react-icons/cg';
// import { Alert } from 'react-bootstrap';
// import { FcList } from 'react-icons/fc';
import { SlRefresh } from 'react-icons/sl'
import { MyServerContext } from '../Contexts/SeverContexts';
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
const ViewCallers = () => {
  const { baseurl } = useContext(MyServerContext);
  const params = useParams()
  const callerId = params.id;
  const [viewCallersdata, setViewCallersData] = useState([]);
  const [search, setSearch] = useState("");
  const [apiStatus, setApiStatus] = useState(0);
  const [cardView, setCardView] = useState(true);
  //////////////////////////////pagination///////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  /////////////////////////cards paginatin/////////////////////////////////////
  //const [visibleCards, setVisibleCards] = useState(10); // Initial number of cards to display
  const cardsPerPage = 10; // Number of cards to load per "Load More" click
  const totalItems = viewCallersdata.length;
  const pagesPerSet = 3; // Number of pages to display in each set
  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  //const currentData = viewCallersdata.slice(indexOfFirstCards, indexOfLastCards);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const visiblePageNumbers = [];
  const maxVisiblePages = 3; // Adjust the number of visible page numbers as needed

  for (let i = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)); i <= Math.min(totalPages, currentPage + Math.floor(maxVisiblePages / 2)); i++) {
    visiblePageNumbers.push(i);
  }

  // Calculate the indexes of the first and last cards to display on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = viewCallersdata.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  /////////////////////////////////table selections//////////////////////////////////////////////////////////
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(contact => contact.phone_number));
    }
    setSelectAll(!selectAll);
  };

  const toggleRowSelection = (phone_number) => {
    if (selectedRows.includes(phone_number)) {
      setSelectedRows(selectedRows.filter(selected => selected !== phone_number));
    } else {
      setSelectedRows([...selectedRows, phone_number]);
    }
  };
  ///////////////////
  // Accessing the mobile from useContext //
  const myValue = useContext(MyContext);
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }


  const deleteSingleContact = async (mobilevalue, groupId) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?');
    if (confirmed) {
      const url = `${baseurl}/deletesingleMgroup?gid=${groupId}&phone=${mobilevalue}`;
      try {
        const response = await fetch(url);
        const usersjson = response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        if (jsonres) {
          fetchViewCallers();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const makeanadmin = async (singlenum, groupId) => {
    const confirmed = window.confirm('Are you sure you want to add this number as admin?');
    if (confirmed) {
      const makeadminurl = `${baseurl}/makeanadmin?mobile=${myValue.userMobile}&gid=${groupId}&phonenumber=${singlenum}`;
      try {
        const response = await fetch(makeadminurl);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        const getMessage = jsonres.messages;
        const getResponse = getMessage.res;
        if (jsonres) {
          alert(getResponse)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const removeaadmin = async (singlenum, groupid) => {
    const confirmed = window.confirm('Are you sure you want to remove this number as admin?');
    if (confirmed) {
      const removeadminurl = `${baseurl}/removeanadmin?mobile=${myValue.userMobile}&gid=${groupid}&phonenumber=${singlenum}`;
      try {
        const response = await fetch(removeadminurl);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
        const getMessage = jsonres.messages;
        const getResponse = getMessage.res;
        if (jsonres) {
          alert(getResponse)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }



  const handleDeleteSelected = () => {
    // Create a new array without the selected rows
    const newData = filteredData.filter((item) => !selectedRows.includes(item.phone_number));
    setViewCallersData(newData);
    setSelectedRows([]);
  };

  const fetchViewCallers = async () => {
    try {
      const viewcallersurl = `${baseurl}/viewgroupM?phone=${myValue.userMobile}&gid=${callerId}`;
      const response = await fetch(viewcallersurl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonres = await response.json();
      if (jsonres && jsonres.messages && jsonres.messages.success) {
        setViewCallersData(jsonres.messages.success); // Assuming success contains the data you need
        setApiStatus(1);
      } else {
        setApiStatus(2);
        setViewCallersData([]);
      }
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user or retry the request.
    }
  };
  
  useEffect(() => {
    fetchViewCallers();
  }, [viewCallersdata]); //viewCallersdata
  

  const filteredData = viewCallersdata.length > 0 ? viewCallersdata.filter(val => val.contact_display_name.toLowerCase().includes(search.toLowerCase()) || val.designation.toLowerCase().includes(search.toLowerCase()) || val.state.toLowerCase().includes(search.toLowerCase()) || val.location.toLowerCase().includes(search.toLowerCase()) || val.phone_number.includes(search)) : [];
  //const filteredpagedData = currentData.length > 0 ? currentData.filter(val => val.contact_display_name.toLowerCase().includes(search.toLowerCase()) || val.designation.toLowerCase().includes(search.toLowerCase()) || val.state.toLowerCase().includes(search.toLowerCase()) || val.location.toLowerCase().includes(search.toLowerCase()) || val.phone_number.includes(search)) : [];
  const currentData = filteredData.slice(indexOfFirstCards, indexOfLastCards);

  const loadingView = () => (

    <div className="text-center my-5">  <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="60"
      visible={true}
    /></div>
  )
  const failureView = () => (
    <div style={{ color: '#192A53', fontSize: '24px' }} className='my-5 text-center'>No Contacts Available!</div>
  )
    
  const handleDeleteButtonClick = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete selected contacts?');
      if (confirmed) {

        const encodedPhoneNumbers = JSON.stringify(selectedRows);
        const url = `${baseurl}/deleteRows?mobile=${myValue.userMobile}&gid=${callerId}&phonenumbers=${encodedPhoneNumbers}`;
        const response = await fetch(url);
        const usersjson = await response.json();
        const jsonres = JSON.parse(JSON.stringify(usersjson));
      }
      setDeleteMode(false);
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteAllSelectedButtonClick = () => {
    alert('deleted')
  }
  const columns = [
    {
      name: 'Name',
      selector: row => row.contact_display_name,
      sortable: true,
      headerClass: 'custom-header-class', // Add this line
    },
    {
      name: 'Mobile',
      selector: row => row.phone_number,
      sortable: true,
    },
    {
      name: 'designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'location',
      selector: row => row.location,
      sortable: true,
    },
    {
      name: 'state',
      selector: row => row.state,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <MdOutlineAdminPanelSettings title="make admin" onClick={() => makeanadmin(row.phone_number, row.group_id)} style={row.is_admin === 1 ? { color: 'blue', cursor: 'pointer', outline: 'none', marginBottom: 6 } : { color: 'grey', cursor: 'pointer', outline: 'none', marginBottom: 6, opacity: 0.75, marginRight: "10px" }} />
          <HiUserRemove title='remove admin' onClick={() => removeaadmin(row.phone_number, row.group_id)} style={{ color: 'grey', cursor: 'pointer', outline: 'none', marginBottom: 6, opacity: 0.75, marginRight: "10px" }} />
          <RiDeleteBin5Line title='Delete' onClick={() => deleteSingleContact(row.phone_number, row.group_id)} style={{ color: 'red', cursor: 'pointer', outline: 'none', opacity: 0.75 }} />

        </div>

      )

    },
  ];
  const handleRowSelect = (row) => {
    const selectedRowIds = row.selectedRows.map((selectedRow) => selectedRow.phone_number);
    setSelectedRows(selectedRowIds);
  };
  const getListView = () => {
    return (<div className='handleCardOverflow'>

      <div style={{ fontWeight: "bold" }}>

        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          selectableRows
          onSelectedRowsChange={handleRowSelect} // Event handler for row selection
        ></DataTable>
      
      </div>
      <button className='btn' onClick={handleDeleteButtonClick} style={{ background: "#192A53", color: "#fff" }}>Delete Selected</button>
    </div>)
  }

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / cardsPerPage);
    const totalSets = Math.ceil(totalPages / pagesPerSet);

    const pages = [];
    const startPage = (Math.ceil(currentPage / pagesPerSet) - 1) * pagesPerSet + 1;
    const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          style={{ textDecoration: "none" }}
        >
          <button
            onClick={() => handlePageClick(i)}
            style={{ padding: "2px 6px" }}
          >
            {i}
          </button>
        </li>
      );
    }

    return (
      <ul className="pagination">
        <li
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}

        >
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage - 1)}
            style={{ backgroundColor: "#192A53", color: "#fff", padding: "2px 2px" }}
          >
            Prev
          </button>
        </li>
        {pages}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}

        >
          <button
            className="page-link"
            onClick={() => handlePageClick(currentPage + 1)}
            style={{ backgroundColor: "#192A53", color: "#fff", padding: "2px 2px" }}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };
  const successView = () => {
    return <>
      {filteredData.length > 0 ?
        (cardView ? (<div className='row'>
          {currentData.map((eachContact, index) => (
            <div className='col-4'>
              <div className='card mb-2 shadow'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-3'>
                    <CgProfile style={{ height: '50px', width: '50px' , color:"grey" }} />
                     {/*<img style={{ height: '50px', width: '50px' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalfwXTZ4k0gu2uAFtI09jjyTGjntLVzzWjBMIsExCuSVW45O1mjkqD1ce438eq3YpWC0&usqp=CAU' alt="image" />*/}
                    </div>
                    <div className='col-7'>
                      <h4 style={{ color: '#000', fontFamily: 'Roboto', fontSize: '18px' }}>{eachContact.contact_display_name} </h4>
                      <div className='d-flex flex-row'>
                        {/* <i style={{ color: "grey", marginRight: "5px" }} class="fa-solid fa-mobile"></i> */}
                        <IoIosPhonePortrait style={{ color: "#192A53", marginRight: "5px", marginTop: '1px', }} />
                        <span style={{ color: "grey", fontSize: "15px", paddingBottom: '5px' }}>{eachContact.phone_number}</span>
                      </div>
                    </div>
                    <div className='col-2'>
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <MdOutlineAdminPanelSettings onClick={() => makeanadmin(eachContact.phone_number, eachContact.group_id)} style={eachContact.is_admin == 1 ? { color: 'blue', cursor: 'pointer', outline: 'none', marginBottom: 6 } : { color: 'grey', cursor: 'pointer', outline: 'none', marginBottom: 6, opacity: 0.75 }} />
                        <HiUserRemove onClick={() => removeaadmin(eachContact.phone_number, eachContact.group_id)} style={{ color: 'grey', cursor: 'pointer', outline: 'none', marginBottom: 6, opacity: 0.75 }} />
                        <RiDeleteBin5Line onClick={() => deleteSingleContact(eachContact.phone_number, eachContact.group_id)} style={{ color: 'grey', cursor: 'pointer', outline: 'none', opacity: 0.75 }} />
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>

            </div>
          ))}   <div className="d-flex justify-content-end">
            {renderPagination()}
          </div></div>) : getListView())
        : <div className='my-5 text-center'><MdSearchOff style={{ color: '#192A53', height: '100%', width: '120px' }} />
          <div style={{ color: '#192A53', fontSize: '24px' }}>Not Found</div>
        </div>}

    </>
  }

  const renderGroups = () => {
    switch (apiStatus) {
      case 0:
        return loadingView();
      case 1:
        return successView()
      case 2:
        return failureView();
      default:
        return null;
    }
  }

  const handleGridView = () => {
    setCardView(!cardView);
  }
  //refresh app
  const handleRefreshClick = () => {
    window.location.reload();
  };
  return (
    <div style={{ width: "100%", textAlign: "justify", padding: "20px 40px", background: "#d5e8e7", }}>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <form className="d-flex mb-3" role="search">
              <input value={search} onChange={handleSearch} className="form-control me-2" type="search" placeholder="Search" />

              <label style={{ height: '32px', width: '146px', backgroundColor: '#192A53', color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '12px', marginTop: "4px" }}>{filteredData.length} Members</label>
              {/* <button  style={{ border: 'none', marginLeft: '12px', background:"none" }}><FcList  style={{fontSize:"32px"}} onClick={handleView}/></button> */}
              <select style={{ marginLeft: "11px", height: "33px", marginTop: "4px", color: "blue", border: "1px solid green", borderRadius: "5px", backgroundColor: "#192A53", color: "#fff", padding: "4px 2px" }} onChange={handleGridView}>
                <option >Grid View</option>
                <option  >List View</option>
              </select>
              {/*<div style={{marginLeft:"10px" , padding: "4px 2px" }}><SlRefresh onClick={handleRefreshClick}/><span></span></div>*/}
            </form>
          </div>
        </div>

        <div className='handleCardOverflow'>
          <div>{renderGroups()}</div>
        </div>
      </div>

    </div>
  );
}

export default ViewCallers
