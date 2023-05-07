import { apiSlice } from './../api/apiSlice';

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
          console.log(data);
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
  }),
});

export const { useCaretakerRegistrationMutation } = caretakerApi;
