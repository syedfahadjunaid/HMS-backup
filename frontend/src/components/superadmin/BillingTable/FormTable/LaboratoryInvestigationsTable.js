import React, { useEffect, useState } from "react";
import Table from "../../../Table";
import Modal from "@mui/material/Modal";

import { RiDeleteBin6Fill } from "react-icons/ri";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function LaboratoryInvestigationsTable({
  allLaboratoryInvestigations,
  setAllLaboratoryInvestigations,
  laboratoryInvestigationsChargesSubTotal,
  setLaboratoryInvestigationsChargesSubTotal,
}) {
  // Add Item In Billing--------------------------

  const [itemName, setItemName] = React.useState("");
  const [itemQuantity, setItemQuanity] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");
  const [itemTotalAmount, setItemTotalAmount] = React.useState(0);
  const [date, setDate] = useState("");

  const [itemData, setItemData] = React.useState([]);
  // const [allLaboratoryInvestigations, setAllLaboratoryInvestigations] =
  //   React.useState([]);

  // const [itemIndexToDelete, setItemIndexToDelete] = React.useState();
  React.useEffect(() => {
    setItemData(allLaboratoryInvestigations);
  }, []);

  React.useEffect(() => {
    setAllLaboratoryInvestigations([...itemData]);
  }, [itemData]);
  // console.log(allItems);

  // React.useEffect(() => {
  //   // if (itemIndexToDelete > -1) {
  //   //   // only splice array when item is found
  //   //   itemData.splice(itemIndexToDelete, 1);
  //   //   setItemData([...itemData]);
  //   //   setAllItems([...itemData]);
  //   // }
  //   setAllItems([...itemData]);
  //   // console.log(itemIndexToDelete);
  // }, [itemIndexToDelete]);

  const handleItemDelete = (id) => {
    const index = id - 1;

    if (index > -1) {
      // only splice array when item is found
      itemData.splice(index, 1);
      setItemData([...itemData]);
    }
  };

  const styleForItemModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    borderRadius: "12px",
    border: "none",
    boxShadow: 24,
    p: 4,
  };

  const [openItemModal, setOpenItemModal] = React.useState(false);
  const handleOpenItemModal = () => setOpenItemModal(true);
  const handleCloseItemModal = () => setOpenItemModal(false);

  const mappedItemData = allLaboratoryInvestigations?.map((item, index) => {
    return {
      itemId: index + 1,
      itemName: item.itemName,
      itemQuantity: item.itemQuantity,
      itemPrice: item.itemPrice,
      itemTotalAmount: item.itemTotalAmount,
      date: item.date,
    };
  });

  // const [
  //   laboratoryInvestigationsChargesSubTotal,
  //   setLaboratoryInvestigationsChargesSubTotal,
  // ] = useState(0);

  useEffect(() => {
    const subTotal = allLaboratoryInvestigations?.reduce(
      (accumulator, currentValue) => accumulator + currentValue.itemTotalAmount,
      0
    );
    setLaboratoryInvestigationsChargesSubTotal(subTotal);
  }, [allLaboratoryInvestigations]);

  const configForITEM = [
    {
      label: "Item No",
      render: (list) => list.itemId,
    },
    {
      label: "Date",
      render: (list) => list.date,
    },
    {
      label: "Item Name",
      render: (list) => list.itemName,
    },
    {
      label: "Quantity",
      render: (list) => list.itemQuantity,
    },
    {
      label: "Price",
      render: (list) => `₹ ${list.itemPrice}`,
    },
    {
      label: "Amount",
      render: (list) => `₹ ${list.itemTotalAmount.toFixed(2)}`,
    },
    {
      label: "Action",
      render: (list) => (
        <div className='flex gap-[10px] justify-center'>
          {/* <div className='p-[4px] h-fit w-fit border-[2px] border-[#3497F9] rounded-[12px] cursor-pointer'>
            <RiEdit2Fill className='text-[25px] text-[#3497F9]' />
          </div> */}
          <div
            onClick={() => handleItemDelete(list.itemId)}
            className='p-[4px] h-fit w-fit border-[2px] border-[#EB5757] rounded-[12px] cursor-pointer'>
            <RiDeleteBin6Fill className='text-[25px] text-[#EB5757]' />
          </div>
        </div>
      ),
    },
  ];

  const keyFnForITEM = (list) => {
    return list.itemName;
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();

    const itemFormData = {
      itemName,
      itemQuantity,
      itemPrice,
      itemTotalAmount,
      date,
    };

    setItemData([...itemData, itemFormData]);

    handleCloseItemModal();

    setItemName("");
    setItemQuanity("");
    setItemPrice("");
    setItemTotalAmount(0);
    setDate("");
  };

  const itemModalDataForm = (
    <form className='' onSubmit={handleItemSubmit}>
      <div className='grid grid-cols-2 gap-[2rem] pb-[2rem]'>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Item Name *</label>
          <input
            className='py-[10px] outline-none border-b'
            type='text'
            placeholder='Enter Item Name'
            required
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Quantity *</label>
          <input
            className='py-[10px] outline-none border-b'
            type='number'
            placeholder='Enter Quantity'
            required
            min={1}
            // value={itemQuantity}
            onChange={(e) => {
              setItemQuanity(Number(e.target.value));
              setItemTotalAmount(itemPrice * e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Item Price *</label>
          <input
            className='py-[10px] outline-none border-b'
            type='number'
            placeholder='Enter Item Price'
            required
            step='.01'
            // value={itemPrice}
            onChange={(e) => {
              setItemPrice(Number(e.target.value));
              setItemTotalAmount(e.target.value * itemQuantity);
            }}
          />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Total Amount *</label>
          <input
            className='py-[10px] outline-none border-b'
            type='text'
            placeholder='Enter Total Amount'
            disabled
            value={`₹ ${itemTotalAmount.toFixed(2)}`}
          />
        </div>
        <div className='flex flex-col gap-[6px]'>
          <label className='text-[14px]'>Date *</label>
          <input
            className='py-[10px] outline-none border-b'
            type='date'
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <button
        type='submit'
        className='bg-[#138EFF] text-white rounded-[16px] w-fit p-[10px]'>
        Submit
      </button>
    </form>
  );
  return (
    <div className='flex flex-col gap-[1rem]'>
      <div className='flex flex-row justify-between items-center border-b py-[1rem]'>
        <h2>Laboratory Investigations</h2>
        <div
          onClick={handleOpenItemModal}
          className='bg-[#138EFF] text-white w-fit px-[16px] py-[8px] rounded-[16px] cursor-pointer'>
          ADD +
        </div>
      </div>
      <Table
        data={mappedItemData}
        config={configForITEM}
        keyFn={keyFnForITEM}
      />
      <div className='flex flex-row w-full justify-end'>
        <div className='flex flex-row gap-[2rem] font-[600] px-[2rem]'>
          <h3>Sub Total:</h3>
          <h3>{`₹ ${laboratoryInvestigationsChargesSubTotal.toFixed(2)}`}</h3>
        </div>
      </div>
      {/* Modal For Item */}
      <Modal
        open={openItemModal}
        onClose={handleCloseItemModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={styleForItemModal}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            <h1 className='headingBottomUnderline w-fit pb-[10px]'>
              Add Item For Billing
            </h1>
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {itemModalDataForm}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
