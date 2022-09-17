import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  orderBy,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhzwJ-UyLhjYG5eTaxbFBzcdI140ahNHM",
  authDomain: "fir-9-acf09.firebaseapp.com",
  projectId: "fir-9-acf09",
  storageBucket: "fir-9-acf09.appspot.com",
  messagingSenderId: "389175473794",
  appId: "1:389175473794:web:2d708dc15de44d1b24a69b",
};

// inintialize firebase app
initializeApp(firebaseConfig);

// initialize services
const db = getFirestore();

//collection referrence
const colRef = collection(db, "queue");
//document referrence by id
const docRef = doc(db, "queue", "kZ2lOWbbYQV0N5qj6hbQ");
// queries
// document reffrence by field
const q = query(colRef, where("no", "==", 1004));
// order document fields
const order = query(colRef, orderBy("createdAt", "asc"));

// real time collection data
onSnapshot(colRef, (snapshot) => {
  let queue = [];
  snapshot.docs.forEach((doc) => {
    queue.push({ ...doc.data(), id: doc.id });
  });
  console.log(queue);
});
// real time collection data with order
onSnapshot(order, (snapshot) => {
  let queue = [];
  snapshot.docs.forEach((doc) => {
    queue.push({ ...doc.data(), id: doc.id });
  });
  console.log(queue);
});
// real time collection data by field vaue
onSnapshot(q, (snapshot) => {
  let queue = [];
  snapshot.docs.forEach((doc) => {
    queue.push({ ...doc.data(), id: doc.id });
  });
  console.log(queue);
});

//realtime document data by id
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// // add queue
var queue = 1000;
const enqueue = document.querySelector(".add");
if (enqueue) {
  enqueue.addEventListener("click", (e) => {
    e.preventDefault();
    queue++;
    addDoc(colRef, {
      no: queue,
      createdAt: serverTimestamp(),
    }).then(() => {
      //?? enqueue.reset();
    });
  });
}

// // delete queue
// const dequeue = document.querySelector(".delete");
// if (dequeue) {
//   enqueue.addEventListener("click", (e) => {
//     e.preventDefault();
//     //? const docRef = doc(db, "queue" /*doc id*/);
//     //? deleteDoc(docRef).then(() => {
//     //?   enqueue.reset();
//     //? });
//   });
// }

// update counter
var toggleButton = false;
const updateCounter = document.getElementById("btn1");
if (updateCounter) {
  updateCounter.addEventListener("click", (e) => {
    e.preventDefault();
    toggleButton = !toggleButton;
    console.log(toggleButton);
    updateCounter.classList.toggle("go-offline");
    if (toggleButton) {
      updateCounter.value = "go offline";
    } else {
      updateCounter.value = "go online";
    }
    const docRef = doc(db, "counter", "37oVjkKZlAOoUYsMb3iD");
    updateDoc(docRef, {
      status: toggleButton,
    });
  });
}
