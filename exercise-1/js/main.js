// Main.js
$(function() {
    // Setup: Initialize Firebase using the configuration of your project
    // Configuration: replace <THESE_VALUES> with your values from firebase
      var config = {
        apiKey: "AIzaSyA7YpN8KLbcPw3jDXLWY20m3bP6S-Lc-NU",
        authDomain: "info343-c100a.firebaseapp.com",
        databaseURL: "https://info343-c100a.firebaseio.com",
        storageBucket: "info343-c100a.appspot.com",
        messagingSenderId: "1030907026985"
      };
      firebase.initializeApp(config);

    // Reading Data: Create new database reference 'todos'
    var todos = firebase.database().ref('todos');
    
    // Reading Data:
    // Set listener: on change, empty the todo list, and iterate through to make a new list
    todos.on('value', function(snapshop){
        var data = snapshop.val();
        
        $('#todo-list').empty();
        Object.keys(data).forEach(function(key){
            renderTodo(key, data[key]);
        });
    });

    // Rendering Data: Function to make todos
    var renderTodo = function(id, content) {
        var todos = firebase.database().ref('todos');

        // Create new todo <div> with classes 'todo', and the priority of the item
        var todoDiv = $('<div>', { 'class': 'todo ' + content.priority });

        // Create an <h5> element, set it's text to the description, and class as the status
        var desc = $('<h5>', { 'class': content.status }).text(content.description);
        
        // Update Data: create a check icon with click event
            // Flip the status on click
            // Set the child values of the item
        var checkIcon = $('<i>', { 'class': 'fa fa-check' });
        checkIcon.click(function(){
            todos.child(id).set({
                description: content.description,
                priority: content.priority,
                status: (content.status == 'incomplete') ? 'complete' : 'incomplete'
            });
        });

        // Deleting data: Delete icon: on click, remove the reference
        var delIcon = $('<i>', { 'class': 'fa fa-times' });
        delIcon.click(function() {
            todos.child(id).remove();
        });
        
        // Update/Delete data: append the icons to the newTodo item
        todoDiv.append(desc)
        todoDiv.append(checkIcon);
        todoDiv.append(delIcon);

        // Append newTodo item to item with id #todo-list
        $('#todo-list').append(todoDiv);
    };

    // Reading Data: Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Reading Data: Push new item into `todos` reference
        var todos = firebase.database().ref('todos');
        todos.push({
            description: text,
            priority: priority,
            status: 'incomplete'
        });

        // Reset the form
        this.reset();
    });
});
