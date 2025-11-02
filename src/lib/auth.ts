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
      return error.response?.data.error ?? "Something went wrong";
    }
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
      return error.response?.data.error ?? "Something went wrong";
    }
  }
};
