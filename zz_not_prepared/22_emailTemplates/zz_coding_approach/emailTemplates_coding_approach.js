// In App.jsx, I will be returning EmailTemplates component

// Step 1: Inside EmailTemplates.jsx component, 
// i) useState declaration
// one for template (ex: jobSelection, jobResignation are two we are using here)
// one for companyName
// one for employeeName
// one for effectiveDate
// one for lastDate

// Step 2: 
// i) handleTemplateChangeFunc which accepts setState as a param which turns obviously returns e => setterParam(e.target.value)

// Ex:
const handleTemplateChange = (setter) => (e) => setter(e.target.value);

// Step 3: Let me jump on to return jsx template
// i) I will be having form element which has all the InputFields and a div element to show our CORE LOGIC (Ex: getMessage())
// ii) Inside to form tag, I will be maintaining several InputFields 
// iii) Ex: one for Template --> type select, provide options here in array of objects format, value and onChange
// iv) one for Employee Name --> type text, value and onChange
// iv) one for Company Name --> type text, value and onChange
// iv) one for Effective Date --> type date, value and onChange
// iv) one for Last Date --> type date, value and onChange

// Step 4: Inside the getMessageFunc()
// i) I have if and elseif conditions
// Ex: if template is jobResignation --> then return ResignationTemplate component and pass the required props like (companyName, effectiveDate, lastDate, employeeName)
// Ex: elseif template is jobSelection --> then return JobSelectionTemplate component and pass the required props like (companyName, employeeName)

// Step 5: Inside InputField Component
// i) This component accepts bunch of props like (label, type, value, onChange, options)
// ii) As select is having options and rest are straight forward input fields so we are writing the logic in ternary operator way
// Ex: type === "select" ? <select> {options.map} </select>
// or <input type={type} value={value} onChange={onChange}/>

// Step 6: Inside TemplatesComponent.jsx component
// i) Maintaining logic for Two components (ResignationTemplate, JobSelectionTemplate)
// ii) Simply accept the props and write your own paragraphs with <p> tags