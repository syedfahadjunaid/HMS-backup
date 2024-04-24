import React from "react";
import "./SideNav.css";
import logoImage from "../../assets/logo.png";
import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

import browserLinks from "../../browserlinks";

import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBill } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import { RiMessage2Fill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";

export default function SideNav({ activePage }) {
  const navigate = useNavigate();

  const [active, setActive] = useState(activePage);

  // console.log(active);

  // const iconStyle =
  //   active ===
  //   `${browserLinks.superadmin.category}/${browserLinks.superadmin.internalPages.dashboard}`
  //     ? "text-[30px] text-[#3497F9]"
  //     : "text-[30px] text-[#7F8F98]";

  const sideNavLinksData = [
    {
      icon: <AiFillDashboard />,
      name: browserLinks.hr.internalPages.employeeManagement,
    },
    {
      icon: <FaMoneyBill />,
      name: browserLinks.hr.internalPages.preOnboardingCandidate,
    },
    {
      icon: <FaUserGroup />,
      name: browserLinks.hr.internalPages.employeeCreation,
    },
    {
      icon: <FaFileLines />,
      name: browserLinks.hr.internalPages.searchEmployee,
    },
    {
      icon: <FaUserDoctor />,
      name: browserLinks.hr.internalPages.employeeBulkUpdate,
    },
  ];

  const renderedSideNavLinks = sideNavLinksData?.map((data, index) => {
    return (
      <div
        key={`${index}-${data?.name}`}
        onClick={() => {
          setActive(`${browserLinks?.hr?.category}/${data?.name}`);
          const link = data?.name?.split(" ").join("");
          navigate(`${browserLinks?.hr?.category}/${link}`);
        }}
        className={
          active === `${browserLinks?.hr?.category}/${data?.name}`
            ? "flex flex-row items-center justify-start gap-[1rem] py-[10px] px-[1rem] border-l-[6px] border-l-solid border-[#3497F9] bg-[#E7F3FE] w-full cursor-pointer"
            : "flex flex-row items-center justify-start border-l-[6px] border-l-solid border-transparent gap-[1rem] py-[10px] px-[1rem] w-full cursor-pointer"
        }>
        <div
          className={
            active === `${browserLinks?.hr?.category}/${data?.name}`
              ? "text-[30px] text-[#3497F9]"
              : "text-[30px] text-[#7F8F98]"
          }>
          {data?.icon}
        </div>
        <p
          className={
            active === `${browserLinks?.hr?.category}/${data?.name}`
              ? "text-[#3497F9] font-[400] text-start"
              : "text-[#7F8F98] font-[400] text-start"
          }>
          {data?.name}
        </p>
      </div>
    );
  });

  return (
    <>
      <Suspense fallback={<>...</>}>
        <div className='SideNav flex flex-col items-center'>
          <img
            src={logoImage}
            alt='logoImage'
            className='w-[200px] h-auto py-[2rem]'
          />

          <div className='sideNavLinks flex flex-col gap-[1rem] w-full items-start overflow-y-scroll'>
            {renderedSideNavLinks}
          </div>
        </div>
      </Suspense>
    </>
  );
}
