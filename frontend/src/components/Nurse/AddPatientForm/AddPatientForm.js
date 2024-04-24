import "./AddPatientForm.css";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import placeholder from "../../../assets/imageplaceholder.png";

import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../../SnackBar";
import { useAddPatientMutation } from "../../../Store/Services/PatientService";
import { createPatientChange } from "../../../Store/Slices/PatientSlice";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// import Select from "react-select";

export default function AddPatientForm() {
  const dispatch = useDispatch();
  const [addPatient, responseAddPatient] = useAddPatientMutation();
  // const editor = useRef(null);

  const [loading, setLoading] = useState(false);
  // const { doctors } = useSelector((state) => state.DoctorState);

  // const config = useMemo(
  //   () => ({
  //     readonly: false,
  //   }),
  //   []
  // );

  const { adminLoggedInData } = useSelector((state) => state.AdminState);

  const [patientGender, setPatientGender] = React.useState("Female");
  const [patientImage, setPatientImage] = React.useState();
  // const [patientAdmitCategory, setPatientAdminCaetgory] =
  //   React.useState("OPD Patient");
  // const [patientCase, setPatientCase] = React.useState("");
  // const [patientAdmittingDoctor, setPatientAdmittingDoctor] = React.useState({
  //   value: "",
  //   label: "",
  // });
  // const [patientVisitingDoctor, setPatientVisitingDoctor] = React.useState({
  //   value: "",
  //   label: "",
  // });

  const [submitButton, setSubmitButton] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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

  React.useEffect(() => {
    if (responseAddPatient.isSuccess) {
      dispatch(createPatientChange(Math.random()));
      setSnackBarSuccessMessage(responseAddPatient?.data?.message);
      handleClickSnackbarSuccess();

      setPatientImage();
      setPatientGender("Female");
      // setPatientCase("");
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
      reset();
    } else if (responseAddPatient.isError) {
      setSnackBarSuccessWarning(responseAddPatient?.error?.data?.error);
      handleClickSnackbarWarning();
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
    }
  }, [responseAddPatient.isSuccess, responseAddPatient.isError]);

  const handleAddPatient = (data) => {
    const patientData = {
      ...data,
      patientGender,
      patientImage,
      // patientAdmitCategory,
      // patientCase,
    };

    const formData = new FormData();

    formData.append("patientName", patientData?.patientName);
    formData.append("patientEmail", patientData?.patientEmail);
    formData.append("patientFatherName", patientData?.patientFatherName);
    formData.append("patientHusbandName", patientData?.patientHusbandName);
    formData.append("patientDateOfBirth", patientData?.patientDateOfBirth);
    formData.append("patientPhone", patientData?.patientPhone);
    formData.append("patientPhone2", patientData?.patientPhone2);
    formData.append("patientHeight", patientData?.patientHeight);
    formData.append("patientWeight", patientData?.patientWeight);
    formData.append("patientGender", patientData?.patientGender);
    formData.append("patientBloodGroup", patientData?.patientBloodGroup);
    formData.append("patientLocalAddress", patientData?.patientLocalAddress);
    formData.append(
      "patientPermanentAddress",
      patientData?.patientPermanentAddress
    );
    formData.append("patientCity", patientData?.patientCity);
    formData.append("patientState", patientData?.patientState);
    formData.append("patientCountry", patientData?.patientCountry);
    formData.append("patientZipCode", patientData?.patientZipCode);
    formData.append("patientImage", patientData?.patientImage);
    formData.append(
      "createdBy",
      JSON.stringify({
        email: adminLoggedInData?.adminEmail,
        name: adminLoggedInData?.adminName,
        role: adminLoggedInData?.adminRole,
        id: adminLoggedInData?.adminId,
      })
    );
    formData.append(
      "editedBy",
      JSON.stringify({
        email: adminLoggedInData?.adminEmail,
        name: adminLoggedInData?.adminName,
        role: adminLoggedInData?.adminRole,
        id: adminLoggedInData?.adminId,
      })
    );

    if (submitButton === "Save") {
      addPatient(formData);
      setLoading(true);
    }
    if (submitButton === "SavePrint") {
      console.log("Wait");
    }
  };

  // const renderedAdmittingDoctorForDropdown = doctors?.map((data) => {
  //   return {
  //     value: data.doctorId,
  //     label: `${data.doctorName} / ${data.doctorId}`,
  //   };
  // });

  return (
    <Suspense fallback={<>...</>}>
      <>
        <div className='flex flex-col gap-[1rem] p-[1rem]'>
          <div className='flex justify-between'>
            <h2 className='border-b-[4px] border-[#3497F9]'>Add New Patient</h2>
          </div>
          <div className='flex flex-col w-full text-[#3E454D] items-start text-start gap-[1rem] px-[10px] pb-[2rem]'>
            <form
              className='flex flex-col gap-[1rem]'
              onSubmit={handleSubmit(handleAddPatient)}>
              {/* <div className='flex flex-col gap-[6px] border-b'>
                <label className='text-[14px]'>Admit Category</label>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  value={patientAdmitCategory}
                  name='radio-buttons-group'
                  onChange={(e) => setPatientAdminCaetgory(e.target.value)}
                  sx={{ display: "flex", flexDirection: "row" }}>
                  <FormControlLabel
                    value='OPD Patient'
                    control={<Radio />}
                    label='OPD Patient'
                  />
                  <FormControlLabel
                    value='Emergency'
                    control={<Radio />}
                    label='Emergency'
                  />
                </RadioGroup>
              </div> */}
              <h2 className='border-b py-[1rem]'>Patient Information</h2>
              <div className='grid grid-cols-3 gap-[2rem] border-b pb-[3rem]'>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Patients Name *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient name'
                    {...register("patientName", { required: true })}
                  />
                  {errors.patientName && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Email *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='email'
                    required
                    placeholder='Enter patient email'
                    {...register("patientEmail", { required: true })}
                  />
                  {errors.patientEmail && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Father Name</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    placeholder='Enter patient father name'
                    {...register("patientFatherName")}
                  />
                  {errors.patientFatherName && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Husband Name</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    placeholder='Enter patient husband name'
                    {...register("patientHusbandName")}
                  />
                  {errors.patientHusbandName && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Date Of Birth *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='date'
                    required
                    {...register("patientDateOfBirth", { required: true })}
                  />
                  {errors.patientDateOfBirth && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Phone *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='number'
                    required
                    placeholder='Enter patient phone number'
                    {...register("patientPhone", {
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                    })}
                  />
                  {errors.patientPhone && (
                    <span className='text-[red]'>
                      This field is required with 10 digits
                    </span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>
                    Phone Number of Attendent
                  </label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='number'
                    placeholder='Enter phone number of attendent'
                    {...register("patientPhone2", {
                      minLength: 10,
                      maxLength: 10,
                    })}
                  />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Height</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    placeholder='Enter height'
                    {...register("patientHeight")}
                  />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Weight</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    placeholder='Enter weight'
                    {...register("patientWeight")}
                  />
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Blood Group *</label>
                  <select
                    className='py-[11.5px] outline-none border-b bg-transparent'
                    {...register("patientBloodGroup", { required: true })}>
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
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Patient Gender *</label>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    value={patientGender}
                    name='radio-buttons-group'
                    onChange={(e) => setPatientGender(e.target.value)}
                    sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControlLabel
                      value='Female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='Male'
                      control={<Radio />}
                      label='Male'
                    />
                    <FormControlLabel
                      value='Other'
                      control={<Radio />}
                      label='Other'
                    />
                  </RadioGroup>
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Patient Photo *</label>
                  <div className='flex flex-col gap-[1rem]'>
                    <input
                      type='file'
                      required
                      accept='image/png, image/gif, image/jpeg'
                      onChange={(e) => setPatientImage(e.target.files[0])}
                    />
                    <img
                      className='object-contain w-[100px] h-[100px]'
                      src={
                        patientImage
                          ? URL.createObjectURL(patientImage)
                          : placeholder
                      }
                      alt='placeholderimg'
                    />
                  </div>
                </div>
              </div>
              {/* <div className='flex flex-col gap-[6px]'>
                <label className='text-[14px]'>Patient Case</label>
                <JoditEditor
                  ref={editor}
                  value={patientCase}
                  config={config}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setPatientCase(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => {
                    setPatientCase(newContent);
                  }}
                />
              </div> */}
              <h3 className='border-b py-[1rem]'>Patient Address Details</h3>
              <div className='grid grid-cols-2 gap-[2rem] border-b pb-[3rem]'>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Local Address *</label>
                  <textarea
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient local address'
                    {...register("patientLocalAddress", { required: true })}
                  />
                  {errors.patientLocalAddress && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Permanent Address *</label>
                  <textarea
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient permanent address'
                    {...register("patientPermanentAddress", { required: true })}
                  />
                  {errors.patientPermanentAddress && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>City *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient city'
                    {...register("patientCity", { required: true })}
                  />
                  {errors.patientCity && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>State *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient state'
                    {...register("patientState", { required: true })}
                  />
                  {errors.patientState && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Country *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='text'
                    required
                    placeholder='Enter patient country'
                    {...register("patientCountry", { required: true })}
                  />
                  {errors.patientCountry && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
                <div className='flex flex-col gap-[6px]'>
                  <label className='text-[14px]'>Zipcode *</label>
                  <input
                    className='py-[10px] outline-none border-b'
                    type='number'
                    required
                    placeholder='Enter patient zipcode'
                    {...register("patientZipCode", { required: true })}
                  />
                  {errors.patientZipcode && (
                    <span className='text-[red]'>This field is required</span>
                  )}
                </div>
              </div>
              {loading ? (
                <div className='flex flex-row justify-center w-full'>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress color='inherit' />
                  </Box>
                </div>
              ) : (
                <div className='flex gap-[1rem] items-center'>
                  <button
                    type='submit'
                    className='buttonFilled'
                    onClick={() => setSubmitButton("Save")}>{`Save >`}</button>
                  <button
                    className='buttonOutlined'
                    onClick={() =>
                      setSubmitButton("SavePrint")
                    }>{`Save & Print >`}</button>
                </div>
              )}
            </form>
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
    </Suspense>
  );
}
