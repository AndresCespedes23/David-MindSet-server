const Psychologists = require('../models/Psychologists');
const Sessions = require('../models/Sessions');

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

  if (currentDay.getDay() === 0) currentDay.setDate(currentDay.getDate() + 1);
  else if (currentDay.getDay() === 6) currentDay.setDate(currentDay.getDate() + 2);

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

const getAvailableDates = async () => {
  const availableDates = [];
  const currentWeek = getCurrentWeek();
  const psychologists = await Psychologists.find({ isActive: true });
  await Promise.all(
    psychologists.map(async (psychologist) => {
      if (checkEmptyTimeRange(psychologist.timeRange)) {
        const availableTimeRange = getAvailability(psychologist.timeRange);
        const availability = [];
        const sessions = await Sessions.find({
          idPsychologist: psychologist._id,
          status: 'pending',
        });
        currentWeek.forEach((day) => {
          const existingSessions = sessions.filter(
            (session) => weekDays[session.date.getDay()] === day.day,
          );
          let availableHours = availableTimeRange[day.day];
          existingSessions.forEach((session) => {
            availableHours = availableHours.filter((hour) => hour !== session.time);
          });
          availability.push({ day: day.day, number: day.number, hours: availableHours });
        });
        const element = {
          id: psychologist._id,
          name: `${psychologist.firstName} ${psychologist.lastName}`,
          availability,
        };
        availableDates.push(element);
      }
    }),
  );
  return availableDates;
};

module.exports = {
  getCurrentWeek,
  getAvailableDates,
};
