import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationMapPage({ data }) {
  return (
    <Stack spacing={2}>
      <Pagination count={data.length} shape='rounded' />
      {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
    </Stack>
  );
}
