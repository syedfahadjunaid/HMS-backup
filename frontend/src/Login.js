import { useEffect, useState } from "react";
// import { lazy } from "react";
import "./Login.css";

import browserLinks from "./browserlinks";

import logoImage from "./assets/logo.png";
import loginPageImage from "./assets/loginpageimage.png";

import { IoMailOutline } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useAdminLoginMutation } from "./Store/Services/AdminService";
import {
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "./Store/Slices/AdminSlice";

import Cookies from "js-cookie";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Snackbars from "./components/SnackBar";

export default function Login() {
  const [adminLogin, responseAdminLogin] = useAdminLoginMutation();

  // Snackbar--------------------
  // ----Succcess
  const [openSnackbarSuccess, setOpenSnackBarSuccess] = React.useState(false);
  const [snackBarMessageSuccess, setSnackBarSuccessMessage] =
    React.useState("");

  const handleClickSnackbarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };
  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");

  const handleClickSnackbarWarning = () => {
    setOpenSnackBarWarning(true);
  };
  // ----------------------------

  const { adminLoggedInData } = useSelector((state) => state.AdminState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(adminLoggedInData);

  useEffect(() => {
    setTimeout(() => {
      //   if (
      //     Cookies.get("AdminToken") &&
      //     adminLoggedInData?.adminRole === "Super Admin"
      //   ) {
      //     navigate(
      //       `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
      //     );
      //   }
      //   if (Cookies.get("AdminToken") && adminLoggedInData?.adminRole === "HR") {
      //     navigate(
      //       `${browserLinks.hr.category}/${browserLinks.hr.internalPages.dashboard}`
      //     );
      //   }
      //   if (
      //     Cookies.get("AdminToken") &&
      //     adminLoggedInData?.adminRole === "Receptionist"
      //   ) {
      //     navigate(
      //       `${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.dashboard}`
      //     );
      //   }
      //   if (Cookies.get("AdminToken")) {
      //     navigate(1);
      //   }
      // }, [1000]);
      if (
        localStorage.getItem("AdminToken") &&
        adminLoggedInData?.adminRole === "Super Admin"
      ) {
        navigate(
          `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
        );
      }
      if (
        localStorage.getItem("AdminToken") &&
        adminLoggedInData?.adminRole === "HR"
      ) {
        navigate(
          `${browserLinks.hr.category}/${browserLinks.hr.internalPages.dashboard}`
        );
      }
      if (
        localStorage.getItem("AdminToken") &&
        adminLoggedInData?.adminRole === "Receptionist"
      ) {
        navigate(
          `${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.dashboard}`
        );
      }
      if (localStorage.getItem("AdminToken")) {
        navigate(1);
      }
    }, [1000]);
  }, [localStorage.getItem("AdminToken"), adminLoggedInData?.adminRole]);

  // console.log(responseAdminLogin);
  useEffect(() => {
    setTimeout(() => {
      if (responseAdminLogin.isSuccess) {
        // Cookies.set("AdminToken", responseAdminLogin?.data?.token, {
        //   expires: 1,
        //   secure: true,
        // });
        // dispatch(getAdminLoggedIn(responseAdminLogin?.data?.token));
        localStorage.setItem("AdminToken", responseAdminLogin?.data?.token);
        dispatch(getAdminLoggedIn(responseAdminLogin?.data?.token));
        dispatch(getAdminLoggedInData(responseAdminLogin?.data?.data));
        dispatch(getAdminRole(responseAdminLogin?.data?.adminRole));

        setSnackBarSuccessMessage(responseAdminLogin?.data?.message);
        handleClickSnackbarSuccess();
        setIsLoading(false);

        // if (responseAdminLogin?.data?.adminRole === 1) {
        //   navigate(
        //     `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
        //   );
        // }
      } else if (responseAdminLogin.isError) {
        setSnackBarSuccessWarning(responseAdminLogin?.error?.data);
        handleClickSnackbarWarning();
        setIsLoading(false);
      }
    }, [1000]);
  }, [responseAdminLogin.isSuccess, responseAdminLogin.isError]);

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      adminEmail: adminEmail,
      adminPassword: adminPassword,
    };
    adminLogin(loginData);

    setIsLoading(true);

    // navigate(
    //   `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
    // );
  };
  return (
    <>
      <div className='mainLoginPage w-[90%] flex flex-row items-center justify-center h-screen'>
        <div className='mainLoginPage-left w-[40%] flex flex-col gap-[2rem] p-[4rem] shadow-md items-center'>
          <img src={logoImage} alt='logoImage' className='w-[220px]' />
          <p className='font-[700]'>Login into your account</p>
          <form
            className='flex flex-col items-start justify-start w-full gap-[1rem]'
            onSubmit={handleLogin}>
            <label className='text-[#555]'>Email Address</label>
            <div className='flex w-full'>
              <input
                className='bg-[#F1F3F6] w-full rounded-[8px] px-[10px] outline-none'
                placeholder='Enter Your Email'
                type='email'
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <div className='bg-[#0085FF] w-fit p-[10px] rounded-[8px]'>
                <IoMailOutline className='text-white bg-[#0085FF] text-[25px]' />
              </div>
            </div>
            <label className='text-[#555]'>Password</label>
            <div className='flex w-full'>
              <input
                className='bg-[#F1F3F6] w-full rounded-[8px] px-[10px] outline-none'
                placeholder='Enter Your Password'
                type='password'
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div className='bg-[#0085FF] w-fit p-[10px] rounded-[8px]'>
                <MdOutlineLock className='text-white bg-[#0085FF] text-[25px]' />
              </div>
            </div>
            {isLoading ? (
              <div className='flex flex-row justify-center w-full'>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress color='inherit' />
                </Box>
              </div>
            ) : (
              <button
                type='submit'
                className='bg-[#0085FF] text-white w-full p-[10px] rounded-[8px] shadow-lg'>
                Login Now
              </button>
            )}
          </form>
          <p className='text-[#C2C2C2] text-end w-full cursor-pointer hover:underline'>
            Forgot Password?
          </p>
        </div>
        <div className='mainLoginPage-right w-[60%] flex items-center justify-center'>
          <img
            src={loginPageImage}
            alt='loginPageImage'
            className='w-[500px]'
          />
        </div>
      </div>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity='success'
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity='warning'
        message={snackBarMessageWarning}
      />
    </>
  );
}
