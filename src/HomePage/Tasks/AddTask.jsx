import { useState } from 'react';
import axios from "axios";


// Main component for adding a task
export default function AddTask(props) {
  // Destructure props to get taskCreate function and personToAddTask data
  const { taskCreate, personToAddTask } = props;

  // State variables to hold form data and status
  const [personName, setName] = useState(personToAddTask[0]?.name || ""); // Get name from personToAddTask or default to empty
  const [email, setEmail] = useState(personToAddTask[0]?.email || ""); // Get email from personToAddTask or default to empty
  const [taskName, setTaskName] = useState(""); // Task title
  const [taskDetails, setTaskDetails] = useState(""); // Task details
  const [effectiveDate, setEffectiveDate] = useState(""); // Effective date for the task
  const [dueDate, setDueDate] = useState(""); // Due date for the task
  const [isLoading, setIsLoading] = useState(false); // Loading state for the form submission
  const [isError, setIsError] = useState(false); // Error state for form validation

  // Function to handle form submission
  const taskCreated = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Create task details object to send to the API
    const taskDetailsd = {
      taskAssignedFrom: localStorage.getItem('email'), // Email of the person creating the task
      personName,
      personEmail: email,
      taskName,
      taskDetails,
      effectiveDate,
      dueDate,
    };

    // Check if mandatory fields are filled
    if (taskName !== "" && taskDetails !== "") {
      setIsLoading(true); // Set loading state
      try {
        // Send POST request to the API to create the task
//         axios.post("http://localhost:8091/apis/employees/notifications",{
//           "notificationType":"Tasks",
//           "notification":"you hava a new task, click here to see task details",
//           "notificationTo":email,
//           "isRead":false
//       })
        await axios.post("https://talents-backebd3.azurewebsites.net/apis/employees/tasks", {
          taskAssignedFrom: localStorage.getItem('email'),
          personName,
          personEmail: email,
          taskName,
          taskDetails,
          effectiveDate,
          dueDate,
          taskStatus: false, // Initial task status
        });

        // If successful, reset error state and close the modal
        setIsError(false);
        console.log(taskDetailsd);
        taskCreate(); // Call taskCreate function to refresh or close the modal
      } catch (error) {
        console.error("Error creating task:", error);
        setIsError(true); // Set error state on failure
      } finally {
        setIsLoading(false); // Reset loading state
      }
    } else {
      setIsError(true); // Set error state if mandatory fields are empty
    }
  };

  return (
    <form action="#" method="POST" onSubmit={taskCreated} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {/* Full Name Input */}
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-2xl font-semibold leading-6 text-gray-900">
            Full name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="fullName"
              id="fullName"
              autoComplete="given-name"
              value={personName}
              onChange={event => setName(event.target.value)} // Update name state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-2xl sm:leading-6"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-2xl font-semibold leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)} // Update email state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6"
            />
          </div>
        </div>

        {/* Task Title Input */}
        <div className="sm:col-span-2">
          <label htmlFor="taskTitle" className="block text-2xl font-semibold leading-6 text-gray-900">
            Task Title <span className='text-red-600'>*</span>
          </label>
          <div className="relative mt-2.5">
            <input
              type="text"
              name="taskTitle"
              id="taskTitle"
              autoComplete="off"
              value={taskName}
              onChange={event => setTaskName(event.target.value)} // Update task name state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6"
            />
          </div>
        </div>

        {/* Task Details Textarea */}
        <div className="sm:col-span-2">
          <label htmlFor="taskDetails" className="block text-2xl font-semibold leading-6 text-gray-900">
            Task Details <span className='text-red-800'>*</span>
          </label>
          <div className="mt-2.5">
            <textarea
              name="taskDetails"
              id="taskDetails"
              rows={5}
              value={taskDetails}
              onChange={event => setTaskDetails(event.target.value)} // Update task details state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6"
              defaultValue={''}
            />
          </div>
        </div>

        {/* Effective Date Input */}
        <div className="sm:col-span-2">
          <label htmlFor="effectiveDate" className="block text-2xl font-semibold leading-6 text-gray-900">
            Effective Date
          </label>
          <div className="relative mt-2.5">
            <input
              type="date"
              name="effectiveDate"
              id="effectiveDate"
              value={effectiveDate}
              onChange={event => setEffectiveDate(event.target.value)} // Update effective date state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6"
            />
          </div>
        </div>

        {/* Due Date Input */}
        <div className="sm:col-span-2 md:row-span-2">
          <label htmlFor="dueDate" className="block text-2xl font-semibold leading-6 text-gray-900">
            Due Date
          </label>
          <div className="relative mt-2.5">
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={dueDate}
              onChange={event => setDueDate(event.target.value)} // Update due date state on change
              className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-2xl sm:leading-6"
            />
          </div>
        </div>
      </div>

      {/* Submit Button and Feedback Messages */}
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Task
        </button>
        {isLoading && <p className='text-blue-600'>Please Wait....</p>} {/* Loading message */}
        {isError && <p className='text-red-600'>*Please Fill Mandatory Fields</p>} {/* Error message */}
      </div>
    </form>
  );
}
