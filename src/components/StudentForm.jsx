import { useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

export default function StudentForm({ refresh, closeModal }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    id:""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/students", form);

      Swal.fire({
        icon: "success",
        title: "Student Added!",
        timer: 1500,
        showConfirmButton: false
      });

      refresh();
      closeModal();
      setForm({  id: "", name: "", email: "", age: ""});

    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.error || "Something went wrong",
        "error"
      );
    }

    setLoading(false);
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000066" }}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Add New Member</h5>
            <button className="btn-close" onClick={closeModal}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                className="form-control mb-2"
                type="number"
                min="1"
                name="id"
                placeholder="Parent Id"
                value={form.id}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="name"
                placeholder="Member Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                type="email"
                name="email"
                placeholder="Member Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                type="number"
                min="1"
                name="age"
                placeholder="Member Age"
                value={form.age}
                onChange={handleChange}
                required
              />

            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Member"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}