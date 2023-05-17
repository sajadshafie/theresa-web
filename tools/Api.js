import config from "../config/Globals";
import FormData from "form-data";
// import moment from 'moment-jalaali';

module.exports = {
  getSearchItems: (successCallback, errorCallback, where, string) => {
    config
      .axiosHandle()
      .get(`/base/${where}/${string}`, {})
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        console.warn(error.response);
        errorCallback(error);
      });
  },
  processSignup: (successCallback, errorCallback, body) => {
    config
      .axiosHandle()
      .post("/signup", body)
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        errorCallback(error);
      });
  },
  processForgetPassword: (successCallback, errorCallback, body) => {
    config
      .axiosHandle()
      .post("/forgetpassword", body)
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        errorCallback(error);
      });
  },
  processSetPassword: (successCallback, errorCallback, body) => {
    config
      .axiosHandle()
      .post("/setpassword", body)
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        errorCallback(error);
      });
  },

  getUserInfo: (successCallback, errorCallback, body) => {
    config
      .axiosHandle()
      .post("/user/info", body)
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        errorCallback(error);
      });
  },

  processConfirm: (successCallback, errorCallback, body) => {
    config
      .axiosHandle()
      .post("/confirm", body)
      .then((response) => {
        successCallback(response);
      })
      .catch((error) => {
        errorCallback(error);
      });
  },
};
