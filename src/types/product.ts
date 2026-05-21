interface ProductImage {
    url: string;
    cloudinary_id: string;
}

export interface Product {
    _id: string;
    title: string;
    originalPrice: number;
    finalPrice: number;
    discount: number;
    category: { _id: string; name: string }[] | string;
    stock: number;
    buys: number;
    description: string;
    thumbnail: ProductImage;
    productImages: ProductImage[];
}