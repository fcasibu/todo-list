const setLocalStorage = (itemName, array) => {
  localStorage.setItem(itemName, JSON.stringify(array));
};

const getLocalStorage = (itemName) => {
  return localStorage.getItem(itemName);
};

export { setLocalStorage, getLocalStorage };
