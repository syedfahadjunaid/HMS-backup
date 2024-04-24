import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import browserLinks from "./browserlinks";

import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

// Services
// import { useGetAllPatientsQuery } from "./Store/Services/PatientService";
// import {
//   useGetAllDoctorsQuery,
//   useGetAllDoctorProfessionalDetailsQuery,
// } from "./Store/Services/DoctorService";
// import { useGetAllOPDPatientQuery } from "./Store/Services/OPDPatientService";
// import { useGetAllIPDPatientsQuery } from "./Store/Services/IPDPatientService";
// import { useGetAllBillingsQuery } from "./Store/Services/BillingService";
import {
  useGetAllAdminsQuery,
  useAdminProfileQuery,
} from "./Store/Services/AdminService";

// Slices
// import { getAllPatients } from "./Store/Slices/PatientSlice";
// import {
//   getAllDoctors,
//   getAllDoctorsProfessionalDetails,
// } from "./Store/Slices/DoctorSlice";
// import { getAllOPDPatients } from "./Store/Slices/OPDPatientSlice";
// import { getAllIPDPatients } from "./Store/Slices/IPDPatientSlice";
import { getAllBillings } from "./Store/Slices/BillingSlice";
import {
  getAllAdmins,
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "./Store/Slices/AdminSlice";

import Cookies from "js-cookie";

const LoginPage = lazy(() => import("./Login"));

const UnauthorizedPage = lazy(() => import("./pages/UnauthorizedPage"));

// Super Admin
const SuperAdminDashboardPage = lazy(() =>
  import("./pages/superadmin/Dashboard")
);
const SuperAdminBillingPage = lazy(() =>
  import("./pages/superadmin/Billing/Billing")
);

const SuperAdminPatientPage = lazy(() =>
  import("./pages/superadmin/Patients/Patients")
);

const SuperAdminDoctorPage = lazy(() =>
  import("./pages/superadmin/Doctors/Doctors")
);

const SuperAdminOPDPatient = lazy(() =>
  import("./pages/superadmin/OPD_Patients/OPD_Patients")
);

const SuperAdminIPDPatient = lazy(() =>
  import("./pages/superadmin/IPD_Patients/IPD_Patients")
);

const SuperAdminAppointmentPage = lazy(() =>
  import("./pages/superadmin/Appointments/Appointment")
);

const SuperAdminAuthenticatedUserPage = lazy(() =>
  import("./pages/superadmin/AuthenticatedUsers/AuthenticatedUsers")
);

const SuperAdminIPDPage = lazy(() => import("./pages/superadmin/IPD/IPD"));
const SuperAdminOPDPage = lazy(() => import("./pages/superadmin/OPD/OPD"));

const BillDownloadPage = lazy(() =>
  import("./components/superadmin/BillingTable/BillDownload/BillDownload")
);
const OPDPatientRecieptDownloadPage = lazy(() =>
  import(
    "./components/superadmin/OPD_PatientTable/OPD_PatientReciept/OPD_PatientReciept"
  )
);

// HR Panel
const HRPanelDashboard = lazy(() => import("./pages/HR//Dashboard"));
const HRPanelEmployeeManagement = lazy(() =>
  import("./pages/HR/EmployeeManagement/EmployeeManagement")
);

// Nurse Panel
const NursePanelDashboard = lazy(() => import("./pages/Nurse/Dashboard"));
const NursePanelAddPatient = lazy(() =>
  import("./pages/Nurse/AddPatient/AddPatient")
);
const NursePanelEditPatient = lazy(() =>
  import("./pages/Nurse/EditPatient/EditPatient")
);
const NursePanelAddEmergencyPatient = lazy(() =>
  import("./pages/Nurse/AddEmergencyPatient/AddEmergencyPatient")
);
const NursePanelEmergencyPatientList = lazy(() =>
  import("./pages/Nurse/EmergencyPatientList/EmergencyPatientLIst")
);

function App() {
  const dispatch = useDispatch();

  // -------------------------------------------------------------------
  // const responseGetAllPatients = useGetAllPatientsQuery();
  // const responseGetAllDoctors = useGetAllDoctorsQuery();
  // const responseGetAllDoctorProfessionalDetails =
  //   useGetAllDoctorProfessionalDetailsQuery();
  // const responseGetAllOPDPatients = useGetAllOPDPatientQuery();
  // const responseGetAllIPDPatients = useGetAllIPDPatientsQuery();
  // const responseGetAllBillings = useGetAllBillingsQuery();
  // const responseGetAllAdmins = useGetAllAdminsQuery();

  const { adminRole, updateAdmin } = useSelector((state) => state.AdminState);
  const responseGetProfile = useAdminProfileQuery(
    localStorage.getItem("AdminToken")
  );

  React.useEffect(() => {
    responseGetProfile.refetch();
  }, [updateAdmin]);
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // const { patients, patientCreate, patientUpdate, patientDelete } = useSelector(
  //   (state) => state.PatientState
  // );
  // const {
  //   doctors,
  //   doctorProfessionalDetails,
  //   createDoctor,
  //   updateDoctor,
  //   deleteDoctor,
  // } = useSelector((state) => state.DoctorState);
  // const { OPDPatients, createOPDPatient, updateOPDPatient, deleteOPDPatient } =
  //   useSelector((state) => state.OPDPatientState);

  // const { ipdPatients, createIpdPatient, updateIpdPatient, deleteIpdPatient } =
  //   useSelector((state) => state.IPDPatientState);

  // const { billings, createBilling, updateBilling, deleteBilling } = useSelector(
  //   (state) => state.BillingState
  // );

  React.useEffect(() => {
    if (
      (responseGetProfile.isSuccess, responseGetProfile.status === "fulfilled")
    ) {
      dispatch(getAdminLoggedInData(responseGetProfile?.currentData?.data));
      dispatch(getAdminRole(responseGetProfile?.currentData?.data?.adminRole));
    }
  }, [responseGetProfile.isSuccess, responseGetProfile.status]);
  // console.log(responseGetProfile);

  React.useEffect(() => {
    if (responseGetProfile.isError) {
      dispatch(getAdminLoggedIn(null));
      dispatch(getAdminLoggedInData(null));
      dispatch(getAdminRole(null));
    }
  }, [responseGetProfile.isError]);
  // ------------------------------------------------------------------

  // Super Admin Link
  const opdPatientlink = browserLinks?.superadmin?.internalPages?.opdPatients
    ?.split(" ")
    .join("");

  const ipdPatientlink = browserLinks?.superadmin?.internalPages?.ipdPatients
    ?.split(" ")
    .join("");

  const authenticatedUsersLink =
    browserLinks?.superadmin?.internalPages?.authenticatedUsers
      ?.split(" ")
      .join("");

  // -----------------------

  // HR Panel Link
  const hrPanelEmployeeManagement =
    browserLinks?.hr?.internalPages?.employeeManagement?.split(" ").join("");

  // -----------------------

  // Nurse Panel Link
  const nursePanelAddPatientLink =
    browserLinks?.nurse?.internalPages?.addPatient?.split(" ").join("");

  const nursePanelEditPatientLink =
    browserLinks?.nurse?.internalPages?.editPatient?.split(" ").join("");
  // -----------------------

  console.log(adminRole);

  return (
    <>
      {responseGetProfile.isLoading && responseGetProfile.isSuccess ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className='App flex flex-col justify-center items-center'>
          <BrowserRouter>
            <Routes>
              {/* Login Page */}

              <Route
                path={browserLinks.login}
                element={
                  <Suspense
                    fallback={
                      <>
                        <Box sx={{ width: "100%" }}>
                          <LinearProgress />
                        </Box>
                      </>
                    }>
                    <LoginPage />
                  </Suspense>
                }
              />

              {/* Super Admin Routes */}
              {adminRole === "Super Admin" ? (
                <Route path={browserLinks.superadmin.category}>
                  <Route
                    path={browserLinks.superadmin.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminDashboardPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${authenticatedUsersLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminAuthenticatedUserPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.billing}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminBillingPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.billing}/:billId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <BillDownloadPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.superadmin.category
                    }/${browserLinks.superadmin.internalPages.opdPatients
                      .split(" ")
                      .join("")}/:opdPatientId`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <OPDPatientRecieptDownloadPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.patients}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminPatientPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.doctors}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminDoctorPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.appointments}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminAppointmentPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.opd}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminOPDPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={browserLinks.superadmin.internalPages.ipd}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminIPDPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${opdPatientlink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminOPDPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.superadmin.category}/${ipdPatientlink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <SuperAdminIPDPatient />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path='*'
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }>
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}

              {/* HR Panel */}
              {adminRole === "HR" ? (
                <Route path={browserLinks.hr.category}>
                  <Route
                    path={browserLinks.hr.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <HRPanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.hr.category}/${hrPanelEmployeeManagement}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <HRPanelEmployeeManagement />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path='*'
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }>
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}

              {/* Nurse Panel */}
              {adminRole === "Receptionist" ? (
                <Route path={browserLinks.nurse.category}>
                  <Route
                    path={browserLinks.nurse.internalPages.dashboard}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <NursePanelDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.nurse.category}/${nursePanelAddPatientLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <NursePanelAddPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${browserLinks.nurse.category}/${nursePanelEditPatientLink}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <NursePanelEditPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.addEmergencyPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <NursePanelAddEmergencyPatient />
                      </Suspense>
                    }
                  />
                  <Route
                    path={`${
                      browserLinks.nurse.category
                    }/${browserLinks?.nurse?.internalPages?.editEmergencyPatient
                      ?.split(" ")
                      .join("")}`}
                    element={
                      <Suspense
                        fallback={
                          <>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress />
                            </Box>
                          </>
                        }>
                        <NursePanelEmergencyPatientList />
                      </Suspense>
                    }
                  />
                </Route>
              ) : (
                <Route
                  path='*'
                  element={
                    <Suspense
                      fallback={
                        <>
                          <Box sx={{ width: "100%" }}>
                            <LinearProgress />
                          </Box>
                        </>
                      }>
                      <UnauthorizedPage />
                    </Suspense>
                  }
                />
              )}
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
