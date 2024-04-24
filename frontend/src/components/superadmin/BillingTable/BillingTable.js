import { Suspense } from "react";
import "./BillingTable.css";
import Table from "../../Table";
import { FaSearch } from "react-icons/fa";
import { MdViewKanban } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuHardDriveDownload } from "react-icons/lu";

import { useNavigate, Link } from "react-router-dom";
// import { useRef } from "react";
// import jsPDF from "jspdf";

import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useForm } from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";

import Select from "react-select";

import AddItemTable from "./FormTable/AddItemTable";
import BasicHospitalChargesTable from "./FormTable/BasicHospitalChargesTable";
import DoctorVisitChargesTable from "./FormTable/DoctorVisitChargesTable";
import BedChargesTable from "./FormTable/BedChargesTable";
import BEDSideProceduresTable from "./FormTable/BEDSideProceduresTable";
import LaboratoryInvestigationsTable from "./FormTable/LaboratoryInvestigationsTable";
import MedicinesTable from "./FormTable/MedicinesTable";
import OtherMiscChargesTable from "./FormTable/OtherMiscChargesTable";
import ProceduresTable from "./FormTable/ProceduresTable";
import OtherServiceChargesTable from "./FormTable/OtherServiceChargesTable";

import placeholder from "../../../assets/imageplaceholder.png";

import { ToWords } from "to-words";

import {
  useCreateBillingMutation,
  useUpdateBillingByIdMutation,
  useDeleteBillingByIdMutation,
} from "../../../Store/Services/BillingService";

import {
  createBillingChange,
  updateBillingChange,
  deleteBillingChange,
} from "../../../Store/Slices/BillingSlice";

import Snackbars from "../../SnackBar";
import DialogBoxToDelete from "../../DialogBoxToDelete";

import BillSummary from "./BillSummary/BillSummary";
// import browserLinks from "../../../browserlinks";

export default function BillingTable() {
  const navigate = useNavigate();

  const { billings } = useSelector((state) => state.BillingState);
  const dispatch = useDispatch();

  const [createBilling, responseCreateBilling] = useCreateBillingMutation();
  const [updateBillingById, responseUpdateBillingById] =
    useUpdateBillingByIdMutation();
  const [deleteBillingById, responseDeleteBillingById] =
    useDeleteBillingByIdMutation();

  // console.log(responseUpdateBillingById);

  const [submitButton, setSubmitButton] = React.useState();

  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  // Snackbar--------------------
  // ----Succcess
  const [openSnackbarSuccess, setOpenSnackBarSuccess] = React.useState(false);
  const [snackBarMessageSuccess, setSnackBarSuccessMessage] =
    React.useState("");

  const handleClickSnackbarSuccess = () => {
    setOpenSnackBarSuccess(true);
  };
  // ----Warning
  const [openSnackbarWarning, setOpenSnackBarWarning] = React.useState(false);
  const [snackBarMessageWarning, setSnackBarSuccessWarning] =
    React.useState("");

  const handleClickSnackbarWarning = () => {
    setOpenSnackBarWarning(true);
  };
  // ----------------------------

  // Dialog Box------------------------
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [dialogBoxMessage, setDialogMessage] = React.useState(
    "Are you sure you want to delete?"
  );

  const [idToDelete, setIdToDelete] = React.useState();

  const handleClickOpenDialogBox = (data) => {
    setIdToDelete(data?.data?.billingId);
    setDialogMessage(
      `Are you sure you want to delete ${data?.data?.billingId} ?`
    );
    setOpenDialogBox(true);
  };
  const handleAgreeDialogBoxToDelete = React.useCallback(() => {
    deleteBillingById(idToDelete);
    setOpenDialogBox(false);
  }, [idToDelete]);

  React.useEffect(() => {
    if (
      responseDeleteBillingById.isSuccess &&
      responseDeleteBillingById.status === "fulfilled"
    ) {
      dispatch(deleteBillingChange(Math.random()));
      setSnackBarSuccessMessage(responseDeleteBillingById?.data?.message);
      handleClickSnackbarSuccess();
      handleAgreeDialogBoxToDelete();
      setIdToDelete("");
    }
    if (responseDeleteBillingById.isError) {
      setSnackBarSuccessWarning(responseDeleteBillingById?.error?.data?.error);
      // handleClickSnackbarWarning();
    }
  }, [
    responseDeleteBillingById.isSuccess,
    responseDeleteBillingById.isError,
    responseDeleteBillingById.status,
  ]);

  // ----------------------------------

  const toWords = new ToWords();
  const { doctors, doctorProfessionalDetails } = useSelector(
    (state) => state.DoctorState
  );

  const { patients } = useSelector((state) => state.PatientState);

  const [id, setId] = React.useState();

  // Operartion States
  const [billingPatientId, setBillingPatientId] = React.useState({
    value: "",
    label: "",
  });
  const [billingPatientName, setBillingPatientName] = React.useState("");
  const [billing_OPD_IPD_Emergency, setBilling_OPD_IPD_Emergency] =
    React.useState("OPD");
  const [billingAdmittingDoctorId, setBillingAdmittingDoctorId] =
    React.useState({
      value: "",
      label: "",
    });
  const [billing_MR_No, setBilling_MR_No] = React.useState("");
  const [billing_IP_No, setBilling_IP_No] = React.useState("");
  const [billingPatientAge, setBillingPatientAge] = React.useState("");
  const [billingPatientGender, setBillingPatientGender] =
    React.useState("Male");
  const [billingRoomNo, setBillingRoomNo] = React.useState("");
  const [billingBedNo, setBillingBedNo] = React.useState("");
  const [billingBedCategory, setBillingBedCategory] = React.useState("");
  const [billingOccBedCategory, setBillingOccBedCategory] = React.useState("");
  const [billing_BillDateAndTime, setBilling_BillDateAndTime] =
    React.useState("");
  const [billing_AdmissionDateAndTime, setBilling_AdmissionDateAndTime] =
    React.useState("");
  const [billing_DischargeDateAndTime, setBilling_DischargeDateAndTime] =
    React.useState("");
  const [billingPatientCategory, setBillingPatientCategory] =
    React.useState("");
  const [billingTariffCategory, setBillingTariffCategory] = React.useState("");
  const [billingPaymentMode, setBillingPaymentMode] = React.useState("");
  const [billingPaidAmount, setBillingPaidAmount] = React.useState(0);
  const [billingCreditNoteAmount, setBillingCreditNoteAmount] =
    React.useState(0);
  const [billingTAX, setBillingTAX] = React.useState(0);
  const [billingDiscount, setBillingDiscount] = React.useState(0);
  // Table States
  // --- item
  const [allItems, setAllItems] = React.useState([]);
  const [itemSubTotal, setItemSubTotal] = React.useState(0);
  // --- Basic Hospital
  const [allBasicHospitalCharges, setAllBasicHospitalCharges] = React.useState(
    []
  );
  const [basicHospitalChargesSubTotal, setBasicHospitalChargesItemSubTotal] =
    React.useState(0);
  // --- Bed Charges
  const [allBedChargesItems, setAllBedChargesItems] = React.useState([]);
  const [bedChargesSubTotal, setBedChargesSubTotal] = React.useState(0);
  // --- bed side procedures
  const [allBEDSideProcedures, setAllBEDSideProcedures] = React.useState([]);
  const [
    bedSideProceduresChargesSubTotal,
    setBedSideProceduresChargesSubTotal,
  ] = React.useState(0);
  // --- doctor visit charges
  const [allDoctorVisitCharges, setAllDoctorVisitCharges] = React.useState([]);
  const [doctorVisitChargesSubTotal, setDoctorVisitChargesItemSubTotal] =
    React.useState(0);
  // --- laboratory investigations
  const [allLaboratoryInvestigations, setAllLaboratoryInvestigations] =
    React.useState([]);
  const [
    laboratoryInvestigationsChargesSubTotal,
    setLaboratoryInvestigationsChargesSubTotal,
  ] = React.useState(0);
  // --- medicines
  const [allMedicines, setAllMedicines] = React.useState([]);
  const [medicinesChargesSubTotal, setMedicinesChargesItemSubTotal] =
    React.useState(0);
  // --- other misc charges
  const [allOtherMiscCharges, setAllOtherMiscCharges] = React.useState([]);
  const [otherMiscChargesSubTotal, setOtherMiscChargesItemSubTotal] =
    React.useState(0);
  // --- procedures
  const [allProcedures, setAllProcedures] = React.useState([]);
  const [proceduresChargesSubTotal, setProceduresChargesItemSubTotal] =
    React.useState(0);
  // --- other services charges
  const [allOtherServiceCharges, setAllOtherServiceCharges] = React.useState(
    []
  );
  const [otherServicesChargesSubTotal, setOtherServicesChargesItemSubTotal] =
    React.useState(0);
  // -------------------------------------

  const [billNetAmount, setBillNetAmount] = React.useState(0);
  const [billAmountInWords, setBillAmountInWords] = React.useState("");

  const [billAmount, setBillAmount] = React.useState(0);
  React.useEffect(() => {
    let totalBillAmount =
      itemSubTotal +
      basicHospitalChargesSubTotal +
      bedChargesSubTotal +
      bedSideProceduresChargesSubTotal +
      doctorVisitChargesSubTotal +
      laboratoryInvestigationsChargesSubTotal +
      medicinesChargesSubTotal +
      otherMiscChargesSubTotal +
      proceduresChargesSubTotal +
      otherServicesChargesSubTotal;
    setBillAmount(Number(totalBillAmount.toFixed(2)));
  }, [
    itemSubTotal,
    basicHospitalChargesSubTotal,
    bedChargesSubTotal,
    bedSideProceduresChargesSubTotal,
    doctorVisitChargesSubTotal,
    laboratoryInvestigationsChargesSubTotal,
    medicinesChargesSubTotal,
    otherMiscChargesSubTotal,
    proceduresChargesSubTotal,
    otherServicesChargesSubTotal,
  ]);

  React.useEffect(() => {
    setBillAmountInWords(
      toWords.convert(billAmount, {
        currency: true,
      })
    );
  }, [billAmount]);

  React.useEffect(() => {
    const netAmountCalc = billAmount - billingCreditNoteAmount;
    setBillNetAmount(netAmountCalc.toFixed(2));
  }, [billAmount, billingCreditNoteAmount]);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // console.log(responseCreateBilling);

  // View Modal
  const [viewData, setViewData] = React.useState("");
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (data) => {
    setViewData(data);
    console.log(data);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => setOpenViewModal(false);

  // const modalViewBillDetails = (
  //   <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
  //     <div className='border-b flex gap-[1rem] py-[1rem] w-full'>
  //       <h3 className='font-[500]'>Bill ID: </h3>
  //       <h3>{viewData?.data?.billingId}</h3>
  //     </div>
  //     <div className='flex w-full pb-[1rem] border-b'>
  //       <div className='w-[25%] flex flex-col items-center'>
  //         <img
  //           className='w-[200px] h-[200px] object-contain'
  //           src={
  //             viewData?.patientData?.patientImage
  //               ? process.env.React_App_Base_Image_Url +
  //                 viewData?.patientData?.patientImage
  //               : placeholder
  //           }
  //           alt='patientImage'
  //         />
  //       </div>
  //       <div className='w-[75%] flex flex-col gap-[10px] text-[14px]'>
  //         <div className='grid grid-cols-2 gap-[10px]'>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Patient Reg Id: </p>
  //             <p>{viewData?.patientData?.patientId}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Admission Date / Time: </p>
  //             <p>{`${date(
  //               viewData?.data?.billing_AdmissionDateAndTime
  //             )} / ${time(viewData?.data?.billing_AdmissionDateAndTime)}`}</p>
  //           </div>

  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Patient Name: </p>
  //             <p>{viewData?.data?.billingPatientName}</p>
  //           </div>

  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Discharge Date / Time: </p>
  //             <p>{`${date(
  //               viewData?.data?.billing_DischargeDateAndTime
  //             )} / ${time(viewData?.data?.billing_DischargeDateAndTime)}`}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Gender: </p>
  //             <p>{viewData?.data?.billingPatientGender}</p>
  //           </div>

  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Patient Category: </p>
  //             <p>{viewData?.data?.billingPatientCategory}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Age: </p>
  //             <p>{viewData?.data?.billingPatientAge}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Tariff Category: </p>
  //             <p>{viewData?.data?.billingTariffCategory}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>OPD / IPD / Emergency: </p>
  //             <p>{viewData?.data?.billing_OPD_IPD_Emergency}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>MR No / IP No: </p>
  //             <p>{`${viewData?.data?.billing_MR_No} / ${viewData?.data?.billing_IP_No}`}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Admitting Doctor Id: </p>
  //             <p>{viewData?.data?.billingAdmittingDoctorId}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Room No: </p>
  //             <p>{viewData?.data?.billingRoomNo}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Admitting Doctor Name: </p>
  //             <p>{viewData?.doctorData?.doctorName}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>BED No: </p>
  //             <p>{viewData?.data?.billingBedNo}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Bill Bed Category: </p>
  //             <p>{viewData?.data?.billingBedCategory}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Occ Bed Category: </p>
  //             <p>{viewData?.data?.billingOccBedCategory}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Bill Date / Time: </p>
  //             <p>{`${date(viewData?.data?.billing_BillDateAndTime)} / ${time(
  //               viewData?.data?.billing_BillDateAndTime
  //             )}`}</p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Payment Mode: </p>
  //             <p>{viewData?.data?.billingPaymentMode}</p>
  //           </div>
  //         </div>
  //         <div className='flex flex-col gap-[10px] py-[1rem]'>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Created On: </p>
  //             <p className='break-word text-[14px]'>
  //               {`${date(viewData?.data?.createdAt)} ${time(
  //                 viewData?.data?.createdAt
  //               )}`}
  //             </p>
  //           </div>
  //           <div className='flex'>
  //             <p className='font-[600] w-[180px]'>Updated On: </p>
  //             <p className='break-word text-[14px]'>
  //               {`${date(viewData?.data?.updatedAt)} ${time(
  //                 viewData?.data?.updatedAt
  //               )}`}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className='flex flex-col gap-[2rem] py-[1rem]'>
  //       <h2 className='bg-[#0495F5] p-[8px] rounded-md text-white'>
  //         Bill Summary
  //       </h2>

  //       <h3 className='border-b'>Patients Bill Summary Information</h3>

  //       {viewData?.data?.allItems?.length > 0 && (
  //         <table className=''>
  //           <tr className='border-b '>
  //             <th className='py-[1rem]'>S NO</th>
  //             <th className='py-[1rem]'>DATE</th>
  //             <th className='py-[1rem]'>ITEM NAME</th>
  //             <th className='py-[1rem]'>QTY</th>
  //             <th className='py-[1rem]'>PRICE</th>
  //             <th className='py-[1rem]'>AMOUNT</th>
  //           </tr>
  //           <tr>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //             <td className='text-center py-[1rem]'>Hello</td>
  //           </tr>
  //         </table>
  //       )}
  //     </div>
  //   </div>
  // );

  // ----------------------------------------

  // Add Billing----------------------------------

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setBilling_MR_No("");
    setBilling_IP_No("");
    setBillingPatientAge("");
    setBillingPatientName("");
    setBillingPatientGender("Male");
    setBillingRoomNo("");
    setBillingBedNo("");
    setBillingBedCategory("");
    setBillingOccBedCategory("");
    setBilling_BillDateAndTime("");
    setBilling_AdmissionDateAndTime("");
    setBilling_DischargeDateAndTime("");
    setBillingPatientCategory("");
    setBillingTariffCategory("");
    setBillingPaymentMode("");
    setBillingPaidAmount(0);
    setBillingCreditNoteAmount(0);
    setBillingTAX(0);
    setBillingDiscount(0);
    setAllItems([]);
    setItemSubTotal(0);
    setAllBasicHospitalCharges([]);
    setBasicHospitalChargesItemSubTotal(0);
    setAllBedChargesItems([]);
    setBedChargesSubTotal(0);
    setAllBEDSideProcedures([]);
    setBedSideProceduresChargesSubTotal(0);
    setAllDoctorVisitCharges([]);
    setDoctorVisitChargesItemSubTotal(0);
    setAllLaboratoryInvestigations([]);
    setLaboratoryInvestigationsChargesSubTotal(0);
    setAllMedicines([]);
    setMedicinesChargesItemSubTotal(0);
    setAllOtherMiscCharges([]);
    setOtherMiscChargesItemSubTotal(0);
    setAllProcedures([]);
    setProceduresChargesItemSubTotal(0);
    setAllOtherServiceCharges([]);
    setOtherServicesChargesItemSubTotal(0);
    setBillNetAmount(0);
    setBillAmountInWords("");
    setBillAmount(0);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (submitButton === "add") {
      if (responseCreateBilling.isSuccess) {
        dispatch(createBillingChange(Math.random()));
        setSnackBarSuccessMessage(responseCreateBilling?.data?.message);
        handleClose();
        handleClickSnackbarSuccess();

        setBillingPatientId({
          value: "",
          label: "",
        });
        setBillingPatientName("");
        setBilling_OPD_IPD_Emergency("");
        setBillingAdmittingDoctorId({
          value: "",
          label: "",
        });
        setBilling_MR_No("");
        setBilling_IP_No("");
        setBillingPatientAge("");
        setBillingPatientGender("Male");
        setBillingRoomNo("");
        setBillingBedNo("");
        setBillingBedCategory("");
        setBillingOccBedCategory("");
        setBilling_BillDateAndTime("");
        setBilling_AdmissionDateAndTime("");
        setBilling_DischargeDateAndTime("");
        setBillingPatientCategory("");
        setBillingTariffCategory("");
        setBillingPaymentMode("");
        setBillingPaidAmount(0);
        setBillingCreditNoteAmount(0);
        setBillingTAX(0);
        setBillingDiscount(0);
        setAllItems([]);
        setItemSubTotal(0);
        setAllBasicHospitalCharges([]);
        setBasicHospitalChargesItemSubTotal(0);
        setAllBedChargesItems([]);
        setBedChargesSubTotal(0);
        setAllBEDSideProcedures([]);
        setBedSideProceduresChargesSubTotal(0);
        setAllDoctorVisitCharges([]);
        setDoctorVisitChargesItemSubTotal(0);
        setAllLaboratoryInvestigations([]);
        setLaboratoryInvestigationsChargesSubTotal(0);
        setAllMedicines([]);
        setMedicinesChargesItemSubTotal(0);
        setAllOtherMiscCharges([]);
        setOtherMiscChargesItemSubTotal(0);
        setAllProcedures([]);
        setProceduresChargesItemSubTotal(0);
        setAllOtherServiceCharges([]);
        setOtherServicesChargesItemSubTotal(0);
        setBillNetAmount(0);
        setBillAmountInWords("");
        setBillAmount(0);
      } else if (responseCreateBilling.isError) {
        setSnackBarSuccessWarning(responseCreateBilling?.error?.data);
        handleClickSnackbarWarning();
      }
    } else if (submitButton === "addprint") {
      if (responseCreateBilling.isSuccess) {
        // dispatch(createBillingChange(Math.random()));
        setSnackBarSuccessMessage(responseCreateBilling?.data?.message);
        handleClose();
        handleClickSnackbarSuccess();

        setBillingPatientId({
          value: "",
          label: "",
        });
        setBillingPatientName("");
        setBilling_OPD_IPD_Emergency("");
        setBillingAdmittingDoctorId({
          value: "",
          label: "",
        });
        setBilling_MR_No("");
        setBilling_IP_No("");
        setBillingPatientAge("");
        setBillingPatientGender("Male");
        setBillingRoomNo("");
        setBillingBedNo("");
        setBillingBedCategory("");
        setBillingOccBedCategory("");
        setBilling_BillDateAndTime("");
        setBilling_AdmissionDateAndTime("");
        setBilling_DischargeDateAndTime("");
        setBillingPatientCategory("");
        setBillingTariffCategory("");
        setBillingPaymentMode("");
        setBillingPaidAmount(0);
        setBillingCreditNoteAmount(0);
        setBillingTAX(0);
        setBillingDiscount(0);
        setAllItems([]);
        setItemSubTotal(0);
        setAllBasicHospitalCharges([]);
        setBasicHospitalChargesItemSubTotal(0);
        setAllBedChargesItems([]);
        setBedChargesSubTotal(0);
        setAllBEDSideProcedures([]);
        setBedSideProceduresChargesSubTotal(0);
        setAllDoctorVisitCharges([]);
        setDoctorVisitChargesItemSubTotal(0);
        setAllLaboratoryInvestigations([]);
        setLaboratoryInvestigationsChargesSubTotal(0);
        setAllMedicines([]);
        setMedicinesChargesItemSubTotal(0);
        setAllOtherMiscCharges([]);
        setOtherMiscChargesItemSubTotal(0);
        setAllProcedures([]);
        setProceduresChargesItemSubTotal(0);
        setAllOtherServiceCharges([]);
        setOtherServicesChargesItemSubTotal(0);
        setBillNetAmount(0);
        setBillAmountInWords("");
        setBillAmount(0);
        navigate(responseCreateBilling?.data?.data?.billingId);
      } else if (responseCreateBilling.isError) {
        setSnackBarSuccessWarning(responseCreateBilling?.error?.data);
        handleClickSnackbarWarning();
      }
    }
  }, [
    responseCreateBilling.isSuccess,
    responseCreateBilling.isError,
    submitButton,
  ]);

  const filteredArrayGetAllPatients = patients?.filter(
    (data) => data.isDeleted === false && data
  );
  const renderedPatientForDropdownBilling = filteredArrayGetAllPatients?.map(
    (data) => {
      return {
        value: data.patientId,
        label: `${data.patientId} / ${data.patientName}`,
      };
    }
  );

  const filteredArrayGetAllDoctors = doctors?.filter(
    (data) => data.isDeleted === false && data
  );
  const renderedDoctorsForDropdownBilling = filteredArrayGetAllDoctors?.map(
    (data) => {
      return {
        value: data.doctorId,
        label: `${data.doctorId} / ${data.doctorName} (${data.doctorSpecialization})`,
      };
    }
  );

  const handleAddBill = (e) => {
    e.preventDefault();

    const submitData = {
      billingPatientId: billingPatientId?.value,
      billingPatientName: billingPatientName,
      billing_OPD_IPD_Emergency: billing_OPD_IPD_Emergency,
      billingAdmittingDoctorId: billingAdmittingDoctorId?.value,
      billing_MR_No: billing_MR_No,
      billing_IP_No: billing_IP_No,
      billingPatientAge: billingPatientAge,
      billingPatientGender: billingPatientGender,
      billingRoomNo: billingRoomNo,
      billingBedNo: billingBedNo,
      billingBedCategory: billingBedCategory,
      billingOccBedCategory: billingOccBedCategory,
      billing_BillDateAndTime: billing_BillDateAndTime,
      billing_AdmissionDateAndTime: billing_AdmissionDateAndTime,
      billing_DischargeDateAndTime: billing_DischargeDateAndTime,
      billingPatientCategory: billingPatientCategory,
      billingTariffCategory: billingTariffCategory,
      billingPaymentMode: billingPaymentMode,
      billingPaidAmount: billingPaidAmount,
      billingCreditNoteAmount: billingCreditNoteAmount,
      billingTAX: billingTAX,
      billingDiscount: billingDiscount,
      allItems: allItems,
      allBasicHospitalCharges: allBasicHospitalCharges,
      allBedChargesItems: allBedChargesItems,
      allBEDSideProcedures: allBEDSideProcedures,
      allDoctorVisitCharges: allDoctorVisitCharges,
      allLaboratoryInvestigations: allLaboratoryInvestigations,
      allMedicines: allMedicines,
      allOtherMiscCharges: allOtherMiscCharges,
      allProcedures: allProcedures,
      allOtherServiceCharges: allOtherServiceCharges,
      billAmount: billAmount,
      billAmountInWords: billAmountInWords,
      billNetAmount: billNetAmount,
    };

    if (submitButton === "addprint") {
      createBilling(submitData);
    }
    if (submitButton === "add") {
      createBilling(submitData);
    }
  };

  const billingModalAddForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Bill Information</h2>
      <form className='flex flex-col gap-[1rem] ' onSubmit={handleAddBill}>
        <div className='grid grid-cols-4 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>UHID</label>
            <Select
              className='text-[12px]'
              required
              options={renderedPatientForDropdownBilling}
              onChange={setBillingPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Name *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter patient name'
              value={billingPatientName}
              onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Date *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='date'
              required
            />
          </div> */}

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>OPD, IPD, Emergency *</label>
            <select
              required
              value={billing_OPD_IPD_Emergency}
              onChange={(e) => setBilling_OPD_IPD_Emergency(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>OPD</option>
              <option>IPD</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Admitting Doctor *</label>
            <Select
              className='text-[12px]'
              required
              options={renderedDoctorsForDropdownBilling}
              onChange={setBillingAdmittingDoctorId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>MR No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter MR No.'
              value={billing_MR_No}
              onChange={(e) => setBilling_MR_No(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>IP No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter IP No.'
              value={billing_IP_No}
              onChange={(e) => setBilling_IP_No(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Age *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              required
              placeholder='Enter age'
              value={billingPatientAge}
              onChange={(e) => setBillingPatientAge(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Gender *</label>
            <select
              required
              value={billingPatientGender}
              onChange={(e) => setBillingPatientGender(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Room No *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter room no.'
              value={billingRoomNo}
              onChange={(e) => setBillingRoomNo(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bed No *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter bed no.'
              value={billingBedNo}
              onChange={(e) => setBillingBedNo(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bill Bed Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter bill bed category'
              value={billingBedCategory}
              onChange={(e) => setBillingBedCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Occ Bed Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter acc bed category'
              value={billingOccBedCategory}
              onChange={(e) => setBillingOccBedCategory(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bill Number *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter bed category'
            />
          </div> */}
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bill Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_BillDateAndTime}
              onChange={(e) => setBilling_BillDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Addmission Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_AdmissionDateAndTime}
              onChange={(e) => setBilling_AdmissionDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Discharge Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_DischargeDateAndTime}
              onChange={(e) => setBilling_DischargeDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter patient category'
              value={billingPatientCategory}
              onChange={(e) => setBillingPatientCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tariff Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tariff category'
              value={billingTariffCategory}
              onChange={(e) => setBillingTariffCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter payment mode'
              value={billingPaymentMode}
              onChange={(e) => setBillingPaymentMode(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Paid Amount *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter paid amount'
              value={billingPaidAmount}
              onChange={(e) => setBillingPaidAmount(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Credit Note Amount *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter credit note amount'
              value={billingCreditNoteAmount}
              onChange={(e) => setBillingCreditNoteAmount(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tax *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter tax'
              value={billingTAX}
              onChange={(e) => setBillingTAX(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Discount</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter discount'
              value={billingDiscount}
              onChange={(e) => setBillingDiscount(e.target.value)}
            />
          </div> */}
        </div>

        <div className='border-b-[4px] py-[1rem]'>
          <AddItemTable
            allItems={allItems}
            setAllItems={setAllItems}
            itemSubTotal={itemSubTotal}
            setItemSubTotal={setItemSubTotal}
          />
          <BasicHospitalChargesTable
            allBasicHospitalCharges={allBasicHospitalCharges}
            setAllBasicHospitalCharges={setAllBasicHospitalCharges}
            basicHospitalChargesSubTotal={basicHospitalChargesSubTotal}
            setBasicHospitalChargesItemSubTotal={
              setBasicHospitalChargesItemSubTotal
            }
          />
          <BedChargesTable
            allBedChargesItems={allBedChargesItems}
            setAllBedChargesItems={setAllBedChargesItems}
            bedChargesSubTotal={bedChargesSubTotal}
            setBedChargesSubTotal={setBedChargesSubTotal}
          />
          <BEDSideProceduresTable
            allBEDSideProcedures={allBEDSideProcedures}
            setAllBEDSideProcedures={setAllBEDSideProcedures}
            bedSideProceduresChargesSubTotal={bedSideProceduresChargesSubTotal}
            setBedSideProceduresChargesSubTotal={
              setBedSideProceduresChargesSubTotal
            }
          />
          <DoctorVisitChargesTable
            doctors={doctors}
            doctorProfessionalDetails={doctorProfessionalDetails}
            allDoctorVisitCharges={allDoctorVisitCharges}
            setAllDoctorVisitCharges={setAllDoctorVisitCharges}
            doctorVisitChargesSubTotal={doctorVisitChargesSubTotal}
            setDoctorVisitChargesItemSubTotal={
              setDoctorVisitChargesItemSubTotal
            }
          />
          <LaboratoryInvestigationsTable
            allLaboratoryInvestigations={allLaboratoryInvestigations}
            setAllLaboratoryInvestigations={setAllLaboratoryInvestigations}
            laboratoryInvestigationsChargesSubTotal={
              laboratoryInvestigationsChargesSubTotal
            }
            setLaboratoryInvestigationsChargesSubTotal={
              setLaboratoryInvestigationsChargesSubTotal
            }
          />
          <MedicinesTable
            allMedicines={allMedicines}
            setAllMedicines={setAllMedicines}
            medicinesChargesSubTotal={medicinesChargesSubTotal}
            setMedicinesChargesItemSubTotal={setMedicinesChargesItemSubTotal}
          />
          <OtherMiscChargesTable
            allOtherMiscCharges={allOtherMiscCharges}
            setAllOtherMiscCharges={setAllOtherMiscCharges}
            otherMiscChargesSubTotal={otherMiscChargesSubTotal}
            setOtherMiscChargesItemSubTotal={setOtherMiscChargesItemSubTotal}
          />
          <ProceduresTable
            allProcedures={allProcedures}
            setAllProcedures={setAllProcedures}
            proceduresChargesSubTotal={proceduresChargesSubTotal}
            setProceduresChargesItemSubTotal={setProceduresChargesItemSubTotal}
          />
          <OtherServiceChargesTable
            allOtherServiceCharges={allOtherServiceCharges}
            setAllOtherServiceCharges={setAllOtherServiceCharges}
            otherServicesChargesSubTotal={otherServicesChargesSubTotal}
            setOtherServicesChargesItemSubTotal={
              setOtherServicesChargesItemSubTotal
            }
          />
        </div>

        <div className='flex flex-col gap-[3rem]'>
          <div className='flex flex-col items-end gap-[10px]'>
            <div className='flex flex-row items-center'>
              <h3 className='w-[250px]'>Bill Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center border-b'>
              <h3 className='w-[250px]'>Credit Note Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billingCreditNoteAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center border-b'>
              <h3 className='w-[250px]'>Net Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billNetAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <h3 className='w-[250px]'>Patient Paid Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billingPaidAmount}`}</h3>
            </div>
          </div>
          <h3>{`Amount in words  :  ${billAmountInWords}`}</h3>
        </div>

        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            onClick={() => setSubmitButton("add")}
            className='buttonFilled'>{`Save >`}</button>
          <button
            onClick={() => setSubmitButton("addprint")}
            className='buttonOutlined'>{`Save & Print >`}</button>
        </div>
      </form>
    </div>
  );

  // --------------------------------------------------------------

  // bill update model
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = (data) => {
    // console.log(data);
    setId(data?.data?.billingId);
    setBillingPatientId({
      value: data?.patientData?.patientId,
      label: data?.patientData?.patientId,
    });
    setBillingPatientName(data?.data?.billingPatientName);
    setBilling_OPD_IPD_Emergency("");
    setBillingAdmittingDoctorId({
      value: data?.doctorData?.doctorId,
      label: data?.doctorData?.doctorId,
    });
    setBilling_MR_No(data?.data?.billing_MR_No);
    setBilling_IP_No(data?.data?.billing_IP_No);
    setBillingPatientAge(data?.data?.billingPatientAge);
    setBillingPatientGender(data?.data?.billingPatientGender);
    setBillingRoomNo(data?.data?.billingRoomNo);
    setBillingBedNo(data?.data?.billingBedNo);
    setBillingBedCategory(data?.data?.billingBedCategory);
    setBillingOccBedCategory(data?.data?.billingOccBedCategory);
    setBilling_BillDateAndTime(data?.data?.billing_BillDateAndTime);
    setBilling_AdmissionDateAndTime(data?.data?.billing_AdmissionDateAndTime);
    setBilling_DischargeDateAndTime(data?.data?.billing_DischargeDateAndTime);
    setBillingPatientCategory(data?.data?.billingPatientCategory);
    setBillingTariffCategory(data?.data?.billingTariffCategory);
    setBillingPaymentMode(data?.data?.billingPaymentMode);
    setBillingPaidAmount(data?.data?.billingPaidAmount);
    setBillingCreditNoteAmount(data?.data?.billingCreditNoteAmount);
    setBillingTAX(data?.data?.billingTAX);
    setBillingDiscount(data?.data?.billingDiscount);
    setAllItems(data?.data?.allItems);
    // setItemSubTotal(0);
    setAllBasicHospitalCharges(data?.data?.allBasicHospitalCharges);
    // setBasicHospitalChargesItemSubTotal(0);
    setAllBedChargesItems(data?.data?.allBedChargesItems);
    // setBedChargesSubTotal(0);
    setAllBEDSideProcedures(data?.data?.allBEDSideProcedures);
    // setBedSideProceduresChargesSubTotal(0);
    setAllDoctorVisitCharges(data?.data?.allDoctorVisitCharges);
    // setDoctorVisitChargesItemSubTotal(0);
    setAllLaboratoryInvestigations(data?.data?.allLaboratoryInvestigations);
    // setLaboratoryInvestigationsChargesSubTotal(0);
    setAllMedicines(data?.data?.allMedicines);
    // setMedicinesChargesItemSubTotal(0);
    setAllOtherMiscCharges(data?.data?.allOtherMiscCharges);
    // setOtherMiscChargesItemSubTotal(0);
    setAllProcedures(data?.data?.allProcedures);
    // setProceduresChargesItemSubTotal(0);
    setAllOtherServiceCharges(data?.data?.allOtherServiceCharges);
    // setOtherServicesChargesItemSubTotal(0);
    setBillNetAmount(0);
    setBillAmountInWords("");
    setBillAmount(0);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  React.useEffect(() => {
    if (submitButton === "update") {
      if (responseUpdateBillingById.isSuccess) {
        dispatch(updateBillingChange(Math.random()));
        setSnackBarSuccessMessage(responseUpdateBillingById?.data?.message);
        handleCloseUpdateModal();
        handleClickSnackbarSuccess();
      } else if (responseUpdateBillingById.isError) {
        setSnackBarSuccessWarning(responseCreateBilling?.error?.data);
        handleClickSnackbarWarning();
      }
    } else if (submitButton === "updateprint") {
      if (responseUpdateBillingById.isSuccess) {
        // dispatch(updateBillingChange(Math.random()));
        setSnackBarSuccessMessage(responseUpdateBillingById?.data?.message);
        handleCloseUpdateModal();
        handleClickSnackbarSuccess();
        navigate(responseUpdateBillingById?.data?.data?.billingId);
      } else if (responseUpdateBillingById.isError) {
        setSnackBarSuccessWarning(responseCreateBilling?.error?.data);
        handleClickSnackbarWarning();
      }
    }
  }, [
    responseUpdateBillingById.isSuccess,
    responseUpdateBillingById.isError,
    submitButton,
  ]);

  const handleUpdateBilling = (e) => {
    e.preventDefault();
    const submitData = {
      billingPatientId: billingPatientId?.value,
      billingPatientName: billingPatientName,
      billing_OPD_IPD_Emergency: billing_OPD_IPD_Emergency,
      billingAdmittingDoctorId: billingAdmittingDoctorId?.value,
      billing_MR_No: billing_MR_No,
      billing_IP_No: billing_IP_No,
      billingPatientAge: billingPatientAge,
      billingPatientGender: billingPatientGender,
      billingRoomNo: billingRoomNo,
      billingBedNo: billingBedNo,
      billingBedCategory: billingBedCategory,
      billingOccBedCategory: billingOccBedCategory,
      billing_BillDateAndTime: billing_BillDateAndTime,
      billing_AdmissionDateAndTime: billing_AdmissionDateAndTime,
      billing_DischargeDateAndTime: billing_DischargeDateAndTime,
      billingPatientCategory: billingPatientCategory,
      billingTariffCategory: billingTariffCategory,
      billingPaymentMode: billingPaymentMode,
      billingPaidAmount: billingPaidAmount,
      billingCreditNoteAmount: billingCreditNoteAmount,
      billingTAX: billingTAX,
      billingDiscount: billingDiscount,
      allItems: allItems,
      allBasicHospitalCharges: allBasicHospitalCharges,
      allBedChargesItems: allBedChargesItems,
      allBEDSideProcedures: allBEDSideProcedures,
      allDoctorVisitCharges: allDoctorVisitCharges,
      allLaboratoryInvestigations: allLaboratoryInvestigations,
      allMedicines: allMedicines,
      allOtherMiscCharges: allOtherMiscCharges,
      allProcedures: allProcedures,
      allOtherServiceCharges: allOtherServiceCharges,
      billAmount: billAmount,
      billAmountInWords: billAmountInWords,
      billNetAmount: billNetAmount,
    };

    if (submitButton === "updateprint") {
      const updateData = {
        id: id,
        data: submitData,
      };
      updateBillingById(updateData);
    }

    if (submitButton === "update") {
      const updateData = {
        id: id,
        data: submitData,
      };
      updateBillingById(updateData);
    }
  };

  const billingModalUpdateForm = (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <h2 className='border-b py-[1rem]'>Bill Information</h2>
      <form
        className='flex flex-col gap-[1rem] '
        onSubmit={handleUpdateBilling}>
        <div className='grid grid-cols-4 gap-[2rem] border-b pb-[3rem]'>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Registration No</label>
            <Select
              className='text-[12px]'
              required
              options={renderedPatientForDropdownBilling}
              onChange={setBillingPatientId}
              value={billingPatientId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Name *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter patient name'
              value={billingPatientName}
              onChange={(e) => setBillingPatientName(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
        <label className='text-[14px]'>Date *</label>
        <input
          className='py-[10px] outline-none border-b'
          type='date'
          required
        />
      </div> */}

          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>OPD, IPD, Emergency *</label>
            <select
              required
              value={billing_OPD_IPD_Emergency}
              onChange={(e) => setBilling_OPD_IPD_Emergency(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>OPD</option>
              <option>IPD</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Admitting Doctor *</label>
            <Select
              className='text-[12px]'
              required
              options={renderedDoctorsForDropdownBilling}
              onChange={setBillingAdmittingDoctorId}
              value={billingAdmittingDoctorId}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>MR No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter MR No.'
              value={billing_MR_No}
              onChange={(e) => setBilling_MR_No(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>IP No. *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter IP No.'
              value={billing_IP_No}
              onChange={(e) => setBilling_IP_No(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Age *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              required
              placeholder='Enter age'
              value={billingPatientAge}
              onChange={(e) => setBillingPatientAge(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Gender *</label>
            <select
              required
              value={billingPatientGender}
              onChange={(e) => setBillingPatientGender(e.target.value)}
              className='py-[11.5px] outline-none border-b bg-transparent'>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Room No *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter room no.'
              value={billingRoomNo}
              onChange={(e) => setBillingRoomNo(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bed No *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter bed no.'
              value={billingBedNo}
              onChange={(e) => setBillingBedNo(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bill Bed Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter bill bed category'
              value={billingBedCategory}
              onChange={(e) => setBillingBedCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Occ Bed Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              placeholder='Enter acc bed category'
              value={billingOccBedCategory}
              onChange={(e) => setBillingOccBedCategory(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
        <label className='text-[14px]'>Bill Number *</label>
        <input
          className='py-[10px] outline-none border-b'
          type='text'
          required
          placeholder='Enter bed category'
        />
      </div> */}
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Bill Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_BillDateAndTime}
              onChange={(e) => setBilling_BillDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Addmission Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_AdmissionDateAndTime}
              onChange={(e) => setBilling_AdmissionDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Discharge Date & Time *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='datetime-local'
              required
              value={billing_DischargeDateAndTime}
              onChange={(e) => setBilling_DischargeDateAndTime(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Patient Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter patient category'
              value={billingPatientCategory}
              onChange={(e) => setBillingPatientCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tariff Category *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter tariff category'
              value={billingTariffCategory}
              onChange={(e) => setBillingTariffCategory(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Payment Mode *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='text'
              required
              placeholder='Enter payment mode'
              value={billingPaymentMode}
              onChange={(e) => setBillingPaymentMode(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Paid Amount *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter paid amount'
              value={billingPaidAmount}
              onChange={(e) => setBillingPaidAmount(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Credit Note Amount *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter credit note amount'
              value={billingCreditNoteAmount}
              onChange={(e) => setBillingCreditNoteAmount(e.target.value)}
            />
          </div>
          {/* <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Tax *</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter tax'
              value={billingTAX}
              onChange={(e) => setBillingTAX(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-[6px]'>
            <label className='text-[14px]'>Discount</label>
            <input
              className='py-[10px] outline-none border-b'
              type='number'
              step='0.1'
              placeholder='Enter discount'
              value={billingDiscount}
              onChange={(e) => setBillingDiscount(e.target.value)}
            />
          </div> */}
        </div>

        <div className='border-b-[4px] py-[1rem]'>
          <AddItemTable
            allItems={allItems}
            setAllItems={setAllItems}
            itemSubTotal={itemSubTotal}
            setItemSubTotal={setItemSubTotal}
          />
          <BasicHospitalChargesTable
            allBasicHospitalCharges={allBasicHospitalCharges}
            setAllBasicHospitalCharges={setAllBasicHospitalCharges}
            basicHospitalChargesSubTotal={basicHospitalChargesSubTotal}
            setBasicHospitalChargesItemSubTotal={
              setBasicHospitalChargesItemSubTotal
            }
          />
          <BedChargesTable
            allBedChargesItems={allBedChargesItems}
            setAllBedChargesItems={setAllBedChargesItems}
            bedChargesSubTotal={bedChargesSubTotal}
            setBedChargesSubTotal={setBedChargesSubTotal}
          />
          <BEDSideProceduresTable
            allBEDSideProcedures={allBEDSideProcedures}
            setAllBEDSideProcedures={setAllBEDSideProcedures}
            bedSideProceduresChargesSubTotal={bedSideProceduresChargesSubTotal}
            setBedSideProceduresChargesSubTotal={
              setBedSideProceduresChargesSubTotal
            }
          />
          <DoctorVisitChargesTable
            doctors={doctors}
            doctorProfessionalDetails={doctorProfessionalDetails}
            allDoctorVisitCharges={allDoctorVisitCharges}
            setAllDoctorVisitCharges={setAllDoctorVisitCharges}
            doctorVisitChargesSubTotal={doctorVisitChargesSubTotal}
            setDoctorVisitChargesItemSubTotal={
              setDoctorVisitChargesItemSubTotal
            }
          />
          <LaboratoryInvestigationsTable
            allLaboratoryInvestigations={allLaboratoryInvestigations}
            setAllLaboratoryInvestigations={setAllLaboratoryInvestigations}
            laboratoryInvestigationsChargesSubTotal={
              laboratoryInvestigationsChargesSubTotal
            }
            setLaboratoryInvestigationsChargesSubTotal={
              setLaboratoryInvestigationsChargesSubTotal
            }
          />
          <MedicinesTable
            allMedicines={allMedicines}
            setAllMedicines={setAllMedicines}
            medicinesChargesSubTotal={medicinesChargesSubTotal}
            setMedicinesChargesItemSubTotal={setMedicinesChargesItemSubTotal}
          />
          <OtherMiscChargesTable
            allOtherMiscCharges={allOtherMiscCharges}
            setAllOtherMiscCharges={setAllOtherMiscCharges}
            otherMiscChargesSubTotal={otherMiscChargesSubTotal}
            setOtherMiscChargesItemSubTotal={setOtherMiscChargesItemSubTotal}
          />
          <ProceduresTable
            allProcedures={allProcedures}
            setAllProcedures={setAllProcedures}
            proceduresChargesSubTotal={proceduresChargesSubTotal}
            setProceduresChargesItemSubTotal={setProceduresChargesItemSubTotal}
          />
          <OtherServiceChargesTable
            allOtherServiceCharges={allOtherServiceCharges}
            setAllOtherServiceCharges={setAllOtherServiceCharges}
            otherServicesChargesSubTotal={otherServicesChargesSubTotal}
            setOtherServicesChargesItemSubTotal={
              setOtherServicesChargesItemSubTotal
            }
          />
        </div>

        <div className='flex flex-col gap-[3rem]'>
          <div className='flex flex-col items-end gap-[10px]'>
            <div className='flex flex-row items-center'>
              <h3 className='w-[250px]'>Bill Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center border-b'>
              <h3 className='w-[250px]'>Credit Note Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billingCreditNoteAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center border-b'>
              <h3 className='w-[250px]'>Net Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billNetAmount}`}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <h3 className='w-[250px]'>Patient Paid Amount :</h3>
              <h3 className='w-[300px]'>{`₹ ${billingPaidAmount}`}</h3>
            </div>
          </div>
          <h3>{`Amount in words  :  ${billAmountInWords}`}</h3>
        </div>

        <div className='flex gap-[1rem] items-center'>
          <button
            type='submit'
            className='buttonFilled'
            onClick={() => setSubmitButton("update")}>{`Save >`}</button>
          {/* <button
            onClick={() => setSubmitButton("updateprint")}
            className='buttonOutlined'>{`Save & Print >`}</button> */}
        </div>
      </form>
    </div>
  );

  // --------------------------------

  const [search, setSearch] = React.useState("");

  const filteredArray = billings?.filter((data) => {
    if (search !== "") {
      const userSearch = search.toLowerCase();
      const searchInData = data?.billingId?.toLowerCase();

      return searchInData?.startsWith(userSearch);
    }
    return data;
  });
  // console.log(doctors);

  const mappedBillData = filteredArray?.map((data, index) => {
    const filteredPatientData = patients?.find(
      (patient) => data?.billingPatientId === patient?.patientId
    );
    const filteredDoctorData = doctors?.find(
      (doctor) => doctor?.doctorId === data?.billingAdmittingDoctorId
    );
    return {
      data,
      patientData: filteredPatientData,
      doctorData: filteredDoctorData
        ? filteredDoctorData
        : { doctorName: "Doctor" },
    };
  });
  // console.log(mappedBillData);

  const config = [
    {
      label: "Bill No",
      render: (list) => list.data.billingId,
    },
    {
      label: "Patient",
      render: (list) => list.data.billingPatientName,
    },
    {
      label: "Doctor",
      render: (list) => list.doctorData.doctorName,
    },
    {
      label: "Date",
      render: (list) => date(list.data.billing_BillDateAndTime),
    },
    {
      label: "Bill Amount",
      render: (list) => `₹ ${list.data.billAmount}`,
    },
    {
      label: "Net Amount",
      render: (list) => `₹ ${list.data.billNetAmount}`,
    },
    {
      label: "Paid Amount",
      render: (list) => `₹ ${list.data.billingPaidAmount}`,
    },
    {
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          <div
            onClick={() => handleOpenViewModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#96999C] rounded-[12px] cursor-pointer'>
            <MdViewKanban className='text-[25px] text-[#96999C]' />
          </div>
          <div
            onClick={() => handleOpenUpdateModal(list)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div>
          {/* <div
            onClick={() => handleClickOpenDialogBox(list)}
            className="p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer"
          >
            <RiDeleteBin6Fill className="text-[25px] text-[#EB5757]" />
          </div> */}
        </div>
      ),
    },
  ];

  const keyFn = (list) => {
    return list.patientName;
  };
  return (
    <Suspense fallback={<>...</>}>
      <div className='flex flex-col gap-[1rem] p-[1rem]'>
        <div className='flex justify-between'>
          <h2 className='border-b-[4px] border-[#3497F9]'>Billing</h2>
          <button
            onClick={handleOpen}
            className='bg-[#3497F9] text-white p-[10px] rounded-md'>
            + Add Billing
          </button>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <FaSearch className='text-[#56585A]' />
            <input
              className='bg-transparent outline-none'
              placeholder='Search by bill no'
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <div className='flex gap-[10px] bg-[#F4F6F6] items-center p-[10px] rounded-[18px]'>
            <input type='date' className='bg-transparent outline-none' />
          </div> */}
        </div>
        <Table data={mappedBillData} config={config} keyFn={keyFn} />
      </div>
      {/* Modal To Add Bill */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Billing
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {billingModalAddForm}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Edit Billing
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {billingModalUpdateForm}
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <div className='flex justify-between items-center'>
              <h1 className='headingBottomUnderline w-fit pb-[10px]'>
                Billing Details
              </h1>
              <Link
                // onClick={handleGeneratePdf}
                target='_blank'
                to={viewData?.data?.billingId}
                className='buttonFilled flex items-center gap-[10px]'>
                <LuHardDriveDownload />
                <p>Download</p>
              </Link>
            </div>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <BillSummary
              date={date}
              time={time}
              viewData={viewData}
              placeholder={placeholder}
            />
          </Typography>
        </Box>
      </Modal>
      {/* Success Snackbar */}
      <Snackbars
        open={openSnackbarSuccess}
        setOpen={setOpenSnackBarSuccess}
        severity='success'
        message={snackBarMessageSuccess}
      />
      {/* Warning Snackbar */}
      <Snackbars
        open={openSnackbarWarning}
        setOpen={setOpenSnackBarWarning}
        severity='warning'
        message={snackBarMessageWarning}
      />
      <DialogBoxToDelete
        open={openDialogBox}
        setOpen={setOpenDialogBox}
        handleAgree={handleAgreeDialogBoxToDelete}
        message={dialogBoxMessage}
      />
    </Suspense>
  );
}
