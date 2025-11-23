import { Card, CardContent } from "@mui/material";
import React from "react";

const BasicCard = ({ header, content }) => {
  const cardStyles = {
    width: "100%",
    borderRadius: "8px",
  };

  return (
    <Card sx={cardStyles}>
      {header}
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default BasicCard;
