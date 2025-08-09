import axios from "axios";

const host = "http://localhost:3001";

export async function fetchAllLinks(): Promise<Record<string, string>> {
  try {
    const allLinks = await axios.get(`${host}`);
    const data = allLinks?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("error happened: ", error);
    return {};
  }
}

export async function createLink(longURL: string) {
  try {
    const newLink = await axios.post(`${host}/create`, {
      longURL,
    });
    const data = newLink?.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("error during link creation: ", error);
    return {};
  }
}
