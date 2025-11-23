import { Box, Chip, FormLabel, Grid2, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import FormGrid from "../Common/StyledComponents/FormGrid";
import { Theme, useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  }
};

function getStyles(name: string, chipName: readonly string[], theme: Theme) {
  return {
    fontWeight: chipName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const allChips: string[] = [
  "Black Friday",
  "Expired",
  "Out of Stock",
  "In Stock",
  "Sale",
];

const ProductPricing = ({ product, setProduct }) => {
  const theme = useTheme();

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setProduct({ ...product, [name]: newValue });
  };

  const handleChipChange = (event: SelectChangeEvent<typeof product.tags>) => {
    const {
      target: { value },
    } = event;
    setProduct({
      ...product, tags: typeof value === 'string' ? value.split(',') : value
    });
  };

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "CAD", symbol: "$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    // Add more currencies as needed
  ];

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
          Pricing
        </Typography>
        <Grid2 container spacing={2}>
          <FormGrid size={4}>
            <FormLabel htmlFor="price">
              Price
            </FormLabel>
            <OutlinedInput
              id="price"
              name="price"
              type="name"
              placeholder="0.00"
              autoComplete="0.00"
              size="small"
              value={product.price}
              onChange={handleInput}
              sx={{ width: "100%" }}
            />
          </FormGrid>
          <FormGrid size={4}>
            <FormLabel htmlFor="currency">
              Currency
            </FormLabel>
            <Select
              id="currency"
              name="currency"
              value={product.currency}
              onChange={e => {
                setProduct({
                  ...product,
                  currency: e.target.value
                });
              }}
              size="small"
              sx={{ width: "100%" }}
            >
              {currencies.map((cur) => (
                <MenuItem key={cur.code} value={cur.code}>
                  {cur.symbol} {cur.code} - {cur.name}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
          <FormGrid size={4}>
            <FormLabel htmlFor="sku">
              SKU
            </FormLabel>
            <OutlinedInput
              id="sku"
              name="sku"
              type="name"
              placeholder="SKU"
              autoComplete="sku"
              size="small"
              value={product.sku}
              onChange={handleInput}
              sx={{ width: "100%" }}
            />
          </FormGrid>
          <FormGrid size={12}>
            <FormLabel htmlFor="language">
              Tags
            </FormLabel>
            <Select
              labelId="product-tags"
              id="product-tags"
              multiple
              size="small"
              value={product.tags}
              onChange={handleChipChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {allChips.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, product.tags, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormGrid>
        </Grid2>
      </Paper>
    </>
  )
};

export default ProductPricing;
