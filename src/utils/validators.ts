export type FieldErrors = Record<string, string>;

export function validateLogin(values: { username: string; password: string }) {
  const errors: FieldErrors = {};
  if (!values.username.trim()) errors.username = "Username is required";
  if (!values.password) errors.password = "Password is required";
  return errors;   // yaha se dono errors return ho jayenge during login
}

export function validateSignup(values: {
  username: string;
  email: string;
  password: string;
  confirm: string;
}) {
  const errors: FieldErrors = {};
  if (!values.username.trim() || values.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (values.password !== values.confirm) {
    errors.confirm = "Passwords do not match";
  }
  return errors;   // errors for signup
}

export function validateContact(values: {
  name: string;
  email: string;
  message: string;
}) {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {    // we used regular expression (regex) to validate an email format.
    errors.email = "Enter a valid email";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }
  return errors;
}
