import React, { useState } from "react";
import { Box, Typography, Grid2, Button, IconButton, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardDialog from "./AddCardDialog";
import { mockPaymentMethods } from "./mockData";

export default function PaymentMethods() {
  const [methods, setMethods] = useState(mockPaymentMethods);
  const [open, setOpen] = useState(false);

  const setDefault = (id: number) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  const remove = (id: number) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const addCard = (card: any) => {
    setMethods((prev) => [{ ...card, isDefault: false }, ...prev]);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Payment methods</Typography>
        <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Add card</Button>
      </Box>

      <Grid2 container spacing={2}>
        {methods.map((m) => (
          <Grid2 size={12} sx={{ md: 6 }} key={m.id}>
            <Box display="flex" alignItems="center" justifyContent="space-between" p={1} border="1px solid" borderColor="divider" borderRadius={1}>
              <Box sx={{ display: "flex", flowDirection: "row" }}>
                {m.brand === "Mastercard" ? (
                  <Box
                    component="img"
                    alt="Mastercard Logo"
                    src="credit-card-mastercard.jpeg"
                    sx={{ marginRight: "15px", height: "32px" }}
                  />
                ) : m.brand === "Visa" ? (
                  <Box
                    component="img"
                    alt="Visa Logo"
                    src="credit-card-visa.jpeg"
                    sx={{ marginRight: "15px", height: "25px", width: "40px" }}
                  />
                ) : (
                  <Box
                    component="img"
                    alt="Amex Logo"
                    src="credit-card-amex.jpeg"
                    sx={{ marginRight: "15px", height: "25px" }}
                  />
                )}
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>**** **** **** {m.last4}</Typography>
                  <Typography variant="caption">Exp {m.exp}</Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {m.isDefault && <CheckCircleOutlineIcon color="success" fontSize="small" />}
                <IconButton size="small" onClick={() => remove(m.id)}><DeleteIcon fontSize="small" /></IconButton>
                <Button size="small" onClick={() => setDefault(m.id)}>Use</Button>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      <AddCardDialog open={open} onClose={() => setOpen(false)} onAdd={addCard} />
    </Paper>
  );
}