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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveIfNoExistsProvider = saveIfNoExistsProvider;
exports.saveUserProviders = saveUserProviders;
var Provider_1 = require("../../entity/Provider");
var data_source_1 = require("../../data-source");
/**
 * Add providers in the repository if they aren't already added
 */
function saveIfNoExistsProvider(providers) {
    return __awaiter(this, void 0, void 0, function () {
        var newProviders, providerRepo, _i, providers_1, provider, existingProvider, newProvider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newProviders = [];
                    providerRepo = data_source_1.default.getRepository(Provider_1.Provider);
                    _i = 0, providers_1 = providers;
                    _a.label = 1;
                case 1:
                    if (!(_i < providers_1.length)) return [3 /*break*/, 5];
                    provider = providers_1[_i];
                    return [4 /*yield*/, providerRepo.findOneBy({ provider_id: provider.provider_id })];
                case 2:
                    existingProvider = _a.sent();
                    if (!!existingProvider) return [3 /*break*/, 4];
                    newProvider = providerRepo.create({
                        provider_id: provider.provider_id,
                        name: provider.provider_name,
                        logo_path: provider.logo_path
                    });
                    return [4 /*yield*/, providerRepo.save(newProvider)];
                case 3:
                    _a.sent();
                    newProviders.push(newProvider);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, newProviders];
            }
        });
    });
}
/**
 * Save the user's providers (and override previous providers)
 */
function saveUserProviders() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
