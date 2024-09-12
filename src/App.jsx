import { useState } from "react";
import { v4 as uuid } from "uuid";

// installed packages--uuid(universal unique id)

function App() {
  // Stored users data thats why declare this state (using array to store 'n' of users)
  const [users, setUsers] = useState([]);

  // Declare edit button state
  const [buttonState, setButtonState] = useState("add");

  // Handling input datas that why declare another state
  const [userInfo, setUserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    mobile: "",
  });

  // Anything enter the input field that will be reflect the userInfo state

  const handleChange = (e) => {
    // destructuring from the event.target(because they contains multiple property ,we try to get name and value )
    const { name, value } = e.target;
    setUserInfo((currentInfo) => {
      return {
        ...currentInfo,
        // [name] denotes the variable not property.If we type name only that denotes name field only in userInfo
        [name]: value,
      };
    });
  };

  // Adding data to the table so data stored inside the users State and then show the display.Again empty the input field.
  const addData = () => {
    setUsers((currentUsers) => [...currentUsers, userInfo]);

    setUserInfo({ id: uuid(), name: "", age: "", email: "", mobile: "" });
  };

  // Delete data:Showing the data thats why using setUsers state .comparing whole user id and delete button clicked user id ,filter function return new array that follows user id and clicked user id not equal that user data stored new array.

  const deleteData = (id) => {
    setUsers((currentUser) => {
      return currentUser.filter((user) => {
        return user.id !== id;
      });
    });
  };

  // Edit the previous Data

  const startEditing = (userData) => {
    setUserInfo(userData);
    setButtonState("edit");
  };

  const cancelEditing = () => {
    setUserInfo({ id: uuid(), name: "", age: "", email: "", mobile: "" });
    setButtonState("add");
  };

  // When click update button

  const updateData = () => {
    // setusers return array so using map function to iterate the data
    setUsers((currentUsers) => {
      return currentUsers.map((user) => {
        return user.id === userInfo.id ? userInfo : user;
      });
    });
    cancelEditing();
  };

  return (
    <>
      {/* Form layouts */}
      <div className="p-10 flex justify-center">
        <form
          id="input-datas"
          className="flex flex-col items-center space-y-4 *:border *:rounded-lg *:px-5 *:py-3 *:outline-none  w-[500px] py-16 border  border-black rounded-lg"
        >
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={userInfo.name}
            id="user-name"
            onChange={handleChange}
            autoComplete="off"
            className="focus:ring-2"
          />
          <input
            type="num"
            placeholder="Enter Your age"
            name="age"
            value={userInfo.age}
            id="user-age"
            onChange={handleChange}
            autoComplete="off"
            className="focus:ring-2"
          />
          <input
            type="email"
            placeholder="Enter your mail id"
            name="email"
            value={userInfo.email}
            id="user-mail"
            onChange={handleChange}
            autoComplete="off"
            className="focus:ring-2"
          />
          <input
            type="num"
            placeholder="Enter your mobile number"
            name="mobile"
            value={userInfo.mobile}
            id="user-mobile"
            onChange={handleChange}
            autoComplete="off"
            className="focus:ring-2"
          />
          {buttonState === "add" ? (
            <button
              type="button"
              className="px-5 py-3 border rounded-md hover:bg-blue-500 hover:text-white"
              onClick={addData}
            >
              Add
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                className="px-5 py-3 border rounded-md hover:bg-blue-500 hover:text-white"
                onClick={updateData}
              >
                Update
              </button>
              <button
                type="button"
                className="px-5 py-3 border rounded-md hover:bg-orange-500 hover:text-white"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Table Layouts */}
      <div id="data-table" className="flex justify-center">
        <table className=" border-collapse  table-auto">
          <caption className="caption-top">Users Data Details</caption>
          <thead>
            <tr>
              <th className="border border-slate-500 py-3 px-5">Name</th>
              <th className="border border-slate-500 py-3 px-5">Age</th>
              <th className="border border-slate-500 py-3 px-5">E-Mail ID</th>
              <th className="border border-slate-500 py-3 px-5">
                Mobile Number
              </th>
              <th className="border border-slate-500 py-3 px-5">Modify</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="border border-slate-500 py-3 px-5 text-center">
                    {user.name}
                  </td>
                  <td className="border border-slate-500 py-3 px-5 text-center">
                    {user.age}
                  </td>
                  <td className="border border-slate-500 py-3 px-5 text-center">
                    {user.email}
                  </td>
                  <td className="border border-slate-500 py-3 px-5 text-center">
                    {user.mobile}
                  </td>
                  <td className="border border-slate-500 py-3 px-5 text-center flex flex-col lg:flex-row gap-2 ">
                    <button
                      type="button"
                      className="border px-3 py-1 rounded-md bg-green-500 hover:text-white"
                      onClick={() => startEditing(user)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="border px-3 py-1 rounded-md bg-red-500 hover:text-white"
                      onClick={() => deleteData(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
