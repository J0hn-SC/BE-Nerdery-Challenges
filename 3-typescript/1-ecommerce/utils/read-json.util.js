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
exports.readJsonFile = readJsonFile;
const promises_1 = require("fs/promises");
/**
 * Reads and parses a JSON file, returning its contents as a generic type.
 *
 * @param filePath - The path to the JSON file.
 * @returns The parsed contents of the file as type T.
 */
function readJsonFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, promises_1.readFile)(filePath, { encoding: "utf-8" });
        return JSON.parse(data);
    });
}
