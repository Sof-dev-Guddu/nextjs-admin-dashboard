import axios, { AxiosRequestConfig } from 'axios';
import { formatAxiosError } from './formatAxiosError';
const api = axios.create({
  timeout: 3000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// const getAuthHeader = ()=>{
//     const token= sessionStorage.getItem("jwt")
//     return token ? {Authorization: `Bearer ${token}`} : {}
// }

export const apiRequest = async (config: AxiosRequestConfig = {}) => {
  try {
    const response = await api({
      ...config,
      // headers:{...config.headers, ...getAuthHeader()},
    });
    return response.data;
  } catch (error) {
   return Promise.reject(formatAxiosError(error))// ✅ Rethrow so outer catch works
  }
};

