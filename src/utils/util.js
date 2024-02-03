import axios from "axios";

const adminUrl = import.meta.env.VITE_APP_ADMIN_API;

export const getYearMonthDifference = (joiningDate, lastDate) => {
  const currentDate = lastDate ? new Date(lastDate) : new Date();
  const inputDateParts = joiningDate.split("-");
  const inputYear = parseInt(inputDateParts[0]);
  const inputMonth = parseInt(inputDateParts[1]) - 1;
  const inputDay = parseInt(inputDateParts[2]);

  const inputDateObject = new Date(inputYear, inputMonth, inputDay);
  const timeDifference = currentDate - inputDateObject;

  const startYear = inputDateObject.getFullYear();
  const startMonth = inputDateObject.toLocaleString("default", {
    month: "short",
  });

  const endYear = currentDate.getFullYear();
  const endMonth = currentDate.toLocaleString("default", { month: "short" });

  const years = Math.floor(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (timeDifference % (365.25 * 24 * 60 * 60 * 1000)) /
      (30.44 * 24 * 60 * 60 * 1000)
  );
  const days = Math.floor(
    (timeDifference % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
  );

  let result = `${startMonth} ${startYear} - ${endMonth} ${endYear} (`;

  if (years > 0) {
    result += `${years} years `;
  }
  if (months > 0) {
    result += `${months} months `;
  }
  if (days > 0) {
    result += `${days} days `;
  }

  // Remove trailing space and add closing parenthesis
  result = result.trim() + ")";

  return result;
};

export const fetchvisitorData = async () => {
  const {
    city,
    country_name,
    country_code,
    country_calling_code,
    country_capital,
    currency,
    ip,
    latitude,
    longitude,
    region,
  } = await fetch("GET", "", {}, {}, {}, "https://ipapi.co/json/");
  return {
    city,
    country_name,
    country_code,
    country_calling_code,
    country_capital,
    currency,
    ip,
    latitude,
    longitude,
    state: region,
  };
};

export const fetch = async (
  req,
  path,
  data = {},
  headers = {},
  params = {},
  baseUrl
) => {
  const url = baseUrl ?? adminUrl;
  try {
    const config = {
      method: req,
      url: url + path,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      params: params,
      data: req !== "GET" ? data : null,
      paramsSerializer: (params) => {
        return Object.keys(params)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
      },
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    // if (error.response && error.response.status === 401) {
    //   // Redirect to /login if status code is 401
    //   window.location.href = "/login";
    // }
    // throw error;
  }
};

export const getUserName = () => {
  let path = window.location.pathname;
  if (path.length > 1) {
    window.location.pathname = "";
    return path.split("/")[0];
  }
};

export function changeFaviconAndTitle(newFaviconUrl, newTitle) {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = newFaviconUrl;
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = newFaviconUrl;
    document.head.appendChild(newFavicon);
  }

  document.title = newTitle;
}

export const getParagraphFromText = (text) => text.split("<br>");

export const getRandomColor = () => {
  let previousColors = [];

  return () => {
    const colorArray = [
      "text-blue-500",
      "text-green-500",
      "text-pink-500",
      "text-orange-500",
      "text-yellow-500",
      "text-purple-500",
      "text-red-500",
      "text-cyan-500",
      "text-teal-500",
      "text-lime-500",
      "text-pink-500",
    ];

    // Filter out previously used colors
    const availableColors = colorArray.filter(
      (color) => !previousColors.includes(color)
    );

    // If all colors have been used, reset the array
    if (availableColors.length === 0) {
      previousColors = [];
    }

    // Get a random index from the available colors
    const randomIndex = Math.floor(Math.random() * availableColors.length);

    // Get the random color and add it to the previously used colors
    const randomColor = availableColors[randomIndex];
    previousColors.push(randomColor);

    return randomColor;
  };
};
