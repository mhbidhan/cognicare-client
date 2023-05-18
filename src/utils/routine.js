export const convertToChart = (routine) => {
  const item = {};
  const activityType = routine.activityType;
  item.title = routine[activityType].name;
  item.description = routine[activityType].description;
  item.time = routine.startTime.timeInString;
  item.type = activityType;
  return item;
};

export const compareFn = (a, b) => {
  const aStartTime = a.startTime.timeInNumber;
  const bStartTime = b.startTime.timeInNumber;
  if (aStartTime < bStartTime) return -1;
  if (aStartTime > bStartTime) return 1;
  return 0;
};

export const sortRoutine = (routines) => {
  routines.sort(compareFn);
};
