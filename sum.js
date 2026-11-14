// Returns the average of the numbers in arr
function average(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
}

function getName(user) {
  return user?.profile?.name?.toUpperCase();
}

function clamp(val, min, max) {
  if (min > max) throw new RangeError('min must be <= max');
  return Math.min(Math.max(val, min), max);
}

module.exports = { average, getName, clamp };
