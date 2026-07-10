# Email Templates Generator (React + Conditional Components + Forms)

---

## App.jsx

```jsx
<EmailTemplates />
```

---

## Step 1: EmailTemplates.jsx

### useState Declarations

```js
const [template, setTemplate] = useState('jobSelection');
const [employeeName, setEmployeeName] = useState('');
const [companyName, setCompanyName] = useState('');
const [effectiveDate, setEffectiveDate] = useState('');
const [lastDate, setLastDate] = useState('');
```

---

## Step 2: Input Change Handler

```js
const handleTemplateChange = (setter) => (e) => setter(e.target.value);
```

---

## Step 3: JSX Return Structure

```jsx
<form>
  <InputField
    label="Template"
    type="select"
    value={template}
    onChange={handleTemplateChange(setTemplate)}
    options={[
      { value: 'jobSelection', label: 'Job Selection' },
      { value: 'jobResignation', label: 'Job Resignation' }
    ]}
  />

  <InputField
    label="Employee Name"
    type="text"
    value={employeeName}
    onChange={handleTemplateChange(setEmployeeName)}
  />

  <InputField
    label="Company Name"
    type="text"
    value={companyName}
    onChange={handleTemplateChange(setCompanyName)}
  />

  <InputField
    label="Effective Date"
    type="date"
    value={effectiveDate}
    onChange={handleTemplateChange(setEffectiveDate)}
  />

  <InputField
    label="Last Date"
    type="date"
    value={lastDate}
    onChange={handleTemplateChange(setLastDate)}
  />
</form>

<div>{getMessage()}</div>
```

---

## Step 4: getMessage Function

```js
const getMessage = () => {
  if (template === 'jobResignation') {
    return (
      <ResignationTemplate
        companyName={companyName}
        effectiveDate={effectiveDate}
        lastDate={lastDate}
        employeeName={employeeName}
      />
    );
  } else if (template === 'jobSelection') {
    return (
      <JobSelectionTemplate
        companyName={companyName}
        employeeName={employeeName}
      />
    );
  }
  return null;
};
```

---

## Step 5: InputField Component

```js
const InputField = ({ label, type, value, onChange, options = [] }) => (
  <div>
    <label>{label}</label>
    {type === 'select' ? (
      <select value={value} onChange={onChange}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    ) : (
      <input type={type} value={value} onChange={onChange} />
    )}
  </div>
);
```

---

## Step 6: TemplatesComponent.jsx

```js
export const ResignationTemplate = ({ employeeName, companyName, effectiveDate, lastDate }) => (
  <div>
    <p>Dear {companyName},</p>
    <p>I, {employeeName}, am resigning from my role effective from {effectiveDate}. My last working day will be {lastDate}.</p>
    <p>Thank you for the opportunity.</p>
  </div>
);

export const JobSelectionTemplate = ({ employeeName, companyName }) => (
  <div>
    <p>Dear {employeeName},</p>
    <p>Congratulations! You have been selected for a role at {companyName}.</p>
    <p>Welcome aboard!</p>
  </div>
);
```

---

## Summary

| Component                                     | Purpose                                                 |
| --------------------------------------------- | ------------------------------------------------------- |
| `EmailTemplates`                              | Manages form input and message generation               |
| `InputField`                                  | Reusable form field with conditional select/input logic |
| `ResignationTemplate`, `JobSelectionTemplate` | Dynamically rendered templates based on user selection  |

