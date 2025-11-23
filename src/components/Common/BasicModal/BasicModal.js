import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { modalStyles } from "./styles";
import CommonButton from "../CommonButton";

const BasicModal = ({ open, onClose, title, subTitle, content, validate }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles.wrapper}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
        <div>{content}</div>
        <Box sx={modalStyles.buttons}>
          <CommonButton
            sx={{ marginRight: "5px" }}
            variant="outlined"
            onClick={validate}
          >
            Submit
          </CommonButton>
          <CommonButton variant="outlined">Cancel</CommonButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
