
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBIOQ6mROEy4ZY17RY5lhbmlR8QcyOYwts",
    authDomain: "fir-vanillajs-f40c3.firebaseapp.com",
    projectId: "fir-vanillajs-f40c3",
    storageBucket: "fir-vanillajs-f40c3.appspot.com",
    messagingSenderId: "943753402065",
    appId: "1:943753402065:web:7906ebfa55379af7f617f0"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res.user);
        })
        .catch((err) => {
            alert('Error: ' + err.message);
            console.log(err.message);
            console.log(err.code);
        })
};

const login = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res.user);
        })
        .catch((err) => {
            alert('Error: ' + err.message);
            console.log(err.message);
            console.log(err.code);
        })
};

// <!-- DB operations ->

const saveData = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    db.collection('users')
        .add({
            email: email,
            password: password
        })
        .then((docRef) => {
            console.log("Document written with ID:", docRef.id);
        })
        .catch((err) => {
            console.error("Error adding document:", err);
        });
};

const readData = () =>{
    db.collection('users')
    .get()
    .then((data)=>{
        console.log(data.docs.map((item)=>{
            return {...item.data(),id:item.id}
        }));
    });
};

const updateData = () =>{  // Id that we have taken from SaveData function that we have created Above ^...
    db.collection('users').doc('myTjOlgfcT8L9XZRJKxr')
    .update({
        email:'romeo@gmail.com',
        password:'12121234'
    })
    .then(()=>{
        alert('Data Updated');
    })
}

const deleteData = () =>{  // Id that we have taken from SaveData function that we have created Above ^...
    db.collection('users').doc('myTjOlgfcT8L9XZRJKxr')
    .delete()
    .then(()=>{
        alert('Data Deleted !');
    })
}
