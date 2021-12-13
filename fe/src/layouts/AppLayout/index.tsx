import React, { useEffect } from "react";
import MainNavigation from "../../navigation";

export default function AppLayout() {
  useEffect(() => {
    const token = localStorage.getItem("remains.token") || "";
    if (token) {
      // dispatch(getUserDataRequest())
      // dispatch(getCalendarsRequest())
    } else {
      // console.error('Token is not found!')
    }
  }, []);

  return <MainNavigation />;
}
