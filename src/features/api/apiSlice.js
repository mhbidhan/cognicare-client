import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getData } from './../../localStorage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://4eea-113-11-37-34.ngrok-free.app', //process.env.REACT_APP_API_URL,
    // prepareHeaders: async (headers, { getState, endpoints }) => {
    //   let token = '';
    //   getData('token').then((val) => {
    //     console.log('api', val);
    //     headers.set('x-auth-token', val);
    //   });

    //   if (token) {
    //     headers.set('x-auth-token', token);
    //     headers.set('Accept-Language', 'en-US');
    //   }

    //   return headers;
    // },
  }),
  // tagTypes: ['Manufacturer'],
  endpoints: (builder) => ({}),
});
