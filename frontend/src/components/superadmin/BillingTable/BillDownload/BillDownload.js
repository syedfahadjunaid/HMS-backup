import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useRef } from "react";
// import jsPDF from "jspdf";
import logoImage from "../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import { useGetBillingByIdQuery } from "../../../../Store/Services/BillingService";
import { useGetDoctorByIdQuery } from "../../../../Store/Services/DoctorService";

export default function BillDownload() {
  const { billId } = useParams();

  const [doctorId, setDoctorId] = useState("");
  const responseGetBillById = useGetBillingByIdQuery(billId);
  const responseGetDoctorById = useGetDoctorByIdQuery(doctorId);

  useEffect(() => {
    if (responseGetBillById.isSuccess) {
      setDoctorId(responseGetBillById?.currentData?.billingAdmittingDoctorId);
    }
  }, [responseGetBillById.isSuccess]);
  // console.log(responseGetDoctorById);
  const date = (dateTime) => {
    const newdate = new Date(dateTime);

    return newdate.toLocaleDateString();
  };

  const time = (dateTime) => {
    const newDate = new Date(dateTime);

    return newDate.toLocaleTimeString();
  };

  // console.log(responseGetBillById);

  const componentRef = useRef();

  const marginTop = "10px";
  const marginRight = "5px";
  const marginBottom = "16px";
  const marginLeft = "5px";
  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // pageStyle: "@page { size: auto;  margin: 25mm; } }",
  });

  return (
    <>
      {responseGetBillById.isLoading && responseGetDoctorById.isLoading ? (
        "Loading..."
      ) : (
        <Fragment>
          {responseGetBillById.isSuccess && responseGetDoctorById.isSuccess ? (
            <div className='w-full'>
              <button onClick={() => handlePrint()} className='buttonFilled'>
                Print
              </button>
              <div
                // ref={reportTemplateRef}
                ref={componentRef}
                className='w-full p-[1rem] flex flex-col gap-[1rem]'>
                <style>{getPageMargins()}</style>
                <div className='flex justify-between items-end'>
                  <div className='flex items-end gap-[1rem]'>
                    <img src={logoImage} alt='chtclogo' className='w-[100px]' />
                    <h2>City Hospital and Trauma Centre</h2>
                  </div>
                  <div className='flex text-[8px] gap-[10px]'>
                    <p className='font-[600]'>Address: </p>
                    <p className='w-[200px]'>
                      C1-C2 cinder dump complex ,near Alambagh bus stand ,Kanpur
                      road, Lucknow 226005
                    </p>
                  </div>
                </div>
                <h3
                  className='text-center'
                  style={{
                    borderTop: "1px solid #CFCFCF",
                    borderBottom: "1px solid #CFCFCF",
                  }}>
                  Final Bill
                </h3>
                <div
                  className='grid grid-cols-3 gap-[10px] text-[8px] pb-[1rem]'
                  style={{ borderBottom: "1px solid #CFCFCF" }}>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px] '>Patients Reg ID</p>
                    <p>{responseGetBillById?.currentData?.billingPatientId}</p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>OCC Bed Category</p>
                    <p>
                      {responseGetBillById?.currentData?.billingOccBedCategory}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>MR No. and IP No.</p>
                    <p>{`${responseGetBillById?.currentData?.billing_MR_No} / ${responseGetBillById?.currentData?.billing_IP_No}`}</p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Name</p>
                    <p>
                      {responseGetBillById?.currentData?.billingPatientName}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px] '>Bill Date-Time</p>
                    <p>{`${date(
                      responseGetBillById?.currentData?.billing_BillDateAndTime
                    )} - ${time(
                      responseGetBillById?.currentData?.billing_BillDateAndTime
                    )}`}</p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Admitting Doctor</p>
                    <p>
                      {
                        responseGetDoctorById?.currentData?.DoctorDetails
                          ?.doctorName
                      }
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Gender</p>
                    <p>
                      {responseGetBillById?.currentData?.billingPatientGender}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Admission Date-Time</p>
                    <p>
                      {`${date(
                        responseGetBillById?.currentData
                          ?.billing_AdmissionDateAndTime
                      )} - ${time(
                        responseGetBillById?.currentData
                          ?.billing_AdmissionDateAndTime
                      )}`}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px] '>
                      Room No. and Bed No.
                    </p>
                    <p>{`${responseGetBillById?.currentData?.billingRoomNo} / ${responseGetBillById?.currentData?.billingBedNo}`}</p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Age</p>
                    <p>{responseGetBillById?.currentData?.billingPatientAge}</p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Discharge Date-Time</p>
                    <p>
                      {`${date(
                        responseGetBillById?.currentData
                          ?.billing_DischargeDateAndTime
                      )} - ${time(
                        responseGetBillById?.currentData
                          ?.billing_DischargeDateAndTime
                      )}`}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Admission Category</p>
                    <p>
                      {
                        responseGetBillById?.currentData
                          ?.billing_OPD_IPD_Emergency
                      }
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px] '>Patient Category</p>
                    <p>
                      {responseGetBillById?.currentData?.billingPatientCategory}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Tariff Category</p>
                    <p>
                      {responseGetBillById?.currentData?.billingTariffCategory}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Bill Bed Category</p>
                    <p>
                      {responseGetBillById?.currentData?.billingBedCategory}
                    </p>
                  </div>
                  <div className='flex justify-start text-start'>
                    <p className='font-[600] w-[100px]'>Billing Id</p>
                    <p>{billId}</p>
                  </div>
                </div>
                {responseGetBillById?.currentData?.allItems?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      ITEM Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allItems?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allItems
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allBasicHospitalCharges
                  ?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Basic Hospital Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allBasicHospitalCharges?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allBasicHospitalCharges
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allBedChargesItems?.length >
                  0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      BED Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allBedChargesItems?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allBedChargesItems
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allBEDSideProcedures
                  ?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      BED SIDE Procedures
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allBEDSideProcedures?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allBEDSideProcedures
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allDoctorVisitCharges
                  ?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Doctor Visit Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allDoctorVisitCharges?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allDoctorVisitCharges
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemPrice,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allLaboratoryInvestigations
                  ?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Laboratory Investigations
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allLaboratoryInvestigations?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allLaboratoryInvestigations
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allMedicines?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Medicines
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allMedicines?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allMedicines
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allOtherMiscCharges?.length >
                  0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Other Misc Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allOtherMiscCharges?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allOtherMiscCharges
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allProcedures?.length >
                  0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Procedures
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allProcedures?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allProcedures
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                {responseGetBillById?.currentData?.allOtherServiceCharges
                  ?.length > 0 && (
                  <>
                    <p className='font-[600] text-start text-[12px]'>
                      Other Service Charges
                    </p>
                    <table className='text-[10px]'>
                      <tr className='border-b '>
                        <th className='py-[4px]'>S NO</th>
                        <th className='py-[4px]'>DATE</th>
                        <th className='py-[4px]'>ITEM NAME</th>
                        <th className='py-[4px]'>QTY</th>
                        <th className='py-[4px]'>PRICE</th>
                        <th className='py-[4px]'>AMOUNT</th>
                      </tr>
                      {responseGetBillById?.currentData?.allOtherServiceCharges?.map(
                        (item, index) => {
                          return (
                            <tr key={`${item?.itemName}-${index}`}>
                              <td className='text-center py-[4px]'>
                                {index + 1}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.date}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemName}
                              </td>
                              <td className='text-center py-[4px]'>
                                {item?.itemQuantity}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemPrice}
                              </td>
                              <td className='text-center py-[4px]'>
                                ₹ {item?.itemTotalAmount}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </table>
                    <div
                      className='text-[#0495F5] text-[14px] flex items-center gap-[2rem] w-full justify-end px-[2rem] pb-[1rem]'
                      style={{ borderBottom: "1px solid #CFCFCF" }}>
                      <p>Sub Total</p>
                      <p>
                        ₹{" "}
                        {responseGetBillById?.currentData?.allOtherServiceCharges
                          ?.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.itemTotalAmount,
                            0
                          )
                          .toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
                <div className='flex items-end px-[2rem] flex-col'>
                  <div className='w-[300px] flex flex-col gap-[10px]'>
                    <h3 className='text-start'>Amount Summary</h3>
                    <div className='flex  justify-between border-b text-[12px]'>
                      <p>Grand Total</p>
                      <p>₹ {responseGetBillById?.currentData?.billAmount}</p>
                    </div>
                    <div className='flex  justify-between border-b text-[12px]'>
                      <p>Credit Note Amount</p>
                      <p>
                        ₹{" "}
                        {
                          responseGetBillById?.currentData
                            ?.billingCreditNoteAmount
                        }
                      </p>
                    </div>
                    <div className='flex  justify-between border-b text-[12px]'>
                      <p>Net Amount</p>
                      <p>₹ {responseGetBillById?.currentData?.billNetAmount}</p>
                    </div>
                    <div className='flex  justify-between border-b text-[12px]'>
                      <p>Amount Paid</p>
                      <p>
                        ₹ {responseGetBillById?.currentData?.billingPaidAmount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex gap-[1rem] text-[12px]'>
                  <p className='font-[600]'>Amount In Words: </p>
                  <p>{responseGetBillById?.currentData?.billAmountInWords}</p>
                </div>
              </div>
            </div>
          ) : (
            "Not Found"
          )}
        </Fragment>
      )}
    </>
  );
}
