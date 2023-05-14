import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getData } from './../../localStorage';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3630-113-11-37-34.in.ngrok.io', //process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState, endpoints }) => {
      let token = getState().caretaker.caretakerToken;
      // getData('token').then((val) => {
      //   console.log('api', val);
      //   headers.set('x-auth-token', val);
      // });
      console.log('api', token);
      if (token) {
        headers.set('x-auth-token', token);
        // headers.set('Accept-Language', 'en-US');
      }

      return headers;
    },
  }),
  // tagTypes: ['Manufacturer'],
  endpoints: (builder) => ({}),
});
