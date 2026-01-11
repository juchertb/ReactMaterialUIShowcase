import React from "react";
import axios from "axios";
import { apiHost } from "../../Utils/customFetch";
import { useLocation } from "react-router";
import GridWrapper from "../../components/Common/GridWrapper";
import { Alert, Button, Grid2, Typography } from "@mui/material";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import ProductDetailsImage from "../../components/Product/ProductDetailsImage";
import { Product } from "../../Utils/Types";
import ProductDetailsInfo from "../../components/Product/ProductDetailsInfo";
import SaveIcon from '@mui/icons-material/Save';
import ProductSocials from "../../components/Product/ProductSocials";
import ProductPricing from "../../components/Product/ProductPricing";
import SnackbarCustomized from "../../components/Common/BasicSnackbar/SnackbarCustomized";

const ProductDetails = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [product, setProduct] = React.useState<Product>(null);
  const location = useLocation();
  const id: number = location.state?.id;
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);

  React.useEffect(() => {
    setError(null);
    axios.get(`${apiHost}/products/${id}`)
      .then(function (response) {
        response.status === 200 ? setProduct(response.data as Product) : setError(response.statusText);
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

  const handleSubmit = evt => {
    evt.preventDefault();

    axios({
      url: `${apiHost}/products/${product.id}`,
      method: "PUT",
      data: product,
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
        setToastMessage(`Customer ${product.reference} updated successfully!`);
      })
      .catch(error => {
        //setError(error);
        setLoading(false);
        setToastMessage(`Customer ${product.reference} could not be updated. \n${error}`);
      })
      .finally(() => {
        setOpenToast(true);
      });
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
    <GridWrapper>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={4}>
          <FormGrid size={10} sx={{ border: 1, }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", alignSelf: "left" }}>Make the changes below</Typography>
            <Typography sx={{ color: "gray", alignSelf: "left", marginTop: "5px", marginBottom: "5px" }}>We’re constantly trying to express ourselves and actualize our dreams. If you have the opportunity to play.</Typography>
          </FormGrid>
          <FormGrid size={2}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              Save <SaveIcon sx={{ marginLeft: "5px" }} />
            </Button>
          </FormGrid>
          <FormGrid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }} sx={{ border: 1 }}>
            <ProductDetailsImage
              image={product.image}
              id={id}
              title={product.reference}
              description={product.description}
              onEdit={() => console.log("Edit clicked")}
              onDelete={() => console.log("Delete Clicked")} />
          </FormGrid>
          <FormGrid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }} sx={{ border: 1 }}>
            <ProductDetailsInfo product={product} setProduct={setProduct} />
          </FormGrid>
          <FormGrid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }} sx={{ border: 1 }}>
            <ProductSocials product={product} setProduct={setProduct} />
          </FormGrid>
          <FormGrid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }} sx={{ border: 1, paddingBottom: "160px" }}>
            <ProductPricing product={product} setProduct={setProduct} />
          </FormGrid>
        </Grid2 >
      </form>
      <SnackbarCustomized
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={error ? toastMessage + " " + error.message : (toastMessage ? toastMessage : "The operation was successfull!")}
        severity={error ? "error" : 'success'} />
    </GridWrapper >
  )
};

export default ProductDetails;
