import { urlFor } from "./client";
import { fectchProducts } from '@/lib/fetchProduct';

export async function fetchImgUrl() {
    
    const {products} = await fectchProducts();
    const imgUrl = {};

    products.forEach((product) => {
        const slug = product.slug.current;
        product.image.forEach((img, index) => {
            imgUrl[slug] = {...imgUrl[slug], [index]: urlFor(img).url()};
        })
    })

    return imgUrl;
}