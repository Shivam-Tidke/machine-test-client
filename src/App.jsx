import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const refresh = () => setRefreshKey(old => old + 1);

  const openAddModal = () => {
    setEditData(null);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Members</h3>
        <button className="btn btn-success" onClick={openAddModal}>
          Add New Member
        </button>
      </div>

      {/* LIST */}
      <StudentList
        key={refreshKey}
        setEditData={(data) => {
          setEditData(data);
          setShowModal(true);
        }}
      />

      {/* MODAL */}
      {showModal && (
        <StudentForm
          refresh={refresh}
          editData={editData}
          closeModal={() => setShowModal(false)}
        />
      )}

    </div>
  );
}