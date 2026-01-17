"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_json_util_1 = require("./utils/read-json.util");
function analyzeProductPrices(products) {
    return __awaiter(this, void 0, void 0, function* () {
        const totalPrice = products.reduce((accu, product) => accu + product.price, 0);
        const averagePrice = Number((totalPrice / (products.length)).toFixed(2));
        const mostExpensiveProduct = products.reduce((expensiveProduct, product) => product.price > expensiveProduct.price ? product : expensiveProduct);
        const cheapestProduct = products.reduce((expensiveProduct, product) => product.price < expensiveProduct.price ? product : expensiveProduct);
        const onSaleCount = products.filter((product) => product.onSale).length;
        const averageDiscount = (products.filter((product) => product.onSale)
            .map((product) => (product.price - product.salePrice) * 100 / product.price)
            .reduce((accu, discountPercentage) => accu + discountPercentage, 0)) / products.length;
        return {
            totalPrice,
            averagePrice,
            mostExpensiveProduct,
            cheapestProduct,
            onSaleCount,
            averageDiscount
        };
    });
}
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
function buildProductCatalog(products, brands) {
    return __awaiter(this, void 0, void 0, function* () {
        const activeBrandsMap = new Map();
        for (const brand of brands) {
            if (brand.isActive) {
                const { id, isActive } = brand, brandInfo = __rest(brand, ["id", "isActive"]);
                activeBrandsMap.set(Number(id), brandInfo);
            }
        }
        return products
            .filter(product => product.isActive && activeBrandsMap.has(product.brandId))
            .map(product => (Object.assign(Object.assign({}, product), { brandInfo: activeBrandsMap.get(product.brandId) })));
    });
}
const main2 = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, read_json_util_1.readJsonFile)('./data/products.json');
    const brands = yield (0, read_json_util_1.readJsonFile)('./data/brands.json');
    console.log(yield buildProductCatalog(products, brands));
});
main2();
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
function filterProductsWithOneImage(products) {
    return __awaiter(this, void 0, void 0, function* () {
        // Implement the function logic here
        const filteredProducts = [];
        for (const product of products) {
            if (product.images.length > 0) {
                filteredProducts.push(Object.assign(Object.assign({}, product), { images: [Object.assign({}, product.images[0])] }));
            }
        }
        return filteredProducts;
    });
}
// const main3 = async () => {
//   const products : Product[] = await readJsonFile<Product>('./data/products.json')
//   console.log(await filterProductsWithOneImage(products))
// }
// main3()
