// Main.js

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCp0ErFpwVFcKeFI5vDjjFFKV0GELFDPTE",
    authDomain: "test-project-578fc.firebaseapp.com",
    databaseURL: "https://test-project-578fc.firebaseio.com",
    storageBucket: "test-project-578fc.appspot.com",
    messagingSenderId: "919471327541"
};
firebase.initializeApp(config);

// Create new database reference
console.log('test');
var todos = firebase.database().ref('todos/');

// Push something into todos
todos.push({
    description: 'Write learning modules',
    urgency: 'High',
    status: 'incomplete'
});
