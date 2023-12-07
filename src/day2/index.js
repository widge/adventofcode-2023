import {convertInputFileToArray} from "../utils/utils.js";

const input = convertInputFileToArray('./src/day2/input.txt');
/**
 * Take arrays of individual cube sets and build into array of maps to represent them
 */
const createGameCubeMapping = (gameArray) => {

  return gameArray.map(gameString => {
    return gameString.split(", ")
      .reduce((acc, cubes) => {
        const [cubeCount, cubeColour] = cubes.split(" ");
        acc[cubeColour] = +cubeCount;
        return acc;
      }, {});
  })
}

const getFormattedGameData = () => {
  const gameData = {};
  input.forEach(game => {
    let [gameId, cubes] = game.split(": ");
    gameId = gameId.replace("Game ",'');
    gameData[gameId] = createGameCubeMapping(cubes.split("; "));
  });

  return gameData;
};

const getLargestCubeCountPerGame = (gameData) => {
  return gameData.reduce((acc, hand) => {
    if(hand.hasOwnProperty("red")){
      acc.red = hand.red > acc.red ? hand.red : acc.red;
    }
    if(hand.hasOwnProperty("green")){
      acc.green = hand.green > acc.green ? hand.green : acc.green;
    }
    if(hand.hasOwnProperty("blue")){
      acc.blue =  hand.blue > acc.blue ? hand.blue : acc.blue;
    }
    return acc;
  }, {red: 0, green: 0, blue: 0});
}

export const task1 = () => {

  const gameData = getFormattedGameData();
  const bagContents = {red: 12, green: 13, blue: 14};

  let sumOfPossibleGameIds = 0;
  for (const gameId in gameData) {
    // create a map of largest cube numbers by colour per game
    const largestGameData = getLargestCubeCountPerGame(gameData[gameId]);
    switch (true) {
      case largestGameData.red > bagContents.red:
      case largestGameData.green > bagContents.green:
      case largestGameData.blue > bagContents.blue:
        break;
      default:
        sumOfPossibleGameIds += parseInt(gameId);
        break;
    }
  }

  return sumOfPossibleGameIds;
}

export const task2 = () => {

  const gameData = getFormattedGameData();

  let sumOfGamePower = 0;
  for (const gameId in gameData) {
    // create a map of largest cube numbers by colour per game
    const largestGameData = getLargestCubeCountPerGame(gameData[gameId]);

    let gamePower = 1;
    if(largestGameData.hasOwnProperty("red")){
      gamePower = largestGameData.red*gamePower;
    }
    if(largestGameData.hasOwnProperty("green")){
      gamePower = largestGameData.green*gamePower;
    }
    if(largestGameData.hasOwnProperty("blue")){
      gamePower = largestGameData.blue*gamePower;
    }

    sumOfGamePower += parseInt(gamePower);
  }

  return sumOfGamePower;
}