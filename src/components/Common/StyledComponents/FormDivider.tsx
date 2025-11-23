import { Divider, styled } from "@mui/material";
import React from "react";

const FormDividerStyled = styled(Divider)(() => ({
  width: "100%",
  flexShrink: "0",
  borderLeft: "0px solid rgba(2, 2, 2, 0.12)",
  borderRight: "0px solid rgba(0, 0, 0, 0.12)",
  borderBottom: "none",
  backgroundColor: "transparent",
  opacity: "0.25",
  height: "0.0625rem",
  borderTop: "0px solid rgba(0, 0, 0, 0.12)",
  backgroundImage: "linear-gradient(to right, rgba(52, 71, 103, 0.2), rgba(52, 71, 103, 0.7), rgba(52, 71, 103, 0.2)) !important;"
}));

const FormDivider = (props) => {
  return (
    <FormDividerStyled {...props} />
  )
};

export default FormDivider;
