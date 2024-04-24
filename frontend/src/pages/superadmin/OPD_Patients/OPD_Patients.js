import React, { useEffect } from "react";
import "./OPD_Patients.css";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";

import { useGetAllOPDPatientQuery } from "../../../Store/Services/OPDPatientService";
import { getAllOPDPatients } from "../../../Store/Slices/OPDPatientSlice";
import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";

import {
  useGetAllDoctorsQuery,
  useGetAllDoctorProfessionalDetailsQuery,
} from "../../../Store/Services/DoctorService";
import {
  getAllDoctors,
  getAllDoctorsProfessionalDetails,
} from "../../../Store/Slices/DoctorSlice";

const OPDPatientTable = lazy(() =>
  import("../../../components/superadmin/OPD_PatientTable/OPD_PatientTable")
);

export default function OPD_Patients() {
  const dispatch = useDispatch();
  const responseGetAllOPDPatients = useGetAllOPDPatientQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();
  const responseGetAllDoctorProfessionalDetails =
    useGetAllDoctorProfessionalDetailsQuery();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const { OPDPatients, createOPDPatient, updateOPDPatient, deleteOPDPatient } =
    useSelector((state) => state.OPDPatientState);
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
    // OPD Patients
    const responseGetAllOPDPatientsRefetch =
      await responseGetAllOPDPatients.refetch();
    if (responseGetAllOPDPatientsRefetch.isSuccess) {
      const reverseArrayGetAllOPDPatients =
        responseGetAllOPDPatientsRefetch?.data?.map(
          responseGetAllOPDPatientsRefetch?.data?.pop,
          [...responseGetAllOPDPatientsRefetch?.data]
        );
      const filteredArrayGetAllOPDPatients =
        reverseArrayGetAllOPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
    }
    // ------------------
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
    // OPD Patients
    if (responseGetAllOPDPatients.isSuccess) {
      const reverseArrayGetAllOPDPatients =
        responseGetAllOPDPatients?.data?.map(
          responseGetAllOPDPatients?.data?.pop,
          [...responseGetAllOPDPatients?.data]
        );
      const filteredArrayGetAllOPDPatients =
        reverseArrayGetAllOPDPatients?.filter(
          (data) => data.isDeleted === false && data
        );
      dispatch(getAllOPDPatients(filteredArrayGetAllOPDPatients));
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
    createOPDPatient,
    updateOPDPatient,
    deleteOPDPatient,
    responseGetAllOPDPatients.isSuccess,
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
      {responseGetAllOPDPatients.isLoading &&
      responseGetAllPatients.isLoading &&
      responseGetAllDoctorProfessionalDetails.isLoading &&
      responseGetAllDoctors.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='superadmin-main flex flex-row w-full h-screen'>
          <div className='w-[20%] shadow-lg'>
            <SideNav
              activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.opdPatients}`}
            />
          </div>
          <div className='superadmin-main-right flex flex-col w-[80%]'>
            <UpperNav />
            <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
              <OPDPatientTable />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
