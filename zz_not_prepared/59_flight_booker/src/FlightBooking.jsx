import { useState } from 'react';

export default function FlightBooking() {
  const [flightType, setFlightType] = useState('one-way');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const validationErrors = [];
    const today = getTodayDate();

    // Check if departure date is provided
    if (!departureDate) {
      validationErrors.push('Departure date is required.');
    } else if (departureDate < today) {
      validationErrors.push('Departure date cannot be in the past.');
    }

    // Check return date for round-trip flights
    if (flightType === 'round-trip') {
      if (!returnDate) {
        validationErrors.push(
          'Return date is required for round-trip flights.'
        );
      } else if (returnDate < today) {
        validationErrors.push('Return date cannot be in the past.');
      } else if (departureDate && returnDate < departureDate) {
        validationErrors.push('Return date cannot be before departure date.');
      }
    }

    return validationErrors;
  };

  const handleSubmit = () => {
    setSuccessMessage('');
    setErrors([]);

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Success - display booking confirmation
    if (flightType === 'one-way') {
      setSuccessMessage(`You have booked a one-way flight on ${departureDate}`);
    } else {
      setSuccessMessage(
        `You have booked a round-trip flight, departing on ${departureDate} and returning on ${returnDate}`
      );
    }
  };

  const handleFlightTypeChange = (e) => {
    setFlightType(e.target.value);
    setSuccessMessage('');
    setErrors([]);
    // Clear return date when switching to one-way
    if (e.target.value === 'one-way') {
      setReturnDate('');
    }
  };

  const handleDateChange = (field, value) => {
    if (field === 'departure') {
      setDepartureDate(value);
    } else {
      setReturnDate(value);
    }
    setSuccessMessage('');
    setErrors([]);
  };

  return (
    <div>
      <h2>Flight Booking</h2>

      <div>
        {/* Flight Type Selection */}
        <div>
          <label>
            <input
              type='radio'
              value='one-way'
              checked={flightType === 'one-way'}
              onChange={handleFlightTypeChange}
            />
            One-way flight
          </label>
        </div>

        <div>
          <label>
            <input
              type='radio'
              value='round-trip'
              checked={flightType === 'round-trip'}
              onChange={handleFlightTypeChange}
            />
            Round-trip flight
          </label>
        </div>

        {/* Departure Date */}
        <div>
          <label htmlFor='departure-date'>Departure Date:</label>
          <input
            id='departure-date'
            type='date'
            value={departureDate}
            onChange={(e) => handleDateChange('departure', e.target.value)}
          />
        </div>

        {/* Return Date - Only shown for round-trip */}
        {flightType === 'round-trip' && (
          <div>
            <label htmlFor='return-date'>Return Date:</label>
            <input
              id='return-date'
              type='date'
              value={returnDate}
              onChange={(e) => handleDateChange('return', e.target.value)}
            />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button onClick={handleSubmit}>Book Flight</button>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div>
          <h3>Please fix the following errors:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div>
          <h3>Booking Confirmed!</h3>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}
