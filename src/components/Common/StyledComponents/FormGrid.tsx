import { Grid2, styled } from "@mui/material";
import React from "react";

const FormGridStyled = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const FormGrid = (props) => {
  return (
    <FormGridStyled size={props.size}>{props.children}</FormGridStyled>
  )
};

export default FormGrid;
