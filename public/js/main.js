console.log("client side js loaded!");
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

// will hold the mesages to be displayed in the UI
const messageOne = document.querySelector("#error-1");
const messageTwo = document.querySelector("#result-1");

// event to listen to, callback to run when the elemnt is selected
weatherForm.addEventListener("submit", (e) => {
    // prevents the browser from refreshing
    e.preventDefault();

    var location = searchElement.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    //responsible for retreiving JSON Data
    // this API returns random puzzle string
    //below code means do something and then do the following function
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.expect;
            }
        });
    });
});