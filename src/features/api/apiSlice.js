import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a8c6-113-11-37-34.in.ngrok.io", //process.env.REACT_APP_API_URL,
    // prepareHeaders: async (headers, {getState, endpoints}) => {
    // 	const auth = JSON.parse(localStorage.getItem('auth'))
    // 	const token = auth?.token
    // 	if (token) {
    // 		headers.set('Authorization', `Bearer ${token}`)
    // 		headers.set('Accept-Language', 'en-US')
    // 	}
    // 	return headers
    // }
  }),
  // tagTypes: ['Manufacturer'],
  endpoints: (builder) => ({}),
});
