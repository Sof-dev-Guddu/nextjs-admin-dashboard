export function formatAxiosError(error: any) {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return 'Bad Request  with error code:400';
    case 401:
      return 'Unauthorized access  with error code:401';
    case 403:
      return 'Forbidden  with error code:403';
    case 404:
      return 'Resource not found with error code:404';
    case 500:
      return 'Server error  with error code:500';
    default:
      return 'Something went wrong';
  }
}
