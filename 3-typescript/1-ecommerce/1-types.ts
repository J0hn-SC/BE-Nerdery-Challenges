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

type ArchSupport = "Medium to High" | "Medium" | "Low" | "High"


type OtherSpecification = {
    archSupport?: ArchSupport,
    shaftHeight?: string
    ankleSupport?: string
    heelDrop?: string
    heelHeight?: string
    lining?: string
    flexibility?: string
    waterproofing?: string
    cushioning?: string
}

type Specifications = {
    material: string,
    weight: string,
    closure: string,
}

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
    releaseDate: string,
    keywords: string,
    title: string,
    isActive: boolean,
    taxCode: string,
    metaTagDescription: string,
    supplierId: number,
    showWithoutStock: boolean,
    adWordsRemarketingCode?: string | null,
    lomadeeCampaignCode?: string | null,
    score: number,
    price: number,
    salePrice: number,
    onSale: boolean,
    colors: string[],
    sizes: number[],
    tags: string[],
    images: Image[],
    specifications: Specifications & OtherSpecification
}


type Image = {
    id: number,
    url: string
    alt: string
    isMain: boolean
}

// CATEGORIES JSON

//! Add necessary type definitions for the brands json file


export type Category = {
    id: number,
    name: string,
    departmentId: number,
    description: string,
    keywords: string
    isActive: boolean,
    iconUrl: string,
    bannerUrl: string,
    displayOrder: number,
    metaDescription: string,
    filters: Filter[]
}

type Filter = {
    name: string,
    values: string[]
}


// BRANDS JSON

//! Add necessary type definitions for the brands json file

export type Brand = {
    id: string | number,
    name: string,
    logo: string,
    description: string,
    foundedYear: number,
    website: string,
    isActive: boolean,
    headquarters: string,
    signature: string,
    socialMedia: SocialMedia
}

type SocialMedia = {
    instagram: string,
    twitter: string,
    facebook: string
}

// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file

export type Department = {
    id: number,
    name: string,
    description: string,
    isActive: boolean,
    displayOrder: number,
    iconUrl: string,
    bannerUrl: string,
    metaDescription: string,
    featuredCategories: number[],
    slug: string
}