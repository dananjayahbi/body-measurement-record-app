"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "antd";
import MeasurementForm from "./MeasurementForm";
import '@ant-design/v5-patch-for-react-19';

export default function AddRecordModal({ refreshData }: { refreshData: () => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // ✅ For redirecting user

  const handleSuccess = () => {
    setOpen(false);  // ✅ Close modal
    refreshData();   // ✅ Refresh the records
    router.push("/past-records"); // ✅ Redirect user
    // window.location.reload();
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Add New Record</Button> <br /> <br />
      <Modal 
        title="Add New Measurement Record"
        open={open} 
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <MeasurementForm closeModal={handleSuccess} />
      </Modal>
    </>
  );
}
