const firebaseConfig = {
    apiKey: "AIzaSyAcSsrtl9myHNzsXkE612X2U80emEeD4cc",
    authDomain: "pbdfeedback-43bcb.firebaseapp.com",
    databaseURL: "https://pbdfeedback-43bcb-default-rtdb.firebaseio.com",
    projectId: "pbdfeedback-43bcb",
    storageBucket: "pbdfeedback-43bcb.appspot.com",
    messagingSenderId: "688758922187",
    appId: "1:688758922187:web:d21d44240e32e255f4b44e",
    measurementId: "G-6B5Y330KL9"
};
firebase.initializeApp(firebaseConfig);
var fdb = firebase.database();

function killDb() {
    // Kill this firebase app.
    firebase.app().delete().then(function () {
        firebase.initializeApp(newConfig);
    });
    
}
