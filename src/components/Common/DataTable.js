import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns, loading, sx }) => {
  return (
    <DataGrid
      checkboxSelection
      pageSizeOptions={[2, 5, 10, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 2, page: 0 },
        },
      }}
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
    />
  );
};

export default DataTable;
