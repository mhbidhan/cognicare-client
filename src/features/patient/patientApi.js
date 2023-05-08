import { apiSlice } from "./../api/apiSlice";

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    patientLogin: builder.query({
      query: () => ({
        url: `/patients/own`,
        method: "GET",
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

export const { usePatientLoginQuery } = patientApi;
