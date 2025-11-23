import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";

const SearchBar = ({ placeholder, onChange, searchBarWidth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
      }}
    >
      <SearchIcon sx={{ marginRight: "10px" }} />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          width: searchBarWidth,
          fontSize: "1.1rem",
          marginBottom: "10px",
          "&:after": {
            borderBottom: "2px solid",
            borderColor: "primary.main",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease",
          },
          "&.Mui-focused:after": {
            transform: "scaleX(1)",
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
