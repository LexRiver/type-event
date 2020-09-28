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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TypeEvent = /** @class */ (function () {
    //protected _maxCountOfSubscribers:number|undefined = undefined
    //public maxSubscribers:number = 100
    function TypeEvent(maxCountOfSubscribers) {
        if (maxCountOfSubscribers === void 0) { maxCountOfSubscribers = undefined; }
        this.maxCountOfSubscribers = maxCountOfSubscribers;
        this._actions = [];
        this._onceActions = [];
    }
    TypeEvent.prototype.subscribe = function (action) {
        if (this.maxCountOfSubscribers && this.maxCountOfSubscribers > 0 && this._actions.length > this.maxCountOfSubscribers)
            throw new Error("too much susbcribers: limit is " + this.maxCountOfSubscribers);
        this._actions.push(action);
    };
    /**
     * subscribe to event and delete this subscriber after first execution
     * @param onceAction
     */
    TypeEvent.prototype.once = function (onceAction) {
        this._onceActions.push(onceAction);
    };
    TypeEvent.prototype.unsubscribe = function (action) {
        this._actions = this._actions.filter(function (x) { return x !== action; });
        this._onceActions = this._onceActions.filter(function (x) { return x !== action; });
        // while(true){
        //     let index = this._actions.indexOf(action)
        //     if(index >= 0){
        //         this._actions.splice(index, 1)
        //     } else break
        // } 
    };
    TypeEvent.prototype.unsubscribeAll = function () {
        this._actions = [];
        this._onceActions = [];
    };
    TypeEvent.prototype.triggerAsync = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var actionsToDelete, _a, _b, action, result, e_1_1, _c, _d, onceAction;
            var e_1, _e, e_2, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        actionsToDelete = [];
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        _a = __values(this._actions), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        action = _b.value;
                        return [4 /*yield*/, action.apply(void 0, __spread(p))];
                    case 3:
                        result = _g.sent();
                        if (result && result.unsubscribe) {
                            actionsToDelete.push(action);
                        }
                        _g.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        try {
                            // execute and delete onceActions
                            for (_c = __values(this._onceActions), _d = _c.next(); !_d.done; _d = _c.next()) {
                                onceAction = _d.value;
                                onceAction.apply(void 0, __spread(p));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        this._onceActions = [];
                        // remove actions which retuns {unsubscribe:true}
                        if (actionsToDelete.length > 0) {
                            //console.log('deleting actions, count=', actionsToDelete.length)
                            this._actions = this._actions.filter(function (x) { return actionsToDelete.indexOf(x) < 0; });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(TypeEvent.prototype, "countOfSubscribers", {
        get: function () {
            return this._actions.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeEvent.prototype, "countOfOnceSubscribers", {
        get: function () {
            return this._onceActions.length;
        },
        enumerable: true,
        configurable: true
    });
    return TypeEvent;
}());
exports.TypeEvent = TypeEvent;
