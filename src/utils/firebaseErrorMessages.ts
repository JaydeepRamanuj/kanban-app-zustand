export const firebaseErrorMessages = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Please provide a valid email.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/network-request-failed":
      return "Network error. Please try again.";
    default:
      return "Something went wrong. Please try again later.";
  }
};
