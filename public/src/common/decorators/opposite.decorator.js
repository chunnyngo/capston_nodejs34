"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OppositeConstraint = exports.Opposite = void 0;
const class_validator_1 = require("class-validator");
const Opposite = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: OppositeConstraint,
        });
    };
};
exports.Opposite = Opposite;
let OppositeConstraint = class OppositeConstraint {
    validate(value, args) {
        const [fn] = args.constraints;
        return fn(args.object) === !value;
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `If ${(constraintProperty + '').split('.')[1]} is true, then ${args.property} must be false, and vice versa`;
    }
};
OppositeConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'Opposite' })
], OppositeConstraint);
exports.OppositeConstraint = OppositeConstraint;
//# sourceMappingURL=opposite.decorator.js.map