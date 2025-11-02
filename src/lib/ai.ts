import axios from "axios";

export async function AIQueryResponse(query: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_URL}/api/v1/ai`,
      {
        query,
      },
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );
    if (response.data.msg === "ai response fetched") {
      return response.data;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data ?? "Something went wrong";
    }
  }
  return;
}
