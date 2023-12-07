import {convertInputFileToArray} from "../utils/utils.js";

const input = convertInputFileToArray('./src/day1/input.txt');
export const task1 = () => {

  const calibrationValues = input.map((calibrationString) => {
    // strip out non numeric values and get first and last
    const calibrationNumbers = calibrationString.replace(/\D/g,'');
    return `${calibrationNumbers[0]}${calibrationNumbers.slice(-1)}`;
  });

  //get sum
  return calibrationValues.reduce((acc, calibrationValue) => acc += +calibrationValue, 0);
}

export const task2 = () => {

  const numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  //looks weird but handles overlapping number strings
  const replacements = ["o1e","t2o","t3e","f4r","f5e","s6x","s7n","e8t","n9e"];

  const calibrationValues = input.map((calibrationString) => {
    // Use custom replaceMultiple to save having to call replace over and over
    // swap strings into numbers but leave first and last chars to cater for overlaps then
    // behave the same way as for task 1
    let calibrationNumbers = calibrationString
      .replaceMultiple(numberStrings, replacements)
      .replace(/\D/g,'');
    return `${calibrationNumbers[0]}${calibrationNumbers.slice(-1)}`;
  });

  return calibrationValues.reduce((acc, calibrationValue) => {
    return +calibrationValue + acc
  }, 0);
}