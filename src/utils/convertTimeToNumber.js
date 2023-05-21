import moment from 'moment';

const convertTimeToNumber = () => {
  const formatedTime = moment(new Date()).format('LT');
  console.log('formatedTime', formatedTime);
  const splitedTime = formatedTime.split(/:| /);
  const convertedTime =
    splitedTime[2] === 'AM'
      ? splitedTime
      : splitedTime.map((val, idx) =>
          idx === 0 ? (val !== '12' ? +val + 12 : +val) : val
        );
  return {
    timeInNumber: +convertedTime.slice(0, 2).join(''),
    timeInString: formatedTime,
  };
};

export default convertTimeToNumber;
