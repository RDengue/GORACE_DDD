export default interface UseCase<IN, OUT, U = { email: string }> {
  execute(input: IN, user?: U): Promise<OUT>;
}
