import React from "react";
import SignIn from "../components/SignIn/SignIn";
import useAuthentication from "../hooks/useAuthentication";
import { Typography } from "@mui/material";
import GridWrapper from "../components/Common/GridWrapper";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

/*
function BasicRowEditingGrid() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid editMode="row" rows={rows} columns={columns} />
    </div>
  );
}
*/
const Hosting = (props) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <DataGrid editMode="row" rows={rows} columns={columns} />
        </>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Hosting;

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    editable: true,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 6,
    name: randomTraderName(),
    age: 99,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 7,
    name: randomTraderName(),
    age: 75,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 8,
    name: randomTraderName(),
    age: 34,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
