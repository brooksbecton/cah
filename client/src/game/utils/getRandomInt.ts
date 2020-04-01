/**
 * Returns a random integer below the max provided
 */
function getRandomInt(max = 0) {
  if (max !== 0) {
    return Math.floor(Math.random() * Math.floor(max));
  } else {
    throw new Error(`Error: ${max} passed to getRandomInt`);
  }
}

export default getRandomInt;
