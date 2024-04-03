import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove, push, onValue, orderByValue, orderByChild, query } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

console.log("line 4")

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBq8m3Om8KDGeTsbrZFN1k-8mCr93HcYt0",
    authDomain: "first-project-b2968.firebaseapp.com",
    databaseURL: "https://first-project-b2968-default-rtdb.firebaseio.com",
    projectId: "first-project-b2968",
    storageBucket: "first-project-b2968.appspot.com",
    messagingSenderId: "1097595439450",
    appId: "1:1097595439450:web:1f087c7e0ace22c88fcb63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// References
var namebox = document.getElementById("Namebox");
var rollbox = document.getElementById("Rollbox");
var secbox = document.getElementById("Secbox");
var genbox = document.getElementById("Genbox");

var insBtn = document.getElementById("Insbtn");
var selBtn = document.getElementById("Selbtn");
var updBtn = document.getElementById("Updbtn");
var delBtn = document.getElementById("Delbtn");

function InsertData() {
    set(ref(db, "TheStudents/"+ rollbox.value),{
        NameOfStd: namebox.value,
        RollNo: rollbox.value,
        Section: secbox.value,
        Gender: genbox.value
    })
    .then(()=>{
        alert("data stored successfully");
    })
    .catch((error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

function SelectData() {
    const dbref = ref(db);

    get(child(dbref,"TheStudents/"+ rollbox.value))
    .then((snapshot)=>{
        if(snapshot.exists()){
            namebox.value = snapshot.val().NameOfStd;
            secbox.value = snapshot.val().Section;
            genbox.value = snapshot.val().Gender;
        }
        else{
            alert("No data found");
        }
    })
    .catch((error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

function UpdateData() {
    update(ref(db, "TheStudents/"+ rollbox.value),{
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value
    })
    .then(()=>{
        alert("data updated successfully");
    })
    .catch((error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

function DeleteData() {
    remove(ref(db, "TheStudents/"+ rollbox.value))
    .then(()=>{
        alert("data removed successfully");
    })
    .catch((error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

// Assign events to buttons
insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeleteData);

// EXAMPLE OF PUSHING TO LIST
// const postListRef = ref(db, 'TheStudents/1/weights');
// const newPostRef = push(postListRef);
// set(newPostRef, {
//     date: "4/2",
//     weight: "157"
// });


// let myRef = ref(db, '/TheStudents/1/weights/-NuVOMBL80K2D8Nxb1K_');
// myRef.remove;

// db.child("/TheStudents/1/weights/-NuVOMBL80K2D8Nxb1K_").remove();
// console.log("107");

// let myRef = ref(db, '/TheStudents/1/weights/-NuVOMBL80K2D8Nxb1K_');
// remove(myRef)
//   .then(() => {
//     console.log('Item removed successfully');
//   })
//   .catch((error) => {
//     console.error('Error removing item:', error);
//   });

// References to index.html
var rollbox2 = document.getElementById("Rollbox2");
var weightbox = document.getElementById("Weightbox");
var datebox = document.getElementById("Datebox");

var pushBtn = document.getElementById("Pushbtn");

function PushData() {
    const weightListRef = ref(db, "TheStudents/" + rollbox2.value + "/weights");
    const newWeightRef = push(weightListRef);
    set(newWeightRef, {
        weight: weightbox.value,
        date: datebox.value
    })
    .then(()=>{
        alert("data pushed successfully");
    })
    .catch((error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

pushBtn.addEventListener('click', PushData);

// Getting data

var rollbox3 = document.getElementById("Rollbox3");
var mydata = document.getElementById("mydata");
var getBtn = document.getElementById("Getbtn");

function getData() {
    const orderedRef = query(ref(db, "/TheStudents/" + rollbox3.value + "/weights"), orderByChild('date'));

    onValue(orderedRef, (snapshot) => {
        let myWeights = "";
        console.log("Snapshot exists? " + snapshot.exists());
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                // const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                myWeights += "Date: " + childData.date;
                myWeights += ", weight: " + childData.weight;
                myWeights += "<br/>";
            });
        }
        if (snapshot.exists()) {
            mydata.innerHTML = myWeights + "<br/>Click \"GET DATA\" to update weight data!";
            alert("data retrieved successfully");
        } else {
            mydata.innerHTML = "Click \"GET DATA\" to view weight data!";
            alert("data not found!");

        }
    }, {
        onlyOnce: true
    }, (error)=>{
        alert("unsuccessful, error: "+ error);
    });
}

getBtn.addEventListener("click", getData);

// NEXT: ORDER BY DATE