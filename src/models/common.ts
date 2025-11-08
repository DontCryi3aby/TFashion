export interface PaginationParams {
    per_page: number;
    page: number;
    total: number;
    current_page: number;
    last_page: number;

    [key: string]: any;
}

export interface ListResponse<T> {
    data: Array<T>;
    meta: PaginationParams;
}

export interface ListParams {
    _page: number;
    _limit: number;
    _sort: string;
    _order: 'asc' | 'desc';

    [key: string]: any;
}

export interface RouteProps {
    path: string;
    component: any;
    layout?: any;
    private?: boolean;
}
