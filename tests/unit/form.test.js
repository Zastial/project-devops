const { validateForm, isValidEmail } = require('../../src/validation')

describe('validateForm', () => {
  it('should return false if name is empty', () => {
    expect(validateForm({ name: '', email: 'a@b.com' })).toBe(false)
  })
  it('should return false if email is empty', () => {
    expect(validateForm({ name: 'Alice', email: '' })).toBe(false)
  })
  it('should return false if email is invalid', () => {
    expect(validateForm({ name: 'Alice', email: 'invalid' })).toBe(false)
  })
  it('should return true for valid name and email', () => {
    expect(validateForm({ name: 'Alice', email: 'alice@mail.com' })).toBe(true)
  })
})

describe('isValidEmail', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('bob@mail.com')).toBe(true)
  })
  it('should invalidate incorrect emails', () => {
    expect(isValidEmail('bobmail.com')).toBe(false)
  })
})