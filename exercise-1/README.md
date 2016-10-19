# Exercise-1
In this exercise, you'll learn how to use the data storage service Firebase, and practice using your jQuery skills. The final product will look like this:

![complete](imgs/complete.png)

As described in [module-4](https://github.com/info343c-a16/m4-git-intro), start by forking and cloning this repository. Then, complete the following sections.


## Set up
Following the instructions in this learning module, set up (and connect to) a Firebase database. This includes:

**On Firebase**
- Create a Firebase account
- Make a new Project on Firebase
- Change the **database rules** to allow anyone to read/write to the database
- Get the authentication information (for use in JavaScript)

**In Your Scripts**
- Include the Firebase script in your `index.html` file:
    `<script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>`
- In your `main.js` file, use the project configuration information to initialize a connection to Firebase

## Creating data
For this exercise, you'll use the form (already built) to collect information from your users. First, you'll need to do the following in your `main.js` file:

- Create a **reference** to a _new_ element in your data structure called `todos`

You'll use that reference to push new data up to fireabse. Then, (still in the `main.js` file), there is already a `submit` event assigned to the form. Inside the `submit` event, you should do the following (the information is already retrieved from the `input` elements)

- Push a new element into your `todos` reference with the following structure:

```javascript
{
    description: text, // 'text' is retrieved from the form
    priority: priority, // 'priority' is retrieved from the form
    status: 'incomplete' // by default, items should be incomplete
}
```

Once you have done this, check that your database on Firebase has been updated.

## Reading Data
Now that we're able to create data, we want to _listen_ to changes in our data structure. This will trigger when the data is loaded, and each time it changes.

- Using the `.on('value')` listener, set an event listener on your `todos` reference
- Once the data is loaded, get the value of the current data using the `snapshot.val()` method
- Using `Object.keys`, iterate through the _keys_ of the data object returned to you
- In each iteration, pass the _key_ and _value_ of each _todo_ item to the `renderTodo` function (more on this below)

I suggest putting a `console.log` statement in the `renderTodo` function to make sure it's working properly.

## Rendering Data
Your `renderTodo` function should receive the _key_ and _value_ of each _todo_ item whenever there is a data change (from section above). With each item, you'll do the following (note, you'll modify this process in the next section):

- Use jQuery to create a new `<div>` element
- Assign your new `<div>` element a _class_ that is equal to the _priority_ of the todo item
- Use jQuery to create a new `<h5>` element, and use the `.text()` method to set the text as the _text_ of the todo item
- Append your `<h5>` element to your `<div>` element
- Append your `<div>` element to the element with id `#todo-list`

## Updating Data
You'll want a way to _update_ the _status_ of each element (`complete`, `incomplete`). To do this, we'll add a font-awesome checkbox to the `<div>` element from the previous section. All steps should be in your `renderTodo`
function:

- Using jQuery, create a font-awesome checkbox element (`fa-check`)
- Assign a _class_ to your checkbox element that is equal to the current _status_
- Assign a click event to your checkbox element, in which you do the following:
  - Determine the _new status_ (i.e., switch from `complete` to `incomplete`)
  - Use the `set` method to change the value on Firebase
- Append your font-awesome checkbox icon to your `<div>` element

## Deleting Data
Finally, you'll want a way to _delete_ an element on Firebase. To provide a UI to do this, we'll add a font-awesome `fa-times` to the `<div>` element from the previous section. All steps should be in your `renderTodo` function:

- Using jQuery, create a font-awesome times element (`fa-times`)
- Assign a click event to your times element, in which you do the following:
  - Use the `remove` function to remove the child element from the `todos` data
- Append your font-awesome times icon to your `<div>` element
