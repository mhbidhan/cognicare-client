import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getData } from './../../localStorage';
import { SERVER_URL } from '../../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
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
