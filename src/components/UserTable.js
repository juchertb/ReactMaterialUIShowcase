import React, { useEffect, useState } from "react";
import DataTable from "./Common/DataTable";

const columns = [
  { field: "id", headerName: "User ID", width: 150 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
];

const userTableStyles = {
  height: "650px",
};

const UserTable = ({ onError }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
      .catch(() => onError());
  }, []);

  return (
    <DataTable
      rows={users}
      columns={columns}
      loading={!users.length}
      sx={userTableStyles}
    />
  );
};

export default UserTable;
