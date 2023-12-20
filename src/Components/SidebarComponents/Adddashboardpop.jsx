import React, { useState } from 'react'
import { Modal, Button, NavLink } from 'react-bootstrap';
import NavTabs from '../NavTabs/NavTabs';

const Adddashboardpop = () => {

    const [show, setShow] = useState(false);
    

    const ModalToggle = () => {
        setShow(!show);
    }


    return (
        <div className='text-center'>
            <div className='text-center' onClick={ModalToggle}>
                <h4 className='text-center btn btn-outline-light my-2'>AddGroups<span><i className="fa fa-plus"></i></span> </h4>
            </div>
            {
                show && (
                    <div className='text-center'>
                        <Modal show={true}  centered  className="transparent-modal-background">
                            <Modal.Header>
                            
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    <NavTabs  />
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

export default Adddashboardpop