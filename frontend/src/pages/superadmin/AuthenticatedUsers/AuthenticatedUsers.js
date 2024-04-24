import React from "react";
import { lazy } from "react";
import SideNav from "../../../components/superadmin/SideNav";
import UpperNav from "../../../components/superadmin/UpperNav/UpperNav";
import browserLinks from "../../../browserlinks";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { useSelector, useDispatch } from "react-redux";

import { useGetAllAdminsQuery } from "../../../Store/Services/AdminService";
import {
  getAllAdmins,
  getAdminLoggedIn,
  getAdminLoggedInData,
  getAdminRole,
} from "../../../Store/Slices/AdminSlice";

const AuthenticatedUsersTable = lazy(() =>
  import(
    "../../../components/superadmin/AuthenticatedUsersTable/AuthenticatedUsersTable"
  )
);

export default function AuthenticatedUsers() {
  const dispatch = useDispatch();

  const responseGetAllAdmins = useGetAllAdminsQuery();

  const {
    Admins,
    adminLoggedIn,
    adminLoggedInData,
    adminRole,
    createAdmin,
    updateAdmin,
    deleteAdmin,
  } = useSelector((state) => state.AdminState);

  //   console.log(Admins);

  const apiRefetch = async () => {
    // Admins
    const responseGetAllAdminsRefetch = await responseGetAllAdmins.refetch();
    if (responseGetAllAdminsRefetch.isSuccess) {
      const reverseArrayGetAllAdmins = responseGetAllAdminsRefetch?.data?.map(
        responseGetAllAdminsRefetch?.data?.pop,
        [...responseGetAllAdminsRefetch?.data]
      );
      const filteredArrayGetAllAdmins = reverseArrayGetAllAdmins?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllAdmins(filteredArrayGetAllAdmins));
    }
  };

  React.useEffect(() => {
    apiRefetch();

    if (responseGetAllAdmins.isSuccess) {
      const reverseArrayGetAllAdmins = responseGetAllAdmins?.data?.map(
        responseGetAllAdmins?.data?.pop,
        [...responseGetAllAdmins?.data]
      );
      const filteredArrayGetAllAdmins = reverseArrayGetAllAdmins?.filter(
        (data) => data.isDeleted === false && data
      );
      dispatch(getAllAdmins(filteredArrayGetAllAdmins));
    }
  }, [createAdmin, updateAdmin, deleteAdmin, responseGetAllAdmins.isSuccess]);

  return (
    <>
      <div className='superadmin-main flex flex-row w-full h-screen'>
        <div className='w-[20%] shadow-lg'>
          <SideNav
            activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.authenticatedUsers}`}
          />
        </div>
        <div className='superadmin-main-right flex flex-col w-[80%]'>
          <UpperNav />
          <div className='superadmin-main-right_dashboard w-full overflow-y-scroll'>
            <AuthenticatedUsersTable />
          </div>
        </div>
      </div>
    </>
  );
}
