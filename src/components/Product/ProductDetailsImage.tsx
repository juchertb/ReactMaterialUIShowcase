import { Box, CardMedia, Paper, Tooltip, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductDetailsImage = (props) => {
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
        perspective: '1000px',
        transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)",
        '& > img': {
          transition: 'inherit',
        },
        '&:hover': {
          '& > img': {
            transform: "translate(0, -40px)"
          },
        },

      }}>
        <CardMedia
          component="img"
          image={props.image}
          onError={() => console.log("this is error")}
          alt={props.image}
          sx={{
            borderRadius: "0.75rem",
            marginTop: "-40px",
            marginBottom: "-30px",
            zIndex: 99
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>ID: {props.id}</Typography>
          <Box>
            <Tooltip title="Edit" arrow>
              <EditIcon onClick={props.onEdit} sx={{ cursor: "pointer", color: "rgb(26, 115, 232)", marginRight: "30px" }} />
            </Tooltip>
            <Tooltip title="Remove" arrow>
              <DeleteIcon onClick={props.onDelete} sx={{ cursor: "pointer", color: "rgb(252, 5, 5)" }} />
            </Tooltip>
          </Box>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", alignSelf: "center", marginTop: "15px", marginBottom: "15px" }}>{props.title}</Typography>
        <Typography sx={{ color: "gray", alignSelf: "center", marginTop: "15px", marginBottom: "15px" }}>{props.description}</Typography>
      </Paper>
    </>
  )
};

export default ProductDetailsImage;
