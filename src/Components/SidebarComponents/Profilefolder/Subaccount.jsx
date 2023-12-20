import React, { useState } from 'react'
import { Modal, Button, NavLink } from 'react-bootstrap';
import Subaccountbody from './Subaccountbody';
// import NavTabs from '../NavTabs/NavTabs';

const SubAccount = {
    padding: "8px 16px",
    borderRadius: "16px",
    backgroundColor: "slateblue",
    color: "white",
    textDecoration: "none",
    border:'none'
  }



const Subaccount = () => {

    const [show, setShow] = useState(false);

    const ModalToggle = () => {
        setShow(!show);
    }


    return (
        <div className='text-center'>
            <div className='text-center' onClick={ModalToggle}>
                <button style={SubAccount}   className=' subaccount '>Sub Account </button>
            </div>
            {
                show && (
                    <div className='text-center'>
                        <Modal show={true}>
                            <Modal.Header>
                            
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    <Subaccountbody/>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={ModalToggle}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            }


        </div>
    )
}

export default Subaccount;
