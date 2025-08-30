import axios from "axios";

export const SignUpHandler = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_URL}/api/v1/auth/signup`,
      {
        email,
        password,
      },
    );
    if (response.data.msg === "sign up successful") {
      return response.data.msg;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 400 ||
        error.response?.status === 409 ||
        error.response?.status === 500
      ) {
        return error.response.data.error;
      }
    }
    return false;
  }
};

export const SignInHandler = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_URL}/api/v1/auth/signin`,
      {
        email,
        password,
      },
    );
    if (response.data.msg === "sign in successful") {
      localStorage.setItem("Authorization", response.data.token);
      return response.data.msg;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response?.status === 400 ||
        error.response?.status === 401 ||
        error.response?.status === 500
      ) {
        return error.response.data.error;
      }
      return false;
    }
    return false;
  }
};
