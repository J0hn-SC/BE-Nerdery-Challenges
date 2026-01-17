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
// async function getDepartmentsWithProductCount(
//   departments: Department[],
//   products: Product[],
// ): Promise<DepartmentSummary[]> {
//   return departments.map((department) => {
//     const productsByDepartment = products.filter((product) => product.departmentId === department.id)
//     return {
//       id : department.id,
//       name: department.name,
//       amountOfProducts: productsByDepartment.length,
//       productNames: products.map((product) => product.name)
//     }
//   })
// }
//optimized using Map
function getDepartmentsWithProductCount(departments, products) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const productNamesByDepartment = new Map();
        for (const product of products) {
            const names = (_a = productNamesByDepartment.get(product.departmentId)) !== null && _a !== void 0 ? _a : [];
            names.push(product.name);
            productNamesByDepartment.set(product.departmentId, names);
        }
        return departments.map((department) => {
            var _a;
            const productNamesFromDepartment = (_a = productNamesByDepartment.get(department.id)) !== null && _a !== void 0 ? _a : [];
            return {
                id: department.id,
                name: department.name,
                amountOfProducts: productNamesFromDepartment.length,
                productNames: productNamesFromDepartment
            };
        });
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield (0, read_json_util_1.readJsonFile)('./data/departments.json');
    const products = yield (0, read_json_util_1.readJsonFile)('./data/products.json');
    console.log(yield getDepartmentsWithProductCount(departments, products));
});
main();
