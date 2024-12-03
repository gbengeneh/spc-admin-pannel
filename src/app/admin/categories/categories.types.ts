export type Product ={
   
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
    categories: number;
    price: number | null;
    heroImage:string;
    created_at: string;
    maxQuantity: number;
   
    
    
};

export type CategoryWithProducts = {
    created_at: string;
    id: number;
    imageUrl: string;
    name: string;
    products: Product[];
    slug: string;
}

export type CategoriesWithProductsResponse = CategoryWithProducts[];