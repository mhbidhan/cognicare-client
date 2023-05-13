import { apiSlice } from './../api/apiSlice';
import { setCaretakerToken } from './caretakerSlice';

export const caretakerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    caretakerRegistration: builder.mutation({
      query: (data) => ({
        url: '/caretakers',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          // localStorage.setItem(
          //   'auth',
          //   JSON.stringify({
          //     userName: data.userName,
          //     token: data.token,
          //   })
          // );

          // dispatch(
          //   userLoggedIn({
          //     userName: data.userName,
          //     token: data.token,
          //   })
          // );
        } catch (err) {
          //Do nothing;
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/caretakers/login',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(
            setCaretakerToken({
              caretakerToken: data,
            })
          );
        } catch (err) {
          //Do nothing;
        }
      },
    }),
    pushNotification: builder.mutation({
      query: (data) => ({
        url: '/requests',
        method: 'POST',
        body: data.body,
      }),
    }),
  }),
});

export const {
  useCaretakerRegistrationMutation,
  useLoginMutation,
  usePushNotificationMutation,
} = caretakerApi;
