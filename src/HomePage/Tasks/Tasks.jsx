
import React, { useState } from 'react';

import AssignedTasks from './AssignedTasks';
import MyTasks from './MyTasks';


const Badges=()=>{
    const [isTrue, setIsTrue]=useState(true);
    let btn1="border border-gray-950 rounded-lg w-80";
    let btn2="bg-blue-700 rounded-lg text-white w-80";


    return(
        <div>
            <div className="flex row justify-center space-x-20">
            <button className={isTrue ? `${btn2}`: `${btn1}`} onClick={()=>setIsTrue(true)}>Assigned Tasks</button>
            <button className={isTrue ? `${btn1}`: `${btn2}`} onClick={()=>setIsTrue(false)}>Recieved Tasks</button>
        </div>
        <div>
                {isTrue ? <AssignedTasks/>:<MyTasks/>}
            </div>
        </div>
    )

}

export default Badges