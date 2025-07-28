// services/crudService.ts
import { apiRequest } from '../httpClient';

interface RequestData<T = any> {
  url: string;
  data?: T;
  id?: string;
}

interface ResponseT<T = any> {
  response: T | null;
  error: string | null;
  
}

export async function getData<T>(url: string): Promise<ResponseT<T>> {
  try {
    const response = await apiRequest({ url });
    return { response, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}





export async function addData<T>({ url, data }: RequestData<T>):Promise<ResponseT<T>> {
  try {
    const response = await apiRequest({ url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data, });
    return { response, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}
  // return new Promise((resolve, reject) => {
  //   apiRequest({
  //     url,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   })
  //      .then((response: T) => (resolve({ response, error: null })))
  //   .catch((err) => (reject({ response: null, error: err })));
  // });


export async function updateData<T>({ url, data }: RequestData<T>): Promise<ResponseT<T>> {
  try {
    const response = await apiRequest({ url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data, });
    return { response, error: null };
  } catch (err: any) {
    return { response: null, error: err.message || String(err) };
  }
}
  // return new Promise((resolve, reject) => {
  //   apiRequest({
  //     url,
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   })
  //     .then((response: T) => (resolve({ response, error: null })))
  //   .catch((err) => (reject({ response: null, error: err })));
  // });


export function deleteData<T>({ url, id }: RequestData): Promise<ResponseT<T>> {
  const deleteUrl = id ? `${url}/${id}` : url;

  return new Promise((resolve, reject) => {
    apiRequest({
      url: deleteUrl,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
       .then((response: T) => (resolve({ response, error: null })))
    .catch((err) => (reject({ response: null, error: err })));
  });
}
