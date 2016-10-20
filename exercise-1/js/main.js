// Main.js
$(function() {
    // Setup: Initialize Firebase using the configuration of your project


    // Reading Data: Create new database reference 'todos'


    // Reading Data:
    // Set listener: on change, empty the todo list, and iterate through to make a new list




    // Rendering Data: Function to make todos
    var renderTodo = function(id, content) {

        // Create new todo <div> with classes 'todo', and the priority of the item


        // Create an <h5> element, set it's text to the description, and class as the status

        // Update Data: create a check icon with click event
            // Flip the status on click
            // Set the child values of the item


        // Deleting data: Delete icon: on click, remove the reference

        // Update/Delete data: append the icons to the newTodo item


        // Append newTodo item to item with id #todo-list

    };

    // Reading Data: Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Reading Data: Push new item into `todos` reference


        // Reset the form
        this.reset();
    });
});
