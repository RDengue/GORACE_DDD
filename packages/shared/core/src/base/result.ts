export default class Result<T> {
  constructor(
    readonly value: T,
    readonly errors: any[] = []
  ) {}

  static ok<T>(value: any): Result<T> {
    return new Result(value);
  }

  static fail<T>(errors: any[]): Result<T> {
    return new Result<T>(undefined as any, errors);
  }

  static try<T>(fn: () => any): Result<T> {
    try {
      return Result.ok(fn());
    } catch (error) {
      return Result.fail([error]);
    }
  }

  static async trySync<T>(fn: () => Promise<any>): Promise<Result<T>> {
    try {
      const result = await fn();
      return Result.ok(result);
    } catch (error) {
      return Result.fail([error]);
    }
  }

  static combine(results: (Result<any> | null)[]): Result<any> {
    const errors = results.filter((e) => e).flatMap((result) => result!.errors);
    return errors.length > 0 ? Result.fail(errors) : Result.ok(undefined);
  }

  throwIfFailed(): any {
    if (this.failed) {
      const msg = this.errors.map((e) => e.message).join(",");
      throw new Error(msg);
    }
  }

  get succeeded(): boolean {
    return this.errors.length === 0;
  }

  get failed(): boolean {
    return !this.succeeded;
  }
}
