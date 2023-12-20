import React from 'react'

const Subaccountbody=()=>{

    return (
        <div>
            <p style={{color:"#192A53", fontWeight:'bold'}}>Sub Account Type</p>
            <form>
                <div  className='d-flex mb-2'>
                <div style={{marginRight:'25px'}} className='d-flex align-items-center'>
                <input id="quota" className='m-2' checked type="checkbox"/>
                <label htmlFor='quota'>Quota</label>

            </div>

            <div className='d-flex align-items-center'>
                <input id="pool" className='m-2' type="checkbox"/>
                <label htmlFor='pool'>Pool</label>

            </div>
                </div>
            <lable >Name</lable>
            <input placeholder='Name' className='form-control mb-3' type="text"/>

            <lable>Transfer Amount</lable>
            <input placeholder='Transfer Amount' className='form-control mb-3' type="text"/>

            <lable>Registered Mobile Number</lable>
            <input placeholder='Registered Mobile Number' className='form-control mb-3' type="text"/>

            <lable>Max Member Limit</lable>
            <input placeholder='Max Member Limit' className='form-control mb-3' type="text"/>

            </form>
            
        </div>

    )
}

export default Subaccountbody;
