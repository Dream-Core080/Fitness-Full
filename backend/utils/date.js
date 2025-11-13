
function calculateDayDifference (date1, date2) {
  // Calculate time difference in milliseconds
  const timeDifference = Math.abs(date2 - date1);

  // Convert to days
  const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

  return daysDifference;
};

module.exports = {
  calculateDayDifference
}