
import React, { useState } from 'react';

import LeaveEmployee from './LeaveEmployee';
import LeaveApprovalDashboard from './LeaveAdmin'


const LeaveMain=()=>{
    const [isTrue, setIsTrue]=useState(true);
    let btn1="border border-gray-950 rounded-lg w-80";
    let btn2="bg-blue-700 rounded-lg text-white w-80";


    return(
        <div>
            <div className="flex row justify-center space-x-20 pb-10">
            <button className={isTrue ? `${btn2}`: `${btn1}`} onClick={()=>setIsTrue(true)}>Submitted Leaves</button>
            <button className={isTrue ? `${btn1}`: `${btn2}`} onClick={()=>setIsTrue(false)}>Received Leaves</button>
        </div>
        <div>
                {isTrue ? <LeaveEmployee/>:<LeaveApprovalDashboard/>}
            </div>
        </div>
    )

}

export default LeaveMain