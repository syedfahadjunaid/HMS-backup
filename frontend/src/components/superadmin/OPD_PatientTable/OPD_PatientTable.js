import { Suspense } from "react";
import "./OPD_PatientTable.css";
import Table from "../../Table";

import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import browserLinks from "../../../browserlinks";

import Select from "react-select";

import { useSelector, useDispatch } from "react-redux";

import { useForm } from "react-hook-form";

import placeholder from "../../../assets/imageplaceholder.png";

import * as React from "react";
import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";

import {
  useCreateOPDPatientMutation,
  useUpdateOPDPatientByIdMutation,
  useDeleteOPDPatientByIdMutation,
} from "../../../Store/Services/OPDPatientService";

import {
  createOPDPatientChange,
  updateOPDPatientChange,
  deleteOPDPatientChange,
} from "../../../Store/Slices/OPDPatientSlice";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OPD_PatientTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.DoctorState);
  const { patients } = useSelector((state) => state.PatientState);
  const { OPDPatients } = useSelector((state) => state.OPDPatientState);

  const [createOPDPatient, responseCreateOPDPatient] =
    useCreateOPDPatientMutation();

  const [updateOPDPatientById, responseUpdateOPDPatientById] =
    useUpdateOPDPatientByIdMutation();

  const [deleteOPDPatientById, responseDeleteOPDPatientById] =
    useDeleteOPDPatientByIdMutation();

  const [submitButton, setSubmitButton] = React.useState("");

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

  // Dialog Box------------------------
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [dialogBoxMessage, setDialogMessage] = React.useState(
    "Are you sure you want to delete?"
  );

  const handleClickOpenDialogBox = (data) => {
    setMainId(data?.data?.mainId);
    setDialogMessage(`Are you sure you want to delete ${data?.data?.mainId} ?`);
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = () => {
    deleteOPDPatientById(mainId);
    setOpenDialogBox(false);
  };

  React.useEffect(() => {
    if (responseDeleteOPDPatientById.isSuccess) {
      dispatch(deleteOPDPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseDeleteOPDPatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setMainId("");
    }
  }, [
    responseDeleteOPDPatientById.isSuccess,
    responseDeleteOPDPatientById.isError,
  ]);

  // ---------------------------------------

  // console.log(OPDPatients);

  // States for operation
  const [opdPatientId, setOpdPatientId] = React.useState({
    value: "",
    label: "",
  });
  const [opdCaseId, setOpdCaseId] = React.useState({ value: "", label: "" });
  const [opdId, setOpdId] = React.useState({ value: "", label: "" });
  const [opdPatientBloodPressure, setOpdPatientBloodPressure] =
    React.useState("");
  const [opdDoctorId, setOpdDoctorId] = React.useState({
    value: "",
    label: "",
  });
  const [opdPatientStandardCharges, setOpdPatientStandardCharges] =
    React.useState("");
  const [opdPatientPaymentMode, setOpdPatientPaymentMode] =
    React.useState("UPI");
  const [opdDoctorVisitDate, setOpdDoctorVisitDate] = React.useState();
  const [opdPatientNotes, setOpdPatientNotes] = React.useState("");

  const [mainId, setMainId] = React.useState("");
  const [opdPatientData, setOpdPatientData] = React.useState("");

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  // Add Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderedPatientIDForDropdown = patients?.map((data) => {
    return {
      value: data.patientId,
      label: `${data.patientId} / ${data.patientName}`,
    };
  });

  const renderedCaseIDForDropdown = OPDPatients?.map((data) => {
    return {
      value: data.mainId,
      label: data.mainId,
    };
  });

  const renderedOPDIDForDropdown = OPDPatients?.map((data) => {
    return {
      value: data.mainId,
      label: data.mainId,
    };
  });

  const renderedDoctorIDForDropdown = doctors?.map((data) => {
    return {
      value: data.doctorId,
      label: `${data.doctorId} / ${data.doctorName}`,
    };
  });

  React.useEffect(() => {
    if (submitButton === "add") {
      if (responseCreateOPDPatient.isSuccess) {
        dispatch(createOPDPatientChange(Math.random()));
        setSnackBarSuccessMessage(responseCreateOPDPatient?.data?.message);
        handleClickSnackbarSuccess();
        handleClose();
        setOpdPatientId({ value: "", label: "" });
        setOpdCaseId({ value: "", label: "" });
        setOpdId({ value: "", label: "" });
        setOpdDoctorId({ value: "", label: "" });
        setOpdPatientBloodPressure("");
        setOpdPatientStandardCharges("");
        setOpdPatientPaymentMode("");
        setOpdPatientNotes("");
        reset();
      }
    }
    if (submitButton === "addPrint") {
      navigate(
        `${
          browserLinks.superadmin.category
        }/${browserLinks.superadmin.internalPages.opdPatients
          .split(" ")
          .join("")}/${responseCreateOPDPatient?.data?.data?.mainId}`
      );
    } else if (responseCreateOPDPatient.isError) {
      setSnackBarSuccessWarning(responseCreateOPDPatient?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [responseCreateOPDPatient.isSuccess, responseCreateOPDPatient.isError]);

  const handleAddOPDPatient = (e) => {
    e.preventDefault();
    const submitData = {
      opdPatientId: opdPatientId?.value,
      opdCaseId: opdCaseId?.value,
      opdId: opdId?.value,
      opdDoctorId: opdDoctorId?.value,
      opdPatientBloodPressure: opdPatientBloodPressure,
      opdPatientStandardCharges: opdPatientStandardCharges,
      opdPatientPaymentMode: opdPatientPaymentMode,
      opdDoctorVisitDate: opdDoctorVisitDate,
      opdPatientNotes: opdPatientNotes,
    };
    // console.log(submitData);

    createOPDPatient(submitData);
  };

  // console.log(opdPatientId);

  const modalAddOPDPatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Add Patient</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleAddOPDPatient}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>UHID *</label>
            <Select
              required
              options={renderedPatientIDForDropdown}
              onChange={setOpdPatientId}
            />
          </div>

          {/* <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Case Id *</label>
            <Select
              required
              options={renderedCaseIDForDropdown}
              onChange={setOpdCaseId}
            />
          </div> */}

          {/* <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>OPD Id *</label>
            <Select
              required
              options={renderedOPDIDForDropdown}
              onChange={setOpdId}
            />
          </div> */}

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Doctor Id *</label>
            <Select
              required
              options={renderedDoctorIDForDropdown}
              onChange={setOpdDoctorId}
            />
          </div>

          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Blood Pressure *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter blood pressure'
              value={opdPatientBloodPressure}
              onChange={(e) => setOpdPatientBloodPressure(e.target.value)}
            />
          </div> */}

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Standard Charges *</label>
            <input
              className='py-[10px] outline-none border-b'
              // type='number'
              required
              placeholder='Enter standard charges'
              // value={opdPatientStandardCharges}
              // onChange={(e) => setOpdPatientStandardCharges(e.target.value)}
              value={opdPatientStandardCharges}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setOpdPatientStandardCharges(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              value={opdPatientPaymentMode}
              onChange={(e) => setOpdPatientPaymentMode(e.target.value)}>
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter payment mode"
              value={opdPatientPaymentMode}
              onChange={(e) => setOpdPatientPaymentMode(e.target.value)}
            /> */}
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Visit Date</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={opdPatientNotes}
            onChange={(e) => setOpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            onClick={() => setSubmitButton("add")}>{`Save >`}</button>
          <button
            className='buttonOutlined'
            onClick={() =>
              setSubmitButton("addPrint")
            }>{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );

  // ---------------------

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setMainId(data?.data?.mainId);
    setOpdPatientId({
      value: data?.data?.opdPatientId,
      label: data?.data?.opdPatientId,
    });
    setOpdCaseId({
      value: data?.data?.opdCaseId,
      label: data?.data?.opdCaseId,
    });
    setOpdId({ value: data?.data?.opdId, label: data?.data?.opdId });
    setOpdDoctorId({
      value: data?.data?.opdDoctorId,
      label: data?.data?.opdDoctorId,
    });
    setOpdPatientBloodPressure(data?.data?.opdPatientBloodPressure);
    setOpdPatientStandardCharges(data?.data?.opdPatientStandardCharges);
    setOpdPatientPaymentMode(data?.data?.opdPatientPaymentMode);
    setOpdDoctorVisitDate(data?.data?.opdDoctorVisitDate);
    setOpdPatientNotes(data?.data?.opdPatientNotes);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setMainId("");
    setOpdPatientId({ value: "", label: "" });
    setOpdCaseId({ value: "", label: "" });
    setOpdId({ value: "", label: "" });
    setOpdDoctorId({ value: "", label: "" });
    setOpdPatientBloodPressure("");
    setOpdPatientStandardCharges("");
    setOpdPatientPaymentMode("UPI");
    setOpdDoctorVisitDate("");
    setOpdPatientNotes("");
    setOpenUpdateModal(false);
  };

  React.useEffect(() => {
    if (submitButton === "update") {
      if (responseUpdateOPDPatientById.isSuccess) {
        dispatch(updateOPDPatientChange(Math.random()));
        setSnackBarSuccessMessage(responseUpdateOPDPatientById?.data?.message);
        handleClickSnackbarSuccess();
        handleCloseUpdateModal();
      }
    }
    if (submitButton === "updatePrint") {
      // dispatch(updateOPDPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdateOPDPatientById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();
      navigate(
        `${
          browserLinks.superadmin.category
        }/${browserLinks.superadmin.internalPages.opdPatients
          .split(" ")
          .join("")}/${responseUpdateOPDPatientById?.data?.data?.mainId}`
      );
    } else if (responseUpdateOPDPatientById.isError) {
      setSnackBarSuccessWarning(responseUpdateOPDPatientById?.error?.data);
      handleClickSnackbarWarning();
    }
  }, [
    responseUpdateOPDPatientById.isSuccess,
    responseUpdateOPDPatientById.isError,
  ]);

  // console.log(responseUpdateOPDPatientById);

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    const submitData = {
      opdPatientId: opdPatientId?.value,
      // opdCaseId: opdCaseId?.value,
      // opdId: opdId?.value,
      opdDoctorId: opdDoctorId?.value,
      // opdPatientBloodPressure: opdPatientBloodPressure,
      opdPatientStandardCharges: opdPatientStandardCharges,
      opdPatientPaymentMode: opdPatientPaymentMode,
      opdDoctorVisitDate: opdDoctorVisitDate,
      opdPatientNotes: opdPatientNotes,
    };

    const updateData = {
      id: mainId,
      data: submitData,
    };

    updateOPDPatientById(updateData);
  };

  const modalUpdatePatient = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Update Patient</h2>
      <form className='flex flex-col gap-[1rem]' onSubmit={handleUpdateDoctor}>
        <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Patient Registration Id *</label>
            <Select
              options={renderedPatientIDForDropdown}
              onChange={setOpdPatientId}
              defaultValue={opdPatientId}
            />
          </div>

          {/* <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>Case Id *</label>
            <Select
              options={renderedCaseIDForDropdown}
              onChange={setOpdCaseId}
              defaultValue={opdCaseId}
            />
          </div> */}

          {/* <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>OPD Id *</label>
            <Select
              options={renderedOPDIDForDropdown}
              onChange={setOpdId}
              defaultValue={opdId}
            />
          </div> */}

          <div className='flex flex-col gap-[6px] relative w-full'>
            <label className='text-[14px]'>OPD Id *</label>
            <Select
              options={renderedDoctorIDForDropdown}
              onChange={setOpdDoctorId}
              defaultValue={opdDoctorId}
            />
          </div>

          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Blood Pressure *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter blood pressure'
              value={opdPatientBloodPressure}
              onChange={(e) => setOpdPatientBloodPressure(e.target.value)}
            />
          </div> */}

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Standard Charges *</label>
            <input
              className='py-[10px] outline-none border-b'
              // type='number'
              required
              placeholder='Enter standard charges'
              // value={opdPatientStandardCharges}
              // onChange={(e) => setOpdPatientStandardCharges(e.target.value)}
              value={opdPatientStandardCharges}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setOpdPatientStandardCharges(value);
              }}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <select
              required
              className='py-[10px] outline-none border-b bg-transparent'
              value={opdPatientPaymentMode}
              onChange={(e) => setOpdPatientPaymentMode(e.target.value)}>
              <option>UPI</option>
              <option>Cash</option>
              <option>Cheque</option>
              <option>Card</option>
            </select>
            {/* <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter payment mode"
              value={opdPatientPaymentMode}
              onChange={(e) => setOpdPatientPaymentMode(e.target.value)}
            /> */}
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Visit Date</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={opdDoctorVisitDate}
              onChange={(e) => setOpdDoctorVisitDate(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Notes</label>
          <textarea
            className='border-b py-[10px] outline-none'
            placeholder='Enter notes'
            rows={3}
            value={opdPatientNotes}
            onChange={(e) => setOpdPatientNotes(e.target.value)}
          />
        </div>
        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            onClick={() => setSubmitButton("update")}
            className='buttonFilled'>{`Save >`}</button>
          {/* <button
            className='buttonOutlined'
            onClick={() =>
              setSubmitButton("updatePrint")
            }>{`Save & Print >`}</button> */}
        </div>
      </form>
    </div>
  );

  // ---------------------

  // View Modal
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (data) => {
    setOpdPatientData(data);
    setOpenViewModal(true);
  };
  console.log(opdPatientData);
  const handleCloseViewModal = () => setOpenViewModal(false);

  const modalViewPatientDetails = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <div className='border-b flex gap-[1rem] py-[1rem] w-full'>
        <h3 className='font-[500]'>ID: </h3>
        <h3>{opdPatientData?.data?.mainId}</h3>
      </div>
      <div className='flex w-full'>
        <div className='w-[25%] flex flex-col items-center'>
          <img
            className='w-[200px] h-[200px] object-contain'
            src={
              opdPatientData?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  opdPatientData?.patientData?.patientImage
                : placeholder
            }
            alt='patientImage'
          />
          {/* <button className='buttonFilled w-fit'>Button</button> */}
        </div>
        <div className='w-[75%] flex flex-col gap-[10px] text-[14px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Id: </p>
              <p>{opdPatientData?.data?.opdPatientId}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Id: </p>
              <p>{opdPatientData?.data?.opdDoctorId}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Name: </p>
              <p>{opdPatientData?.patientData?.patientName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Name: </p>
              <p>{opdPatientData?.doctorData?.doctorName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Blood Group: </p>
              <p>{opdPatientData?.patientData?.patientBloodGroup}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Doctor Phone: </p>
              <p>{opdPatientData?.doctorData?.doctorPhone}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Gender: </p>
              <p>{opdPatientData?.patientData?.patientGender}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Case No: </p>
              <p>{opdPatientData?.data?.opdCaseId}</p>
            </div> */}
            {/* <div className="flex">
              <p className="font-[600] w-[150px]">Patient DOB: </p>
              <p>{date(opdPatientData?.patientData?.patientDateOfBirth)}</p>
            </div> */}
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>OPD No: </p>
              <p>{opdPatientData?.data?.opdId}</p>
            </div> */}
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Phone: </p>
              <p>{opdPatientData?.patientData?.patientPhone}</p>
            </div>
            {/* <div className='flex'>
              <p className='font-[600] w-[150px]'>Blood Pressure: </p>
              <p>{opdPatientData?.data?.opdPatientBloodPressure}</p>
            </div> */}
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Height: </p>
              <p>{opdPatientData?.patientData?.patientHeight}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Standard Charge: </p>
              <p>{opdPatientData?.data?.opdPatientStandardCharges}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Patient Weight: </p>
              <p>{opdPatientData?.patientData?.patientWeight}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Payment Mode: </p>
              <p>{opdPatientData?.data?.opdPatientPaymentMode}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Visit Date: </p>
              <p>{`${date(opdPatientData?.data?.opdDoctorVisitDate)} / ${time(
                opdPatientData?.data?.opdDoctorVisitDate
              )}`}</p>
            </div>
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex flex-col'>
              <p className='font-[600] w-[150px]'>Notes: </p>
              <p className='text-[14px]'>
                {opdPatientData?.data?.opdPatientNotes}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Created On: </p>
              <p className='break-word text-[14px]'>
                {`${date(opdPatientData?.data?.createdAt)} ${time(
                  opdPatientData?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[150px]'>Updated On: </p>
              <p className='break-word text-[14px]'>
                {`${date(opdPatientData?.data?.updatedAt)} ${time(
                  opdPatientData?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // ---------------

  const [search, setSearch] = React.useState("");

  const filteredArray = OPDPatients?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.opdPatientId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedBillData = filteredArray?.map((data, index) => {
    const filteredPatientData = patients?.find(
      (patient) => data?.opdPatientId === patient?.patientId
    );
    const filteredDoctorData = doctors?.find(
      (doctor) => doctor?.doctorId === data?.opdDoctorId
    );
    return {
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData,
    };
  });

  const config = [
    {
      label: "OPD Bill No",
      render: (list) => list?.data?.mainId,
    },
    {
      label: "Patient Name",
      render: (list) => list?.patientData?.patientName,
    },
    {
      label: "Doctor Name",
      render: (list) => list?.doctorData?.doctorName,
    },
    {
      label: "Date Created",
      render: (list) => date(list?.data?.createdAt),
    },
    {
      label: "Standard Charge",
      render: (list) => list?.data?.opdPatientStandardCharges,
    },
    {
      label: "Payment Mode",
      render: (list) => (
        <p className='bg-[#B5FFBC] font-[600] rounded-lg p-[4px]'>
          {list?.data?.opdPatientPaymentMode}
        </p>
      ),
    },
    {
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          <div
            onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div>
          {/* <div
            onClick={() => handleClickOpenDialogBox(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.mainId;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>OPD Patients</h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add OPD Patients
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by uhid'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={mappedBillData} config={config} keyFn={keyFn} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add OPD Patient
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalAddOPDPatient}
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
              Update OPD Patient
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalUpdatePatient}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <div className='flex justify-between items-center'>
              <h1 className='headingBottomUnderline w-fit pb-[10px]'>
                OPD Patient Details
              </h1>
              <Link
                // onClick={handleGeneratePdf}
                target='_blank'
                to={opdPatientData?.data?.mainId}
                // to={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}/${opdPatientData?.data?.mainId}`}
                className='buttonFilled flex items-center gap-[10px]'>
                <LuHardDriveDownload />
                <p>Download</p>
              </Link>
            </div>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {modalViewPatientDetails}
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
      <DialogBoxToDelete
        open={openDialogBox}
        setOpen={setOpenDialogBox}
        handleAgree={handleAgreeDialogBoxToDelete}
        message={dialogBoxMessage}
      />
    </Suspense>
  );
}
