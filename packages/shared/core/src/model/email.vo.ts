export default class Email {
    constructor(readonly value: string) {
        if (!Email.isValid(value)) {
            throw new Error('email.invalid');
        }
    }

    static isValid(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}