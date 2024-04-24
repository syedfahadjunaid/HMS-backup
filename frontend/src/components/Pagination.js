import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function PaginationComponent({
  page,
  handleChangePage,
  rowsPerPage,
  handleChangeRowsPerPage,
  data,
}) {
  // const [page, setPage] = React.useState(2);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  // console.log(data.length);
  return (
    <TablePagination
      style={{ backgroundColor: "white" }}
      rowsPerPageOptions={[5, 10, 20, 50]}
      component='div'
      count={data.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
