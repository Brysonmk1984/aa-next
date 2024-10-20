export const getCookie = (name: string, cookieString?: string) => {
  if (!cookieString && typeof document === 'undefined') {
    throw new Error('no cookie string provided and used on the server');
  }

  const value = `; ${cookieString ?? document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
};
