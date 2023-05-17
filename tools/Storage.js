import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

var storage = new Storage({
  size: 10000,
  storageBackend: AsyncStorage,
  enableCache: false,
});

module.exports = {
  getUserTheme: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'theme',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  getUserState: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'userstate',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  removeUserState: () => {
    storage.remove({
      key: 'userstate',
    });
  },
  setUserState: (type = true) => {
    storage.save({
      key: 'userstate',
      data: type,
    });
  },

  getTimeDataList: (successCallback) => {
    storage
      .load({
        key: 'timedatalist',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        successCallback([]);
      });
  },

  setTimeData: (arr = [], requestId, type = 'invoice') => {
    module.exports.getTimeDataList((response) => {
      const isExist = [...response].find(
        (item) => item.requestId === requestId,
      );
      if (!isExist) {
        storage.save({
          key: 'timedata',
          data: arr,
        });
        const listArr = [...response, {type: type, requestId: requestId}];
        storage.save({
          key: 'timedatalist',
          data: listArr,
        });
      }
    });
  },
  updateTimeData: (type, value, requestId) => {
    const d = new Date();
    module.exports.getTimeData(
      (response) => {
        if (response.length > 0) {
          const timeItems = response;

          const selectedTime = timeItems.find(
            ({time}) => time === parseInt(d.getHours()),
          );
          let index = timeItems.findIndex(
            ({time}) => time === parseInt(d.getHours()),
          );

          let temp =
            type === 'addOrderTime'
              ? {
                  h1: ++selectedTime.h1,
                  h2: selectedTime.h2,
                  time: selectedTime.time,
                }
              : {
                  h1: selectedTime.h1,
                  h2: ++selectedTime.h2,
                  time: selectedTime.time,
                };

          timeItems[index] = temp;
          module.exports.setTimeData(timeItems, requestId, type);
        }
      },
      (error) => {
        console.log(error);
      },
    );
  },
  getTimeData: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'timedata',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  getUserStateAndData: (successCallback, errorCallback) => {
    module.exports.getUserState(
      () => {
        module.exports.getUserData(successCallback, errorCallback);
      },
      (err) => errorCallback(err),
    );
  },

  getUserData: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'userdata',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },

  getApiData: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'apidata',
      })
      .then((ret) => {
        console.log(ret);
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },

  setApiData: (data) => {
    storage.save({
      key: 'apidata',
      data: data,
    });
  },
  setUserData: (responseData) => {
    storage.save({
      key: 'userdata',
      data: responseData,
    });
  },

  setBalanceData: (responseData) => {
    storage.save({
      key: 'balancedata',
      data: responseData,
    });
  },
  setProfileData: (responseData) => {
    storage.save({
      key: 'profiledata',
      data: responseData,
    });
  },
  setInitData: (responseData) => {
    storage.save({
      key: 'initdata',
      data: responseData,
    });
  },
  getInitData: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'initdata',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },
  getProfileData: (successCallback, errorCallback) => {
    storage
      .load({
        key: 'profiledata',
      })
      .then((ret) => {
        successCallback(ret);
      })
      .catch((err) => {
        errorCallback(err);
      });
  },

  setUserDataAndState: (userstate, userdata) => {
    storage.save({
      key: 'userstate',
      data: userstate,
    });
    storage.save({
      key: 'userdata',
      data: userdata,
    });
  },
  logOutAction: (callback = () => {}) => {
    storage.save({
      key: 'profiledata',
      data: '',
    });
    storage.save({
      key: 'userdata',
      data: '',
    });
    storage.remove({
      key: 'userdata',
    });
    storage.save({
      key: 'cachedorders',
      data: '',
    });
    storage.remove({
      key: 'cachedorders',
    });

    storage.remove({
      key: 'profiledata',
    });

    storage.save({
      key: 'userstate',
      data: false,
    });

    setTimeout(() => {
      callback();
    }, 700);
  },
  setCacheOrders: (responseData) => {
    storage.save({
      key: 'cachedorders',
      data: responseData,
    });
  },
  delay: (ms) => {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  },
  getMainText: (track, state, localstyle) => {
    switch (track) {
      case '0':
        if (state > 0) {
          return localstyle.iconTextActive;
        } else {
          return localstyle.iconTextActiveBold;
        }

      case '10':
        if (state > 10) {
          return localstyle.iconTextActive;
        }
        if (state == 0) {
          return localstyle.iconText;
        } else {
          return localstyle.iconTextActiveBold;
        }

      case '11':
        if (state > 40) {
          return localstyle.iconTextActive;
        }
        if (state <= 11) {
          return localstyle.iconText;
        } else {
          return localstyle.iconTextActiveBold;
        }

      case '20':
        if (state <= 45) {
          return localstyle.iconText;
        }
        if (state == 50) {
          return localstyle.iconTextActiveBold;
        } else {
          return localstyle.iconTextActive;
        }

      case '51':
        if (state == 51) {
          return localstyle.iconTextActive;
        }
        if (state <= 50) {
          return localstyle.iconText;
        } else {
          return localstyle.iconTextActive;
        }
    }
  },
  // getMainLineIcon: (track, state, localstyle) => {
  //   switch (track) {
  //     case "0":
  //       if (state > 0) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       } else {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       }

  //     case "10":
  //       if (state > 10) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }
  //       if (state == 0) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       } else {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }

  //     case "11":
  //       if (state > 40) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }
  //       if (state <= 11) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       } else {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }

  //     case "20":
  //       if (state <= 45) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       }
  //       if (state == 50) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       } else {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }

  //     case "51":
  //       if (state == 51) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-spaces.png")}
  //           />
  //         );
  //       }
  //       if (state <= 50) {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       } else {
  //         return (
  //           <Image
  //             style={localstyle.lineIcon}
  //             source={require("../images/home/tracking-icons-gray.png")}
  //           />
  //         );
  //       }
  //   }
  // }
};
