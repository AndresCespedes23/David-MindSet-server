const Psychologists = require('../models/Psychologists');
const Candidates = require('../models/Candidates');
const Sessions = require('../models/Sessions');
const Interviews = require('../models/Interviews');

const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const weekDaysCandidate = ['mon', 'tue', 'wed', 'thu', 'fri'];

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
const checkEmptyTimeRangeCandidates = (timeRange) => (
  timeRange.mon.startTime
  || timeRange.tue.startTime
  || timeRange.wed.startTime
  || timeRange.thu.startTime
  || timeRange.fri.startTime
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
const getAvailabilityCandidate = (timeRange) => {
  const availability = {};
  weekDaysCandidate.forEach((day) => {
    // prettier-ignore
    availability[day] = timeRange[day].startTime
      ? getAvailableHours(timeRange[day].startTime, timeRange[day].endTime)
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
const getCurrentWeekCandidate = () => {
  const currentDay = new Date();
  let newDay;
  const currentWeek = [];

  if (currentDay.getDay() === 0) currentDay.setDate(currentDay.getDate() + 1);
  else if (currentDay.getDay() === 6) currentDay.setDate(currentDay.getDate() + 2);

  for (let i = 0; i < 5; i++) {
    if (currentWeek.length) {
      if (newDay.day === 'fri') currentDay.setDate(currentDay.getDate() + 3);
      else currentDay.setDate(currentDay.getDate() + 1);
    }
    newDay = {
      day: weekDaysCandidate[currentDay.getDay() - 1],
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

const getAvailableDatesCandidate = async (idCandidate) => {
  const availableDates = [];
  const currentWeek = getCurrentWeekCandidate();
  const candidate = await Candidates.findById(idCandidate);
  if (candidate.isActive === false) return 'Candidate not active';
  if (checkEmptyTimeRangeCandidates(candidate.timeRange)) {
    const availableTimeRange = getAvailabilityCandidate(candidate.timeRange);
    const availability = [];
    const interviews = await Interviews.find({
      idCandidate: candidate._id,
      status: 'pending',
    });
    currentWeek.forEach((day) => {
      const existingInterviews = interviews.filter(
        (interview) => weekDaysCandidate[interview.date.getDay()] === day.day,
      );
      let availableHours = availableTimeRange[day.day];
      existingInterviews.forEach((interview) => {
        availableHours = availableHours.filter((hour) => hour !== interview.time);
      });
      availability.push({ day: day.day, number: day.number, hours: availableHours });
    });
    const element = {
      id: candidate._id,
      name: `${candidate.firstName} ${candidate.lastName}`,
      availability,
    };
    availableDates.push(element);
  }
  return availableDates;
};

module.exports = {
  getCurrentWeek,
  getAvailableDates,
  getCurrentWeekCandidate,
  getAvailableDatesCandidate,
};
