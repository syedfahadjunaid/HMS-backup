import React from "react";
import "./EmployeeManagement.css";
import { lazy, Suspense } from "react";

import browserLinks from "../../../browserlinks";

const SideNav = lazy(() => import("../../../components/HR/SideNav"));
const UpperNav = lazy(() => import("../../../components/HR/UpperNav/UpperNav"));

export default function Dashboard() {
  return (
    <div className='superadmin-main flex flex-row w-full h-screen'>
      <div className='superadmin-main-left w-[20%] shadow-lg'>
        <SideNav
          activePage={`${browserLinks.hr.category}/${browserLinks.hr.internalPages.employeeManagement}`}
        />
      </div>
      <div className='superadmin-main-right flex flex-col w-[80%]'>
        <UpperNav />
      </div>
    </div>
  );
}
