import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Navigate } from 'react-router-dom';
import AddTask from "./AddTask";
import TeamMember from "./TeamMember";
import Modal from 'react-modal';
import { IoCloseCircleOutline } from "react-icons/io5";

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
];

const EmployeesList = props => {
  
  const [personToAddTask, setPersonToAddTask] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const taskCreate = (email) => {
    if (!isOpen) {
      const onePerson = people.filter(each =>
        each.email === email
      );
      setPersonToAddTask(onePerson);
      console.log(personToAddTask);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const isLoggedIn = localStorage.getItem('email');
  console.log(isLoggedIn);
  if (isLoggedIn === null) {
    return <Navigate to="/login" />;
  }

 

  const team = () => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            Responsible For Following Employees
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {people.map((member) => (
            <TeamMember key={member.email} taskCreate={taskCreate} member={member} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="ml-10 mr-10">
      <div className="mb-6">
              <Link to="/AssignedTasks" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <HiArrowLongLeft className="mr-2 h-6 w-6" />
                Back to tasks
              </Link>
            </div>
            {team()}
            <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
                <IoCloseCircleOutline className="h-8 w-8" />
              </button>
            </div>
            <AddTask taskCreate={() => setIsOpen(false)} personToAddTask={personToAddTask} />
          </div>
        </div>
      </Modal>
    </div>


    
  );
};

export default EmployeesList;
