document.addEventListener("DOMContentLoaded", function () {
    const authorForm = document.getElementById("author-form");
    const studentForm = document.getElementById("student-form");
    const bookForm = document.getElementById("book-form");
    const orderForm = document.getElementById("order-form");
    const orderItemForm = document.getElementById("order-item-form");
  
    if (authorForm) {
      authorForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleAuthorFormSubmission();
      });
    }
  
    if (studentForm) {
      studentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleStudentFormSubmission();
      });
    }
  
    if (bookForm) {
      bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleBookFormSubmission();
      });
    }
  
    if (orderForm) {
      orderForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleOrderFormSubmission();
      });
    }
  
    if (orderItemForm) {
      orderItemForm.addEventListener("submit", function (event) {
        event.preventDefault();
        handleOrderItemFormSubmission();
      });
    }
  });
  
  function handleAuthorFormSubmission() {
    console.log("Author form submitted");
  }
  
  function handleStudentFormSubmission() {
    console.log("Student form submitted");
  }
  
  function handleBookFormSubmission() {
    console.log("Book form submitted");
  }
  
  function handleOrderFormSubmission() {
    console.log("Order form submitted");
  }
  
  function handleOrderItemFormSubmission() {
    console.log("Order item form submitted");
  }