"use strict";
/**
 * Exercise #1: Filter object properties by type.
 *
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 *
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string;
 *   count: number;
 *   isReadonly: boolean;
 *   isEnable: boolean;
 * }, boolean>;
 *
 * Resulting type:
 *
 * {
 * name: string;
 * count: number;
 * }
 */
const userWithoutBooleans1 = {
    name: "Paolo",
    count: 5
};
const condition1 = 'a';
const condition2 = 'b';
const user = {
    name: "Pedro",
    age: 15
};
// Add here your example
const fn = (v) => {
    if (v) {
        return 1;
    }
    else {
        return 2;
    }
};
const returnType1 = 1;
const returnType2 = 2;
// Add here your example
const myAwaited1 = "Es un string";
// Error because it should return a string not number
// const myAwaited2 : MyAwaited<Promise<Promise<string>>> = 15
const myAwaited3 = null;
const user1 = {
    id: 6611,
    name: "asda"
};
const user2 = {
    id: 55,
    name: "asdad",
    age: 5515
};
// Error because doesn't have name property
// const user3 : UserWithAllRequiredByKeys = {
//     id: 55,
//     age: 5515
// }
