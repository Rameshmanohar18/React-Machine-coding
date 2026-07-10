import React, { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  email: '',
  employeeId: '',
  joiningDate: '',
};

const validateField = (field, value) => {
  switch (field) {
    case 'name':
      if (!value.trim() || !/^[A-Za-z ]{4,}$/.test(value)) {
        return 'Name must be at least 4 characters long and only contain letters and spaces';
      }
      return '';

    case 'email':
      if (!value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Email must be a valid email address';
      }
      return '';

    case 'employeeId':
      if (!value.trim() || !/^\d{6}$/.test(value)) {
        return 'Employee ID must be exactly 6 digits';
      }
      return '';

    case 'joiningDate':
      if (!value) {
        return 'Joining Date cannot be in the future';
      }

      if (value > '2024-12-31') {
        return 'Joining Date cannot be in the future';
      }

      return '';

    default:
      return '';
  }
};

function EmployeeValidationForm() {
  const [form, setForm] = useState(INITIAL_FORM);

  const errors = {
    name: validateField('name', form.name),
    email: validateField('email', form.email),
    employeeId: validateField('employeeId', form.employeeId),
    joiningDate: validateField('joiningDate', form.joiningDate),
  };

  const isFormValid = Object.values(errors).every((error) => error === '');

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: String(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    setForm(INITIAL_FORM);
  };

  return (
    <form
      className='layout-column align-items-center mt-20'
      onSubmit={handleSubmit}
    >
      <div
        className='layout-column align-items-start mb-10 w-50'
        data-testid='input-name'
      >
        <input
          className='w-100'
          type='text'
          placeholder='Name'
          value={form.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          data-testid='input-name-test'
        />
        {errors.name && <p className='error mt-2'>{errors.name}</p>}
      </div>

      <div
        className='layout-column align-items-start mb-10 w-50'
        data-testid='input-email'
      >
        <input
          className='w-100'
          type='text'
          placeholder='Email'
          value={form.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        {errors.email && <p className='error mt-2'>{errors.email}</p>}
      </div>

      <div
        className='layout-column align-items-start mb-10 w-50'
        data-testid='input-employee-id'
      >
        <input
          className='w-100'
          type='text'
          placeholder='Employee ID'
          value={form.employeeId}
          onChange={(e) => handleFieldChange('employeeId', e.target.value)}
        />
        {errors.employeeId && <p className='error mt-2'>{errors.employeeId}</p>}
      </div>

      <div
        className='layout-column align-items-start mb-10 w-50'
        data-testid='input-joining-date'
      >
        <input
          className='w-100'
          type='date'
          value={form.joiningDate}
          onChange={(e) => handleFieldChange('joiningDate', e.target.value)}
        />
        {errors.joiningDate && (
          <p className='error mt-2'>{errors.joiningDate}</p>
        )}
      </div>

      <button data-testid='submit-btn' type='submit' disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export default EmployeeValidationForm;
