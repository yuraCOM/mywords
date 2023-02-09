import { User } from "./../store/types";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { dbFireStore } from "./FireBaseInit";
import { Word } from "../store/types";

const usersRef = collection(dbFireStore, "users");

//USERS -----------------------------------------------------------------
//add user in FireBase
export async function addOneUserInFireBase(newUser: User) {
  try {
    await setDoc(doc(usersRef), newUser);
    //можно  и так добавить
    // const docRef = await addDoc(collection(dbFireStore, "users"), userNew2);
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// read all DB
export async function readAllDB() {
  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// get Users Words
export async function fetchUserWordsFromFB(login: string): Promise<Word[]> {
  const user = query(usersRef, where("login", "==", login));
  const querySnapshot = await getDocs(user);
  // console.log("querySnapshot: ", await querySnapshot.docs[0].data().words);
  let wordsArr = await querySnapshot.docs[0].data().words;
  return wordsArr;
}

// получить из базы уникальный ID который присваивает сама FireBase - получаем  через логин пользователя
export async function getIDUserFromDB(login: string): Promise<string> {
  const user = query(usersRef, where("login", "==", login));
  const querySnapshot = await getDocs(user);
  // let userObj = await querySnapshot.docs[0].data();  !!!!!!
  if (querySnapshot.docs.length > 0) {
    return querySnapshot.docs[0].id;
  } else {
    return "";
  }
}

//test connection
export async function testConnect(login: string) {
  // Create a query against the collection.
  const user = query(usersRef, where("login", "==", login));
  const querySnapshot = await getDocs(user);
  let connect = await querySnapshot.empty;
  return connect;
}

// read one user
export async function readOneUserFromDB(
  login: string,
  password: string
): Promise<User | boolean | string | undefined> {
  // Create a query against the collection.
  const user = query(usersRef, where("login", "==", login));

  const querySnapshot = await getDocs(user);

  if (querySnapshot.empty) {
    // alert("No connection to server!!! Try later");
    return false;
  }
  let dataUser: any = querySnapshot.docs[0].data();

  if (dataUser.password !== password) {
    console.log("wrong password");
    return "wrong password";
  } else {
    return dataUser;
  }
}

// type T = Awaited<ReturnType<typeof readOneUserFromDB>>;
// console.log(T);

//  WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD WORD
//ADD WORD
export async function addWordInFireBase(login: string, newWord: Word) {
  let id = await getIDUserFromDB(login);
  const userRef = doc(dbFireStore, "users", id);
  await updateDoc(userRef, {
    words: arrayUnion(newWord),
  });
}

//read word
export async function readOneWordFromFireBase(login: string, wordId: string) {
  const user = query(usersRef, where("login", "==", login));
  const querySnapshot = await getDocs(user);
  let dataUser = querySnapshot.docs[0].data();
  let word: Word = dataUser.words.find(
    (word: { wordId: string }) => word.wordId === wordId
  );
  console.log(word);
  return word;
}

//update words in FB
export async function updWordInFireBase(
  login: string,
  newArrWords: Word[]
): Promise<void> {
  const id = await getIDUserFromDB(login);
  const userRef: any = doc(dbFireStore, "users", id);
  await updateDoc(userRef, {
    words: newArrWords,
  });
}

export async function updateFBWords(login: string, wordsArr: Word[]) {
  await updWordInFireBase(login, wordsArr);
}
