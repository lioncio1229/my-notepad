import axios from "axios";
import { baseUrl } from "../config";

export default axios.create({
  baseURL: baseUrl,
});

export const axiosSecured = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
