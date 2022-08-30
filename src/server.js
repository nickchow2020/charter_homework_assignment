// function use Promise to simulate asynchronous API calls
import data from './data';
const fetchDataFromApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
};

export { fetchDataFromApi };
