export const getYearMonthDifference = (inputDate) => {
  const currentDate = new Date();
  const inputDateParts = inputDate.split(":");
  const inputYear = parseInt(inputDateParts[2]);
  const inputMonth = parseInt(inputDateParts[1]) - 1; // JavaScript months are zero-indexed
  const inputDay = parseInt(inputDateParts[0]);

  const inputDateObject = new Date(inputYear, inputMonth, inputDay);
  const timeDifference = currentDate - inputDateObject;

  const years = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (timeDifference % (365.25 * 24 * 60 * 60 * 1000)) /
      (30.44 * 24 * 60 * 60 * 1000)
  );

  return `${years} years ${months} months`;
};

export const fetchUserData = async () => await fetch("https://ipapi.co/json/");
