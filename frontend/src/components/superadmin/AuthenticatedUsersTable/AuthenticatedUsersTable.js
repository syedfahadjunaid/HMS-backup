import "./AuthenticatedUsersTable.css";
import { Suspense } from "react";
import Table from "../../Table";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";

import {
  useAdminRegisterMutation,
  useAdminUpdateByIdMutation,
  useAdminActiveInactiveMutation,
} from "../../../Store/Services/AdminService";

import {
  createAdminChange,
  updateAdminChange,
  deleteAdminChange,
} from "../../../Store/Slices/AdminSlice";

import Snackbars from "../../SnackBar";

export default function AuthenticatedUsersTable() {
  const dispatch = useDispatch();
  const { Admins } = useSelector((state) => state.AdminState);

  const [adminRegister, responseAdminRegister] = useAdminRegisterMutation();
  const [adminUpdateById, responseAdminUpdateById] =
    useAdminUpdateByIdMutation();
  const [adminActiveInactive, responseAdminActiveInactive] =
    useAdminActiveInactiveMutation();

  const [adminId, setAdminId] = React.useState("");
  const [adminName, setAdminName] = React.useState("");
  const [adminEmail, setAdminEmail] = React.useState("");
  const [adminRole, setAdminRole] = React.useState("Doctor");
  const [adminPassword, setAdminPassword] = React.useState("");

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

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  // Add
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setAdminName("");
    setAdminEmail("");
    setAdminRole("Doctor");
    setAdminPassword("");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (responseAdminRegister.isSuccess) {
      dispatch(createAdminChange(Math.random()));
      setSnackBarSuccessMessage(responseAdminRegister?.data?.message);
      handleClose();
      handleClickSnackbarSuccess();
      setAdminName("");
      setAdminEmail("");
      setAdminRole("Doctor");
      setAdminPassword("");
    } else if (responseAdminRegister.isError) {
      setSnackBarSuccessWarning(responseAdminRegister?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseAdminRegister.isSuccess, responseAdminRegister.isError]);

  const handleAddUser = (e) => {
    e.preventDefault();

    const submitData = {
      adminName: adminName,
      adminEmail: adminEmail,
      adminPassword: adminPassword,
      adminRole: adminRole,
    };
    adminRegister(submitData);
  };
  const billingModalAddForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>User Information</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleAddUser}>
        <div className='grid grid-cols-2 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Name *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter name'
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Email Id *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='email'
              required
              placeholder='Enter email id'
              autocomplete='off'
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Role *</label>
            <select
              required
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>Super Admin</option>
              <option>Doctor</option>
              <option>HR</option>
              <option>Receptionist</option>
              <option>Pharmacist</option>
              <option>Accountant</option>
              <option>Nurse</option>
              <option>Radiologist</option>
              <option>Laboratory Assistant</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Password *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='password'
              required
              minLength={6}
              autoComplete='new-password'
              placeholder='Enter password'
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='buttonFilled w-fit'>{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  // ------------------------------

  // Update
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setAdminId(data?.adminId);
    setAdminName(data?.adminName);
    setAdminEmail(data?.adminEmail);
    setAdminRole(data?.adminRole);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  React.useEffect(() => {
    if (responseAdminUpdateById.isSuccess) {
      dispatch(updateAdminChange(Math.random()));
      setSnackBarSuccessMessage(responseAdminUpdateById?.data?.message);
      handleCloseUpdateModal();
      handleClickSnackbarSuccess();
    } else if (responseAdminUpdateById.isError) {
      setSnackBarSuccessWarning(responseAdminUpdateById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseAdminUpdateById.isSuccess, responseAdminUpdateById.isError]);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    const updateData = {
      id: adminId,
      data: {
        adminName: adminName,
        adminRole: adminRole,
        adminPassword: adminPassword,
      },
    };
    adminUpdateById(updateData);
  };

  const billingModalUpdateForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>User Information</h2>
      <form className='flex flex-col gap-[1rem] ' onSubmit={handleUpdateUser}>
        <div className='grid grid-cols-2 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Name *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter name'
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Email Id *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='email'
              // required
              disabled
              placeholder='Enter email id'
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Role *</label>
            <select
              required
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>Super Admin</option>
              <option>Doctor</option>
              <option>HR</option>
              <option>Receptionist</option>
              <option>Pharmacist</option>
              <option>Accountant</option>
              <option>Nurse</option>
              <option>Radiologist</option>
              <option>Laboratory Assistant</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Password *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='password'
              placeholder='Enter password'
              autoComplete='new-password'
              minLength={6}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
        </div>
        <button type='submit' className='buttonFilled w-fit'>{`Save >`}</button>
      </form>
    </div>
  );
  // -----------------------------

  const [search, setSearch] = React.useState("");

  const filteredArray = Admins?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.adminEmail?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedAdminsData = filteredArray?.map((admin, index) => {
    return {
      tableId: index + 1,
      adminId: admin?.adminId,
      adminName: admin?.adminName,
      adminEmail: admin?.adminEmail,
      adminRole: admin?.adminRole,
      isActive: admin?.isActive,
      createdAt: admin?.createdAt,
      updatedAt: admin?.updatedAt,
    };
  });
  console.log(mappedAdminsData);

  React.useEffect(() => {
    if (responseAdminActiveInactive.isSuccess) {
      dispatch(deleteAdminChange(Math.random()));
      setSnackBarSuccessMessage(responseAdminActiveInactive?.data?.message);
      handleClickSnackbarSuccess();
    } else if (responseAdminActiveInactive.isError) {
      setOpenSnackBarWarning(responseAdminActiveInactive?.error?.data);
      setOpenSnackBarWarning();
    }
  }, [
    responseAdminActiveInactive.isSuccess,
    responseAdminActiveInactive.isError,
  ]);

  const config = [
    {
      label: "S No.",
      render: (list) => list.tableId,
    },
    {
      label: "User Name",
      render: (list) => list.adminName,
    },
    {
      label: "Email",
      render: (list) => list.adminEmail,
    },
    {
      label: "Date Created",
      render: (list) => `${date(list.createdAt)} - ${time(list.createdAt)}`,
    },
    {
      label: "Date Updated",
      render: (list) => `${date(list.updatedAt)} - ${time(list.updatedAt)}`,
    },
    {
      label: "Role",
      render: (list) => list.adminRole,
    },
    {
      label: "Status",
      render: (list) => (
        <Switch
          onChange={(e) =>
            adminActiveInactive({
              id: list.adminId,
              data: {
                isActive: e.target.checked,
              },
            })
          }
          defaultChecked={list.isActive}
        />
      ),
    },
    {
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          {/* <div
            // onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div> */}
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div>
          {/* <div
            // onClick={() => handleClickOpenDialogBox(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.adminEmail;
  };

  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>
            Authenticated Users
          </h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add User
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by email id'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={mappedAdminsData} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>Add User</h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {billingModalAddForm}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Edit User
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {billingModalUpdateForm}
          </Typography>
        </Box>
      </Modal>
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
    </Suspense>
  );
}
