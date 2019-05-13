const validResponse = response => {
  return response != undefined && response.status === 200 ? true : false;
};

const validResponseData = response => {
  return response != undefined && response.data != undefined ? true : false;
};

const isLoggedIn = response => {
  return response.data.isLoggedIn === true ? true : false;
};

const isDataAdded = response => {
  return response.data.isDataAdded === true ? true : false;
};

const isNotEmptyDataArray = response => {
  return Array.isArray(response.data) && response.data.length > 0
    ? true
    : false;
};

module.exports = {
  validResponse,
  validResponseData,
  isLoggedIn,
  isDataAdded,
  isNotEmptyDataArray
};
