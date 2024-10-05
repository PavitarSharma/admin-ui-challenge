import { useCallback, useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import Searchbar from "../Searchbar/Searchbar";
import useUsers from "../../hooks/useUsers";
import "./Users.css";
import { SquarePen, Trash } from "lucide-react";

const Users = () => {
  const { users } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [editindRow, setEditindRow] = useState(null);
  const [editData, setEditData] = useState({});

  // Use Effect to update filteredUsersd when users are fetched
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Apply filters on the users collection
  const filterUsers = (term) => {
    const filtered = users
      .slice()
      .filter(
        (user) =>
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.role.toLowerCase().includes(term.toLowerCase())
      );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Applying Serach Functionality on Users Table on name, email, role
  const handleSerachChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onSearch = () => {
    filterUsers(searchTerm)
    setSearchTerm("")
  }

  const handleSerachKeyDown = (event) => {
    if (event.key === "Enter") {
      filterUsers(event.target.value);
      setSearchTerm("");
    }
  };

  // Get Pagination Users
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Get Total Pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Chanfe Page
  const handlePageChange = useCallback(
    (page) => {
      switch (page) {
        case "first":
          setCurrentPage(1);
          break;
        case "prev":
          setCurrentPage((prevPage) => prevPage - 1);
          break;
        case "next":
          setCurrentPage((prevPage) => prevPage + 1);
          break;
        case "last":
          setCurrentPage(totalPages);
          break;
        default:
          setCurrentPage(Number(page));
          break;
      }
    },
    [totalPages]
  );

  // Select Row when checkbox is checked or unchecked
  const handleSelectRow = (id) => {
    setSelectedRows((prev) => {
      const updatedSelectedRows = new Set(prev);
      updatedSelectedRows.has(id)
        ? updatedSelectedRows.delete(id)
        : updatedSelectedRows.add(id);
      return updatedSelectedRows;
    });
  };

  // Select/Deselect all rows in the table
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectedRows(
      isChecked ? new Set(filteredUsers.map(({ id }) => id)) : new Set()
    );
  };

  // Delete selected users
  const handleDeleteSelected = () => {
    if (selectedRows.size === 0) {
      alert("No user selected to delete");
      return;
    }

    const updatedUsers = [...filteredUsers];
    selectedRows.forEach((id) => {
      const index = updatedUsers.findIndex((user) => user.id === id);
      if (index !== -1) {
        updatedUsers.splice(index, 1);
      }
    });
    setFilteredUsers(updatedUsers);
    // setFilteredUsers((prev) =>
    //   prev.filter((user) => !selectedRows.has(user.id))
    // );
    setSelectedRows(new Set());
  };

  // Delete User
  const handleDeleteUser = (id) => {
    setFilteredUsers((prev) => prev.filter(({ id: userId }) => userId !== id));
  };

  // Start editing row
  const handleEditUser = (id) => {
    const user = filteredUsers.find((user) => user.id === id);
    setEditindRow(id);
    setEditData(user);
  };

  // Save Changes
  const handleSaveUser = () => {
    setFilteredUsers((prev) =>
      prev.map((user) =>
        user.id === editindRow ? { ...user, ...editData } : user
      )
    );
    setEditindRow(null);
  };

  return (
    <div>
      <Searchbar
        searchTerm={searchTerm}
        onChange={handleSerachChange}
        onKeyDown={handleSerachKeyDown}
        onSearch={onSearch}
      />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    filteredUsers.length > 0 &&
                    filteredUsers.every((user) => selectedRows.has(user.id))
                  }
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={index}
                className={selectedRows.has(user.id) ? "selected" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(user.id)}
                    onChange={() => handleSelectRow(user.id)}
                  />
                </td>
                <td>
                  {editindRow === user.id ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData((prevData) => ({
                          ...prevData,
                          name: e.target.value,
                        }))
                      }
                      className="table-input"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editindRow === user.id ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData((prevData) => ({
                          ...prevData,
                          email: e.target.value,
                        }))
                      }
                      className="table-input"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editindRow === user.id ? (
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) =>
                        setEditData((prevData) => ({
                          ...prevData,
                          role: e.target.value,
                        }))
                      }
                      className="table-input"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editindRow === user.id ? (
                    <button onClick={handleSaveUser} className="save">
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <SquarePen size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="delete"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <button onClick={handleDeleteSelected} className="delete-selected">
          Delete Selected
        </button>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          isFirstPage={currentPage === 1}
          isLastPage={currentPage === totalPages}
          handlePageChange={handlePageChange}
          isDisabled = {filteredUsers.length === 0}
        />
      </div>
    </div>
  );
};

export default Users;
