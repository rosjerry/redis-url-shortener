import axios from "axios";

const host = 'http://localhost:3001';

export async function fetchAllLinks(): Promise<Record<string, string>>{
  try {
    const allLinks = await axios.get(`${host}`);
    const data = allLinks?.data;
    console.log(data);
    return data
  } catch (error) {
    console.log("error happened: ", error)
    return {}
  }
};

export async function createLink(longURL: string){};

export async function createRedirection(shortURL: string){};