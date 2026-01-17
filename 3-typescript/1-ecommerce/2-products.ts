/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/

import { readJsonFile } from "./utils/read-json.util";
import { Brand, Product } from './1-types';

type ProductAnalysis = {
  totalPrice: number
  averagePrice : number
  mostExpensiveProduct : Product
  cheapestProduct : Product
  onSaleCount: number
  averageDiscount: number
}

async function analyzeProductPrices(products: Product[]): Promise<ProductAnalysis> {
  const totalPrice : number = products.reduce((accu, product) => accu + product.price , 0)
  const averagePrice : number = Number((totalPrice / (products.length)).toFixed(2))
  const mostExpensiveProduct : Product = products.reduce((expensiveProduct, product) => product.price > expensiveProduct.price ? product : expensiveProduct)
  const cheapestProduct : Product = products.reduce((expensiveProduct, product) => product.price < expensiveProduct.price ? product : expensiveProduct)
  const onSaleCount : number = products.filter((product) => product.onSale).length
  const averageDiscount : number = (
    products.filter((product) => product.onSale)
    .map((product) => (product.price - product.salePrice) * 100 / product.price)
    .reduce((accu, discountPercentage) => accu + discountPercentage, 0)
  ) / products.length
  return {
    totalPrice,
    averagePrice,
    mostExpensiveProduct,
    cheapestProduct,
    onSaleCount,
    averageDiscount
  }
}

// const main1 = async () => {
//   const products : Product[] = await readJsonFile<Product>('./data/products.json')
//   console.log(await analyzeProductPrices(products))
// }

// main1()


/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).
 */

type BrandInfo = Omit<Brand, "id" | "isActive">
type EnrichedProduct = Product & { brandInfo : BrandInfo }

// async function buildProductCatalog(
//   products: Product[],
//   brands: Brand[],
// ): Promise<EnrichedProduct[]> {
//   const activeBrandsIds = brands.filter(brand => brand.isActive).map(brand => brand.id)
//   return products.filter((product) => product.isActive && activeBrandsIds.includes(product.brandId)).map(product => {
//     const brandInfoByProduct = brands.find(brand => brand.id === product.brandId)!
//     const {id, isActive, ...brandInfo} = brandInfoByProduct
//     return {
//       ...product,
//       brandInfo: brandInfo
//     }
//   })
// }


// optimized

async function buildProductCatalog(
  products: Product[],
  brands: Brand[],
): Promise<EnrichedProduct[]> {
  const activeBrandsMap = new Map<number, Omit<Brand, "id" | "isActive">>();

  for (const brand of brands) {
    if (brand.isActive) {
      const { id, isActive, ...brandInfo } = brand;
      activeBrandsMap.set(Number(id), brandInfo);
    }
  }

  return products
    .filter(product => product.isActive && activeBrandsMap.has(product.brandId))
    .map(product => ({
      ...product,
      brandInfo: activeBrandsMap.get(product.brandId)! 
    }));
}


const main2 = async () => {
  const products : Product[] = await readJsonFile<Product>('./data/products.json')
  const brands : Brand[] = await readJsonFile<Brand>('./data/brands.json')
  console.log(await buildProductCatalog(products, brands))
}

main2()

/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */

// async function filterProductsWithOneImage(
//   products: Product[],
// ): Promise<Product[]> {
//   // Implement the function logic here
//   return products.filter((product) => product.images.length > 0).map((product) => {
//     return {
//       ...product,
//       images: [{...product.images[0]}]
//     }
//   })
// }

//optimized

async function filterProductsWithOneImage(
  products: Product[],
): Promise<Product[]> {
  // Implement the function logic here
  const filteredProducts : Product[] = []
  for(const product of products){
    if(product.images.length > 0){
      filteredProducts.push({
        ...product,
        images: [{...product.images[0]}]
      })
    }
  }
  return filteredProducts
}



// const main3 = async () => {
//   const products : Product[] = await readJsonFile<Product>('./data/products.json')
//   console.log(await filterProductsWithOneImage(products))
// }

// main3()
