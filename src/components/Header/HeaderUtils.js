import { getAuth, onAuthStateChanged } from "firebase/auth";

export const hello = () => {
  const auth = getAuth();
  if(auth.currentUser){
    return true;
  }
  else{
    return false;
  }
};

export const BtnAddPatient = (props) => {
  console.log(props);
};
