export interface Order {
    _id: string;
    table: string;
    status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
    products: Array<{
        _id: string;
        quantity: number;
        product: Product
    }>
}

export interface Product {
    name: string;
    imagePath: string;
    price: number;
}
