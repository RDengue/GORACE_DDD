export default class SimpleName {
  readonly value: string;

  constructor(value: string, min: number = 3, max: number = 80) {
    this.value = value;

    if (!value) {
      throw new Error("simple-name.is-empty");
    }

    if (value.length < min) {
      throw new Error("simple-name.too-short");
    }
    if (value.length > max) {
      throw new Error("simple-name.too-long");
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      throw new Error("simple-name.invalid");
    }
  }

  static isValid(value: string): boolean {
    try {
      new SimpleName(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
