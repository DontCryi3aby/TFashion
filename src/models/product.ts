export interface Gallery {
    id?: number;
    product_id: number;
    thumbnail: string;
}

export interface GalleryPayload {
    file: File;
    previewUrl: string;
}

export interface Category {
    id?: number;
    name: string;
}

export interface CategoryPayload {
    id?: number;
    name: string;
}

export interface Product {
    id?: number;
    category: Category;
    title: string;
    description?: string;
    quantity: string;
    price: string;
    discount?: string;
    create_at?: string;
    updated_at?: string;
    galleries: Array<Gallery>;
}

export interface ProductPayload {
    id?: number;
    category_id: number;
    title: string;
    description?: string;
    quantity: string;
    price: string;
    discount?: string;
    galleries: [] | Array<GalleryPayload>;
}
