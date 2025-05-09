export function formatAxiosError(error: any) {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized access';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Resource not found';
    case 500:
      return 'Server error';
    default:
      return 'Something went wrong';
  }
}
