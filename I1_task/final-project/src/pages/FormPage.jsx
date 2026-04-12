import { useState } from 'react'
import FormResponse from '../components/FormResponse'

const initialForm = {
  fullName: '',
  email: '',
  bookingDate: '',
  guests: 1,
  agreeToTerms: false
}

function FormPage() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [responseData, setResponseData] = useState(null)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function validate(values) {
    const newErrors = {}

    if (!values.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (values.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }

    if (!values.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!values.bookingDate) {
      newErrors.bookingDate = 'Booking date is required.'
    } else if (values.bookingDate < today) {
      newErrors.bookingDate = 'Past dates are not allowed.'
    }

    const guestCount = Number(values.guests)
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 10) {
      newErrors.guests = 'Guests must be between 1 and 10.'
    }

    if (!values.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the booking terms.'
    }

    return newErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setSubmitMessage('')

    if (Object.keys(validationErrors).length > 0) {
      setSubmitMessage('Please fix the errors before submitting.')
      return
    }

    setIsSubmitting(true)
    setResponseData(null)

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Submission failed.')
      }

      const data = await response.json()
      setResponseData(data)
      setSubmitMessage('Form submitted successfully.')
      setFormData(initialForm)
      setErrors({})
    } catch (error) {
      setSubmitMessage('Something went wrong while sending the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="form-page">
      <section className="form-hero">
        <div className="container">
          <h1>Booking Form</h1>
          <p>
            Fill in the form below to send your booking request. This page matches
            the same application theme and sends the data to httpbin.
          </p>
        </div>
      </section>

      <section className="form-section">
        <div className="container form-layout">
          <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="bookingDate">Booking date</label>
              <input
                id="bookingDate"
                name="bookingDate"
                type="date"
                min={today}
                value={formData.bookingDate}
                onChange={handleChange}
              />
              {errors.bookingDate && <p className="error-text">{errors.bookingDate}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
              />
              {errors.guests && <p className="error-text">{errors.guests}</p>}
            </div>

            <div className="form-group checkbox-group">
              <label htmlFor="agreeToTerms" className="checkbox-label">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span>I accept the booking terms</span>
              </label>
              {errors.agreeToTerms && (
                <p className="error-text">{errors.agreeToTerms}</p>
              )}
            </div>

            {submitMessage && <p className="status-text">{submitMessage}</p>}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Booking'}
            </button>
          </form>

          <FormResponse responseData={responseData} />
        </div>
      </section>
    </main>
  )
}

export default FormPage