import axios from "axios";

const urlMapper = {
  randomMeal: "https://www.themealdb.com/api/json/v1/1/random.php",
};

export async function getRandomMeal() {
  let res = await axios.get(urlMapper.randomMeal);
  return res?.data;
}

export async function getMealByName(name) {
  console.log(name);
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
  console.log(url);
  let res = await axios.get(url);
  return res?.data;
}
