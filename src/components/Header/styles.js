export const headerStyles = {
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(34, 57, 92, 0.83)",
    padding: "20px",
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
    marginBottom: "10px",
    paddingRight: "45px",
  },
  middleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0px",
  },
  link: {
    fontWeight: 500,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      color: "#fff",
      cursor: "pointer",
    },
  },
  helpButton: {
    marginRight: "5px",
    color: "white",
  },
};
