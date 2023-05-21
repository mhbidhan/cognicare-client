import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getData } from './../../localStorage';
import { SERVER_URL } from '../../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: async (headers, { getState, endpoints }) => {
      // let token = getState().caretaker.caretakerToken;
      let token = await getData('caretakerToken');
      // getData('caretakerToken').then((val) => {
      //   console.log('local-token', val);
      //   token = val;
      // });
      // console.log('redux-token', token);
      console.log('final-token', token);
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
