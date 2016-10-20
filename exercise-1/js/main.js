// Main.js
$(function() {
    // Setup: Initialize Firebase using the configuration of your project
    var config = {
        apiKey: "AIzaSyDYamxkysOCx_ZbbAHZ8ji6lboiSTRLkfE",
        authDomain: "to-do-f5c94.firebaseapp.com",
        databaseURL: "https://to-do-f5c94.firebaseio.com",
        storageBucket: "to-do-f5c94.appspot.com",
        messagingSenderId: "1082964239174"
    };
    firebase.initializeApp(config);
    //};

    // Reading Data: Create new database reference 'todos'
    //reference = new "point" in the database
    var todos = firebase.database().ref('todos');

    // Reading Data:
    // Set listener: on change, empty the todo list, and iterate through to make a new list
    todos.on('value', function(snapshot) {
        $('#todo-list').empty();
    // Get the value of the data
    //should give to-do objects back
        var data = snapshot.val();

    // Do whatever you want with the Object...
        Object.keys(data).forEach(function(key) {
            console.log(key);
            renderTodo(key, data[key]);

        // Get value of object using key
        // var value = data[key];

        // // Create an element with the key as an ID
        // var body = $('body');
        // // var button = $('<button>').attr('id', key);
        //     // Get the key back from the button
        //     //var key = this.id;
        //     var div = $('<div>');
        //     div.append("Description: " + value.description);


        //     // Update element
        //     todos.child(key).set({
        //     description: value.description,
        //     priority: value.priority,
        //     status: value.status
        //     });
        // // body.append(button);
        // body.append(div);

        });
    });



    // Rendering Data: Function to make todos
    var renderTodo = function(id, content) {
        console.log('render todo ', id, content);
        // Create new todo <div> with classes 'todo', and the priority of the item
        var newTodo = $('<div>');
        newTodo.addClass(content.urgency + ' todo');
        newTodo.attr('id',id);
        console.log(content.urgency);

        // Create an <h5> element, set it's text to the description, and class as the status
        var header = $('<h5>'+content.description+'</h5>');
        header.addClass(content.priority);
        console.log(content.priority);
        newTodo.append(header);

        // Update Data: create a check icon with click event
            // Flip the status on click
            // Set the child values of the item
        var checkIcon = $('<i>').addClass('fa fa-check 2x ' + content.status );
        newTodo.append(checkIcon);
        checkIcon.click(function(){
            var status = content.status == 'complete' ? 'incomplete' : 'complete';
            var childRef = todos.child(id);
            childRef.set({
                description: content.description,
                urgency: content.urgency,
                'status': status
            })

        });



        // Deleting data: Delete icon: on click, remove the reference

        // Update/Delete data: append the icons to the newTodo item


        // Append newTodo item to item with id #todo-list
        $('#todo-list').append(newTodo);

    };

    // Reading Data: Form submission
    $('form').on('submit', function(event) {
        event.preventDefault();

        // Get values
        var priority = $(this).find('input:checked')[0].id;
        var text = $(this).find('input').val();

        // Reading Data: Push new item into `todos` reference
        todos.push({
            description: text,
            urgency: priority,
            status: 'incomplete'
        });

        // Reset the form
        this.reset();
    });
});
