import React from "react";
import "./Dashboard.css";
import { lazy, Suspense } from "react";

import { FaFileAlt } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";

import browserLinks from "../../browserlinks";

const SideNav = lazy(() => import("../../components/superadmin/SideNav"));
const UpperNav = lazy(() =>
  import("../../components/superadmin/UpperNav/UpperNav")
);
const AppointmentDashboardTable = lazy(() =>
  import(
    "../../components/superadmin/AppointmentDashboardTable/AppointmentDashboardTable"
  )
);
const ChartMedicineSold = lazy(() =>
  import("../../components/superadmin/ChartMedicineSold/ChartMedicineSold")
);

export default function Dashboard() {
  return (
    <div className='superadmin-main flex flex-row w-full h-screen'>
      <div className='superadmin-main-left w-[20%] shadow-lg'>
        <SideNav
          activePage={`${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`}
        />
      </div>
      <div className='superadmin-main-right flex flex-col w-[80%]'>
        <UpperNav />
        <div className='superadmin-main-right_dashboard flex flex-col w-full p-[1rem] overflow-y-scroll gap-[2rem]'>
          <div className='superadmin-main-right_dashboard_firstSection w-full flex flex-col gap-[1rem] pb-[2rem] border-b-[1px] border-b-solid'>
            <h1 className='text-start'>DashBoard Overview</h1>
            <div className='superadmin-main-right_dashboard_firstSection_cards w-full grid grid-cols-5 gap-[1rem] items-center justify-center'>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4D2FF66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <FaFileAlt className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4FFBD66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <BsPeopleFill className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <RiMedicineBottleFill className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#CCA4FF6B] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <FaUserDoctor className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <MdInventory className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4D2FF66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <FaFileAlt className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#A4FFBD66] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <BsPeopleFill className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <RiMedicineBottleFill className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#CCA4FF6B] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <FaUserDoctor className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
              <div className='superadmin-main-right_dashboard_firstSection_card flex flex-col items-center bg-[#FFF59878] rounded-[15px] p-[2rem] gap-[10px] w-full text-[#374858]'>
                <MdInventory className='text-[35px]' />
                <div className='flex flex-col'>
                  <p>100</p>
                  <p className='text-[14px]'>Appointments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Table */}
          <div className='flex flex-row w-full items-start gap-[10px]'>
            <div className='w-[60%]'>
              <AppointmentDashboardTable />
            </div>
            <div className='w-[40%]'>
              <ChartMedicineSold />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
