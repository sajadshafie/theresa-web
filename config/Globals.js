"use strict";

import axios from "axios";
import Cookies from "js-cookie";
axios.interceptors.request.use((request) => {
  return request;
});
//var jalaali = require("jalaali-js");

//BASE_API_URL: 'http://www.pakan.ir:81/api/v0.1/',
//BASE_API_TOKEN_URL: 'http://www.pakan.ir:81/api/',\
//https://www.pakan24.com:444/terms-and-conditions

module.exports = {
  STORE_KEY: "",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  formatMobileNumber: function (text) {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      console.log(match)
      console.log(cleaned)
      
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  },

  APP_ENV: false,
  getFormatDate: function (date) {
    if (date) {
      let d = new Date(date);
      return (
        d.getDate() +
        " " +
        module.exports.monthNames[d.getMonth() + 1] +
        " " +
        d.getFullYear()
      );
    } else {
      return "0";
    }
  },
  formatNumber: function (input) {
    if (input) {
      return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0";
    }
  },
  //http://51.79.38.102/
  //'http://192.168.1.109
  //domainURL: "https://www.plitio.com/",
  domainURL: "https://www.plitio.com/",

  baseURL: "/",
  udata: null,
  axiosUploadHandle: () => {
    return axios.create({
      baseURL: `${module.exports.baseURL}api/v0`,
      headers:
        module.exports.udata && module.exports.udata.at
          ? {
              Accept: "application/json",
              //  'Access-Control-Allow-Origin': '*',
              "Content-Type":
                "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d",
              //    Authorization: module.exports.udata.at,
            }
          : {
              Accept: "application/json",
              //   'Access-Control-Allow-Origin': '*',
              "Content-Type":
                "multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d",
              //    Authorization: 'guest',
            },
    });
  },
  axiosHandle: () => {
    //console.log(module.exports.udata);
    return axios.create({
      baseURL: `${module.exports.baseURL}api/v0/`,
      headers:
        module.exports.udata && module.exports.udata.at
          ? {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",

              "Content-Type": "application/json",
              Authorization: module.exports.udata.at,
            }
          : {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
              "Content-Type": "application/json",
              Authorization: "guest",
            },
    });
  },
  setFirstTime: () => {
    Cookies.set("plitiofirsttime", JSON.stringify("true"));
  },
  removeFirstTime: () => {
    Cookies.remove("plitiofirsttime");
  },
  getFirstTime: () => {
    if (Cookies.get("plitiofirsttime")) {
      return true;
    } else {
      return null;
    }
  },
  setTransfer: (data) => {
    Cookies.set("plitiotransferdata", JSON.stringify(data));
  },
  removeTransfer: () => {
    Cookies.remove("plitiotransferdata");
  },
  getTransfer: () => {
    return JSON.parse(Cookies.get("plitiotransferdata"));
  },

  setTransferDone: () => {
    Cookies.set("transferdone", JSON.stringify("true"));
  },
  removeTransferDone: () => {
    Cookies.remove("transferdone");
  },
  getTransferDone: () => {
    if (Cookies.get("transferdone")) {
      return true;
    } else {
      return null;
    }
  },
  setAuth: (user) => {
    if (typeof user === "object" && user !== null) {
      Cookies.set("plitiouser", JSON.stringify(user));

      module.exports.udata = user;
    } else {
      console.log("user problem");
    }
  },

  logoutUser: () => {
    Cookies.remove("plitiofirsttime");
    Cookies.remove("plitiouser");
    Cookies.remove("plitiouser", { path: "/" });
    Cookies.remove("plitiofirsttime", { path: "/" });
    module.exports.udata = null;
    document.cookie = "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  getUser: () => {
    if (Cookies.get("plitiouser")) {
      return JSON.parse(Cookies.get("plitiouser"));
    } else {
      return null;
    }
  },

  checkAuth: () => {
    const user = module.exports.getUser();
    if (user && user.token) {
      module.exports.udata = user;
      return true;
    } else {
      return false;
    }
  },
  timeSince: (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },
  APP_VERSION: "1.8.0",
  SHARE_URL: "https://www.pakan24.com",
  SERVICE_EXTERNAL_LINK: "https://www.pakan24.com/terms-and-conditions",
  CERTIFICATE_EXTERNAL_LINK: "https://www.pakan24.com/certificates",
  BASE_API_URL: "https://www.pakan24.com/api/v0.1/",
  BASE_API_TOKEN_URL: "https://www.pakan24.com/api/",
  PROGRESS_COLOR: "#0054a6",
  STORAGE_SIZE: 1000,
  STATE: {
    0: "در حال بررسی",
    10: "در حال دریافت",
    11: "در حال انجام",
    20: "در حال انجام",
    40: "آماده شد",
    45: "در حال ارسال",
    50: "در حال ارسال",
    51: "تحویل شد",
  },
  // constants

  NOTES: {
    TRANSFER: "بزودی منتقل می شوید",
    PROGRESS: "لطفا صبر کنید",
    EMAIL: "ایمیل ضروری می باشد",
    EMAIL_CODE_GENERATE: " لینک فعالسازی به ایمیل شما ارسال شد. ",
    EMAIL_NOT_CONFIRM: " آدرس ایمیل تایید نشده است  ",
    REQUIRE_ALL: "پرکردن همه موارد لازمست.",
    REGISTER_SUCCESS: "به خانواده پاکان خوش آمدید.",
    LOGIN_SUCCESS: "سلام! خوش آمدید",
    RESET_PASS_SUCCESS: "کلمه عبور با موفقیت تغییر کرد. ",
    NETWORK: " اینترنت فعال نمی باشد ",
    SAVE: " اطلاعات شما با موفقیت ثبت شد.  ",
    REGISTER_CODE_REQUIRED: "وارد کردن کد فعال‌سازی لازمست.",
    REGISTER_MIN_PASS_REQUIRED: "کلمه عبور باید حداقل چهار کاراکتر باشد.",
    REGISTER_PROCESS_ERROR: "خطا هنگام پردازش لطفا دقایقی بعد تلاشش نمایید",
    RESET_CODE_WRONG: "کد فعال‌سازی اشتباهست!",
    RESET_REAPEATPASS_WRONG: "تکرار کلمه عبور صحیح نمی باشد.",
    REMOVE_ADDRESS: "نشانی مورد نظر با موفقیت حذف شد.",
    ADDRESS_ADD_SUCCESS: "نشانی با موفقیت ثبت شد. ",
  },
  BASE: {
    FONTSIZELARGE: 30,
    FONTSIZE: 25,
    FONTSIZEMEDIUM: 20,
  },
  COLOR: {
    ORANGE: "#C50",
    WHITE: "#FFF",
    LIGHTWHITE: "#FAFAFA",

    LIGHTORANGE: "#fd854f",
    DARKBLUE: "#004080",
    BLUE: "#2A66BC",
    LIGHTBLUE: "#6EA8DA",
    DARKGRAY: "#999",
    DARK: "#484848",
  },
};
