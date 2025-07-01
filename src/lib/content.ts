import axios from "axios";

export const AddContent = async (
  title: string,
  description: string,
  url: string,
  type: string,
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_URL}/content`,
      {
        title,
        description,
        url,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );
    if (response.data.msg === "content added") {
      return response.data.content;
    }
    return false;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return false;
    }
    return false;
  }
};

export const GetAllContent = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HTTP_URL}/content/all`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );
    if (response.data.msg === "all content fetched") {
      return response.data.contents;
    }
    return false;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      return false;
    }
    return false;
  }
};

export const DeleteContentHandler = async (contentId: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_HTTP_URL}/content/${contentId}`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      },
    );
    if (response.data.msg === "content removed") {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
