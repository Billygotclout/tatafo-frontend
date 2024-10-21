import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "/assets/logo.png";
import SearchBar from "./SearchBar";
import { getUsers } from "../services/user.service";

const Sidenav = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to track sidenav open/close status

  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Toggle button for mobile */}
      <button
        className="sm:hidden fixed top-2 left-5 z-20   text-black p-2 rounded"
        onClick={toggleSidenav}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidenav */}
      <div
        className={`fixed top-0 left-0 z-10 bg-gray-100 w-[250px] sm:w-[300px] min-h-screen transition-transform duration-300 ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } sm:transform-none`}
      >
        <nav className="flex flex-col items-center">
          {/* Logo */}
          <Link to="/dashboard">
            <img src={logo} className="m-auto pt-5" alt="Logo" />
          </Link>
          {/* Search Bar */}
          <div className="my-5 w-full px-5">
            <SearchBar />
          </div>
          {/* User List - Scrollable */}
          <ul
            className="overflow-y-auto w-full px-5"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {users.map((user) => (
              <li key={user._id} className="py-2 border-b border-gray-300">
                <Link
                  to={`/chat/${user._id}`}
                  className="text-black hover:underline"
                  onClick={() => setIsOpen(false)} // Close sidenav on user click
                >
                  {user.username}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="py-5 px-2 w-full sm:ml-[300px]">
        <Outlet />
      </div>

      {/* Mobile responsiveness */}
      <style>
        {`
          @media (max-width: 640px) {
            .sm\\:ml-[300px] { margin-left: 0; }
          
          }
        `}
      </style>
    </div>
  );
};

export default Sidenav;
