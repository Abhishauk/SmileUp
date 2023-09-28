import React, { useState, useEffect } from "react";
import Header from "../../components/Admin/Header";
import { userList , blockUser } from "../../Api/AdminAxios";


const UserTable = ({ onBlockUnblock, onDelete }) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    console.log("///////////");
    async function getData() {
      try {
      userList().then((users) =>{
        console.log(users.data.users);
        const datas = users.data.users;
        setData(datas);
        console.log("mmmm", Data);
      })
        
      } catch (error) {}
    }
    getData();
  }, []);

  onBlockUnblock =async (userId) =>{
       blockUser(userId).then((response) => {
        console.log(response);
       }).catch ((error) =>{
        
       })
  }

  return (
    <div>
      <div>
        <Header></Header>
      </div>
      <div className="flex justify-center items-center min-h-fit mt-12">
        <table className="w-full max-w-6xl border-collapse border border-gray-400">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-4 py-2 font-bold"> Name</th>
              <th className="px-4 py-2 font-bold">Email</th>
              <th className="px-4 py-2 font-bold">Phone</th>
              <th className="px-4 py-2 font-bold text-center">Block/Unblock</th>
              {/* Optional */}
              <th className="px-4 py-2 font-bold text-center">Delete</th>
              {/* Optional */}
            </tr>
          </thead>
          <tbody>
            {Data.map((users) => (
              <tr key={users._id} className="border-t border-gray-400">
                <td className="px-4 py-2">{users.Name}</td>
                <td className="px-4 py-2">{users.Email}</td>
                <td className="px-4 py-2">{users.Phone}</td>

                {/* Block/Unblock Button */}
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onBlockUnblock(users._id)}
                    className={`${
                      users.block
                        ? "bg-green-500 hover:bg-darkgreen"
                        : "bg-orange-500 hover:bg-darkred"
                    } text-white px-2 py-1 rounded`}
                  >
                    {users.block ? "Unblock" : "Block"}
                  </button>
                </td>
                {/* Delete Button */}
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onDelete(users._id)}
                    className="bg-red-500 hover:bg-darkred text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
