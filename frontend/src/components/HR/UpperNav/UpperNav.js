import React, { useEffect, useState } from "react";
import "./UpperNav.css";
import { Suspense } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import Logout from "../../../Logout";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Snackbars from "../../SnackBar";

import {
  useAdminChangePasswordByIdMutation,
  useAdminUpdateByIdMutation,
} from "../../../Store/Services/AdminService";

import { useDispatch } from "react-redux";

import { updateAdminChange } from "../../../Store/Slices/AdminSlice";

export default function UpperNav() {
  const dispatch = useDispatch();
  const { Admins, adminLoggedIn, adminLoggedInData, adminRole } = useSelector(
    (state) => state.AdminState
  );

  const [adminChangePasswordById, responseAdminChangePasswordById] =
    useAdminChangePasswordByIdMutation();

  const [adminUpdateById, responseAdminUpdateById] =
    useAdminUpdateByIdMutation();

  console.log(responseAdminChangePasswordById);

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminOldPassword, setAdminOldPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const handleOpenProfileModal = () => {
    setAdminName(adminLoggedInData?.adminName);
    setAdminEmail(adminLoggedInData?.adminEmail);
    setOpenProfileModal(true);
  };
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  const [openChangePasswordModal, setOpenChangePasswordModal] =
    React.useState(false);
  const handleOpenChangePasswordModal = () => setOpenChangePasswordModal(true);
  const handleCloseChangePasswordModal = () =>
    setOpenChangePasswordModal(false);

  // console.log(adminRole);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

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

  useEffect(() => {
    if (responseAdminUpdateById.isSuccess) {
      setSnackBarSuccessMessage(responseAdminUpdateById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseProfileModal();
      dispatch(updateAdminChange(Math.random()));
    } else if (responseAdminUpdateById.isError) {
      setSnackBarSuccessWarning(responseAdminUpdateById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseAdminUpdateById.isSuccess, responseAdminUpdateById.isError]);

  const handleProfileChange = (e) => {
    e.preventDefault();

    adminUpdateById({
      id: adminLoggedInData?.adminId,
      data: {
        adminName: adminName,
        adminPassword: "",
        adminRole: adminLoggedInData?.adminRole,
      },
    });
  };

  useEffect(() => {
    if (responseAdminChangePasswordById.isSuccess) {
      setSnackBarSuccessMessage(responseAdminChangePasswordById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseChangePasswordModal();
      dispatch(updateAdminChange(Math.random()));
    } else if (responseAdminChangePasswordById.isError) {
      setSnackBarSuccessWarning(responseAdminChangePasswordById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseAdminChangePasswordById.isSuccess,
    responseAdminChangePasswordById.isError,
  ]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    adminChangePasswordById({
      id: adminLoggedInData?.adminId,
      data: {
        adminOldPassword: adminOldPassword,
        adminPassword: adminPassword,
      },
    });
  };

  return (
    <>
      <Suspense fallback={<>...</>}>
        <div className='flex flex-row w-full items-center border-b-[1px] border-b-solid relative'>
          <div className='flex p-[1.5rem] w-[70%]'>
            <div className='px-[10px] w-[90%] bg-[#E7EFFF] flex flex-row items-center gap-[10px] rounded-[8px]'>
              <FaSearch className='text-[#636D73]' />
              <input
                className='w-full outline-none py-[10px] bg-transparent'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='w-[30%] flex gap-[1rem] items-center pr-[1rem]'>
            <div className='flex relative cursor-pointer'>
              <div className='p-[6px] rounded-md shadow-md w-fit h-fit'>
                <FaRegBell className='text-[25px] text-[#2662F0]' />
              </div>

              <GoDotFill className='text-[#FDCA40] absolute right-0' />
            </div>
            {/* <img
              src={userImage}
              alt='userImage'
              className='w-[50px] h-[50px]'
            /> */}
            <FaRegUser className='text-[35px] bg-[#3497F9] text-white p-[4px] rounded-full' />
            <div
              className='flex flex-col items-start text-[#414D55] cursor-pointer select-none'
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <p className='font-[500] text-[14px]'>
                {adminLoggedInData?.adminName}
              </p>
              <p>{adminLoggedInData?.adminRole}</p>
            </div>
            {showProfileDropdown ? (
              <IoIosArrowUp
                className='cursor-pointer'
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
            ) : (
              <IoIosArrowDown
                className='cursor-pointer'
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              />
            )}
            {showProfileDropdown && (
              <div className='absolute px-[3rem] top-[5rem] flex flex-col items-center z-10 fade-in'>
                <div className='border-t-[20px] border-t-transparent w-fit border-b-[20px] border-b-[#3497F9] border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent'></div>
                <div className='bg-[#3497F9] px-[3rem] shadow-md py-[1rem] rounded-md flex flex-col items-start gap-[10px] w-fit'>
                  <button
                    onClick={handleOpenProfileModal}
                    className='bg-white text-[14px] text-black p-[4px] rounded-md w-full'>
                    My Profile
                  </button>
                  <button
                    onClick={handleOpenChangePasswordModal}
                    className='bg-white text-[14px] text-black p-[4px] rounded-md w-full'>
                    Change Password
                  </button>
                  <Logout Style='bg-[#202020] text-[14px] text-white p-[4px] rounded-md w-full' />
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          open={openProfileModal}
          onClose={handleCloseProfileModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <h1 className='headingBottomUnderline w-fit'>Edit Profile</h1>
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <form
                className='flex flex-col gap-[1rem]'
                onSubmit={handleProfileChange}>
                <div className='grid grid-cols-2 gap-[1rem]'>
                  <div className='flex flex-col gap-[10px]'>
                    <label>Full Name</label>
                    <input
                      className='bg-[#F4F4F4] outline-none p-[1rem] rounded-[8px]'
                      required
                      type='text'
                      placeholder='Enter full name'
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-[10px]'>
                    <label>Email</label>
                    <input
                      className='bg-[#F4F4F4] outline-none p-[1rem] rounded-[8px]'
                      disabled
                      type='email'
                      placeholder='Enter email'
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type='submit' className='buttonFilled w-fit'>
                  Submit
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
        <Modal
          open={openChangePasswordModal}
          onClose={handleCloseChangePasswordModal}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              <h1 className='headingBottomUnderline w-fit'>Change Password</h1>
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <form
                className='flex flex-col gap-[1rem]'
                onSubmit={handleChangePassword}>
                <div className='grid grid-cols-2 gap-[1rem]'>
                  <div className='flex flex-col gap-[10px]'>
                    <label>Old Password</label>
                    <input
                      className='bg-[#F4F4F4] outline-none p-[1rem] rounded-[8px]'
                      type='password'
                      required
                      placeholder='Enter old password'
                      autoComplete='new-password'
                      value={adminOldPassword}
                      onChange={(e) => setAdminOldPassword(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-[10px]'>
                    <label>New Password</label>
                    <input
                      className='bg-[#F4F4F4] outline-none p-[1rem] rounded-[8px]'
                      type='password'
                      required
                      placeholder='Enter new password'
                      autoComplete='new-password'
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button type='submit' className='buttonFilled w-fit'>
                  Submit
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>
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
      </Suspense>
    </>
  );
}
