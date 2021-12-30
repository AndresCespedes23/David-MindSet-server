const getAvailableHours = (from, to) => {
  const hours = [];
  for (let i = from; i < to; i++) {
    hours.push(i);
  }
  return hours;
};

// prettier-ignore
const checkEmptyTimeRange = (timeRange) => (
  timeRange.monday.from
  || timeRange.tuesday.from
  || timeRange.wednesday.from
  || timeRange.thursday.from
  || timeRange.friday.from
);

const getAvailability = (timeRange) => {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const availability = {};
  days.forEach((day) => {
    // prettier-ignore
    availability[day] = timeRange[day].from
      ? getAvailableHours(timeRange[day].from, timeRange[day].to)
      : [];
  });
  return availability;
};

module.exports = {
  getAvailableHours,
  checkEmptyTimeRange,
  getAvailability,
};
