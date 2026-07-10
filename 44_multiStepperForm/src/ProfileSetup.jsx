import React, { useState } from 'react';

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    interests: [],
    email: '',
    password: '',
  });

  const steps = [
    { label: 'Personal Details', icon: '👤' },
    { label: 'Interests', icon: '🔗' },
    { label: 'Account', icon: '🔒' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterest = (e, interest) => {
    const interests = e.target.checked
      ? [...formData.interests, interest]
      : formData.interests.filter((i) => i !== interest);
    setFormData({ ...formData, interests });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </>
        );
      case 1:
        return (
          <>
            {['Technology', 'Sports', 'Music', 'Travel'].map((interest) => (
              <label key={interest}>
                <input
                  type='checkbox'
                  checked={formData.interests.includes(interest)}
                  onChange={(e) => handleInterest(e, interest)}
                />
                {interest}
              </label>
            ))}
          </>
        );
      case 2:
        return (
          <>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='container'>
      <h1>Profile Setup</h1>

      {/* Stepper */}
      <div className='stepper'>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className='step'>
              <div className={`circle ${currentStep >= index ? 'active' : ''}`}>
                {step.icon}
              </div>
              <span>{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`line ${currentStep > index ? 'active' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form */}
      <div className='form'>{renderStep()}</div>

      {/* Buttons */}
      <div className='buttons'>
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          PREVIOUS
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
