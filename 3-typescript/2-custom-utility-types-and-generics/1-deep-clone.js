"use strict";
/**
 * Challenge: Create a deep clone function
 *
 * Create a function that takes an object and returns a deep clone of that object. The function should handle nested objects, arrays, and primitive types.
 *
 * Requirements:
 * - The function should accept an object of any type.
 * - It should return a new object that is a deep clone of the original object.
 * - The function should handle nested objects and arrays.
 * - It should handle primitive types (strings, numbers, booleans, null, undefined).
 * - The function should not use any external libraries
 */
//? implement the function  here
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((o) => deepClone(o));
    }
    let newObj = {};
    Object.entries(obj).forEach(([key, value]) => {
        switch (typeof value) {
            case "object":
                newObj[key] = deepClone(value);
                break;
            default:
                newObj[key] = value;
                break;
        }
    });
    return newObj;
}
const myObject = {
    name: "nombre",
    age: 15,
    games: [
        {
            name: "Game og Thrones",
            popularity: 10
        },
        {
            name: "Game og Vice",
            popularity: 7
        }
    ],
    other: {
        ubication: "Av I dont know",
        toys: 15
    },
    movies: ["spirit", "Mohana", "Clown"]
};
const clone = deepClone(myObject);
console.log("They have different reference");
console.log(clone === myObject);
console.log("Make sure all properties are present");
console.log("same string: ", JSON.stringify(myObject) === JSON.stringify(clone));
console.log("Modify an object");
myObject.other.ubication = "other ubication";
console.log("myObject.games", myObject.other);
console.log("clone.games", clone);
console.log("Add an element to an array");
myObject.games.push({ name: "Game of test", popularity: 2 });
console.log("myObject.games", myObject.games);
console.log("clone.games", clone);
console.log("Modify an object inside an array");
myObject.games[0].name = "Game of Thrones Fixed";
console.log("myObject.games", myObject.games);
console.log("clone.games", clone);
//Using Arrays -------------------------------------------------
const arrayObjects = [
    {
        iduser: 1,
        name: "User1"
    },
    {
        iduser: 2,
        name: "User2"
    },
    {
        iduser: 3,
        name: "User3"
    },
];
const cloneArray = deepClone(arrayObjects);
console.log("They have different reference");
console.log(cloneArray === arrayObjects);
console.log("Make sure all properties are present");
console.log("same string: ", JSON.stringify(arrayObjects) === JSON.stringify(cloneArray));
console.log("Modify an object from the array");
arrayObjects[0].name = "Other Name";
console.log("arrayObjects", arrayObjects);
console.log("cloneArray", cloneArray);
//Using primitive
const original = 42;
const clon = deepClone(original);
console.log(clon === original);
console.log(typeof clon === typeof original);
