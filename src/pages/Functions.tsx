import useAuthentication from "../hooks/useAuthentication";
//import FullFeaturedCrudGrid from "../../components/Grids/FullFeaturedCrudGrid";
import GridWrapper from "../components/Common/GridWrapper";
import SignIn from "../components/SignIn/SignIn";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import {
  GridDemoData,
  useDemoData,
  UseDemoDataOptions,
  getInitialState,
  getCommodityColumns,
} from "@mui/x-data-grid-generator";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  AddPathToDemoDataOptions,
  DemoTreeDataValue,
} from "@mui/x-data-grid-generator/services/tree-data-generator";
import { GridColDefGenerator } from "@mui/x-data-grid-generator/services/gridColDefGenerator";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.palette.grey[800]
      : theme.palette.grey[50],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
          theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity
        ),
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const Functions = (props) => {
  const { isAuthenticated } = useAuthentication();
  const [data, setData] = useState<DemoTreeDataValue>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: data2, loading: loading2 } = useDemoData({
    dataSet: "Commodity",
    rowLength: 30,
    maxColumns: 100,
    editable: true,
  });

  if (loading2)
    return (
      <GridWrapper>
        <div style={{ height: 600, width: "100%" }}>
          <Typography>Loading...</Typography>
        </div>
      </GridWrapper>
    );

  if (error)
    return (
      <GridWrapper>
        <div style={{ height: 600, width: "100%" }}>
          <Alert variant="outlined" severity="error">
            Error: {error.message}
          </Alert>
        </div>
      </GridWrapper>
    );

  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <div style={{ height: 600, width: "100%" }}>
            <StripedDataGrid
              loading={loading2}
              {...data2}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              initialState={{
                ...data2.initialState,
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterValues: [""],
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Functions;
