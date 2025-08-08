import axios from "axios";

const host = 'http://localhost:3001';

export async function fetchAllLinks(){
  try {
    const allLinks = await axios.get(`${host}`);
    const data = allLinks?.data;
    console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
};

export async function createLink(longURL: string){};

export async function createRedirection(shortURL: string){};