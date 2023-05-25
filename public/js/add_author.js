// Get the objects we need to modify
let addAuthorForm = document.getElementById('author-form');

window.onload = function() {
    getAndDisplayAuthors();
};

function getAndDisplayAuthors() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/authors", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let authors = JSON.parse(xhttp.response);
            for (let author of authors) {
                addRowToTable(JSON.stringify([author]));
            }
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error getting the initial data.")
        }
    }

    xhttp.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    let editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((button) => {
        button.addEventListener('click', editAuthor);
    });
});

// Modify the objects we need
addAuthorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("name");

    // Get the values from the form fields
    let nameValue = inputName.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-author-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from Authors
addRowToTable = (data) => {

    // Get a reference to the current table on the page.
    let currentTable = document.getElementById("authors-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let actionCell = document.createElement("TD");  // Create an additional cell for actions

    // Fill the cells with correct data
    idCell.innerText = newRow.authorID;
    nameCell.innerText = newRow.name;

    // Create a delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("data-id", newRow.authorID);
    deleteBtn.addEventListener('click', deleteAuthor);  // Add the event listener to the delete button

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.setAttribute("data-id", newRow.authorID);
    editBtn.addEventListener('click', editAuthor);  // Add the event listener to the edit button

    // Append the delete button to the action cell
    actionCell.appendChild(deleteBtn);
    actionCell.appendChild(editBtn);

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(actionCell);  // Add the action cell to the row
    
    // Add the row to the table
    currentTable.appendChild(row);
}

document.addEventListener('DOMContentLoaded', (event) => {
    let deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteAuthor);
    });
});

function deleteAuthor(event) {
    let id = event.target.getAttribute('data-id');

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-author-ajax/" + id, true);

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Remove the author's row from the table
            event.target.parentNode.parentNode.remove();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the request.")
        }
    }

    // Send the request and wait for the response
    xhttp.send();
}

function editAuthor(event) {
    let id = event.target.getAttribute('data-id');

    // Get the author's current name
    let currentName = event.target.parentNode.previousSibling.textContent;

    // Prompt the user for a new name
    let newName = prompt("Enter the new name for the author:", currentName);

    // If the user clicked "Cancel", don't proceed with the AJAX request
    if (newName === null) return;

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit-author-ajax/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the author's name in the table
            event.target.parentNode.previousSibling.textContent = newName;
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the request.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify({ name: newName }));
};

document.addEventListener('DOMContentLoaded', (event) => {
    let editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach((button) => {
        button.addEventListener('click', editAuthor);
    });

    let deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', deleteAuthor);
    });
});



