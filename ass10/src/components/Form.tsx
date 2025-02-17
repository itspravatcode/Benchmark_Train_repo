import React, { useState } from "react";
import "./style.css";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  skills: string;
  email: string;
  phone: string;
  address: string;
};

function Form() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    skills: "",
    email: "",
    phone: "",
    address: "",
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      skills: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {submittedData ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Submitted Details</h2>
          <div>
            <strong>First Name:</strong> {submittedData.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {submittedData.lastName}
          </div>
          <div>
            <strong>Age:</strong> {submittedData.age}
          </div>
          <div>
            <strong>Gender:</strong> {submittedData.gender}
          </div>
          <div>
            <strong>Skills:</strong> {submittedData.skills}
          </div>
          <div>
            <strong>Email:</strong> {submittedData.email}
          </div>
          <div>
            <strong>Phone:</strong> {submittedData.phone}
          </div>
          <div>
            <strong>Address:</strong> {submittedData.address}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-4">User Form</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>
          <select
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Skill</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
          </select>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
