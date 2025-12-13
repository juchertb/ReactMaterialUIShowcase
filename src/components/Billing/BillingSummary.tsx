import React from "react";
import { Typography, Stack, Button, Box, Paper } from "@mui/material";
import { mockBillingInformation } from "./mockData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BillingSummary() {
  const s = mockBillingInformation;
  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
      {mockBillingInformation.map(item => (
        <Stack spacing={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{item.fullName}</Typography>
            <Box sx={{ marginTop: "25px", marginBottom: "5px" }}>
              <Button variant="outlined" size="small" sx={{ color: "red", marginRight: "10px" }}><DeleteIcon sx={{ fontSize: "medium", marginRight: "3px" }} />Delete</Button>
              <Button variant="outlined" size="small"><EditIcon sx={{ fontSize: "medium", marginRight: "3px" }} />Edit</Button>
            </Box>
          </Box>
          <Box>
            <Box display="flex">
              <Typography variant="body2" sx={{ mr: 1, color: "text.secondary" }}>Company Name:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>{item.company}</Typography>
            </Box>
            <Box display="flex">
              <Typography variant="body2" sx={{ mr: 1, color: "text.secondary" }}>Email Address:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>{item.email}</Typography>
            </Box>
            <Box display="flex">
              <Typography variant="body2" sx={{ mr: 1, color: "text.secondary" }}>VAT Number:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>{item.vatNumber}</Typography>
            </Box>
          </Box>
        </Stack>
      ))}
    </Paper>
  );
}