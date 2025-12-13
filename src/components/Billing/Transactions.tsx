import { Box, IconButton, List, Paper, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import React from "react";
import DateRangeIcon from '@mui/icons-material/DateRange';
import { mockTransactions } from "./mockData";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const TransactionListItem = ({ transaction, selectedId, setSelectedId }) => {
  const currencyFormatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isSelected = selectedId === transaction.id;
  const color = transaction.type === 'debit' ? 'error' : transaction.type === 'credit' ? 'success' : 'text.secondary';
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, mt: 1 }} key={transaction.id}>
      <Box key={transaction.id} display="flex" alignItems="center" mb={1} mt={1}>
        <IconButton
          size="small"
          aria-label={transaction.type}
          title={transaction.type}
          aria-pressed={selectedId === transaction.id}
          onClick={() => setSelectedId(prev => (prev === transaction.id ? null : transaction.id))}
          sx={(theme) => {
            const color = transaction.type === 'debit' ? theme.palette.error.main : transaction.type === 'credit' ? theme.palette.success.main : theme.palette.text.secondary;
            const isSelected = selectedId === transaction.id;
            return {
              borderColor: color,
              width: 36,
              height: 36,
              marginRight: "15px",
              borderRadius: '50%',
              color,
              boxShadow: isSelected ? `0 6px 12px ${alpha(color, 0.12)}, 0 0 0 6px ${alpha(color, 0.12)}` : `0 0 0 1px ${alpha(color, 0.15)}`,
              transition: 'box-shadow 180ms ease, transform 180ms ease',
              '&:hover': {
                boxShadow: `0 6px 12px ${alpha(color, 0.12)}, 0 0 0 6px ${alpha(color, 0.12)}`,
                transform: 'scale(1.02)'
              },
              '&:focus-visible': {
                boxShadow: `0 6px 12px ${alpha(color, 0.12)}, 0 0 0 6px ${alpha(color, 0.12)}`,
                outline: 'none'
              }
            }
          }}
        >
          {(transaction.type === 'debit') ? <KeyboardArrowDownIcon /> : (transaction.type === 'credit') ?
            <KeyboardArrowUpIcon /> : <PriorityHighIcon />}
        </IconButton>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>{transaction.description}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>{new Date(transaction.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: transaction.type === 'debit' ? 'error.main' : transaction.type === 'credit' ? 'success.main' : 'text.secondary', fontWeight: "bold" }}>
        {transaction.amount > 0 ? (transaction.type === 'pending' ? '' : '+') : ''}
        {transaction.type === 'pending' ? 'Pending' : transaction.amount}</Typography>
    </Box>
  );
};

const Transactions = (props) => {
  const todaysTransactions = mockTransactions.filter((transaction => {
    const transactionDate = new Date(transaction.date);
    const today = new Date('2020-03-27 12:00:01');
    return transactionDate.toDateString() === today.toDateString();
  }));

  const yesterdaysTransactions = mockTransactions.filter((transaction => {
    const transactionDate = new Date(transaction.date);
    const yesterday = new Date('2020-03-26 12:00:01');
    return transactionDate.toDateString() === yesterday.toDateString();
  }));

  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  return (
    <>
      <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "10px" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Your Transactions</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", verticalAlign: "middle" }}><DateRangeIcon sx={{ mr: 1, verticalAlign: "-5px" }} />23 - 30 March 2020</Typography>
        </Box>
        <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "1rem" }}>NEWEST</Typography>
        <List>
          {todaysTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id} transaction={transaction} selectedId={selectedId} setSelectedId={setSelectedId} />
          ))}
        </List>
        <Typography variant="h6" sx={{ color: "text.secondary", fontSize: "1rem" }}>YESTERDAY</Typography>
        <List>
          {yesterdaysTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id} transaction={transaction} selectedId={selectedId} setSelectedId={setSelectedId} />
          ))}
        </List>
      </Paper >
    </>
  )
};

export default Transactions;
