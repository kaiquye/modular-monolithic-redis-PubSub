export class GenerateNumber {
  static generate(): string {
    let randomNumber = '';
    for (let i = 0; i < 15; i++) {
      const digit = Math.floor(Math.random() * 10);
      randomNumber += digit;
    }
    return randomNumber;
  }
}
