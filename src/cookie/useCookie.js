import { useCookies } from 'react-cookie';

export const useCookie = (name) => {
  const [cookies, setCookie, removeCookie] = useCookies([name]);

  const set = (value, options = {}) => {
    setCookie(name, value, options);
  };

  const get = () => {
    return cookies[name];
  };

  const remove = () => {
    removeCookie(name);
  };

  return { set, get, remove };
};
