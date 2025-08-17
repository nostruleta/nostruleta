import crypto from "crypto"

/**
 * Uses a seed to generate a sha256 hash, and modulo to get an integer between
 * min and max. Performs rejection sampling to remove modulo bias.
 * 
 * @param {string} seed 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function intFromSeed(seed, min, max) {
  const range = BigInt(max - min + 1);
  const maxValidValue = (1n << 256n) - ((1n << 256n) % range);
  let counter = 0;
  while (true) {
    const hash = crypto.createHash("sha256")
      .update(seed + counter.toString())
      .digest("hex");
    const bigVal = BigInt(`0x${hash}`);
    
    if (bigVal < maxValidValue) {
      return Number(bigVal % range) + min;
    }
    counter++;
  }
}

function getRouletteColor(n) {
  if (n < 0 || n > 37) throw new Error("Number must be 0–37 (37 = 00)");
  if (n === 0 || n === 37) return "green";
  const red = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
  return red.has(n) ? "red" : "black";
}

for (let i=0; i<10; i++) {
  const num = intFromSeed(Math.random().toString() + i.toString(), 0, 37)
  console.log(num, getRouletteColor(num))
}
