import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  useGridApiContext,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import { apiHost } from "../../Utils/customFetch";
import { useNavigate } from 'react-router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { faker } from '@faker-js/faker';
import ConfirmationDialog from '../Common/DialogBoxes/ConfirmationDialog';
import SnackbarCustomized from '../Common/BasicSnackbar/SnackbarCustomized';


declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
  const apiRef = useGridApiContext();
  const navigate = useNavigate();
  const { setRows, setRowModesModel } = props;

  const handleAddClick = () => {
    // Remove dashes from uuid in id field otherwise I am getting a 404 resource not found 
    // error whe I try to PUT an order.
    const id = randomId().replace(/-/g, '');
    //console.log(id);
    setRows((oldRows) => [
      { id, full_name: '', age: '', role: '', isNew: true },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'full_name' },
    }));
  };

  const handleEditClick = () => {
    const selectRow = apiRef.current.getSelectedRows();
    if (selectRow.size === 0) {
      return;
    }
    const rowId = Array.from(selectRow.keys())[0];
    const customerId = Array.from(selectRow.values())[0].customer_id;
    const customerName = Array.from(selectRow.values())[0].customer.first_name + " " + Array.from(selectRow.values())[0].customer.last_name;
    if (rowId === undefined || customerId === undefined) {
      return;
    }
    navigate(`/ecommerce/orders/${customerId}`, { state: { id: rowId, customerId: customerId, objectName: customerName } });
  }

  return (
    <GridToolbarContainer>
      <Tooltip
        title="Adds a new row to this data grid" >

        <Button
          sx={{ marginBottom: "5px" }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleAddClick}
          startIcon={<PersonAddIcon />}
        >
          Add
        </Button>
      </Tooltip>
      <Tooltip
        title="Click the person's name, then click this button to open the details for for that person" >
        <Button
          sx={{ marginBottom: "5px" }}
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleEditClick}
          startIcon={<EditIcon />}
        >
          Details
        </Button>
      </Tooltip>
      <Typography></Typography>
    </GridToolbarContainer >
  );
}

export default function OrdersCrudGrid() {
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);
  const [rows, setRows] = React.useState([] as GridRowsProp);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [deleteRowId, setDeleteRowId] = React.useState<GridRowId | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  React.useEffect(() => {
    axios.get(`${apiHost}/customerOrders?embed=["customer"]&sort=["name","asc"]`)
      .then(function (response) {
        response.status === 200 ? setRows(response.data) : setError(response.statusText);
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box sx={{ width: "45%" }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <Box sx={{ width: "25%" }}><EditToolbar setRows={setRows} setRowModesModel={setRowModesModel} /></Box>
        <Box sx={{ width: "28%", display: "flex", flexDirection: "row", justifyContent: "end", border: 0 }}>
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    );
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setDeleteRowId(id); // Store the row ID to delete
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
    setDeleteRowId(null); // Clear the stored row ID
  };

  const confirmDelete = () => {
    if (deleteRowId !== null) {
      axios.delete(`${apiHost}/customerOrders/${deleteRowId}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok (status: ' + response.status + ')');
          }
          return response.data;
        })
        .then(() => {
          setRows(rows.filter((row) => row.id !== deleteRowId));
          setToastMessage(`Order ${deleteRowId} deleted successfully!`);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setToastMessage(`Could not delete order ${deleteRowId}.`);
        })
        .finally(() => {
          setOpenToast(true);
        });
      setOpenDeleteDialog(false); // Close the dialog
    }
  };

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const [firstName, lastName] = newRow.full_name!.toString().split(' ');
    // Create a fake id for new customers
    const customerId = (newRow.isNew ? faker.number.int({ min: 1000, max: 1000000 }) : newRow.customer_id);
    const customer = { ...newRow.customer, id: customerId, first_name: firstName, last_name: lastName, email: newRow.email, role: (newRow.customerRole ? newRow.customerRole : "Development"), isNew: true };
    const updatedRow = { ...newRow, id: newRow.id, customer_id: customer.id, customer: customer, isNew: true };
    const method = (newRow.isNew ? "POST" : "PUT");
    const urlSuffix = (newRow.isNew ? "" : `/${newRow.customer.id}`);
    const methodName = (newRow.isNew ? "added" : "updated");

    axios({
      url: `${apiHost}/customers${urlSuffix}`,
      method: method,
      data: customer,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Network response was not ok (status: ' + response.status + ')');
        }
        return response.data;
      })
      .then(() => {
        const newUpdatedRow = { full_name: newRow.full_name, isNew: false, ...updatedRow };
        setRows(rows.map((row) => (row.id === newRow.id ? newUpdatedRow : row)));
        setToastMessage(`Customer ${newRow.full_name} ${methodName} successfully!`);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        setToastMessage(`Customer ${newRow.full_name} could not be ${methodName}.`);
      })
      .finally(() => {
        setOpenToast(true);
      });

    // create the customerOrders record now
    if (newRow.isNew) {
      const updatedRowOrder = { ...newRow, id: newRow.id, customer_id: customer.id, customer: customer, isNew: true };
      const urlSuffixOrder = (newRow.isNew ? "" : `/${newRow.id}`);
      updatedRowOrder.isNew = false;
      axios({
        url: `${apiHost}/customerOrders${urlSuffixOrder}`,
        method: method,
        data: updatedRowOrder,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error('Network response was not ok (status: ' + response.status + ')');
          }
          return response.data;
        })
        .then(() => {
          const newUpdatedRow = { full_name: newRow.full_name, isNew: false, ...updatedRowOrder };
          setRows(rows.map((row) => (row.id === newRow.id ? newUpdatedRow : row)));
          setToastMessage(`Order for ${newRow.full_name} ${methodName} successfully!`);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setToastMessage(`Order for ${newRow.full_name} could not be ${methodName}.`);
        })
        .finally(() => {
          setOpenToast(true);
        });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  const currencyFormatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const options1: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
    second: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options1);

  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    //{ field: 'id', headerName: 'ID', width: 180, editable: false },
    //{ field: 'isNew', headerName: 'IsNew', width: 180, editable: false },
    {
      field: 'full_name',
      headerName: 'Customer Name',
      width: 180,
      editable: true,
      // valueSetter: (value, row) => {
      //   const [first_name, last_name] = value!.toString().split(' ');
      //   row.customer.first_name = first_name;
      //   return { ...newRow };
      // },
      valueGetter: (value, row) => {
        let fullName = (row.customer?.first_name ? row.customer?.first_name : "");
        if (fullName?.length > 0) fullName += " ";
        fullName += (row.customer?.last_name ? row.customer?.last_name : "");
        //row.customer?.first_name + " " + row.customer?.last_name
        return fullName;
      },
      // renderCell: (cellValues) => {
      //   return cellValues.row.customer.first_name + " " + cellValues.row.customer.last_name
      // }
    },
    {
      field: 'email',
      headerName: 'Email',
      //renderCell: renderEmail,
      width: 180,
      editable: true,
      valueGetter: (value, row) => row.customer?.email,
      // renderCell: (cellValues) => {
      //   return cellValues.row.customer.email
      // }
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueFormatter: (value?: number) => {
        if (value == null) {
          return '';
        }
        return `${currencyFormatter.format(value)}`;
      },
    },
    {
      field: 'date',
      headerName: 'Order date',
      type: 'date',
      width: 250,
      editable: false,
      valueGetter: (value) => value && new Date(value),
      valueFormatter: (value?: number) => {
        if (value == null) {
          return '';
        }
        return `${dateFormatter.format(value)}`;
      },
    },
    {
      field: 'customerRole',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
      valueGetter: (value, row) => row.customer?.role,
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Alert variant="outlined" severity="info" sx={{ marginBottom: "15px" }}>
        Click a customer's name, then click the [DETAILS] button to open the details screen of that person.
        You can also use the grid inline editing function by clicking the pencil button on each row or double-clicking
        the Customer Name, Email or Department cells.
        <br /><br />
        Hover your mouse over the grid column headers to sort and filter the data or manage the columns.
      </Alert>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: CustomToolbar }}
        //slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            showQuickFilter: true
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'full_name', sort: 'asc' }],
          },
        }}
      />
      <ConfirmationDialog
        open={openDeleteDialog}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        setOpen={setOpenDeleteDialog}
        message="Are you sure you want to delete this orderwwww? This action cannot be undone."
      />
      <SnackbarCustomized
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={error ? toastMessage + " " + error.message : (toastMessage ? toastMessage : "The operation was successfull!")}
        severity={error ? "error" : "success"} />
    </Box >
  );
}
