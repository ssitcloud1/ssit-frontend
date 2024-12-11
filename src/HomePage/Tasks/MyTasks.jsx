import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyTaskItem from './MyTaskItem';
import {Navigate } from 'react-router-dom';



const MyTasks=props=>{
    const [data, setData] = useState(null);
    const [isLoading, setLoading]=useState(false);

    const [taskType, setTaskType]=useState("allTasks");
    const tab=false;


    useEffect(() => {
      const fetchData = async () => {
          const email=localStorage.getItem('email');
        try {
          const response = await axios.get(`https://talents-backebd3.azurewebsites.net/apis/employees/tasksAssignedTo/${email}`);
          let filteredData;

          if(tab){
            filteredData=response.data.filter(each=>
              each.taskStatus===true
            )
          }
          else{
            filteredData=response.data.filter(each=>
              each.taskStatus===false
            )
          }
          setData(filteredData);
          setLoading(true)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    });
    console.log(data);




  const isLoggedIn = localStorage.getItem('email');
  console.log(isLoggedIn)
  if (isLoggedIn===null){
      return <Navigate to="/login"/>
  };


  const table=()=>{
    return(
        <div>
        <table className="min-w-full divide-y divide-gray-200 mt-10">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Assigned By
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Task Details
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Effective Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                       Due Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                       Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {data.map(each => (
                                    <MyTaskItem key={each.id} each={each} />
                                ))}
                                </tbody>
                            </table>
    </div>
    )
  }

  const taskTypeChange=(event)=>{


    const fetchData = async () => {
    setTaskType(event.target.value);
      const email=localStorage.getItem('email');
      let url;
    if(event.target.value==="allTasks"){
      url=`https://talents-backebd3.azurewebsites.net/apis/employees/tasksAssignedTo/${email}`;
      console.log(1);
    }
    else if(event.target.value==="overdueTasks"){
      url=`https://talents-backebd3.azurewebsites.net/apis/employees/OverdueTasks/PersonEmail/${email}`;
      console.log(2);
    }
    else if(event.target.value==="pendigTasks"){
      url=`https://talents-backebd3.azurewebsites.net/apis/employees/PendingTasks/PersonEmail/${email}`;
      console.log(2);
    }
    else if(event.target.value==="completedTasks"){
      url=`https://talents-backebd3.azurewebsites.net/apis/employees/CompletedTasks/PersonEmail/${email}`;
      console.log(2);
    }
    console.log(taskType);
    console.log(url);


    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  }



  return (<div>
    <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                    Tasks Assigned to you
                </h2>
                <div className='flex flex-row mt-5 mb-5'>
<select
            value={taskType}
            onChange={taskTypeChange}
            className="ml-5 border border-gray-300 rounded-md"
          >
            <option selected  value="allTasks">All Tasks</option>
            <option  value="pendigTasks">Pending Tasks</option>
            <option value="overdueTasks">Overdue Tasks</option>
            <option value="completedTasks">Completed Tasks</option>
          </select>
    </div>
    {isLoading && table()}
  </div>)
}

export default MyTasks