import { Brand, Product } from './1-types';
import { readJsonFile } from './utils/read-json.util';
/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property.
 * - Each product should have a brandId property that corresponds to the id of a brand.
 * - The function should return an array of objects, each containing a country and the amount of products available in that country.
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country.
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */


type NumberOfProductsByCountry = {
  country: string,
  productsByCountryCount: number
}

// async function getCountriesWithBrandsAndProductCount(
//   brands: Brand[],
//   products: Product[],
// ): Promise<unknown> {
//   const countrys : string[] = [...new Set(brands.map((brand) => brand.headquarters.split(', ')[1]))]
//   return countrys.map((country) => {
//     const countryBrandIds = brands.filter((brand) => brand.headquarters.split(', ')[1] === country).map((brand) => Number(brand.id))
//     const counterProductsbyCountry = products.filter(product => countryBrandIds.includes(product.brandId)).length
//     return {
//       country,
//       counterProductsbyCountry
//     }
//   })
// }

// optimized

async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<NumberOfProductsByCountry[]> {

  const countProductsByBrand = new Map<number, number>()
  for(const product of products){
    let countProductByBrand : number = countProductsByBrand.get(product.brandId) ?? 0
    countProductsByBrand.set(product.brandId, countProductByBrand + 1)
  }

  const countProductsByCountry = new Map<string, number>()
  for(const brand of brands){
    let countProductByBrand : number = countProductsByBrand.get(Number(brand.id)) ?? 0
    const country = brand.headquarters.split(', ')[1]
    if (!country) continue;
    let productsByCountry = countProductsByCountry.get(country) ?? 0
    countProductsByCountry.set(country, countProductByBrand + productsByCountry)
  }

  return Array.from(countProductsByCountry.entries()).map(([country, count]) => {
    return {
      country: country,
      productsByCountryCount: count
    };
  });
}

const main = async () => {
  const brands : Brand[] = await readJsonFile<Brand>('./data/brands.json')
  const products : Product[] = await readJsonFile<Product>('./data/products.json')
  console.log(await getCountriesWithBrandsAndProductCount(brands, products))
}

main()
