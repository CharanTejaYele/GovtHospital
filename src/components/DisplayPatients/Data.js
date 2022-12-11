import moment from "moment";

export const fun1 = (key, DOB) => {
  switch (key) {
    case "1":
      return moment(DOB).add(45, "days").isAfter(new Date());
    case "2":
      return moment(DOB).add(75, "days").isAfter(new Date());
    case "3":
      return moment(DOB).add(105, "days").isAfter(new Date());
    case "4":
      return moment(DOB).add(10, "months").isAfter(new Date());
    default:
      return false;
  }
};
