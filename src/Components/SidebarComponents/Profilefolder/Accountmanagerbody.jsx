import React from 'react'

const Accountmanagerbody = () => {
  return (
    <div>
    <p style={{color:"#192A53", fontWeight:'bold'}}>Add Account Manager</p>
    <form>
       
    <lable >Name</lable>
    <input placeholder='Name' className='form-control mb-3' type="text"/>

   

    <lable>Mobile Number</lable>
    <input placeholder='Enter Registered Mobile Number' className='form-control mb-3' type="text"/>

    

    </form>
    
</div>

  )
}

export default Accountmanagerbody