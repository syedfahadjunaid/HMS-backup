import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

import {
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "./Store/Slices/AdminSlice";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Logout({ Style }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("Admin");
    // localStorage.removeItem("AdminRole");
    // localStorage.removeItem("AdminData");
    dispatch(getAdminRole(null));
    dispatch(getAdminLoggedIn(null));
    dispatch(getAdminLoggedInData(null));
    // Cookies.remove("AdminToken");
    localStorage.removeItem("AdminToken");

    handleClose();
    navigate("/");
  };

  return (
    <React.Fragment>
      <button
        className={Style}
        // onClick={handleLogout}
        onClick={handleClickOpen}>
        Logout
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{"LOGOUT"}</DialogTitle>
        <DialogContent className='bg-white w-[400px]'>
          <DialogContentText id='alert-dialog-description'>
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleLogout} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
