import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../services/user.service";
import { useTitle } from "../hooks/useTitle";

const Dashboard = () => {
  useTitle("Dashboard");
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user) => (
            <li key={user._id} className="border p-3 rounded-md shadow-sm">
              <Link
                to={`/chat/${user._id}`}
                className="text-black hover:underline"
              >
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
