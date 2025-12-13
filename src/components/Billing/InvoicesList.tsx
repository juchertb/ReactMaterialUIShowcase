import React from "react";
import {
  Typography,
  IconButton,
  Box,
  Paper,
  Button,
  List,
  Tooltip,
} from "@mui/material";
import { mockInvoices } from "./mockData";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function InvoicesList() {
  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "10px" }}>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Invoices</Typography>
        <Button variant="outlined" size="small">View All</Button>
      </Box>

      <List>
        {mockInvoices.map((inv) => (
          <Box key={inv.id} display="flex" justifyContent="space-between" alignItems="center" p={1} >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>{new Date(inv.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>{inv.id}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" sx={{ color: "text.secondary", marginRight: "15px" }}>${inv.amount.toFixed(2)}</Typography>
              <Tooltip title="Download the PDF version of the invoice">
                <IconButton size="small" aria-label="download" sx={{ fontSize: "0.8em", fontWeight: "bold", width: "50px" }}><PictureAsPdfIcon sx={{ marginRight: "3px" }} />PDF</IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </List>
    </Paper>
  );
}