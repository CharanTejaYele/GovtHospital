export const Validate = (value, type) => {
  switch (type) {
    case "WifeOf":
      if (/^[a-zA-Z ]+$/.test(value)) {
        return "";
      } else {
        return "Wife Of can only contain alphabet";
      }
    case "MotherName":
      if (/^[a-zA-Z ]+$/.test(value)) {
        return "";
      } else {
        return "Mother Name can only contain alphabet";
      }
    case "VillageName":
      if (/^[a-zA-Z ]+$/.test(value)) {
        return "";
      } else {
        return "Village can only contain alphabet";
      }
    case "PhoneNumber":
      // console.log((value));
      if (/^[0-9]{9}$/.test(value)) {
        return "";
      } else {
        return "Phone Number should contain 10 digits";
      }
    case "MotherAadharNumber":
      if (/^[0-9]{11}$/.test(value)) {
        return "";
      } else {
        return "Aadhar card number should contain 12 digits";
      }
    default:
      return true;
  }
};
