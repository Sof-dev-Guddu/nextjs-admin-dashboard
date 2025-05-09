import { object } from 'zod';

const Endpoints = {
  APPEAL: {
    GET: '/appeals',
    POST: '/appeals',
    PUT: '/appeals',
    DELETE: '/appeals',
  },
  CALENDAR: {
    GET: '/calendar',
    POST: '/calendar',
    PUT: '/calendar',
    DELETE: '/calendar',
  },
};

Object.freeze(Endpoints);

export default Endpoints;
