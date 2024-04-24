import React from "react";
import { Suspense } from "react";
import Table from "../../Table";
import "./AppointmentDashboardTable.css";
import { IoIosArrowForward } from "react-icons/io";
import patientImage from "../../../assets/superadmin/userIcon.jpg";

export default function AppointmentDashboardTable() {
  const mappedData = [
    {
      id: "1",
      time: "12:00",
      date: "21-01-2024",
      patientName: "Arman",
      patientPicture: patientImage,
      doctor: "Dr. Stone",
    },
    {
      id: "2",
      time: "12:00",
      date: "21-01-2024",
      patientName: "Arman",
      patientPicture: patientImage,
      doctor: "Dr. Stone",
    },
  ];

  const config = [
    {
      label: "Time",
      render: (list) => list.time,
    },
    {
      label: "Date",
      render: (list) => list.date,
    },
    {
      label: "Patient Name",
      render: (list) => (
        <div className='flex gap-[10px] justify-center items-center'>
          <img
            src={list.patientPicture}
            alt={"patientPicture" + list.id}
            className='rounded-full w-[50px] h-[50px]'
          />
          <p>{list.patientName}</p>
        </div>
      ),
    },
    {
      label: "Doctor",
      render: (list) => list.doctor,
    },
  ];

  const keyFn = (list) => {
    return list.patientName;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='appointment-dashboard-table flex flex-col py-[1rem] px-[1rem] gap-[10px] border rounded-[12px]'>
        <div className='flex flex-row justify-between items-center '>
          <p className='text-[20px] border-t-[4px] border-[#3497F9] pt-[1rem]'>
            New Appointments
          </p>
          <button className='bg-[#2196F3] text-white p-[10px] rounded-[8px] flex flex-row items-center gap-[10px]'>
            <p>See More</p>
            <IoIosArrowForward />
          </button>
        </div>
        <Table data={mappedData} config={config} keyFn={keyFn} />
      </div>
    </Suspense>
  );
}
