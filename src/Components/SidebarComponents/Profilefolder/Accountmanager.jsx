import React, { useState } from 'react'
import { Modal, Button, NavLink } from 'react-bootstrap';
import Accountmanagerbody from './Accountmanagerbody';

// import NavTabs from '../NavTabs/NavTabs';

const SubAccount = {
    padding: "8px 16px",
    borderRadius: "16px",
    backgroundColor: "slateblue",
    color: "white",
    textDecoration: "none",
    border:'none'
  }



const Accountmanager = () => {

    const [show, setShow] = useState(false);

    const ModalToggle = () => {
        setShow(!show);
    }


    return (
        <div className='text-center'>
            <div className='text-center' onClick={ModalToggle}>
                <button style={SubAccount}   className=' subaccount '>Account Manager </button>
            </div>
            {
                show && (
                    <div className='text-center'>
                        <Modal show={true}>
                            <Modal.Header>
                            
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    <Accountmanagerbody/>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={ModalToggle}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            }


        </div>
    )
}

export default Accountmanager;
