import React, { useEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import GridWrapper from "../../components/Common/GridWrapper";
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Pagination, Snackbar, SnackbarCloseReason, Typography } from "@mui/material";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import SignIn from "../../components/SignIn/SignIn";
import axios from 'axios';
import { apiHost } from "../../Utils/customFetch";
import { GridRowId, GridRowsProp } from "@mui/x-data-grid";
import ProductItem from "../../components/Product/ProductItem";
import { useNavigate } from 'react-router';
import SnackbarCustomized from "../../components/Common/BasicSnackbar/SnackbarCustomized";
import ConfirmationDialog from "../../components/Common/DialogBoxes/ConfirmationDialog";

const PAGE_SIZE = 12; // Number of items per page

const Products = (props) => {
  const { isAuthenticated } = useAuthentication();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [rows, setRows] = React.useState([] as GridRowsProp);
  const [page, setPage] = useState(1); // 1-based index for MUI Pagination
  const [totalPages, setTotalPages] = useState(1);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);
  const [deleteRowId, setDeleteRowId] = React.useState<number | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Calculate start and end index for the current page
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    axios.get(`${apiHost}/products?range=[${start},${end}]`)
      .then(function (response) {
        (response.status === 200 || response.status === 206) ? setRows(response.data) : setError(response.statusText);
        // If FakeRest returns total count in a header (like Content-Range)
        const contentRange = response.headers['content-range'];
        if (contentRange) {
          // Example: "products 0-11/42"
          const totalCount = parseInt(contentRange.split('/')[1], 10);
          setTotalPages(Math.ceil(totalCount / PAGE_SIZE));
        } else {
          // Fallback if header is missing
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });
  }, [page]);

  const handleEditClick = (id: number, name: string) => () => {
    navigate(`/ecommerce/products/${id}`, { state: { id: id, objectName: name } });
  };

  const handleDeleteClick = (id: number) => () => {
    setDeleteRowId(id); // Store the row ID to delete
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog without deleting
    setDeleteRowId(null); // Clear the stored row ID
  };

  const confirmDelete = () => {
    if (deleteRowId !== null) {
      axios.delete(`${apiHost}/products/${deleteRowId}`)
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Network response was not ok (status: ' + response.status + ')');
          }
        })
        .then(() => {
          setRows(rows.filter((row) => row.id !== deleteRowId));
          setToastMessage(`Product ${deleteRowId} deleted successfully!`);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
          setToastMessage(`Could not delete product ${deleteRowId}.`);
        })
        .finally(() => {
          setOpenToast(true);
        });
      setOpenDeleteDialog(false); // Close the dialog
    }
  };

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <>
            <Alert variant="outlined" severity="info" sx={{ marginBottom: "35px" }}>
              Hover your mouse over the product image and click the [Edit] button to open the product properties or [Delete] to permanently delete the product. The images will not shift
              upwards for users with insufficient permissions.
            </Alert>
            <Grid2 container spacing={4}>

              {
                rows.map((item) => (
                  <FormGrid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} sx={{ border: 1 }}>
                    <ProductItem
                      id={item.id}
                      title={item.reference}
                      price={item.price}
                      location={item.category_name}
                      image={item.image}
                      description={item.description}
                      onDelete={handleDeleteClick}
                      onEdit={handleEditClick}
                    />
                  </FormGrid>
                ))
              }
            </Grid2>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              variant="outlined"
              color="primary"
              sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "center" }}
            />
            <ConfirmationDialog
              open={openDeleteDialog}
              confirmDelete={confirmDelete}
              cancelDelete={cancelDelete}
              setOpen={setOpenDeleteDialog}
              message="Are you sure you want to delete this product? This action cannot be undone."
            />
            <SnackbarCustomized
              openToast={openToast}
              setOpenToast={setOpenToast}
              message={error ? toastMessage + " " + error.message : (toastMessage ? toastMessage : "The operation was successfull!")}
              severity={error ? "error" : "success"} />
          </>
        ) : (
          <SignIn />
        )}
      </GridWrapper >
    </>
  )
};

export default Products;
