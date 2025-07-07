function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateForm({ name, email }) {
  if (!name || !email) return false
  return !(!isValidEmail(email));
}

module.exports = { validateForm, isValidEmail }