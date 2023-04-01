export function 是否数字<T extends number>(value: T | unknown): value is number {
  return Object.prototype.toString.call(value) === "[object Number]";
}

export function 是否字符串<T extends string>(value: T | unknown): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}

export function 是否非空字符串(value: any): boolean {
  return typeof value === "string" && value.length > 0;
}

export function 是否布尔值<T extends boolean>(value: T | unknown): value is boolean {
  return Object.prototype.toString.call(value) === "[object Boolean]";
}

export function 是否函数<T extends (...args: any[]) => any | void | never>(value: T | unknown): value is T {
  return Object.prototype.toString.call(value) === "[object Function]";
}
