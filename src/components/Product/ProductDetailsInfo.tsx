import { Alert, FormLabel, Grid2, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState } from "react";
import FormGrid from "../Common/StyledComponents/FormGrid";
import axios from "axios";
import { apiHost } from "../../Utils/customFetch";

const ProductDetailsInfo = ({ product, setProduct }) => {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // load collections
    axios.get(`${apiHost}/collections?sort=["name","asc"]`)
      .then(function (response) {
        response.status === 200 ? setCollections(response.data) : setError(response.statusText);
        setLoading(false);
        //console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });

    // load categories
    axios.get(`${apiHost}/categories?sort=["name","asc"]`)
      .then(function (response) {
        response.status === 200 ? setCategories(response.data) : setError(response.statusText);
        setLoading(false);
        //console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });

    // load colors
    axios.get(`${apiHost}/colors?sort=["name","asc"]`)
      .then(function (response) {
        response.status === 200 ? setColors(response.data) : setError(response.statusText);
        setLoading(false);
        //console.log(response.data);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const handleCollectionChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const selectedCol = collections.find(col => col.id === value);
    setProduct({ ...product, collection_id: value, collection_name: selectedCol?.name ?? "" });
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const selectedCat = categories.find(cat => cat.id === value);
    setProduct({ ...product, category_id: value, category_name: selectedCat?.name ?? "" });
  }

  const handleColorChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const selectedCol = colors.find(col => col.id === value);
    setProduct({ ...product, color_id: value, color_name: selectedCol?.name ?? "" });
  }

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setProduct({ ...product, [name]: newValue });
  };

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  //console.log(product);

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
          Product Information
        </Typography>
        <Grid2 container spacing={4}>
          <FormGrid size={6}>
            <FormLabel htmlFor="reference" required>
              Reference
            </FormLabel>
            <OutlinedInput
              id="reference"
              name="reference"
              type="name"
              placeholder="Reference"
              autoComplete="reference"
              required
              size="small"
              value={product.reference}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={6}>
            <FormLabel htmlFor="weight" required>
              Weight (lbs)
            </FormLabel>
            <OutlinedInput
              id="weight"
              name="weight"
              type="name"
              placeholder="Weight"
              autoComplete="weight"
              required
              size="small"
              value={product.weight}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={3}>
            <FormLabel htmlFor="collection" required>
              Collection
            </FormLabel>
            <Select
              labelId="collection-label"
              id="collection"
              name="collection"
              label="Collection"
              onChange={handleCollectionChange}
              size="small"
              value={product.collection_id}
            >
              {collections.map((col) => (
                <MenuItem key={col.id} value={col.id}>
                  {col.name}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
          <FormGrid size={3}>
            <FormLabel htmlFor="price" required>
              Price
            </FormLabel>
            <OutlinedInput
              id="price"
              name="price"
              type="name"
              placeholder="0.00"
              autoComplete="0.00"
              required
              size="small"
              value={product.price}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={3}>
            <FormLabel htmlFor="stock" required>
              Stock
            </FormLabel>
            <OutlinedInput
              id="stock"
              name="stock"
              type="name"
              placeholder="0"
              autoComplete="0"
              required
              size="small"
              value={product.stock}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={3}></FormGrid>
          <FormGrid size={6}>
            <FormLabel htmlFor="description">
              Description (optional)
            </FormLabel>
            {/*}
            <TextareaAutosize
              //aria-label="empty textarea"
              //placeholder="Empty"
              style={{ width: "100%" }}
            />
            */}
            <OutlinedInput
              id="description"
              name="description"
              type="name"
              placeholder="0"
              autoComplete="0"
              required
              size="small"
              value={product.description}
              multiline
              rows={4}
              sx={{ width: "100%", height: "150px", alignItems: "flex-start" }}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={6}>
            <FormLabel htmlFor="category" required>
              Category
            </FormLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              label="Category"
              onChange={handleCategoryChange}
              required
              size="small"
              sx={{ marginBottom: "50px" }}
              value={product.category_id}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
            <FormLabel htmlFor="color" required>
              Color
            </FormLabel>
            <Select
              labelId="color-label"
              id="color"
              name="color"
              label="Color"
              onChange={handleColorChange}
              required
              size="small"
              sx={{ marginBottom: "50px" }}
              value={product.color_id}
            >
              {colors.map((col) => (
                <MenuItem key={col.id} value={col.id}>
                  {col.name}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
        </Grid2>
      </Paper>
    </>
  )
};

export default ProductDetailsInfo;
