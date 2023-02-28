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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doneSites = exports.readSites = void 0;
const siteList_json_1 = __importDefault(require("./siteList.json"));
function readSites() {
    return __awaiter(this, void 0, void 0, function* () {
        return siteList_json_1.default.items;
    });
}
exports.readSites = readSites;
function doneSites() {
    return __awaiter(this, void 0, void 0, function* () {
        return siteList_json_1.default.done;
    });
}
exports.doneSites = doneSites;
