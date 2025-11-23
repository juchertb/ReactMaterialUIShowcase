import { FormLabel, Grid2, OutlinedInput, Paper, Typography } from "@mui/material";
import FormGrid from "../Common/StyledComponents/FormGrid";

const ProductSocials = ({ product, setProduct }) => {
  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setProduct({ ...product, [name]: newValue });
  };

  return (
    <>
      <Paper elevation={3} sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.75rem",
        width: "100%",
        height: "100%",
        padding: "20px",
        marginTop: "10px",
      }}>
        <Typography variant="h4">
          Socials
        </Typography>
        <Grid2 container spacing={2}>
          <FormGrid size={12}>
            <FormLabel htmlFor="shopify-handle">
              Shopify Handle
            </FormLabel>
            <OutlinedInput
              id="shopify-handle"
              name="shopify_handle"
              type="name"
              placeholder="Shopify Handle"
              autoComplete="shopify-handle"
              size="small"
              value={product.shopify_handle}
              onChange={handleInput}
              sx={{ width: "100%" }}
            />
          </FormGrid>
          <FormGrid size={12}>
            <FormLabel htmlFor="facebook-account">
              Facebook Account
            </FormLabel>
            <OutlinedInput
              id="facebook-account"
              name="facebook_account"
              type="name"
              placeholder="Facebook Account"
              autoComplete="facebook-account"
              size="small"
              value={product.facebook_account}
              onChange={handleInput}
              sx={{ width: "100%" }}
            />
          </FormGrid>
          <FormGrid size={12}>
            <FormLabel htmlFor="instagram-account">
              Instagram Account
            </FormLabel>
            <OutlinedInput
              id="instagram-account"
              name="instagram_account"
              type="name"
              placeholder="Instagram Account"
              autoComplete="instagram-account"
              size="small"
              value={product.instagram_account}
              onChange={handleInput}
              sx={{ width: "100%" }}
            />
          </FormGrid>
        </Grid2>
      </Paper>
    </>
  )
};

export default ProductSocials;
