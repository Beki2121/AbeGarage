// Email validation
export function validateEmail(email) {
  if (!email) return "Email is required";
  const regex = /^\S+@\S+\.\S+$/;
  if (!regex.test(email)) return "Invalid email format";
  return "";
}

// Password validation
export function validatePassword(password, minLength = 6) {
  if (!password || password.length < minLength) {
    return `Password must be at least ${minLength} characters long`;
  }
  return "";
}

// Required field validation
export function validateRequired(value, fieldName = "This field") {
  if (!value) return `${fieldName} is required`;
  return "";
}
