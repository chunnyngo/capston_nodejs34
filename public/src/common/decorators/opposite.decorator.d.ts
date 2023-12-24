import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { ClassConstructor } from 'class-transformer';
export declare const Opposite: <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => (object: any, propertyName: string) => void;
export declare class OppositeConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
