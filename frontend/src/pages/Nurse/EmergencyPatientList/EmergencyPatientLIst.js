import React, { useState } from "react";
import "./EmergencyPatientLIst.css";

import { lazy, Suspense, useEffect } from "react";
import browserLinks from "../../../browserlinks";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useGetAllPatientsQuery } from "../../../Store/Services/PatientService";
import { getAllPatients } from "../../../Store/Slices/PatientSlice";
import { useGetAllDoctorsQuery } from "../../../Store/Services/DoctorService";

import { getAllDoctors } from "../../../Store/Slices/DoctorSlice";

const SideNav = lazy(() => import("../../../components/Nurse/SideNav"));
const UpperNav = lazy(() =>
  import("../../../components/Nurse/UpperNav/UpperNav")
);

const NurseEmergencyEditTable = lazy(() =>
  import(
    "../../../components/Nurse/EditEmergencyPatientTableAndForm/EditEmergencyTable/EditEmergencyTable"
  )
);
const NurseEmergencyEditForm = lazy(() =>
  import(
    "../../../components/Nurse/EditEmergencyPatientTableAndForm/EditEmergencyForm/EditEmergencyForm"
  )
);

export default function EmergencyPatientLIst() {
  const dispatch = useDispatch();
  const responseGetAllPatients = useGetAllPatientsQuery();
  const responseGetAllDoctors = useGetAllDoctorsQuery();

  const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
    (state) => state.PatientState
  );
  const {
    doctors,
    doctorProfessionalDetails,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  } = useSelector((state) => state.DoctorState);

  const [viewEditForm, setViewEditForm] = useState(false);
  const [patientId, setPatientId] = useState("");

  const apiRefetch = async () => {
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
        (data) =>
          data.isDeleted === false &&
          data.patientAdmittingCategory === "Emergency" &&
          data
      );
      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
    //------------------
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
  };
  useEffect(() => {
    apiRefetch();
    // Patients
    if (responseGetAllPatients.isSuccess) {
      const reverseArrayGetAllPatients = responseGetAllPatients?.data?.map(
        responseGetAllPatients?.data?.pop,
        [...responseGetAllPatients?.data]
      );
      const filteredArrayGetAllPatients = reverseArrayGetAllPatients?.filter(
        (data) =>
          data.isDeleted === false &&
          data.patientAdmittingCategory === "Emergency" &&
          data
      );

      dispatch(getAllPatients(filteredArrayGetAllPatients));
    }
    // --------------
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
    // -----------------
  }, [
    patientCreate,
    patientUpdate,
    patientDelete,
    responseGetAllPatients.isSuccess,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    responseGetAllDoctors.isSuccess,
  ]);
  return (
    <>
      {responseGetAllPatients.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='superadmin-main flex flex-row w-full h-screen'>
          <div className='superadmin-main-left w-[20%] shadow-lg'>
            <SideNav
              activePage={`${browserLinks.nurse.category}/${browserLinks.nurse.internalPages.editEmergencyPatient}`}
            />
          </div>
          <div className='superadmin-main-right flex flex-col w-[80%]'>
            <UpperNav />
            <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
              {viewEditForm ? (
                <NurseEmergencyEditForm
                  patientId={patientId}
                  setViewEditForm={setViewEditForm}
                />
              ) : (
                <NurseEmergencyEditTable
                  setViewEditForm={setViewEditForm}
                  setPatientId={setPatientId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
