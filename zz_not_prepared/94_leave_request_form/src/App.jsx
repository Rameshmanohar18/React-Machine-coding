import { useState } from 'react';

// ─── Constants ───────────────────────────────────────────────────
const LEAVE_TYPES = [
  'Sick Leave',
  'Casual Leave',
  'Earned Leave',
  'Maternity Leave',
  'Unpaid Leave',
];

const INITIAL_FORM = {
  leaveType: '',
  startDate: '',
  endDate: '',
  reason: '',
  file: null,
};

// ─── Validation ──────────────────────────────────────────────────
const validate = (form) => {
  const errors = {};
  if (!form.leaveType) errors.leaveType = 'Please select a leave type';
  if (!form.startDate) errors.startDate = 'Start date is required';
  if (!form.endDate) errors.endDate = 'End date is required';
  if (form.startDate && form.endDate && form.endDate < form.startDate)
    errors.endDate = 'End date must be after start date';

  if (!form.reason.trim()) errors.reason = 'Please provide a reason';
  return errors;
};

// ─── Reusable Field Wrapper ───────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div>
    <label>{label}</label>
    <br />
    {children}
    {error && <p style={{ color: 'red', margin: '2px 0' }}>{error}</p>}
    <br />
  </div>
);

// ─── Success Summary ─────────────────────────────────────────────
const SuccessView = ({ form, onReset }) => (
  <div>
    <h2>✅ Leave Request Submitted</h2>
    <p>
      <strong>Type:</strong> {form.leaveType}
    </p>
    <p>
      <strong>From:</strong> {form.startDate} → {form.endDate}
    </p>
    <p>
      <strong>Reason:</strong> {form.reason}
    </p>
    {form.file && (
      <p>
        <strong>Attachment:</strong> {form.file.name}
      </p>
    )}
    <br />
    <button onClick={onReset}>Submit Another</button>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────
const App = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // single change handler for all text/select fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) return setErrors(errs);
    console.log(form);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) return <SuccessView form={form} onReset={handleReset} />;

  return (
    <div>
      <h2>Leave Request Form</h2>

      <form onSubmit={handleSubmit}>
        <Field label='Leave Type' error={errors.leaveType}>
          <select
            name='leaveType'
            value={form.leaveType}
            onChange={handleChange}
          >
            <option value=''>-- Select --</option>
            {LEAVE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label='Start Date' error={errors.startDate}>
          <input
            type='date'
            name='startDate'
            value={form.startDate}
            onChange={handleChange}
          />
        </Field>
        <Field label='End Date' error={errors.endDate}>
          <input
            type='date'
            name='endDate'
            value={form.endDate}
            onChange={handleChange}
          />
        </Field>
        <Field label='Reason / Additional Info' error={errors.reason}>
          <textarea
            name='reason'
            rows={4}
            cols={40}
            value={form.reason}
            placeholder='Describe the reason for your leave...'
            onChange={handleChange}
          />
        </Field>
        <Field label='Attachment (optional)'>
          <input
            type='file'
            name='file'
            accept='.pdf,.jpg,.png,.doc,.docx'
            onChange={handleChange}
          />
          {form.file && <p>Selected: {form.file.name}</p>}
        </Field>
        <button type='submit'>Submit</button>
        &nbsp;
        <button type='button' onClick={handleReset}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default App;
