import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "./contactsReducer";
import { useNavigate } from "react-router-dom";
import './App.css'

function AddPatient() {
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    mobile: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContact(data));
    setData({
      name: "",
      age: "",
      gender: "",
      disease: "",
      mobile: "",
      address: "",
    });

    navigate("/list"); // navigate after adding
  };

  return (
    <>
      <h2 className="head">PATIENT REGISTRATION FORM</h2>
      <div className="card-container">
        <div className="form-card">
          <h2>Add Patient</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={data.age}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="disease"
              placeholder="Disease / Problem"
              value={data.disease}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={data.mobile}
              onChange={handleChange}
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={data.address}
              onChange={handleChange}
              required
            />

            <button type="submit">Register Patient</button>
          </form>

          {/* ✅ Show Patient List */}
          <button className="secondary-btn" onClick={() => navigate("/list")}>
            Show Patient List
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPatient;
