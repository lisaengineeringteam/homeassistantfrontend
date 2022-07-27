import { ThirdEye } from "../../types";

export const subscribePollingCollection = (
  hass: ThirdEye,
  updateData: (hass: ThirdEye) => void,
  interval: number
) => {
  let timeout;
  const fetchData = async () => {
    try {
      await updateData(hass);
    } finally {
      timeout = setTimeout(() => fetchData(), interval);
    }
  };
  fetchData();
  return () => clearTimeout(timeout);
};
