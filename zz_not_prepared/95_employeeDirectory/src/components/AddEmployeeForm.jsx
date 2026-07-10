import { useState } from 'react';

// ─────────────────────────────────────────────
// Q3 — AddEmployeeForm: Add a new employee
// ─────────────────────────────────────────────
const EMPTY_FORM = { name: '', email: '', phone: '', company: '', city: '' };
const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function AddEmployeeForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setSubmitting(true);
    try {
      // POST to API — JSONPlaceholder returns a fake created resource
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: { name: form.company },
          address: { city: form.city },
        }),
      });

      if (!res.ok) throw new Error('Failed to add employee');
      const newEmployee = await res.json();

      // Merge our form data since JSONPlaceholder strips nested fields
      const merged = {
        ...newEmployee,
        id: Date.now(), // local unique id
        phone: form.phone,
        company: { name: form.company },
        address: { city: form.city },
      };

      onAdd(merged);
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', placeholder: 'Full Name', required: true },
    { name: 'email', placeholder: 'Email Address', required: true },
    { name: 'phone', placeholder: 'Phone Number' },
    { name: 'company', placeholder: 'Company Name' },
    { name: 'city', placeholder: 'City' },
  ];

  return (
    <form className='add-form' onSubmit={handleSubmit} noValidate>
      <h2 className='form-title'>Add Employee</h2>
      {errors.api && <p className='error-banner'>{errors.api}</p>}
      {success && (
        <p className='success-banner'>✓ Employee added successfully!</p>
      )}

      <div className='form-grid'>
        {fields.map(({ name, placeholder, required }) => (
          <div key={name} className='form-group'>
            <input
              type={name === 'email' ? 'email' : 'text'}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={`${placeholder}${required ? ' *' : ''}`}
              className={`form-input ${errors[name] ? 'input-error' : ''}`}
              disabled={submitting}
            />
            {errors[name] && (
              <span className='field-error'>{errors[name]}</span>
            )}
          </div>
        ))}
      </div>

      <button type='submit' className='btn-primary' disabled={submitting}>
        {submitting ? 'Adding…' : '+ Add Employee'}
      </button>
    </form>
  );
}
