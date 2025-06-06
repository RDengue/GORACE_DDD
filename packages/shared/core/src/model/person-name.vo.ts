export default class PersonName {
  readonly value: string;

  constructor(value: string, min: number = 3, max: number = 80) {
    this.value = value;

    if (!value) {
      throw new Error("person-name.is-empty");
    }

    if (value.length < min) {
      throw new Error("person-name.too-short");
    }
    if (value.length > max) {
      throw new Error("person-name.too-long");
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      throw new Error("person-name.invalid");
    }

    const names = value.split(" ");
    if (names.length < 2) {
      throw new Error("person-name.surname-missing");
    }
  }

  initials(): string {
    const names = this.value.split(" ");
    const initials = names
      .map((name) => name.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
    return initials;
  }

  static isValid(value: string): boolean {
    try {
      new PersonName(value);
      return true;
    } catch (error) {
      return false;
    }
  }
}
