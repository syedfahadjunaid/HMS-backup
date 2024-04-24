import React from "react";
import { Suspense } from "react";
import "./DashboardTable.css";
import Table from "../../Table";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import Checkbox from "@mui/material/Checkbox";

export default function DashboardTable() {
  const { patients } = useSelector((state) => state.PatientState);
  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };
  const mappedPatientData = patients?.map((patient, index) => {
    return {
      tableId: index + 1,
      data: patient,
    };
  });

  const config = [
    {
      label: "S No.",
      render: (list) => list.tableId,
    },
    {
      label: "Reg No.",
      render: (list) => list.data.patientId,
    },
    {
      label: "Name",
      render: (list) => list.data.patientName,
    },
    {
      label: "Date",
      render: (list) =>
        `${date(list.data.createdAt)} - ${time(list.data.createdAt)}`,
    },
    {
      label: "Mobile No.",
      render: (list) => list.data.patientPhone,
    },
    // {
    //   label: "Doctor Visit",
    //   render: (list) => <Checkbox disabled checked />,
    // },
    // {
    //   label: "Action",
    //   render: (list) => (
    //     <div className='flex gap-[10px] justify-center'>
    //       <div
    //         onClick={() => handleOpenViewModal(list)}
    //         className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
    //         <MdViewKanban className='text-[25px] text-[#96999C]' />
    //       </div>
    //       <div
    //         onClick={() => handleOpenUpdateModal(list)}
    //         className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
    //         <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
    //       </div>
    //       <div
    //         onClick={() => handleClickOpenDialogBox(list)}
    //         className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
    //         <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  const keyFn = (list) => {
    return list.data.patientName;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Patients</h2>
        </div>

        <Table data={mappedPatientData} config={config} keyFn={keyFn} />
      </div>
    </Suspense>
  );
}
