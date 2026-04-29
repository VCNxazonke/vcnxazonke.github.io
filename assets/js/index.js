// Start Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAdolseetSsQ-rnr9LQoSQQgoDRnHqx1s",
    authDomain: "nxazonkevc-iresum.firebaseapp.com",
    projectId: "nxazonkevc-iresum",
    storageBucket: "nxazonkevc-iresum.appspot.com",
    messagingSenderId: "543253471759",
    appId: "1:543253471759:web:1817adfa77e83c3fdcb97a",
    measurementId: "G-BN25LXP62Z"
};

const app = {
    apiKey: "AIzaSyCAdolseetSsQ-rnr9LQoSQQgoDRnHqx1s",
    authDomain: "nxazonkevc-iresum.firebaseapp.com",
    projectId: "nxazonkevc-iresum",
    storageBucket: "nxazonkevc-iresum.appspot.com",
    messagingSenderId: "543253471759",
    appId: "1:543253471759:web:1817adfa77e83c3fdcb97a",
    measurementId: "G-BN25LXP62Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Reference Messages Database/Collection
let iResumeMessagesRef = firebase.database().ref('iResumeMessages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitFormFunc);

// submitFormFunc Function
function submitFormFunc(e) {
    e.preventDefault();

    // getActualInputs Values

    let name = getInputValueFunc('name');
    let email = getInputValueFunc('email');
    let number = getInputValueFunc('number');
    let company = getInputValueFunc('company');
    let message = getInputValueFunc('message');
    let subject = document.getElementById('subject').value;

    // Save Message Function below being called
    saveMessageFunc(name, email, subject, number, company, message);
    console.log(name, email, subject, number, company, message);
    console.log(name);
    console.log(email);
    console.log(subject);
    console.log(number);
    console.log(company);
    console.log(message);

}


// getInputValues Function
function getInputValueFunc(id) {
    return document.getElementById(id).value;

}

// Save Message Function
function saveMessageFunc(name, email, subject, number, company, message) {
    let newMessageRef = iResumeMessagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
        subject: subject,
        number: number,
        company: company,
        message: message

    });
}