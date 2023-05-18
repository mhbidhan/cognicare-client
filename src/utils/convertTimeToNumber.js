import moment from 'moment';

const convertTimeToNumber = () => {
  const formatedTime = moment(new Date()).format('LT');
  const splitedTime = formatedTime.split(/:| /);
  const convertedTime =
    splitedTime[2] === 'AM'
      ? splitedTime
      : splitedTime.map((val, idx) => (idx === 0 ? +val + 12 : val));
  return {
    timeInNumber: +convertedTime.slice(0, 2).join(''),
    timeInString: formatedTime,
  };
};

export default convertTimeToNumber;
