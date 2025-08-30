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
      return response.data.aiResponse;
    }
    return false;
  } catch (error) {
    alert(error);
  }
  return;
}
