import * as dayjs from "dayjs";

export const useDayjs = () => {
  const dayJs = (date) => dayjs(date);
  return { dayJs };
};
