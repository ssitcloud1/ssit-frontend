import React, { useEffect, useState} from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { Navigate } from 'react-router-dom';
import Modal from 'react-modal';
import UpdateTasks from './UpdateTasks';

import { FaSearch } from 'react-icons/fa';
import { PlusIcon } from "@heroicons/react/16/solid";
import { Link } from 'react-router-dom';

const AssignedTasks = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState(null);

  const [searchValue, setSearchValue] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [taskType, setTaskType] = useState("allTasks");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [itemsPerPage] = useState(5);  // Items per page (can be adjusted)

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      let url;

      if (taskType === "allTasks") {
        url = `http://localhost:8085/apis/employees/tasksAssignedBy/${email}`;
      } else if (taskType === "overdueTasks") {
        url = `http://localhost:8085/apis/employees/OverdueTasks/AssignedFrom/${email}`;
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [taskType]);  // Rerun the effect when taskType changes

  const isLoggedIn = localStorage.getItem('email');
  if (isLoggedIn === null) {
    return <Navigate to="/login" />
  }

  // Function to handle task deletion
  const deleteTask = async (id) => {
    setDeleteId(id);
    setIsDelete(true);
  }

  const no = () => {
    setIsDelete(false);
  }

  const confirmDelete = async () => {
    const id = deleteId;
    await axios.delete(`http://localhost:8085/apis/employees/tasks/${id}`);

    // Refresh data after deletion
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      let url;

      if (taskType === "allTasks") {
        url = `http://localhost:8085/apis/employees/tasksAssignedBy/${email}`;
      } else if (taskType === "overdueTasks") {
        url = `http://localhost:8085/apis/employees/OverdueTasks/AssignedFrom/${email}`;
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(true);
        setIsDelete(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }

  const taskUpdate = async (taskId) => {
    if (!isOpen) {
      try {
        const response = await axios.get(`http://localhost:8085/apis/employees/tasks/${taskId}`);
        setTaskData(response.data);
        setLoading(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setIsOpen(true);
    } else {
      const fetchData = async () => {
        const email = localStorage.getItem('email');
        let url;

        if (taskType === "allTasks") {
          url = `http://localhost:8085/apis/employees/tasksAssignedBy/${email}`;
        } else if (taskType === "overdueTasks") {
          url = `http://localhost:8085/apis/employees/OverdueTasks/AssignedFrom/${email}`;
        }

        try {
          const response = await axios.get(url);
          setData(response.data);
          setLoading(true);
          setIsDelete(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
      setIsOpen(false);
    }
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the items to display on the current page
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = data?.slice(indexOfFirstTask, indexOfLastTask) || [];

  // Function to handle task type change
  const taskTypeChange=(event)=>{


      const fetchData = async () => {
      setTaskType(event.target.value);
      setCurrentPage(1);
        const email=localStorage.getItem('email');
        let url;
      if(event.target.value==="allTasks"){
        url=`http://localhost:8085/apis/employees/tasksAssignedBy/${email}`;
        console.log(1);
      }
      else if(event.target.value==="overdueTasks"){
        url=`http://localhost:8085/apis/employees/OverdueTasks/AssignedFrom/${email}`;
        console.log(2);
      }
      else if(event.target.value==="pendingTasks"){
        url=`http://localhost:8085/apis/employees/PendingTasks/AssignedFrom/${email}`;
        console.log(2);
      }
      else if(event.target.value==="completedTasks"){
        url=`http://localhost:8085/apis/employees/CompletedTasks/AssignedFrom/${email}`;
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

  const table = () => {
    const searchData = currentTasks.filter(each =>
      each.personName.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div> {isOpen ? <UpdateTasks taskUpdate={taskUpdate} taskData={taskData} />:
      <div>

{/*           <Transition appear show={isOpen} as={Fragment}> */}
{/*                 <Dialog as="div" className="relative z-10" onClose={setIsOpen}> */}
{/*                   <Transition.Child */}
{/*                     as={Fragment} */}
{/*                     enter="ease-out duration-300" */}
{/*                     enterFrom="opacity-0" */}
{/*                     enterTo="opacity-100" */}
{/*                     leave="ease-in duration-200" */}
{/*                     leaveFrom="opacity-100" */}
{/*                     leaveTo="opacity-0" */}
{/*                   > */}
{/*                     <div className="fixed inset-0 bg-black bg-opacity-25" /> */}
{/*                   </Transition.Child> */}

{/*                   <div className="fixed inset-0 overflow-y-auto overflow-x-auto"> */}
{/*                     <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center"> */}
{/*                       <Transition.Child */}
{/*                         as={Fragment} */}
{/*                         enter="ease-out duration-300" */}
{/*                         enterFrom="opacity-0 scale-95" */}
{/*                         enterTo="opacity-100 scale-100" */}
{/*                         leave="ease-in duration-200" */}
{/*                         leaveFrom="opacity-100 scale-100" */}
{/*                         leaveTo="opacity-0 scale-95" */}
{/*                       > */}
{/*                         <Dialog.Panel className="max-w-full w-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"> */}
{/*                            */}
{/*                           <div className="mt-10 w-lg"> */}

{/*                   </div> */}
{/*                         </Dialog.Panel> */}
{/*                       </Transition.Child> */}
{/*                     </div> */}
{/*                     <button onClick={taskUpdate} type="button" className="self-end text-red-600"> */}
{/*                                    <IoCloseCircleOutline className="size-12" /> */}
{/*                                  </button> */}
{/*                                  <UpdateTasks taskUpdate={taskUpdate} taskData={taskData} /> */}
{/*                   </div> */}
{/*                 </Dialog> */}
{/*               </Transition> */}
{/*         <Modal isOpen={isOpen} style={customStyles}> */}
{/*           <div className="flex flex-col justify-center items-center"> */}
{/*             <button onClick={taskUpdate} type="button" className="self-end text-red-600"> */}
{/*               <IoCloseCircleOutline className="size-12" /> */}
{/*             </button> */}
{/*             <UpdateTasks taskUpdate={taskUpdate} taskData={taskData} /> */}
{/*           </div> */}
{/*         </Modal> */}
        {/* <Modal isOpen={isDelete} style={customStylesDelete}> */}
{/*           <div className="flex flex-col justify-center items-center"> */}
{/*             <h1>Do you want to delete task?</h1> */}
{/*             <div className='mt-8'> */}
{/*               <button */}
{/*                 type="button" */}
{/*                 onClick={confirmDelete} */}
{/*                 className="ml-5 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-md hover:bg-red-700" */}
{/*               > */}
{/*                 Yes */}
{/*               </button> */}
{/*               <button */}
{/*                 type="button" */}
{/*                 onClick={no} */}
{/*                 className="ml-5 px-6 py-3 bg-white-500 border-current border text-black text-lg font-semibold rounded-md hover:bg-white-700 border-solid" */}
{/*               > */}
{/*                 No */}
{/*               </button> */}
{/*             </div> */}
{/*           </div> */}
{/*         </Modal> */}

<Modal isOpen={isDelete} style={customStylesDelete}>
          <div className="flex flex-col justify-center items-center">
            <h1>Do you want to delete task?</h1>
            <div className='mt-8'>
              <button
                type="button"
                onClick={confirmDelete}
                className="ml-5 px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={no}
                className="ml-5 px-6 py-3 bg-white-500 border-current border text-black text-lg font-semibold rounded-md hover:bg-white-700 border-solid"
              >
                No
              </button>
            </div>
          </div>
        </Modal>

        <table className="min-w-full divide-y divide-gray-200 mt-10">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Task Details
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Effective Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchData.map(each => (
              <TaskItem key={each.id} each={each} deleteTask={deleteTask} taskUpdate={taskUpdate} />
            ))}
          </tbody>
        </table>

        {/* Pagination controls */}
        <div className="flex justify-center mt-5">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= data.length}
          >
            Next
          </button>
        </div>
      </div>}</div>
    );
  };



  const customStylesDelete = {
    content: {
      width: '40vw',
      height: '20vh',
      margin: 'auto',
      top: '20%',
      left: '30%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <div className='flex flex-row'>
        <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
          Tasks assigned by you
        </h2>
      </div>

      <div className='flex flex-row mt-5 mb-5'>
        <Link to="/CreateTask">
          <button
            type="button"
            className="inline-flex ml-5 mt-5 items-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-8 w-8" aria-hidden="true" />
            Create Task
          </button>
        </Link>

        <select
          value={taskType}
          onChange={taskTypeChange}
          className="ml-5 border border-gray-300 rounded-md"
        >
          <option value="allTasks">All Tasks</option>
          <option value="pendingTasks">Pending Tasks</option>
          <option value="overdueTasks">Overdue Tasks</option>
          <option value="completedTasks">Completed Tasks</option>
        </select>

        <div className='relative flex items-center ml-5'>
          <input
            type='text'
            className='pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Employee Name'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <FaSearch className='absolute left-3 text-gray-400' />
        </div>
      </div>

      {isLoading && table()}
    </div>
  );
}

export default AssignedTasks;
