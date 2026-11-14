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

module.exports = { average, getName };

function max(arr) {
  return Math.max(...arr);
}
module.exports.max = max;
