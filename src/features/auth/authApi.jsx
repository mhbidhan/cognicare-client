import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: '/auth/Login',
				method: 'POST',
				body: data
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}){
				try {
					const { data } = await queryFulfilled

					localStorage.setItem('auth', JSON.stringify({
						userName: data.userName,
						token: data.token
					}))

					dispatch(userLoggedIn({
						userName: data.userName,
						token: data.token
					}))
				} catch (err) {
					//Do nothing;					
				}
			}
		}),
		changePassword: builder.mutation({
			query: (data) => ({
				url: '/admin/api/ChangePassword',
				method: 'POST',
				body: data
			})
		}),

	})
})

export const {useLoginMutation, useChangePasswordMutation} = authApi