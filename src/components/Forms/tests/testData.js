export const accountExists = {
  status: 400,
  response: {
    data: {
      success: false,
      error: "An account with email johnsmith@gmail.com already exists",
    },
  },
};

export const successfullSubmit = {
  success: true,
  message:
    "An email has been sent to your inbox. Click the link the the email to verify your account",
};
