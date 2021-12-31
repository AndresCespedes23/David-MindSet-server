const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

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
  const availability = {};
  weekDays.forEach((day) => {
    // prettier-ignore
    availability[day] = timeRange[day].from
      ? getAvailableHours(timeRange[day].from, timeRange[day].to)
      : [];
  });
  return availability;
};

const getCurrentWeek = () => {
  const currentDay = new Date();
  let newDay;
  const currentWeek = [];
  for (let i = 0; i < 5; i++) {
    if (currentWeek.length) {
      if (newDay.day === 'friday') currentDay.setDate(currentDay.getDate() + 3);
      else currentDay.setDate(currentDay.getDate() + 1);
    }
    newDay = {
      day: weekDays[currentDay.getDay() - 1],
      number: currentDay.getDate(),
    };
    currentWeek.push(newDay);
  }
  return currentWeek;
};

module.exports = {
  weekDays,
  getAvailableHours,
  checkEmptyTimeRange,
  getAvailability,
  getCurrentWeek,
};
