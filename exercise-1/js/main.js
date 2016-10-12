// Main.js
$(function() {
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
    var todos = firebase.database().ref('todos/');

    // Set listener: on change, empty the todo list, and iterate through to make a new list
    todos.on('value', function(snapshot) {
        $('#todo-list').empty();

        // Iterate through elements
        var items = snapshot.val();
        if (items !== null) {
            Object.keys(items).forEach(function(key) {
                if (!key) return;
                makeTodo(key, items[key]);
            });
        }

    });

    // Function to make todos
    var makeTodo = function(id, content) {
        // Create new todo <div> with classes 'todo', and the priority of the item
        var newTodo = $('<div>').attr('class', 'todo ' + content.priority);

        // Create an <h5> element, set it's text to the description, and class as the status
        var text = $('<h5>').text(content.description).attr('class', content.status);
        newTodo.append(text);

        // Complete icon with click event
        var completeIcon = $('<i>').attr('class', "fa fa-check fa-2x " + content.status);
        completeIcon.on('click', function() {
            // Flip the status on click
            var status = content.status == 'complete' ? 'incomplete' : 'complete';

            // Set the child value
            todos.child(id).set({
                description: content.description,
                priority: content.priority,
                status: status
            });
        });

        // Delete icon: on click, remove the reference
        var deleteIcon = $('<i>').attr('class', "fa fa-times fa-2x");
        deleteIcon.on('click', function() {
            todos.child(id).remove();
            console.log('delete');
        });

        // Append the icons to the newTodo item
        newTodo.append(completeIcon).append(deleteIcon);

        // Append to page
        $('#todo-list').append(newTodo);
    };

    // Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Push new item into todos
        todos.push({
            description: text,
            priority: priority,
            status: 'incomplete'
        });

        this.reset();
    });
});
