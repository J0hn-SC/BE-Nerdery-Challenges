import { Department, Product } from './1-types';
import { readJsonFile } from './utils/read-json.util';
/**
 *  Challenge 5: Get Departments with Product Count
 *
 * Create a function that takes an array of departments and products, and returns a new array of departments with the amount of products available in each department.
 *
 * Requirements:
 * - The function should accept an array of Department objects and an array of Product objects.
 * - Each department should include the quantity of products available in that department.
 * - The department should be idetified just by its name and id other properties should be excluded.
 * - In the information of the department, include the amount of products available in that department and just the name and id of the department.
 * - Add the name of the products in an array called productsNames inside the department object.
 */

type DepartmentSummary = {
  id: number
  name: string
  amountOfProducts: number
  productNames: string[]
}


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

async function getDepartmentsWithProductCount(
  departments: Department[],
  products: Product[],
): Promise<DepartmentSummary[]> {
  
  const productNamesByDepartment = new Map<number, string[]>()
  for(const product of products){
    const names : string[] = productNamesByDepartment.get(product.departmentId) ?? []
    names.push(product.name)
    productNamesByDepartment.set(product.departmentId, names)
  }

  return departments.map((department) => {
    const productNamesFromDepartment = productNamesByDepartment.get(department.id) ?? []
    return {
      id : department.id,
      name: department.name,
      amountOfProducts: productNamesFromDepartment.length,
      productNames: productNamesFromDepartment
    }
  })
}

const main = async () => {
  const departments : Department[] = await readJsonFile<Department>('./data/departments.json')
  const products : Product[] = await readJsonFile<Product>('./data/products.json')
  console.log(await getDepartmentsWithProductCount(departments, products))
}

main()
