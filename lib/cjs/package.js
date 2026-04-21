"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPackageModule = exports.registerPackageExport = exports.packageExports = exports.linkedUtil = exports.linkedShape = exports.linkedOntology = exports.getPackageShape = exports.packageName = void 0;
const package_1 = require("@_linked/core/package");
Object.defineProperty(exports, "getPackageShape", { enumerable: true, get: function () { return package_1.getPackageShape; } });
Object.defineProperty(exports, "linkedOntology", { enumerable: true, get: function () { return package_1.linkedOntology; } });
Object.defineProperty(exports, "linkedShape", { enumerable: true, get: function () { return package_1.linkedShape; } });
Object.defineProperty(exports, "linkedUtil", { enumerable: true, get: function () { return package_1.linkedUtil; } });
Object.defineProperty(exports, "packageExports", { enumerable: true, get: function () { return package_1.packageExports; } });
Object.defineProperty(exports, "registerPackageExport", { enumerable: true, get: function () { return package_1.registerPackageExport; } });
Object.defineProperty(exports, "registerPackageModule", { enumerable: true, get: function () { return package_1.registerPackageModule; } });
exports.packageName = { packageName: '@_linked/sentry' }.packageName;
//# sourceMappingURL=package.js.map