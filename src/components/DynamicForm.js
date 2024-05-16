/** @format */

import React, { useState } from "react";
import Field from "./Field";
import "./DynamicForm.css";

const DynamicForm = ({ formFields, setFormData }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    // Clear error message if field is filled out
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    let valid = true;

    formFields.forEach((field) => {
      const value = values[field.label] || "";
      if (field.validation) {
        if (field.validation.required && !value) {
          newErrors[field.label] = "This field is required.";
          valid = false;
        }
        if (
          field.validation.minLength &&
          value.length < field.validation.minLength
        ) {
          newErrors[
            field.label
          ] = `Minimum length is ${field.validation.minLength} characters.`;
          valid = false;
        }
        if (
          field.validation.maxLength &&
          value.length > field.validation.maxLength
        ) {
          newErrors[
            field.label
          ] = `Maximum length is ${field.validation.maxLength} characters.`;
          valid = false;
        }
        if (
          field.validation.pattern &&
          !new RegExp(field.validation.pattern).test(value)
        ) {
          newErrors[field.label] = "Invalid format.";
          valid = false;
        }
      }
    });

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch("http://localhost:8000/student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          setFormData(values);
          alert("Form submitted successfully!");
        } else {
          alert("Error submitting form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    }
  };

  return (
    <form className="dynamic-form" onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      {formFields.map((field, index) => (
        <div key={index} className="field-container">
          <Field
            field={field}
            value={values[field.label] || ""}
            onChange={handleChange}
          />
          {errors[field.label] && (
            <span className="error">{errors[field.label]}</span>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
