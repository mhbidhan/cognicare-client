import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_URL,
		prepareHeaders: async (headers, {getState, endpoints}) => {
			const auth = JSON.parse(localStorage.getItem('auth'))
			const token = auth?.token
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
				headers.set('Accept-Language', 'en-US')
			}
			// headers.set('Access-Control-Allow-Origin', 'https://localhost:3000/');
			// headers.set('Access-Control-Allow-Credentials', 'true');
			return headers
		}
	}),
	// tagTypes: ['Manufacturer'],
	endpoints: (builder) => ({})
})