import { Suspense } from "react";

import "./DoctorTable.css";

import Table from "../../Table";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";

import placeholder from "../../../assets/imageplaceholder.png";

import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

import {
  useCreateDoctorMutation,
  useGetDoctorByIdQuery,
  useUpdateDoctorByIdMutation,
  useDeleteDoctorByIdMutation,
} from "../../../Store/Services/DoctorService";

import {
  createDoctorChange,
  updateDoctorChange,
  deleteDoctorChange,
} from "../../../Store/Slices/DoctorSlice";

export default function DoctorTable() {
  const dispatch = useDispatch();

  const { doctors } = useSelector((state) => state.DoctorState);

  const [createDoctor, responseCreateDoctor] = useCreateDoctorMutation();
  const [updateDoctorById, responseUpdateDoctorById] =
    useUpdateDoctorByIdMutation();
  const [deleteDoctorById, responseDeleteDoctorById] =
    useDeleteDoctorByIdMutation();

  // console.log(responseUpdateDoctorById);
  //   console.log(responseDeleteDoctorById);

  const [doctorId, setDoctorId] = React.useState("");
  const [doctorIdToDelete, setDoctorIdToDelete] = React.useState("");
  const [doctorData, setDoctorData] = React.useState("");

  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);

  // states
  const [doctorName, setDoctorName] = React.useState("");
  const [doctorEmail, setDoctorEmail] = React.useState("");
  const [doctorQualification, setDoctorQualification] = React.useState("");
  const [doctorSpecialization, setDoctorSpecialization] = React.useState("");
  const [doctorDOB, setDoctorDOB] = React.useState("");
  const [doctorBloodGroup, setDoctorBloodGroup] = React.useState("");
  const [doctorPhone, setDoctorPhone] = React.useState("");
  const [doctorLocalAddress, setDoctorLocalAddress] = React.useState("");
  const [doctorPermanentAddress, setDoctorPermanentAddress] =
    React.useState("");
  const [doctorCity, setDoctorCity] = React.useState("");
  const [doctorState, setDoctorState] = React.useState("");
  const [doctorCountry, setDoctorCountry] = React.useState("");
  const [doctorZipCode, setDoctorZipCode] = React.useState("");
  const [doctorImage, setDoctorImage] = React.useState();
  const [doctorGender, setDoctorGender] = React.useState("Female");
  const [doctorFee, setDoctorFee] = React.useState("");
  const [doctorDepartment, setDoctorDepartment] = React.useState("");
  const [doctorDesignation, setDoctorDesignation] = React.useState("");

  React.useEffect(() => {
    if (
      responseGetDoctorById.isSuccess &&
      responseGetDoctorById.status === "fulfilled"
    ) {
      //   console.log(responseGetDoctorById);
      // doctorData to view
      setDoctorData(responseGetDoctorById?.data);
      // doctorStates
      setDoctorName(responseGetDoctorById?.data?.DoctorDetails?.doctorName);
      setDoctorEmail(responseGetDoctorById?.data?.DoctorDetails?.doctorEmail);
      setDoctorQualification(
        responseGetDoctorById?.data?.DoctorDetails?.doctorQualification
      );
      setDoctorSpecialization(
        responseGetDoctorById?.data?.DoctorDetails?.doctorSpecialization
      );
      setDoctorDOB(responseGetDoctorById?.data?.DoctorDetails?.doctorDOB);
      setDoctorBloodGroup(
        responseGetDoctorById?.data?.DoctorDetails?.doctorBloodGroup
      );
      setDoctorPhone(responseGetDoctorById?.data?.DoctorDetails?.doctorPhone);
      setDoctorLocalAddress(
        responseGetDoctorById?.data?.DoctorDetails?.doctorLocalAddress
      );
      setDoctorPermanentAddress(
        responseGetDoctorById?.data?.DoctorDetails?.doctorPermanentAddress
      );
      setDoctorCity(responseGetDoctorById?.data?.DoctorDetails?.doctorCity);
      setDoctorState(responseGetDoctorById?.data?.DoctorDetails?.doctorState);
      setDoctorCountry(
        responseGetDoctorById?.data?.DoctorDetails?.doctorCountry
      );
      setDoctorZipCode(
        responseGetDoctorById?.data?.DoctorDetails?.doctorZipCode
      );
      setDoctorGender(responseGetDoctorById?.data?.DoctorDetails?.doctorGender);
      //
      setDoctorFee(
        responseGetDoctorById?.data?.DoctorProfessionalDetails?.doctorFee
      );
      setDoctorDepartment(
        responseGetDoctorById?.data?.DoctorProfessionalDetails?.doctorDepartment
      );
      setDoctorDesignation(
        responseGetDoctorById?.data?.DoctorProfessionalDetails
          ?.doctorDesignation
      );
    }
  }, [responseGetDoctorById.isSuccess, doctorId, responseGetDoctorById.status]);

  //   console.log(doctorName);

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
    setDoctorIdToDelete(data?.doctorId);
    setDialogMessage(`Are you sure you want to delete ${data?.doctorId} ?`);
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = React.useCallback(() => {
    deleteDoctorById(doctorIdToDelete);
    setOpenDialogBox(false);
  }, [doctorIdToDelete]);

  React.useEffect(() => {
    if (
      responseDeleteDoctorById.isSuccess &&
      responseDeleteDoctorById.status === "fulfilled"
    ) {
      dispatch(deleteDoctorChange(Math.random()));
      setSnackBarSuccessMessage(responseDeleteDoctorById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setDoctorIdToDelete("");
    }
    if (responseDeleteDoctorById.isError) {
      setSnackBarSuccessWarning(responseDeleteDoctorById?.error?.data?.error);
      // handleClickSnackbarWarning();
    }
  }, [
    responseDeleteDoctorById.isSuccess,
    responseDeleteDoctorById.isError,
    responseDeleteDoctorById.status,
  ]);

  // ----------------------------------

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
  // View Modal
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (data) => {
    setDoctorId(data?.doctorId);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  // console.log(doctorData);

  const modalViewDoctorDetails = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <div className="border-b flex gap-[1rem] py-[1rem] w-full">
        <h3 className="font-[500]">Doctor ID: </h3>
        <h3>{doctorData?.DoctorDetails?.doctorId}</h3>
      </div>
      <div className="flex w-full">
        <div className="w-[25%] flex flex-col items-center">
          <img
            className="w-[200px] h-[200px] object-contain"
            src={
              doctorData?.DoctorDetails?.doctorImage
                ? process.env.React_App_Base_Image_Url +
                  doctorData?.DoctorDetails?.doctorImage
                : placeholder
            }
            alt="patientImage"
          />
          <button className="buttonFilled w-fit">Button</button>
        </div>
        <div className="w-[75%] flex flex-col gap-[10px] text-[14px]">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Name: </p>
              <p>{doctorData?.DoctorDetails?.doctorName}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Gender: </p>
              <p>{doctorData?.DoctorDetails?.doctorGender}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Date Of Birth: </p>
              <p>{doctorData?.DoctorDetails?.doctorDOB}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Phone: </p>
              <p>{doctorData?.DoctorDetails?.doctorPhone}</p>
            </div>

            <div className="flex">
              <p className="font-[600] w-[150px]">Blood Group: </p>
              <p>{doctorData?.DoctorDetails?.doctorBloodGroup}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Qualification: </p>
              <p>{doctorData?.DoctorDetails?.doctorQualification}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Specialization: </p>
              <p>{doctorData?.DoctorDetails?.doctorSpecialization}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">City: </p>
              <p>{doctorData?.DoctorDetails?.doctorCity}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">State: </p>
              <p>{doctorData?.DoctorDetails?.doctorState}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Country: </p>
              <p>{doctorData?.DoctorDetails?.doctorCountry}</p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Zipcode: </p>
              <p>{doctorData?.DoctorDetails?.doctorZipCode}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex">
              <p className="font-[600] w-[150px]">Email Id: </p>
              <p className="text-[14px]">
                {doctorData?.DoctorDetails?.doctorEmail}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Local Address: </p>
              <p className="break-word text-[14px]">
                {doctorData?.DoctorDetails?.doctorLocalAddress}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Permanent Address: </p>
              <p className="break-word text-[14px]">
                {doctorData?.DoctorDetails?.doctorPermanentAddress}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Department: </p>
              <p className="text-[14px]">
                {doctorData?.DoctorProfessionalDetails?.doctorDepartment}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Designation: </p>
              <p className="text-[14px]">
                {doctorData?.DoctorProfessionalDetails?.doctorDesignation}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Fees: </p>
              <p className="text-[14px]">
                {doctorData?.DoctorProfessionalDetails?.doctorFee}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Created On: </p>
              <p className="break-word text-[14px]">
                {`${date(doctorData?.DoctorDetails?.createdAt)} ${time(
                  doctorData?.DoctorDetails?.createdAt
                )}`}
              </p>
            </div>
            <div className="flex">
              <p className="font-[600] w-[150px]">Updated On: </p>
              <p className="break-word text-[14px]">
                {`${date(doctorData?.DoctorDetails?.updatedAt)} ${time(
                  doctorData?.DoctorDetails?.updatedAt
                )}`}
              </p>
            </div>
          </div>
          {/* <div className='grid grid-cols-2 gap-[10px]'>
            
          </div> */}
        </div>
      </div>
    </div>
  );

  // Add Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Update Modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    setDoctorId(data?.doctorId);

    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setDoctorId("");
    setOpenUpdateModal(false);
  };

  // Add Patient
  React.useEffect(() => {
    if (responseCreateDoctor.isSuccess) {
      dispatch(createDoctorChange(Math.random()));
      setSnackBarSuccessMessage(responseCreateDoctor?.data?.message);
      handleClickSnackbarSuccess();
      handleClose();

      //   setDoctorName("");
      //   setDoctorEmail("");
      //   setDoctorQualification("");
      //   setDoctorSpecialization("");
      //   setDoctorBloodGroup("");
      //   setDoctorPhone("");
      //   setDoctorLocalAddress("");
      //   setDoctorPermanentAddress("");
      //   setDoctorCity("");
      //   setDoctorState("");
      //   setDoctorCountry("");
      //   setDoctorZipCode("");
      //   setDoctorFee("");
      //   setDoctorDOB("");
      //   setDoctorDepartment("");
      //   setDoctorDesignation("");
      setDoctorImage();
      setDoctorGender("Female");
      reset();
    } else if (responseCreateDoctor.isError) {
      setSnackBarSuccessWarning(responseCreateDoctor?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseCreateDoctor.isSuccess, responseCreateDoctor.isError]);

  const handleAddDoctor = (data) => {
    const doctorData = { ...data, doctorGender, doctorImage };

    const formData = new FormData();

    formData.append("doctorName", doctorData?.doctorName);
    formData.append("doctorEmail", doctorData?.doctorEmail);
    formData.append("doctorQualification", doctorData?.doctorQualification);
    formData.append("doctorSpecialization", doctorData?.doctorSpecialization);
    formData.append("doctorDOB", doctorData?.doctorDOB);
    formData.append("doctorPhone", doctorData?.doctorPhone);
    formData.append("doctorGender", doctorData?.doctorGender);
    formData.append("doctorBloodGroup", doctorData?.doctorBloodGroup);
    formData.append("doctorLocalAddress", doctorData?.doctorLocalAddress);
    formData.append(
      "doctorPermanentAddress",
      doctorData?.doctorPermanentAddress
    );
    formData.append("doctorCity", doctorData?.doctorCity);
    formData.append("doctorState", doctorData?.doctorState);
    formData.append("doctorCountry", doctorData?.doctorCountry);
    formData.append("doctorZipCode", doctorData?.doctorZipCode);
    formData.append("doctorImage", doctorData?.doctorImage);
    formData.append("doctorFee", doctorData?.doctorFee);
    formData.append("doctorDepartment", doctorData?.doctorDepartment);
    formData.append("doctorDesignation", doctorData?.doctorDesignation);

    // console.log(formData);
    createDoctor(formData);
  };

  const modalADDDoctor = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Add Doctor Information</h2>
      <form
        className="flex flex-col gap-[1rem]"
        onSubmit={handleSubmit(handleAddDoctor)}
      >
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Name *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor name"
              {...register("doctorName", { required: true })}
            />
            {errors.doctorName && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Email *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="email"
              required
              placeholder="Enter doctor email"
              {...register("doctorEmail", { required: true })}
            />
            {errors.doctorEmail && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Qualification *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor qualification"
              {...register("doctorQualification", { required: true })}
            />
            {errors.doctorQualification && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Specialization *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor specialization"
              {...register("doctorSpecialization", { required: true })}
            />
            {errors.doctorSpecialization && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Phone *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              minLength={10}
              placeholder="Enter doctor phone number"
              {...register("doctorPhone", { required: true })}
            />
            {errors.doctorPhone && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Date Of Birth *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="date"
              required
              {...register("doctorDOB", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Fees *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              placeholder="Enter doctor fees"
              {...register("doctorFee", { required: true })}
            />
            {errors.doctorFee && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Department *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor department"
              {...register("doctorDepartment", { required: true })}
            />
            {errors.doctorDepartment && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Designation *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor designation"
              {...register("doctorDesignation", { required: true })}
            />
            {errors.doctorDesignation && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Gender *</label>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={doctorGender}
              name="radio-buttons-group"
              onChange={(e) => setDoctorGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Blood Group *</label>
            <select
              className="py-[11.5px] outline-none border-b bg-transparent"
              {...register("doctorBloodGroup", { required: true })}
            >
              <option>O positive</option>
              <option>O negative</option>
              <option>A positive</option>
              <option>A negative</option>
              <option>B positive</option>
              <option>B negative</option>
              <option>AB positive</option>
              <option>AB negative</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Photo *</label>
            <div className="flex flex-col gap-[1rem]">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setDoctorImage(e.target.files[0])}
              />

              <img
                className="object-contain w-[100px] h-[100px]"
                src={
                  doctorImage ? URL.createObjectURL(doctorImage) : placeholder
                }
                alt="placeholderimg"
              />
            </div>
          </div>
        </div>

        <h3 className="border-b py-[1rem]">Doctor Address Details</h3>
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Local Address *</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor local address"
              {...register("doctorLocalAddress", { required: true })}
            />
            {errors.doctorLocalAddress && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Permanent Address *</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor permanent address"
              {...register("doctorPermanentAddress", { required: true })}
            />
            {errors.doctorPermanentAddress && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">City *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor city"
              {...register("doctorCity", { required: true })}
            />
            {errors.doctorCity && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">State *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor state"
              {...register("doctorState", { required: true })}
            />
            {errors.doctorState && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Country *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor country"
              {...register("doctorCountry", { required: true })}
            />
            {errors.doctorCountry && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Zipcode *</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              placeholder="Enter doctor zipcode"
              {...register("doctorZipCode", { required: true })}
            />
            {errors.doctorZipCode && (
              <span className="text-[red]">This field is required</span>
            )}
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
          >{`Save & Print >`}</button>
          <button className="buttonOutlined">{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  // Update Patient
  React.useEffect(() => {
    if (responseUpdateDoctorById.isSuccess) {
      dispatch(updateDoctorChange(Math.random()));
      setSnackBarSuccessMessage(responseUpdateDoctorById?.data?.message);
      handleClickSnackbarSuccess();
      handleCloseUpdateModal();

      setDoctorImage();
      setDoctorGender("Female");
      //   responseGetPatientById.refetch();
      setDoctorId("");
      reset();
    } else if (responseUpdateDoctorById.isError) {
      setSnackBarSuccessWarning(responseUpdateDoctorById?.error?.data?.error);
      handleClickSnackbarWarning();
    }
  }, [responseUpdateDoctorById.isSuccess, responseUpdateDoctorById.isError]);

  const handleUpdateDoctor = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("doctorName", doctorName);
    formData.append("doctorEmail", doctorEmail);
    formData.append("doctorQualification", doctorQualification);
    formData.append("doctorSpecialization", doctorSpecialization);
    formData.append("doctorDOB", doctorDOB);
    formData.append("doctorPhone", doctorPhone);
    formData.append("doctorGender", doctorGender);
    formData.append("doctorBloodGroup", doctorBloodGroup);
    formData.append("doctorLocalAddress", doctorLocalAddress);
    formData.append("doctorPermanentAddress", doctorPermanentAddress);
    formData.append("doctorCity", doctorCity);
    formData.append("doctorState", doctorState);
    formData.append("doctorCountry", doctorCountry);
    formData.append("doctorZipCode", doctorZipCode);
    formData.append("doctorImage", doctorImage);
    formData.append("doctorFee", doctorFee);
    formData.append("doctorDepartment", doctorDepartment);
    formData.append("doctorDesignation", doctorDesignation);

    const updateData = {
      id: doctorId,
      data: formData,
    };
    // console.log(updateData);

    updateDoctorById(updateData);
  };

  const modalUpdateDoctor = (
    <div className="flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]">
      <h2 className="border-b py-[1rem]">Update Doctor Information</h2>
      <form className="flex flex-col gap-[1rem]" onSubmit={handleUpdateDoctor}>
        <div className="grid grid-cols-3 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Name</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              value={doctorName}
              placeholder="Enter doctor name"
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Email</label>
            <input
              className="py-[10px] outline-none border-b"
              type="email"
              required
              value={doctorEmail}
              placeholder="Enter doctor email"
              onChange={(e) => setDoctorEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Qualification</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              value={doctorQualification}
              placeholder="Enter doctor qualification"
              onChange={(e) => setDoctorQualification(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Specialization</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor specialization"
              value={doctorSpecialization}
              onChange={(e) => setDoctorSpecialization(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Phone</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              minLength={10}
              placeholder="Enter doctor phone number"
              value={doctorPhone}
              onChange={(e) => setDoctorPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Date Of Birth</label>
            <input
              className="py-[10px] outline-none border-b"
              type="date"
              required
              value={doctorDOB}
              onChange={(e) => setDoctorDOB(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Fees</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              placeholder="Enter doctor fees"
              value={doctorFee}
              onChange={(e) => setDoctorFee(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Department</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor department"
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Designation</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor designation"
              value={doctorDesignation}
              onChange={(e) => setDoctorDesignation(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Gender</label>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={doctorGender}
              name="radio-buttons-group"
              onChange={(e) => setDoctorGender(e.target.value)}
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Blood Group</label>
            <select
              className="py-[11.5px] outline-none border-b bg-transparent"
              value={doctorBloodGroup}
              onChange={(e) => setDoctorBloodGroup(e.target.value)}
            >
              <option>O positive</option>
              <option>O negative</option>
              <option>A positive</option>
              <option>A negative</option>
              <option>B positive</option>
              <option>B negative</option>
              <option>AB positive</option>
              <option>AB negative</option>
            </select>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Doctor Photo</label>
            <div className="flex flex-col gap-[1rem]">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                onChange={(e) => setDoctorImage(e.target.files[0])}
              />

              <img
                className="object-contain w-[100px] h-[100px]"
                src={
                  doctorImage ? URL.createObjectURL(doctorImage) : placeholder
                }
                alt="placeholderimg"
              />
            </div>
          </div>
        </div>

        <h3 className="border-b py-[1rem]">Doctor Address Details</h3>
        <div className="grid grid-cols-2 gap-[2rem] border-b pb-[3rem]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Local Address</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor local address"
              value={doctorLocalAddress}
              onChange={(e) => setDoctorLocalAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Permanent Address</label>
            <textarea
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor permanent address"
              value={doctorPermanentAddress}
              onChange={(e) => setDoctorPermanentAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">City</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor city"
              value={doctorCity}
              onChange={(e) => setDoctorCity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">State</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor state"
              value={doctorState}
              onChange={(e) => setDoctorState(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Country</label>
            <input
              className="py-[10px] outline-none border-b"
              type="text"
              required
              placeholder="Enter doctor country"
              value={doctorCountry}
              onChange={(e) => setDoctorCountry(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[14px]">Zipcode</label>
            <input
              className="py-[10px] outline-none border-b"
              type="number"
              required
              placeholder="Enter doctor zipcode"
              value={doctorZipCode}
              onChange={(e) => setDoctorZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-[1rem] items-center">
          <button
            type="submit"
            className="buttonFilled"
          >{`Save & Print >`}</button>
          <button className="buttonOutlined">{`Save >`}</button>
        </div>
      </form>
    </div>
  );

  const [search, setSearch] = React.useState("");

  const filteredArray = doctors?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.doctorName?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });

  const mappedBillData = filteredArray;

  const config = [
    {
      label: "Reg No.",
      render: (list) => list.doctorId,
    },
    {
      label: "Doctor Name",
      render: (list) => list.doctorName,
    },
    {
      label: "Doctor Email",
      render: (list) => list.doctorEmail,
    },
    {
      label: "Doctor Phone",
      render: (list) => list.doctorPhone,
    },
    {
      label: "Specialisation",
      render: (list) => list.doctorSpecialization,
    },
    {
      label: "Date Created",
      render: (list) => date(list.createdAt),
    },
    {
      label: "Action",
      render: (list) => (
        <div className="flex gap-[10px] justify-center">
          <div
            onClick={() => handleOpenViewModal(list)}
            className="p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer"
          >
            <MdViewKanban className="text-[25px] text-[#96999C]" />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className="p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer"
          >
            <RiEdit2Fill className="text-[25px] text-[#3497F9]" />
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
    return list.doctorId;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex justify-between">
          <h2 className="border-b-[4px] border-[#3497F9]">Doctors</h2>
          <button
            onClick={handleOpen}
            className="bg-[#3497F9] text-white p-[10px] rounded-md"
          >
            + Add Doctor
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]">
            <FaSearch className="text-[#56585A]" />
            <input
              className="bg-transparent outline-none"
              placeholder="Search by doctor name"
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Add Doctor
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalADDDoctor}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1 className="headingBottomUnderline w-fit pb-[10px]">
              Update Doctor
            </h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalUpdateDoctor}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="flex justify-between items-center">
              <h1 className="headingBottomUnderline w-fit pb-[10px]">
                Doctor Details
              </h1>
              <button className="buttonFilled flex items-center gap-[10px]">
                <LuHardDriveDownload />
                <p>Download</p>
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalViewDoctorDetails}
          </Typography>
        </Box>
      </Modal>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity="success"
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity="warning"
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
