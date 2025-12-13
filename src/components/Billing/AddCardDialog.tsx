import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormLabel,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";

type AddCardDialogProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (card: { id: number; brand: string; last4: string; exp: string }) => void;
};

let nextId = 100;

export default function AddCardDialog({ open, onClose, onAdd }: AddCardDialogProps) {
  const [brand, setBrand] = useState("Visa");
  const [last4, setLast4] = useState("");
  const [exp, setExp] = useState("");

  const handleAdd = () => {
    //if (!/^\d{4}$/.test(last4)) return;
    const card = { id: nextId++, brand, last4, exp };
    onAdd(card);
    setLast4("");
    setExp("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Card</DialogTitle>
      <DialogContent>
        <FormLabel htmlFor="brand-label" required sx={{ display: "block", }}>
          Brand
        </FormLabel>
        <Select
          labelId="brand-label"
          id="brand-label"
          name="brand-label"
          value={brand}
          label="Brand"
          onChange={(e) => setBrand(e.target.value)}
          size="small"
          sx={{ width: "100%", marginBottom: "15px" }}
        >
          <MenuItem value={"Visa"}>Visa</MenuItem>
          <MenuItem value={"Mastercard"}>Mastercard</MenuItem>
          <MenuItem value={"Amex"}>Amex</MenuItem>
        </Select>

        <FormLabel htmlFor="card_number" required sx={{ display: "block", }}>
          Credit Card Number
        </FormLabel>
        <OutlinedInput
          id="card_number"
          name="card_number"
          type="name"
          placeholder="Your credit card number"
          autoComplete="**** **** **** ****"
          required
          size="small"
          value={last4}
          sx={{ width: "100%", marginBottom: "15px" }}
          onChange={(e) => setLast4(e.target.value)}
        />

        <FormLabel htmlFor="expiry_date" required sx={{ display: "block", }}>
          Expiry Date (MM/YY)
        </FormLabel>
        <OutlinedInput
          id="expiry_date"
          name="expiry_date"
          type="name"
          placeholder="MM/YY"
          required
          size="small"
          value={exp}
          sx={{ width: "100%" }}
          onChange={(e) => setExp(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>Add card</Button>
      </DialogActions>
    </Dialog>
  );
} 