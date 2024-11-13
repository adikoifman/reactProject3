import React from "react";

const apiRequests = async (url, optionsObj = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error(" 404 page not found!");
    const data = await response.json();
  } catch (err) {
    console.log("err: ", err);
  } finally {
    return { data };
  }
};
export default apiRequests;
