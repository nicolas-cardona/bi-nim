import { Injectable } from '@nestjs/common';

@Injectable()
export class StrategyService {

  // Function that returns a list with two numbers. The first one is
  // a number contained in the array of the entry and the second one
  // is the value that should substracted to the first one to gurantee
  // the victory. If this is not possible, it returns null.
  public selectionWinningStrategy(integersArray: number[]): number[] {
    const arrayCopy = [...integersArray];
    const arraySorted = arrayCopy.sort((a: number, b: number) => a - b);
    let answer = null;

    for (let i = 0; i < 3; i++) {
      const integer = this.binarySetsEqualizer(
        arraySorted[i],
        arraySorted[(i + 1) % 3],
        arraySorted[(i + 2) % 3],
      );
      if (integer > 0) {
        answer = [arraySorted[(i + 2) % 3], integer];
        break;
      }
    }
    return answer;
  }

  // Function that returns a list with two numbers. The first one is
  // a number contained in the array of the entry and the second one
  // is a random value that can be substracted to the first one.
  public selectionRandomStrategy(integersArray: number[]): number[] {
    const arrayCopy = [...integersArray];
    const arraySorted = arrayCopy.sort((a: number, b: number) => a - b);
    const arraySortedWithZero = [0].concat(arraySorted);
    let answer = null;

    for (let i = 3; i > 0; i--) {
      if (arraySortedWithZero[i - 1] < arraySortedWithZero[i]) {
        const integer = this.getRandomInt(
          1,
          arraySortedWithZero[i] - arraySortedWithZero[i - 1],
        );

        answer = [arraySortedWithZero[i], integer];
        break;
      }
    }
    return answer;
  }

  // Given 3 non-negative integers x, y and z this function returns
  // the integer that should be substracted from z in order that the
  // binary set (a set obtained by using the function getBinarySet)
  // of this difference is equal to the symetric difference of the
  // binary sets of x and y. If this is not possiible it returns -1.
  private binarySetsEqualizer(x: number, y: number, z: number): number {
    if (x < 0 || y < 0 || z < 0) {
      throw new Error('integers must be non-negative');
    }
    const xBinarySet = this.getBinarySet(x);
    const yBinarySet = this.getBinarySet(y);
    const delta = this.symmetricDifference(xBinarySet, yBinarySet);
    const deltaNumeric = this.getNumericExpression(delta);
    if (deltaNumeric < z) {
      return z - deltaNumeric;
    } else {
      return -1;
    }
  }

  // Function that computes the symmetric difference of two sets.
  private symmetricDifference(
    set1: Set<number>,
    set2: Set<number>,
  ): Set<number> {
    const delta = new Set(set1);
    for (const element of set2) {
      if (set1.has(element)) {
        delta.delete(element);
      } else {
        delta.add(element);
      }
    }
    return delta;
  }

  // Function that generates a set of numbers encoding the binary
  // expression of a non-negative integer. For example :
  // The empty set corresponds to zero.
  // {0} corresponds to 1 (2**0 = 1)
  // {1} corresponds to 2 (2**1 = 2)
  // {0, 1} corresponds to 3 (2**0 + 2**1 = 3) ... and so on.
  private getBinarySet(integer: number): Set<number> {
    if (integer < 0) {
      throw new Error('integer must be non-negative');
    }
    const binaryExpression = this.getBinaryExpression(integer);
    const revertedBinaryExpression = this.getReverse(binaryExpression);
    const mySet = new Set<number>();
    const n = binaryExpression.length;
    for (let i = 0; i < n; i++) {
      if (revertedBinaryExpression[i] === '1') {
        mySet.add(i);
      }
    }
    return mySet;
  }

  // This function is the inverse of getBinarySet
  private getNumericExpression(set: Set<number>) {
    let integer = 0;
    for (const element of set) {
      integer += 2 ** element;
    }
    return integer;
  }

  // Function that returns a number in its binary expression.
  private getBinaryExpression(integer: number): string {
    return integer.toString(2);
  }

  // Function that reverse a string
  private getReverse(word: string): string {
    return word.split('').reverse().join('');
  }

  // Function that generates a random integer in the interval [minimum, supremum)
  // If minimum = supremum, it returns this value
  public getRandomInt(minimum: number, supremum: number) {
    if (minimum <= supremum) {
      return Math.floor(Math.random() * (supremum - minimum) + minimum);
    } else {
      throw new Error('supremumm must be greater or equal than minimum');
    }
  }
}
