import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./contactsReducer";
import { useNavigate } from "react-router-dom";
// import "./ListPatients.css";

function ListPatients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts, loading } = useSelector((state) => state.contactsState);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="table-container">
      <h2>Patients List</h2>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Disease</th>
            <th>Mobile</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            Object.entries(contacts).map(([id, contact]) => (
              <tr key={id}>
                <td>{contact.name}</td>
                <td>{contact.age}</td>
                <td>{contact.gender}</td>
                <td>{contact.disease}</td>
                <td>{contact.mobile}</td>
                <td>{contact.address}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ✅ Back Button */}
      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>
    </div>
  );
}

export default ListPatients;
