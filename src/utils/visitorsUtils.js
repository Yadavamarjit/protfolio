import { fetch, fetchvisitorData } from "./util";

export const addVisitors = async () => {
  try {
    const visitorData = await fetchvisitorData();
    const data = await fetch("POST", "visitor/", {
      adminEmail: localStorage.getItem("email"),
      ...visitorData,
    });
    localStorage.setItem("visitorId", data.id);
  } catch (err) {
    console.log(err);
  }
};
