import { type BaseConverter, convert } from "..";

type Converter = BaseConverter<unknown, string>;
type Convert = Converter["convert"];

class StringConverter implements Converter {
  readonly inputType: string = "any";
  readonly targetType: string = "string";
  convert(value: unknown): string {
    if (typeof value === "string") return value;
    else if (value === undefined) return "<undefined>";
    else if (value === null) return "<null>";
    else if (Array.isArray(value)) return `[${value.toString()}]`;
    else if (typeof value === "object") return JSON.stringify(value);
    else if (typeof value === "symbol") return value.toString();
    else if (typeof value === "function") return `<Function ${value.name}>`;
    else return `${value as string}`;
  }
}

/**
 * Create String Converter
 * @public
 */
export const toString: Converter = new StringConverter();

/**
 * Convert input to string using String Converter
 * @param input - any value
 * @returns string representation of input value
 * @public
 */
export const convertToString: Convert = input => convert(input, toString);
