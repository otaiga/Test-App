import axios from "axios";

// Base url for api endpoint
const BASE_URL = "https://reqres.in/api/";

// Define types for use with API
export type ResourceType = "users" | "colors";

export type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type ColourData = {
  id: number;
  name: string;
  color: string;
  pantone_value: string;
  year: number;
};

// Call the fake API to obtain data with resource required
export const getApiData = async (
  resource: ResourceType,
  signal?: AbortSignal
): Promise<{ data: UserData[] | ColourData[] }> => {
  const res = await axios.get(`${BASE_URL}${resource}?page=1&per_page=5'`, {
    signal,
  });
  if (res.status !== 200) {
    throw Error(`Issue obtaining ${resource}`);
  }
  return res.data;
};
