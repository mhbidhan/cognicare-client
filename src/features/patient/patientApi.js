import { apiSlice } from './../api/apiSlice';

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    patientLogin: builder.query({
      query: (id) => ({
        url: `/patients/${id}`,
        method: 'GET',
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
    createNewPatient: builder.mutation({
      query: (data) => ({
        url: '/patients',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
        } catch (err) {
          //Do nothing;
        }
      },
    }),
  }),
});

export const { usePatientLoginQuery, useCreateNewPatientMutation } = patientApi;
