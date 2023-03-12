import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
    }),
    tagTypes: ['Productos'],
    endpoints: (builder) => ({
        getProductos: builder.query({
            query: () => '/productos',
            providesTags: ['Productos'],
        }),
        addProducto: builder.mutation({
            query: (payload) => ({
                url: '/productos',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Productos'],
        }),
        putProducto: builder.mutation({
            query: (payload) => ({
                url: `/productos/${payload.id}`,
                method: 'PUT',
                body: payload,
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Productos'],
        }),
        deleteProducto: builder.mutation({
            query: (id) => ({
                url: `/productos/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Productos'],
        }),
    }),
})
export const {
    useGetProductosQuery, useAddProductoMutation,
    usePutProductoMutation, useDeleteProductoMutation
} = apiSlice