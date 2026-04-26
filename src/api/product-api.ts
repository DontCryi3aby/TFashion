import { Product } from 'src/models/product';
import axiosClient from 'src/api/axios-client';
import { ListParams, ListResponse } from 'src/models';

const productApi = {
    getAll(params?: Partial<ListParams>): Promise<ListResponse<Product>> {
        const url = '/products';
        return axiosClient.get(url, { params });
    },

    getDetail(id: string | number): Promise<Product> {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },

    add(data: Product): Promise<Product> {
        const url = '/products';
        return axiosClient.post(url, data);
    },

    update(id: string | number, data: Partial<Product>): Promise<Product> {
        const url = `/products/${id}`;
        return axiosClient.patch(url, data);
    },

    remove(id: string | number): Promise<any> {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },

    removeGallery(id: string | number): Promise<any> {
        const url = `/galleries/${id}`;
        return axiosClient.delete(url);
    },
};

export default productApi;
