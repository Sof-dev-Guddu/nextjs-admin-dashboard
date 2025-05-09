// services/crudService.ts
import { apiRequest } from '../httpClient';

interface RequestData<T = any> {
  url: string;
  data?: T;
  id?: string;
}

export function getData<T = any[]>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    apiRequest({ url })
      .then((response) => resolve(response))
      .catch((error) => reject('wrong'));
  });
}

export function addData<T>({ url, data }: RequestData<T>): Promise<any> {
  return new Promise((resolve, reject) => {
    apiRequest({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function updateData<T>({ url, data }: RequestData<T>): Promise<any> {
  return new Promise((resolve, reject) => {
    apiRequest({
      url,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function deleteData({ url, id }: RequestData): Promise<any> {
  const deleteUrl = id ? `${url}/${id}` : url;

  return new Promise((resolve, reject) => {
    apiRequest({
      url: deleteUrl,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
