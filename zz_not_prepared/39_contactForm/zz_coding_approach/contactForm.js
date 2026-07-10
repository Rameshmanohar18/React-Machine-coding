// ============================================
// COMPONENT STRUCTURE
// ============================================

// App.jsx → form component (uncontrolled)
// submitForm.js → separate file for submission logic

// ============================================
// STATE MANAGEMENT
// ============================================

// NO STATE NEEDED
// → Uncontrolled form (no useState)
// → Native HTML form handles input values
// → FormData API extracts values on submit

// ============================================
// APP.JSX - FORM STRUCTURE
// ============================================

// Form attributes:
// → onSubmit={submitForm} - custom submit handler
// → action='URL' - API endpoint
// → method='post' - HTTP method

// Field pattern (repeated for each input):
// → label with htmlFor='input-id'
// → input with id='input-id' and name='fieldname'
// → name attribute is key for FormData extraction

// Fields:
// 1. Name: id='name-input', name='name', type='text'
// 2. Email: id='email-input', name='email', type='email'
// 3. Message: id='message-input', name='message', <textarea>
// 4. Submit: <button>Send</button>

// ============================================
// SUBMITFORM.JS - SUBMISSION LOGIC
// ============================================

// Constant:
// → const SUBMIT_URL - API endpoint stored for validation

// async function submitForm(event):

// STEP 1: Prevent default form behavior
// → event.preventDefault()
// → Stops page reload
// → Allows custom handling

// STEP 2: Get form element
// → const form = event.target
// → Reference to form DOM element

// STEP 3: Validation checks (inside try block)
// → if (form.action !== SUBMIT_URL) - verify action attribute
// → if (form.method.toLowerCase() !== 'post') - verify method
// → Alert user and return if validation fails

// STEP 4: Extract form data
// → const formData = new FormData(form)
// → Creates FormData object from form
// → Automatically collects all input values by name attribute

// STEP 5: Send API request
// → await fetch(SUBMIT_URL, { config })
// → method: 'POST'
// → headers: { 'Content-Type': 'application/json' }
// → body: JSON.stringify({ object })

// STEP 6: Build request body
// → formData.get('name') - extracts value by name attribute
// → formData.get('email')
// → formData.get('message')
// → Matches name attributes from inputs

// STEP 7: Handle response
// → const text = await response.text()
// → Extract response message
// → alert(text) - show to user

// STEP 8: Error handling (catch block)
// → catch (_) - ignore error details
// → alert('Error submitting form!')
// → Generic error message

// ============================================
// KEY CONCEPTS
// ============================================

// Uncontrolled form → No React state, DOM manages values
// event.preventDefault() → Stop default form submission/page reload
// FormData API → Extract form values automatically by name attribute
// formData.get('name') → Get value by input's name attribute
// JSON.stringify() → Convert JS object to JSON string
// form.action → Gets action attribute from form element
// form.method → Gets method attribute from form element
// await response.text() → Extract text response from server
// htmlFor → React attribute (equals 'for' in HTML)
// name attribute → Key for FormData extraction, must match formData.get()
// Content-Type header → Tells server we're sending JSON
// HTTP POST → Method for sending data to server