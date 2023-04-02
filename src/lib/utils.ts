// Get a random integer in a range min-max
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

import { PLAYER_X, PLAYER_O } from "./constants";

export const switchPlayer = (player: number) => {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};
