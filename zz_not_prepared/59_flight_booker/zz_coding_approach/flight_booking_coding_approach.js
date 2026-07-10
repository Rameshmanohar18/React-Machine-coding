// Inside FlightBooking.jsx, I will be maintaining all the logic

// Step 1:

// useState declaration
// i) flightType ---> 'one-way' (default) ---> holds flight type selection
// ii) departureDate ---> empty string ('') ---> holds departure date value
// iii) returnDate ---> empty string ('') ---> holds return date value
// iv) successMessage ---> empty string ('') ---> holds booking confirmation message
// v) errors ---> empty array ([]) ---> holds validation error messages

// Step 2:

// I'll directly jump on the return JSX template

// i) main div container
// ii) Inside main div we have h2 title, form section, error section, and success section
// iii) Form section contains:
//     - Flight type radio buttons (one-way/round-trip)
//     - Departure date input
//     - Conditional return date input (only for round-trip)
//     - Submit button

// JSX Structure:
// <div>
//   <h2>Flight Booking</h2>
//   <div> // Form container
//     // Radio buttons for flight type
//     // Date inputs
//     // Submit button
//   </div>
//   // Conditional error messages
//   // Conditional success message
// </div>

// CORE LOGIC --> handleSubmit, handleFlightTypeChange, handleDateChange
// i) handleSubmit handles form validation and booking confirmation
// ii) handleFlightTypeChange handles flight type selection changes
// iii) handleDateChange handles date input changes

// for handleSubmit -->
// i) clear previous messages: setSuccessMessage('') and setErrors([])
// ii) call validateForm() to get validation errors
// iii) if errors exist: setErrors(validationErrors) and return early
// iv) if no errors: generate success message based on flight type
// v) for one-way: "You have booked a one-way flight on YYYY-MM-DD"
// vi) for round-trip: "You have booked a round-trip flight, departing on YYYY-MM-DD and returning on YYYY-MM-DD"

// for handleFlightTypeChange -->
// i) extract value from e.target.value
// ii) setFlightType(value) to update flight type state
// iii) clear messages: setSuccessMessage('') and setErrors([])
// iv) if switching to one-way: setReturnDate('') to clear return date

// for handleDateChange -->
// i) accept field parameter ('departure' or 'return') and value
// ii) if field is 'departure': setDepartureDate(value)
// iii) if field is 'return': setReturnDate(value)
// iv) clear messages: setSuccessMessage('') and setErrors([])

// HELPER FUNCTIONS:

// getTodayDate function
const getTodayDate = () => {
  // i) create new Date object for current date
  // ii) convert to ISO string format
  // iii) split by 'T' and take first part to get YYYY-MM-DD format
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// validateForm function
const validateForm = () => {
  // i) initialize empty validationErrors array
  // ii) get today's date using getTodayDate helper
  // iii) validate departure date:
  //     - check if departureDate is empty
  //     - check if departureDate is in the past
  // iv) validate return date (only for round-trip):
  //     - check if returnDate is empty
  //     - check if returnDate is in the past
  //     - check if returnDate is before departureDate
  // v) return validationErrors array
  const validationErrors = [];
  const today = getTodayDate();

  // Departure date validation
  if (!departureDate) {
    validationErrors.push('Departure date is required.');
  } else if (departureDate < today) {
    validationErrors.push('Departure date cannot be in the past.');
  }

  // Return date validation for round-trip
  if (flightType === 'round-trip') {
    if (!returnDate) {
      validationErrors.push('Return date is required for round-trip flights.');
    } else if (returnDate < today) {
      validationErrors.push('Return date cannot be in the past.');
    } else if (departureDate && returnDate < departureDate) {
      validationErrors.push('Return date cannot be before departure date.');
    }
  }

  return validationErrors;
};

// CONDITIONAL RENDERING LOGIC:
// i) Return date input only shows when flightType === 'round-trip'
// ii) Error messages only show when errors.length > 0
// iii) Success message only shows when successMessage is not empty

// VALIDATION RULES:
// i) Departure date is required for all flight types
// ii) Departure date cannot be in the past
// iii) Return date is required only for round-trip flights
// iv) Return date cannot be in the past
// v) Return date cannot be before departure date

// STATE MANAGEMENT FLOW:
// i) User selects flight type -> handleFlightTypeChange -> clear messages and optionally clear return date
// ii) User enters dates -> handleDateChange -> update respective date state and clear messages
// iii) User clicks submit -> handleSubmit -> validate form -> show errors or success message

// ERROR HANDLING:
// i) Collect all validation errors in an array
// ii) Display all errors at once in a list format
// iii) Clear errors when user makes any changes

// SUCCESS HANDLING:
// i) Generate different messages for one-way vs round-trip
// ii) Include actual dates in the confirmation message
// iii) Clear success message when user makes changes
