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

export const successfullSignIn = {
  data: {
    success: true,
    token: "sldkjfno3wi4ernoifnersdmnfow3eih",
  },
};

export const unsuccessfullSignIn = {
  status: 400,
  response: {
    data: {
      success: false,
      error: "Invalid credentials",
    },
  },
};

export const unverifiedAccount = {
  status: 400,
  response: {
    data: {
      success: false,
      error: "Please follow the link in your email to verify your account",
    },
  },
};
