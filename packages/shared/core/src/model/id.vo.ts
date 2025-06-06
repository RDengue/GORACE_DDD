import { v4 as uuid, validate } from "uuid";

export default class Id {
  constructor(readonly value?: string) {
    this.value = value ?? uuid();

    if (!Id.isValid(this.value)) {
      throw new Error("id.not-uuid");
    }
  }

  static createHash(): string {
    return uuid();
  }

  static isValid(value: string): boolean {
    return validate(value);
  }
}
