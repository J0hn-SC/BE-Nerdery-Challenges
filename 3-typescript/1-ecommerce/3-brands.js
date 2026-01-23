"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const read_json_util_1 = require("./utils/read-json.util");
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
function getCountriesWithBrandsAndProductCount(brands, products) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const countProductsByBrand = new Map();
        for (const product of products) {
            let countProductByBrand = (_a = countProductsByBrand.get(product.brandId)) !== null && _a !== void 0 ? _a : 0;
            countProductsByBrand.set(product.brandId, countProductByBrand + 1);
        }
        const countProductsByCountry = new Map();
        for (const brand of brands) {
            let countProductByBrand = (_b = countProductsByBrand.get(Number(brand.id))) !== null && _b !== void 0 ? _b : 0;
            const country = brand.headquarters.split(', ')[1];
            if (!country)
                continue;
            let productsByCountry = (_c = countProductsByCountry.get(country)) !== null && _c !== void 0 ? _c : 0;
            countProductsByCountry.set(country, countProductByBrand + productsByCountry);
        }
        return Array.from(countProductsByCountry.entries()).map(([country, count]) => {
            return {
                country: country,
                productsByCountryCount: count
            };
        });
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield (0, read_json_util_1.readJsonFile)('./data/brands.json');
    const products = yield (0, read_json_util_1.readJsonFile)('./data/products.json');
    console.log(yield getCountriesWithBrandsAndProductCount(brands, products));
});
main();
