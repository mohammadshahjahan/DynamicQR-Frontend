import { Button, Modal } from "@mui/material";
import React from "react";
import EditUrl from "./EditUrl";
import EditSMS from "./EditSMS";
import EditEmail from "./EditEmail";

interface EditQRProps {
  details: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  qrID: number;
}

const EditQR: React.FC<EditQRProps> = ({ details, open, setOpen, qrID }) => {
  console.log(details);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <>
          {details?.qr_type === "url" ? (
            <EditUrl qr_id={qrID} />
          ) : details?.qr_type === "sms" ? (
            <EditSMS qr_id={qrID} />
          ) : (
            <EditEmail qr_id={qrID} />
          )}
        </>
      </Modal>
    </div>
  );
};

export default EditQR;
