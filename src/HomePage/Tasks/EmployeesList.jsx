
import React, {useState} from "react"
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import {Navigate } from 'react-router-dom';

import AddTask from './AddTask'
import TeamMember from "./TeamMember";
// import Modal from 'react-modal';


// const person={
//     id:1,
//     name:"krupa sekhar ummadisetti",
//     dateOfHired:"2022-05-02",
//     location:"Banglore",
//     department:"DIgital",
//     role:"IT",
//     mobile:"+91 8374546316",
//     email:"ksekhar@middlewaretalents.com",
//     image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
// }
const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]


const EmployeesList=props=>{
    const [tab, setTab]=useState(true)
    const [personToAddTask, setPersonToAddTask]=useState()
    const [isOpen, setIsOpen] = useState(false);

    const taskCreate=(email)=>{    //Used to create task
        if(!isOpen){
            const onePerson=people.filter(each=>
                each.email===email    //Used to filter person to assign task
            )

            setPersonToAddTask(onePerson)
            console.log(personToAddTask)
            setIsOpen(true);
        }
        else{
            setIsOpen(false)
        }
    }
    const isLoggedIn = localStorage.getItem('email');
    console.log(isLoggedIn)
    if (isLoggedIn===null){
        return <Navigate to="/login"/>
    };


/* this function used to change tab personal details or team details */
    const changeTab=()=>{
        setTab(!tab)
    }

    const team=()=>{
       return <div>

        <div className="my-8 flex items-center text-4xl text-black-500">
        Responsible For Following Employees:
                    </div>
        <ul  className="divide-y divide-gray-100">                {/* This Function returns Team */}
        {people.map((member) => (
          <TeamMember taskCreate={taskCreate} member={member}/>
        ))}
      </ul>

      </div>
    }
    // const customStyles = {
    //     content: {
    //       width: '40vw',
    //       height: '80vh',
    //       margin: 'auto',
    //       top: '80%',
    //       left: '40%',
    //       transform: 'translate(-50%, -50%)',
    //     },
    //   };

  const empList=()=>{
      return <div className="flex flex-col">
                     <div className="pt-5 p-6">
                     <h2 className="text-4xl font-bold leading-7 text-gray-900 sm:truncate sm:text-5xl sm:tracking-tight">
                                 Overview
                             </h2>


                             <div>
                                 <Link to="/AssignedTasks">
                                 <button className="text-blue-800 flex flex-row justify-start items-center mt-8 mr-4" onClick={changeTab}><HiArrowLongLeft />
                                 <p className="mr-4">Back to tasks</p></button></Link>{team()}
                         </div>
                     </div>
                     <div>

             {/*       <Modal isOpen={isOpen}  style={customStyles}> {/*popup to open task form*/} */}
             {/*         <div className="flex flex-col justify-center items-center"> */}
             {/*         <button onClick={taskCreate} type="button" className="self-end text-red-600"><IoCloseCircleOutline className="size-12"/></button> */}
             {/*       <AddTask taskCreate={taskCreate} personToAddTask={personToAddTask}/> */}
             {/*         </div> */}
             {/*       </Modal> */}
                 </div>
                 </div>
      }

    return <div>
        {isOpen ? <AddTask taskCreate={taskCreate} personToAddTask={personToAddTask}/>:empList()}
        </div>
}

export default EmployeesList