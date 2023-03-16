import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export const getRandom = (arr, n) => {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);

  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const config = {
  apiKey: "AIzaSyD-douwfS7KfdimlZneS3OyLQdn-PrdODo",
  authDomain: "codenames-b0fbb.firebaseapp.com",
  databaseURL: "https://codenames-b0fbb.firebaseio.com",
  projectId: "codenames-b0fbb",
  storageBucket: "codenames-b0fbb.appspot.com",
  messagingSenderId: "95824193787"
};
const app = initializeApp(config);
export const database = getDatabase(app);
