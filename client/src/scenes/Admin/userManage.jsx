import React, { useState, useEffect } from "react";
import Header from "../../components/Admin/Header";
import { userList, blockUser } from "../../Api/AdminAxios";

const UserTable = ({ onBlockUnblock }) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        userList().then(users => {
          console.log(users.data.users);
          const datas = users.data.users;
          setData(datas);
        });
      } catch (error) {}
    }
    getData();
  }, []);

  onBlockUnblock = async userId => {
    blockUser(userId)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {});
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex justify-center items-center min-h-fit mt-1">
        <div className="bg-gray-100 p-4 w-4/6 mt-10 rounded-lg">
        <table className="w-full max-w-6xl border-collapse border border-gray-400  rounded-lg">
          <thead className="bg-black text-white rounded-lg">
            <tr>
              <th className="px-4 py-2 font-bold text-left">Name</th>
              <th className="px-4 py-2 font-bold text-left">Email</th>
              <th className="px-4 py-2 font-bold text-left">Phone</th>
              <th className="px-4 py-2 font-bold text-left">Joining Date</th>
              <th className="px-4 py-2 font-bold text-left">Block/Unblock</th>
            </tr>
          </thead>
          <tbody>
            {Data.map(users =>
              <tr key={users._id} className="border-t border-gray-400">
                <td className="px-4 py-2 text-left">
                  {users.Name}
                </td>
                <td className="px-4 py-2 text-left">
                  {users.Email}
                </td>
                <td className="px-4 py-2 text-left">
                  {users.Phone}
                </td>
                <td className="px-4 py-2 text-left">
                  {new Date(users.createdAt).toLocaleDateString("en-US")}
                </td>

                {/* Block/Unblock Button */}
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => onBlockUnblock(users._id)}
                    className={`${users.block
                      ? "bg-green-500 hover:bg-darkgreen"
                      : "bg-orange-500 hover:bg-darkred"} text-white px-2 py-1 rounded`}
                  >
                    {users.block ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            )}{" "}
          </tbody>
        </table>
        </div>
      
      </div>
    </div>
  );
};

export default UserTable;
