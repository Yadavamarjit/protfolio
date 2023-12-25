import axios from "axios";

const adminUrl = import.meta.env.VITE_APP_ADMIN_API;

export const getYearMonthDifference = (inputDate) => {
  const currentDate = new Date(2023, 7, 21);
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
