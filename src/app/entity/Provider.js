"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
var typeorm_1 = require("typeorm");
var Provider = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _provider_id_decorators;
    var _provider_id_initializers = [];
    var _provider_id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _logo_path_decorators;
    var _logo_path_initializers = [];
    var _logo_path_extraInitializers = [];
    var Provider = _classThis = /** @class */ (function () {
        function Provider_1() {
            this.user = __runInitializers(this, _user_initializers, void 0);
            this.provider_id = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _provider_id_initializers, void 0));
            this.name = (__runInitializers(this, _provider_id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.logo_path = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _logo_path_initializers, void 0));
            __runInitializers(this, _logo_path_extraInitializers);
        }
        return Provider_1;
    }());
    __setFunctionName(_classThis, "Provider");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_decorators = [(0, typeorm_1.ManyToMany)("User")];
        _provider_id_decorators = [(0, typeorm_1.PrimaryColumn)()];
        _name_decorators = [(0, typeorm_1.Column)()];
        _logo_path_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _provider_id_decorators, { kind: "field", name: "provider_id", static: false, private: false, access: { has: function (obj) { return "provider_id" in obj; }, get: function (obj) { return obj.provider_id; }, set: function (obj, value) { obj.provider_id = value; } }, metadata: _metadata }, _provider_id_initializers, _provider_id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _logo_path_decorators, { kind: "field", name: "logo_path", static: false, private: false, access: { has: function (obj) { return "logo_path" in obj; }, get: function (obj) { return obj.logo_path; }, set: function (obj, value) { obj.logo_path = value; } }, metadata: _metadata }, _logo_path_initializers, _logo_path_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Provider = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Provider = _classThis;
}();
exports.Provider = Provider;
