"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var crypto_1 = require("crypto");
var msPerMinute = 60000;
var UserToken = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _expirationDate_decorators;
    var _expirationDate_initializers = [];
    var _expirationDate_extraInitializers = [];
    var _expendExpiration_decorators;
    var _generateToken_decorators;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var UserToken = _classThis = /** @class */ (function () {
        function UserToken_1() {
            this.id = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _id_initializers, void 0));
            this.token = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _token_initializers, void 0));
            this.expirationDate = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _expirationDate_initializers, void 0));
            this.user = (__runInitializers(this, _expirationDate_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        UserToken_1.prototype.expendExpiration = function () {
            this.expirationDate = new Date(new Date().getTime() + 30 * msPerMinute);
        };
        UserToken_1.prototype.generateToken = function () {
            var bytes = crypto_1.default.randomBytes(48);
            this.token = bytes.toString("hex");
        };
        return UserToken_1;
    }());
    __setFunctionName(_classThis, "UserToken");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _token_decorators = [(0, typeorm_1.Column)()];
        _expirationDate_decorators = [(0, typeorm_1.Column)()];
        _expendExpiration_decorators = [(0, typeorm_1.BeforeInsert)(), (0, typeorm_1.BeforeUpdate)()];
        _generateToken_decorators = [(0, typeorm_1.BeforeInsert)()];
        _user_decorators = [(0, typeorm_1.ManyToOne)('User', 'tokens'), (0, typeorm_1.JoinColumn)({ name: 'userId' })];
        __esDecorate(_classThis, null, _expendExpiration_decorators, { kind: "method", name: "expendExpiration", static: false, private: false, access: { has: function (obj) { return "expendExpiration" in obj; }, get: function (obj) { return obj.expendExpiration; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _generateToken_decorators, { kind: "method", name: "generateToken", static: false, private: false, access: { has: function (obj) { return "generateToken" in obj; }, get: function (obj) { return obj.generateToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _expirationDate_decorators, { kind: "field", name: "expirationDate", static: false, private: false, access: { has: function (obj) { return "expirationDate" in obj; }, get: function (obj) { return obj.expirationDate; }, set: function (obj, value) { obj.expirationDate = value; } }, metadata: _metadata }, _expirationDate_initializers, _expirationDate_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserToken = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserToken = _classThis;
}();
exports.default = UserToken;
