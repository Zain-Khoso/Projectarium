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

// Function to verify a url's authenticity.
export function isValidURL(url: string) {
  // Regular expression to check if the URL contains at least a domain name with a TLD
  const domainRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return domainRegex.test(url);
}
