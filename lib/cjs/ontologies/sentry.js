"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentry = exports.exampleProperty = exports.ExampleClass = exports._self = exports.ns = exports.loadData = void 0;
const Prefix_1 = require("@_linked/core/utils/Prefix");
const NameSpace_1 = require("@_linked/core/utils/NameSpace");
const package_js_1 = require("../package.js");
const _this = __importStar(require("./sentry.js"));
const dataFile = '../data/sentry.json';
const base = 'http://lincd.org/ont/sentry/';
Prefix_1.Prefix.add('sentry', base);
const loadData = () => {
    if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
        return Promise.resolve(`${dataFile}`).then(s => __importStar(require(s)));
    }
    //@ts-ignore
    return Promise.resolve(`${dataFile}`).then(s => __importStar(require(s))).then((data) => data.default);
};
exports.loadData = loadData;
exports.ns = (0, NameSpace_1.createNameSpace)(base);
exports._self = (0, exports.ns)('');
exports.ExampleClass = (0, exports.ns)('ExampleClass');
exports.exampleProperty = (0, exports.ns)('exampleProperty');
exports.sentry = {
    _self: exports._self,
    ExampleClass: exports.ExampleClass,
    exampleProperty: exports.exampleProperty,
};
(0, package_js_1.linkedOntology)(_this, exports.ns, 'sentry', exports.loadData, dataFile);
//# sourceMappingURL=sentry.js.map