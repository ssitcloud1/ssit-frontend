import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./loader.js";
import Calendar from "react-calendar";
import Pagination from './Pagination';

const ManagerTimesheets = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [counts, setCounts] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const managerId = "MTL1001";

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get(`https://harhsa-backend.azurewebsites.net/api/timesheets/list/manager/${managerId}`);
      setSubmissions(data);
      setFilteredSubmissions(data.reverse());
      setCounts({
        total: data.length,
        pending: data.filter((sub) => sub.status === "PENDING").length,
        approved: data.filter((sub) => sub.status === "APPROVED").length,
        rejected: data.filter((sub) => sub.status === "REJECTED").length,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 50000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 576 ? 2 : window.innerWidth < 768 ? 3 : 5);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleFilter = (status) => {
    if (status === "ALL") {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(submissions.filter((sub) => sub.status === status));
    }
  };

  const handleShow = (id) => { setCurrentId(id); setComments(""); setShowModal(true); };
  const handleClose = () => setShowModal(false);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await axios.put(`https://harhsa-backend.azurewebsites.net/api/timesheets/Approve/${id}/status/APPROVED`);
      fetchSubmissions();
    } catch (error) {
      console.error("Error approving timesheet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await axios.put(`https://harhsa-backend.azurewebsites.net/api/timesheets/reject/${currentId}/status/REJECTED/comments/${comments}`);
      fetchSubmissions();
      handleClose();
    } catch (error) {
      console.error("Error rejecting timesheet:", error);
    } finally {
      setLoading(false);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastSubmission = currentPage * itemsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstSubmission, indexOfLastSubmission);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      {loading && <Loader />}
      <div className="max-w-full mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-4xl font-bold text-gray-900">Submitted Timesheets</h2>
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                {showCalendar ? "Hide Calendar" : "Show Calendar"}
              </button>
            </div>

            {showCalendar && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-4">
                  <Calendar onChange={setDate} value={date} className="rounded-lg shadow-md" />
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-xl">
              {["TOTAL REQUESTS", "APPROVED", "PENDING", "REJECTED"].map((status) => (
                <div
                  key={status}
                  onClick={() => handleFilter(status === "TOTAL REQUESTS" ? "ALL" : status)}
                  className={`p-4 rounded-lg text-xl shadow-md cursor-pointer transition duration-300 ease-in-out ${
                    status === "TOTAL REQUESTS"
                      ? "bg-blue-100 hover:bg-blue-200"
                      : status === "APPROVED"
                      ? "bg-gray-100 hover:bg-gray-200"
                      : status === "PENDING"
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  <h3 className="font-semibold text-gray-800">{capitalizeFirstLetter(status)}</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {status === "TOTAL REQUESTS" ? counts.total : counts[status.toLowerCase()]}
                  </p>
                </div>
              ))}
            </div>

            {currentSubmissions.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Start Date", "End Date", "Employee Name", "Client Name", "Project Name", "Total Hours", "Status", "Actions"].map((col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.employeeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.projectName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{submission.totalNumberOfHours}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-lg leading-5 font-semibold rounded-full ${
                              submission.status === "APPROVED"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "REJECTED"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">
                          {submission.status !== "APPROVED" && submission.status !== "REJECTED" && (
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => handleApprove(submission.id)}
                              >
                                Accept
                              </button>
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => handleShow(submission.id)}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">No submissions found.</p>
            )}

            <div className="mt-6">
              <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Comments</h2>
            <textarea 
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              rows={3} 
              value={comments} 
              onChange={(e) => setComments(e.target.value)} 
              placeholder="Write your comments here"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleClose}
                className="bg-gray-200 text-lg text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Close
              </button>
              <button
                onClick={handleReject}
                className="bg-blue-600 text-lg text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                disabled={loading}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerTimesheets;

