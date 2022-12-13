import moment from "moment";

export const fun1 = (key, DOD) => {
  switch (key) {
    case "1":
      return moment(DOD).add(45, "days").isAfter(new Date());
    case "2":
      return moment(DOD).add(75, "days").isAfter(new Date());
    case "3":
      return moment(DOD).add(105, "days").isAfter(new Date());
    case "4":
      return moment(DOD).add(10, "months").isAfter(new Date());
    default:
      return false;
  }
};
