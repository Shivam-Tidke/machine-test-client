import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

export default function StudentList() {

  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const totalPages = Math.ceil(total / limit);

  const fetchStudents = async () => {
    const res = await api.get(`/students?page=${page}&limit=${limit}`);

    setStudents(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const deleteStudent = async id => {
    const confirm = await Swal.fire({
      title: "Delete student?",
      showCancelButton: true,
      confirmButtonText: "Delete"
    });

    if (confirm.isConfirmed) {
      await api.delete(`/students/${id}`);
      Swal.fire("Deleted!", "", "success");
      fetchStudents();
    }
  };

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="container-fluid px-0">

      <div className="table-responsive">
        <table className="table table-bordered w-100 mb-0">

          <thead className="table-light">
            <tr>
                <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th style={{ width: "120px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No students found
                </td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s.id}>
                    <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.age}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => deleteStudent(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">

        <div>
          Showing <b>{start}</b> to <b>{end}</b> of <b>{total}</b> entries
        </div>

        <div className="btn-group">

          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            First
          </button>

          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>

          <button className="btn btn-success disabled">
            {page}
          </button>

          <button
            className="btn btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>

          <button
            className="btn btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            Last
          </button>

        </div>

      </div>
    </div>
  );
}