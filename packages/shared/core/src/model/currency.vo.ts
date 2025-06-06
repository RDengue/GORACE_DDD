export default class Currency {
  readonly value: number;

  constructor(value: number) {
    this.value = value;

    if (value === undefined || value === null) {
      throw new Error("currency.is-empty");
    }

    if (isNaN(value)) {
      throw new Error("currency.invalid");
    }
  }

  static isValid(value: number): boolean {
    try {
      new Currency(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
