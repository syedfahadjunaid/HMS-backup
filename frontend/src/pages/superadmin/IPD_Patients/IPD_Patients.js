import React, { useEffect } from "react";
import "./IPD_Patients.css";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import { useGetAllIPDPatientsQuery } from "../../../Store/Services/IPDPatientService";
import { getAllIPDPatients } from "../../../Store/Slices/IPDPatientSlice";
import {
  useGetAllDoctorsQuery,
  useGetAllDoctorProfessionalDetailsQuery,
} from "../../../Store/Services/DoctorService";
import {
  getAllDoctors,
  getAllDoctorsProfessionalDetails,
} from "../../../Store/Slices/DoctorSlice";
import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";

const IPDPatientTable = lazy(() =>
  import("../../../components/superadmin/IPD_PatientTable/IPD_PatientTable")
);

export default function IPD_Patients() {
  const dispatch = useDispatch();
  const responseGetAllIPDPatients = useGetAllIPDPatientsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllDoctorProfessionalDetails =
    useGetAllDoctorProfessionalDetailsQuery();
  const responseGetAllPatients = useGetAllPatientsQuery();

  const { ipdPatients, createIpdPatient, updateIpdPatient, deleteIpdPatient } =
    useSelector((state) => state.IPDPatientState);
  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useSelector((state) => state.DoctorState);

  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );

  const apiRefetch = async () => {
    // IPD Patients
    const responseGetAllIPDPatientsRefetch =
      await responseGetAllIPDPatients.refetch();
    if (responseGetAllIPDPatientsRefetch.isSuccess) {
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatientsRefetch?.data?.map(
          responseGetAllIPDPatientsRefetch?.data?.pop,
          [...responseGetAllIPDPatientsRefetch?.data]
        );
      const filteredArrayGetAllIPDPatients =
        reverseArrayGetAllIPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
    }
    // --------------------
    // Doctors
    const responseGetAllDoctorsRefetch = await responseGetAllDoctors.refetch();
    if (responseGetAllDoctorsRefetch.isSuccess) {
      const reverseArrayGetAllDoctors = responseGetAllDoctorsRefetch?.data?.map(
        responseGetAllDoctorsRefetch?.data?.pop,
        [...responseGetAllDoctorsRefetch?.data]
      );
      const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    }
    // ------------------
    // Doctors Professional Details
    const responseGetAllDoctorsProfessionalDetailsRefetch =
      await responseGetAllDoctorProfessionalDetails.refetch();
    if (responseGetAllDoctorsProfessionalDetailsRefetch.isSuccess) {
      const reverseArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorsProfessionalDetailsRefetch?.data?.map(
          responseGetAllDoctorsProfessionalDetailsRefetch?.data?.pop,
          [...responseGetAllDoctorsProfessionalDetailsRefetch?.data]
        );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        reverseArrayGetAllDoctorsProfessionalDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // ------------------
    // Patients
    const responseGetAllPatientsRefetch =
      await responseGetAllPatients.refetch();
    if (responseGetAllPatientsRefetch.isSuccess) {
      const reverseArrayGetAllPatients =
        responseGetAllPatientsRefetch?.data?.map(
          responseGetAllPatientsRefetch?.data?.pop,
          [...responseGetAllPatientsRefetch?.data]
        );
      const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
    //------------------
  };

  useEffect(() => {
    apiRefetch();
    // IPD Patients
    if (responseGetAllIPDPatients.isSuccess) {
      const reverseArrayGetAllIPDPatients =
        responseGetAllIPDPatients?.data?.map(
          responseGetAllIPDPatients?.data?.pop,
          [...responseGetAllIPDPatients?.data]
        );
      const filteredArrayGetAllIPDPatients =
        reverseArrayGetAllIPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllIPDPatients(filteredArrayGetAllIPDPatients));
    }
    // --------------------
    // Doctors
    if (responseGetAllDoctors.isSuccess) {
      const reverseArrayGetAllDoctors = responseGetAllDoctors?.data?.map(
        responseGetAllDoctors?.data?.pop,
        [...responseGetAllDoctors?.data]
      );
      const filteredArrayGetAllDoctors = reverseArrayGetAllDoctors?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllDoctors(filteredArrayGetAllDoctors));
    }
    // --------------------
    // Doctors Professional Details
    if (responseGetAllDoctorProfessionalDetails.isSuccess) {
      const reverseArrayGetAllDoctorsProfessionalDetails =
        responseGetAllDoctorProfessionalDetails?.data?.map(
          responseGetAllDoctorProfessionalDetails?.data?.pop,
          [...responseGetAllDoctorProfessionalDetails?.data]
        );
      const filteredArrayGetAllDoctorsProfessionalDetails =
        reverseArrayGetAllDoctorsProfessionalDetails?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(
        getAllDoctorsProfessionalDetails(
          filteredArrayGetAllDoctorsProfessionalDetails
        )
      );
    }
    // --------------------
    // Patients
    if (responseGetAllPatients.isSuccess) {
      const reverseArrayGetAllPatients = responseGetAllPatients?.data?.map(
        responseGetAllPatients?.data?.pop,
        [...responseGetAllPatients?.data]
      );
      const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
        (data) => data.isDeleted === false && data
      );

      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
  }, [
    createIpdPatient,
    updateIpdPatient,
    deleteIpdPatient,
    responseGetAllIPDPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
    responseGetAllDoctorProfessionalDetails.isSuccess,
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
  ]);
  return (
    <>
      {responseGetAllIPDPatients.isLoading &&
      responseGetAllDoctorProfessionalDetails.isLoading &&
      responseGetAllPatients.isLoading &&
      responseGetAllDoctors.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='superadmin-main flex flex-row w-full h-screen'>
          <div className='w-[20%] shadow-lg'>
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.ipdPatients}`}
            />
          </div>
          <div className='superadmin-main-right flex flex-col w-[80%]'>
            <UpperNav />
            <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
              <IPDPatientTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
