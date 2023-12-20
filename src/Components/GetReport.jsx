import React, { useState } from 'react'
import { Modal, Button, NavLink } from 'react-bootstrap';
import Report from './Report';

const GetReport = () => {

    const [show, setShow] = useState(false);
    

    const ModalToggle = () => {
        setShow(!show);
    }


    return (
        <div className='text-center'>
            <div className='text-center' onClick={ModalToggle}>
                <h4 className='text-center btn btn-outline-light my-2'>Get Report</h4>
            </div>
            {
                show && (
                    <div className='text-center'>
                        <Modal show={true}>
                            <Modal.Header>
                            
                            </Modal.Header>
                            <Modal.Body>
                                {
                                    <Report  />
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

export default GetReport