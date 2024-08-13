// Function to verify an email's authenticity.
export function isValidEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

// Function to verify an username's authenticity.
export function isValidUsername(username: string) {
  const usernamePattern = /^[a-zA-Z0-9_-]+$/;

  return usernamePattern.test(username);
}
