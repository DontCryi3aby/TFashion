import axiosClient from 'src/api/axios-client';
import { ListParams, ListResponse } from 'src/models';
import { Product, Category } from 'src/models/product';


const categoriesApi = {
    getAll(params?: Partial<ListParams>): Promise<ListResponse<Category>> {
        const url = '/categories';
        return axiosClient.get(url, { params });
    },

    getDetail(id: string | number): Promise<Category> {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },

    add(data: Product): Promise<Category> {
        const url = '/categories';
        return axiosClient.post(url, data);
    },

    update(id: string | number, data: Partial<Category>): Promise<Category> {
        const url = `/categories/${id}`;
        return axiosClient.patch(url, data);
    },

    remove(id: string | number): Promise<any> {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
};

export default categoriesApi;
