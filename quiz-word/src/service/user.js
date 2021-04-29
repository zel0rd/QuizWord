import firebase from "../config/firebase-config";

const getUsers = async () => {
  let result = "";
  await firebase
    .auth()
    .User()
    .then((res) => {
      result = res;
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

const delUser = async () => {
    const user = await firebase.auth().currentUser;
    console.log(user)
    user.delete()
    .then(function() {
        console.log("success")
    })
    .catch (function() {
        console.log("fail")
    })
}

export { delUser, getUsers};