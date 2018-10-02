/**
 * Returns a random integer below the max provided
 * @param {number} max
 * @returns {number}
 */
function getRandomInt(max = 0) {
  if (max !== 0) {
    return Math.floor(Math.random() * Math.floor(max));
  } else {
    throw new Error(`Error: ${max} passed to getRandomeInt`)
  }
}

export default getRandomInt; 
