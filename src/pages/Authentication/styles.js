export const cardHeaderStyles = {
  wrapper: {
    display: "flex",
    /* responsive: column on small screens, row on md+ */
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "column",
      lg: "row",
      xl: "row",
    },
    alignItems: "center",
    justifyContent: "space-between",
    //paddingLeft: "20px",
    //paddingRight: "20px",
    padding: "15px",
    //height: "65px",
    marginBottom: "20px",
    //backgroundColor: "#f5f5f5",
    //backgroundColor: "#999999ff",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "8px 8px 8px 8px",
    //borderColor: "rgba(0, 0, 0, 0.12)",
    //borderWidth: "1px",
  },
  addUserButton: {
    fontSize: "1.05rem",
  },
};
