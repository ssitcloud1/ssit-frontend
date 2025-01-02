import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";

const EmployeeHomePage = ({
  submissions,
  setSubmissions,
  employeeId = "MTL1021",
}) => {
  const navigate = useNavigate();
  const [filteredSubmissions, setFilteredSubmissions] = useState(submissions);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 5;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `https://ssit-timesheet-backend.azurewebsites.net/api/timesheets/list/${employeeId}`
        );
        const data = response.data.reverse();
        setSubmissions(data);
        setFilteredSubmissions(data);
        setCounts({
          total: data.length,
          pending: data.filter((sub) => sub.status === "PENDING").length,
          approved: data.filter((sub) => sub.status === "APPROVED").length,
          rejected: data.filter((sub) => sub.status === "REJECTED").length,
        });
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [employeeId, setSubmissions]);

  const handleCreateTimesheet = () => navigate("/timesheet-management");
  const handleEditTimesheet = (submission) =>
    navigate("/timesheet-management", { state: { submission } });

  const handleDeleteTimesheet = async (id) => {
    try {
      await axios.delete(`https://ssit-timesheet-backend.azurewebsites.net/api/timesheets/delete/${id}`);
      const updatedSubmissions = filteredSubmissions.filter(
        (sub) => sub.id !== id
      );
      setFilteredSubmissions(updatedSubmissions);
      setSubmissions(updatedSubmissions);
      setCounts({
        total: updatedSubmissions.length,
        pending: updatedSubmissions.filter((sub) => sub.status === "PENDING")
          .length,
        approved: updatedSubmissions.filter((sub) => sub.status === "APPROVED")
          .length,
        rejected: updatedSubmissions.filter((sub) => sub.status === "REJECTED")
          .length,
      });
    } catch (error) {
      console.error("Error deleting timesheet:", error);
    }
  };

  const filterSubmissions = (status) => {
    const filtered = status
      ? submissions.filter((sub) => sub.status === status)
      : submissions;
    setFilteredSubmissions(filtered);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);
  const currentSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * submissionsPerPage,
    currentPage * submissionsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-full mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <button
                onClick={handleCreateTimesheet}
                className="col-span-1 bg-blue-600 text-white rounded-lg shadow-md py-3 px-6 hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Create Timesheet
              </button>
              <button
                onClick={() => filterSubmissions()}
                className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                All: {counts.total}
              </button>
              <button
                onClick={() => filterSubmissions("PENDING")}
                className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Pending: {counts.pending}
              </button>
              <button
                onClick={() => filterSubmissions("APPROVED")}
                className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Approved: {counts.approved}
              </button>
              <button
                onClick={() => filterSubmissions("REJECTED")}
                className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 hover:bg-gray-300 transition duration-300 ease-in-out"
              >
                Rejected: {counts.rejected}
              </button>
            </div>
            
            {currentSubmissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-900">
                          {submission.startDate} - {submission.endDate}
                        </td>
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
                                className="text-blue-600 text-xl hover:text-blue-900"
                                onClick={() => handleEditTimesheet(submission)}
                              >
                                Edit
                              </button>
                              <button
                                className="text-blue-600 text-xl hover:text-blue-900"
                                onClick={() => handleDeleteTimesheet(submission.id)}
                              >
                                Delete
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
              <p className="text-center text-gray-500 mt-6">
                No timesheets submitted yet.
              </p>
            )}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;

