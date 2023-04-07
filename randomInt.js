export function randomInt (min,max) {
    if (typeof min !== "number" || typeof max !== "number") throw TypeError("bad number");
    if (min >= max) throw TypeError("bad number");
    let patchNumber = 0;
    if (min === 0) {
      min += 1; max += 1; patchNumber += 1;
    } else if (max === 0) {
      min -= 1; max -= 1; patchNumber -= 1;
    }
    let int = false;
    while (!int) {
      const random = Math.round(Math.random() * max * 10);
      if (random >= min && random <= max) int = random;
    }
    return int - patchNumber;
}
