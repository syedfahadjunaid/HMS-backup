import React from "react";

export default function BillSummary({ date, time, viewData, placeholder }) {
  // console.log(viewData);
  return (
    <div className='flex flex-col w-full text-[#3E454D] gap-[2rem] overflow-y-scroll px-[10px] pb-[2rem] h-[450px]'>
      <div className='border-b flex gap-[1rem] py-[1rem] w-full'>
        <h3 className='font-[500]'>Bill ID: </h3>
        <h3>{viewData?.data?.billingId}</h3>
      </div>
      <div className='flex w-full pb-[1rem] border-b'>
        <div className='w-[25%] flex flex-col items-center'>
          <img
            className='w-[200px] h-[200px] object-contain'
            src={
              viewData?.patientData?.patientImage
                ? process.env.React_App_Base_Image_Url +
                  viewData?.patientData?.patientImage
                : placeholder
            }
            alt='patientImage'
          />
        </div>
        <div className='w-[75%] flex flex-col gap-[10px] text-[14px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Patient Reg Id: </p>
              <p>{viewData?.patientData?.patientId}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Admission Date / Time: </p>
              <p>{`${date(
                viewData?.data?.billing_AdmissionDateAndTime
              )} / ${time(viewData?.data?.billing_AdmissionDateAndTime)}`}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[180px]'>Patient Name: </p>
              <p>{viewData?.data?.billingPatientName}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[180px]'>Discharge Date / Time: </p>
              <p>{`${date(
                viewData?.data?.billing_DischargeDateAndTime
              )} / ${time(viewData?.data?.billing_DischargeDateAndTime)}`}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Gender: </p>
              <p>{viewData?.data?.billingPatientGender}</p>
            </div>

            <div className='flex'>
              <p className='font-[600] w-[180px]'>Patient Category: </p>
              <p>{viewData?.data?.billingPatientCategory}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Age: </p>
              <p>{viewData?.data?.billingPatientAge}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Tariff Category: </p>
              <p>{viewData?.data?.billingTariffCategory}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>OPD / IPD / Emergency: </p>
              <p>{viewData?.data?.billing_OPD_IPD_Emergency}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>MR No / IP No: </p>
              <p>{`${viewData?.data?.billing_MR_No} / ${viewData?.data?.billing_IP_No}`}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Admitting Doctor Id: </p>
              <p>{viewData?.data?.billingAdmittingDoctorId}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Room No: </p>
              <p>{viewData?.data?.billingRoomNo}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Admitting Doctor Name: </p>
              <p>{viewData?.doctorData?.doctorName}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>BED No: </p>
              <p>{viewData?.data?.billingBedNo}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Bill Bed Category: </p>
              <p>{viewData?.data?.billingBedCategory}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Occ Bed Category: </p>
              <p>{viewData?.data?.billingOccBedCategory}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Bill Date / Time: </p>
              <p>{`${date(viewData?.data?.billing_BillDateAndTime)} / ${time(
                viewData?.data?.billing_BillDateAndTime
              )}`}</p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Payment Mode: </p>
              <p>{viewData?.data?.billingPaymentMode}</p>
            </div>
          </div>
          <div className='flex flex-col gap-[10px] py-[1rem]'>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Created On: </p>
              <p className='break-word text-[14px]'>
                {`${date(viewData?.data?.createdAt)} ${time(
                  viewData?.data?.createdAt
                )}`}
              </p>
            </div>
            <div className='flex'>
              <p className='font-[600] w-[180px]'>Updated On: </p>
              <p className='break-word text-[14px]'>
                {`${date(viewData?.data?.updatedAt)} ${time(
                  viewData?.data?.updatedAt
                )}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-[1rem] py-[1rem] border-b-4'>
        <h2 className='bg-[#0495F5] p-[8px] rounded-md text-white'>
          Bill Summary
        </h2>

        <h3 className='border-b pb-[10px]'>
          Patients Bill Summary Information
        </h3>

        {viewData?.data?.allItems?.length > 0 && (
          <>
            <h4 className='font-[600]'>ITEM Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allItems?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allItems
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
        {viewData?.data?.allBasicHospitalCharges?.length > 0 && (
          <>
            <h4 className='font-[600]'>Basic Hospital Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allBasicHospitalCharges?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allBasicHospitalCharges
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
        {viewData?.data?.allBedChargesItems?.length > 0 && (
          <>
            <h4 className='font-[600]'>BED Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allBedChargesItems?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allBedChargesItems
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
        {viewData?.data?.allBEDSideProcedures?.length > 0 && (
          <>
            <h4 className='font-[600]'>BED SIDE Procedures</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allBEDSideProcedures?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allBEDSideProcedures
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
        {viewData?.data?.allDoctorVisitCharges?.length > 0 && (
          <>
            <h4 className='font-[600]'>Doctor Visit Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allDoctorVisitCharges?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allDoctorVisitCharges
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
        {viewData?.data?.allLaboratoryInvestigations?.length > 0 && (
          <>
            <h4 className='font-[600]'>Laboratory Investigations</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allLaboratoryInvestigations?.map(
                (item, index) => {
                  return (
                    <tr key={`${item?.itemName}-${index}`}>
                      <td className='text-center py-[1rem]'>{index + 1}</td>
                      <td className='text-center py-[1rem]'>{item?.date}</td>
                      <td className='text-center py-[1rem]'>
                        {item?.itemName}
                      </td>
                      <td className='text-center py-[1rem]'>
                        {item?.itemQuantity}
                      </td>
                      <td className='text-center py-[1rem]'>
                        ₹ {item?.itemPrice}
                      </td>
                      <td className='text-center py-[1rem]'>
                        ₹ {item?.itemTotalAmount}
                      </td>
                    </tr>
                  );
                }
              )}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allLaboratoryInvestigations
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
        {viewData?.data?.allMedicines?.length > 0 && (
          <>
            <h4 className='font-[600]'>Medicines</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allMedicines?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allMedicines
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
        {viewData?.data?.allOtherMiscCharges?.length > 0 && (
          <>
            <h4 className='font-[600]'>Other Misc Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allOtherMiscCharges?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allOtherMiscCharges
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
        {viewData?.data?.allProcedures?.length > 0 && (
          <>
            <h4 className='font-[600]'>Procedures</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allProcedures?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allProcedures
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
        {viewData?.data?.allOtherServiceCharges?.length > 0 && (
          <>
            <h4 className='font-[600]'>Other Service Charges</h4>
            <table className=''>
              <tr className='border-b '>
                <th className='py-[1rem]'>S NO</th>
                <th className='py-[1rem]'>DATE</th>
                <th className='py-[1rem]'>ITEM NAME</th>
                <th className='py-[1rem]'>QTY</th>
                <th className='py-[1rem]'>PRICE</th>
                <th className='py-[1rem]'>AMOUNT</th>
              </tr>
              {viewData?.data?.allOtherServiceCharges?.map((item, index) => {
                return (
                  <tr key={`${item?.itemName}-${index}`}>
                    <td className='text-center py-[1rem]'>{index + 1}</td>
                    <td className='text-center py-[1rem]'>{item?.date}</td>
                    <td className='text-center py-[1rem]'>{item?.itemName}</td>
                    <td className='text-center py-[1rem]'>
                      {item?.itemQuantity}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemPrice}
                    </td>
                    <td className='text-center py-[1rem]'>
                      ₹ {item?.itemTotalAmount}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div className='text-[#0495F5] text-[20px] flex items-center gap-[2rem] w-full justify-end px-[2rem]'>
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {viewData?.data?.allOtherServiceCharges
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
      </div>
      <div className='flex items-end px-[2rem] flex-col'>
        <div className='w-[300px] flex flex-col gap-[1rem]'>
          <h1>Amount Summary</h1>
          <div className='flex  justify-between border-b'>
            <h2>Grand Total</h2>
            <h2>₹ {viewData?.data?.billAmount}</h2>
          </div>
          <div className='flex  justify-between border-b'>
            <h2>Credit Note Amount</h2>
            <h2>₹ {viewData?.data?.billingCreditNoteAmount}</h2>
          </div>
          <div className='flex  justify-between border-b'>
            <h2>Net Amount</h2>
            <h2>₹ {viewData?.data?.billNetAmount}</h2>
          </div>
          <div className='flex  justify-between border-b'>
            <h2>Amount Paid</h2>
            <h2>₹ {viewData?.data?.billingPaidAmount}</h2>
          </div>
        </div>
      </div>
      <div className='flex gap-[1rem]'>
        <p className='font-[600]'>Amount In Words: </p>
        <p>{viewData?.data?.billAmountInWords}</p>
      </div>
    </div>
  );
}
