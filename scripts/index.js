import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
        alert("unsuccessful, error"+ error);
    });
}

function SelectData() {
    const dbref = ref(db);

    get(child(dbref,"TheStudents/"+ rollbox.value)).then((snapshot)=>{
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
        alert("unsuccessful, error"+ error);
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
        alert("unsuccessful, error"+ error);
    });
}

function DeleteData() {
    remove(ref(db, "TheStudents/"+ rollbox.value))
    .then(()=>{
        alert("data removed successfully");
    })
    .catch((error)=>{
        alert("unsuccessful, error"+ error);
    });
}

// Assign events to buttons
insBtn.addEventListener('click', InsertData);
selBtn.addEventListener('click', SelectData);
updBtn.addEventListener('click', UpdateData);
delBtn.addEventListener('click', DeleteData);

// const postListRef = ref(db, 'posts');
// const newPostRef = push(postListRef);
// set(newPostRef, {
//     "test post"
// });
