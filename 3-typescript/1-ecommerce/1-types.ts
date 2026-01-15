/**
 * Challenge 1: Type Definitions for Product Catalog
 *
 * You need to define proper TypeScript types for the product catalog data.
 * These types should accurately represent the structure of the JSON data and establish
 * the relationships between different entities (e.g., products and brands).
 *
 * The JSON data is provided in the `data` folder.
 *
 * Consider:
 * - Handle all of the properties in the JSON data as accurately as possible in typescript types
 * - Use appropriate types for each property (e.g., string, number, boolean, etc.)
 * - Optional properties and mandatory properties
 * - The use of union types for properties that can have multiple types
 * - The use of enums for properties that can have a limited set of values
 * - The use of interfaces and type aliases to create a clear and maintainable structure
 */

import { readJsonFile } from "./utils/read-json.util"

// PRODUCTS JSON

//! Add necessary type definitions for the products json file


export type Product = {
    id: string
    name: string
    departmentId: number
    categoryId: number
    brandId: number
    linkId: string
    refId: string,
    isVisible: boolean,
    description: string,
    descriptionShort: string,
    releaseDate: Date,
    // "releaseDate": "2024-04-05T00:00:00",
    // "keywords": "Horizon,Trail,Rush,Desert,Tan,Outdoor",
    title: string,
    isActive: boolean,
    "taxCode": "TRAIL888",
    metaTagDescription: string,
    supplierId: number,
    showWithoutStock: boolean,
    adWordsRemarketingCode: string, //string | undefined
    lomadeeCampaignCode: string, //string | undefined
    score: number,
    price: number,
    salePrice: number,
    onSale: boolean,
    "colors": ["Desert Tan", "Forest Green", "Slate Blue"],
    sizes: number[], //correct
    tags: string[], //correct
    images: Image[],
    specifications: Specifications
}

type Image = {
    id: number,
    // "url": "products/horizon-trail-rush-desert-tan-main.jpg",
    // "alt": "Horizon Trail Rush Desert Tan - Main View",
    isMain: boolean
}

type Specifications = {
    // "material": "Ripstop nylon mesh with TPU overlays, rubber outsole",
    // "weight": "315g (size 9)",
    "cushioning": string,
    "closure": string,
    // "archSupport": "Medium to High"
    archSupport: ArchSupport | undefined
    shaftHeight: string | undefined
    ankleSupport: string | undefined 
}

type ArchSupport = "Medium to High" | "Medium" | "Low" | "High"

const main = async () => {
    const obj : Product[] = await readJsonFile<Product>('./data/products.json')
    console.log(obj[1])
    // console.log(obj)
}

main()

// CATEGORIES JSON

//! Add necessary type definitions for the brands json file

// BRANDS JSON

//! Add necessary type definitions for the brands json file

// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file
