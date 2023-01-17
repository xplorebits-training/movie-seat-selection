// User seat selection
const userSelection = [];

// Seats that are already booked
let bookedSeat = [];

let file = "BookedSeats.json";
fetch(file)
  .then((response) => response.json())
  .then(function (data) {
    bookedSeat = data;
    console.log(data);
  })
  .catch((error) => {
    console.error("here", error);
  });

/**
 * Disable seat by ID
 * @param {String} id - ID of the seat
 */
const disableSeat = function (id) {
  const ele = document.getElementById(id);
  if (ele) {
    ele.setAttribute("sold", true);
  }
};

/**
 * When seat is clicked
 * @param {*} e - DOM element
 */
const onClickSeat = function (e) {
  let seatId = e.target.id || "";

  if (document.getElementById(seatId).hasAttribute("selected") === false) {
    document.getElementById(seatId).setAttribute("selected", true);
    userSelection.push({ seatId: seatId });
    console.log(userSelection);
    //console.log(`on click seat with ID: ${seatId || "none"}`);
  } else {
    document.getElementById(seatId).removeAttribute("selected");
    let elementToBeRemoved = userSelection.find(
      (item) => item.seatId === seatId
    );
    console.log(elementToBeRemoved);
    userSelection.splice(userSelection.indexOf(elementToBeRemoved), 1);
    console.log(userSelection);
  }
};

/**
 * Register click event for seat
 * @param {*} ele - DOM element
 */
const registerSeatClickEvent = function (ele) {
  ele.addEventListener("click", onClickSeat);
};

const loadUserSelectedSeats = function () {  
  if ( localStorage.getItem("userSelection") ){    
    let arr = localStorage.getItem("userSelection").split(",");    
    arr.forEach ((element) => {
      userSelection.push( { "seatId" : element } )
      document.getElementById(element).setAttribute("selected", true);
    });
  };
}

const main = function () {
  // Disable all booked seats
  bookedSeat.forEach(({ seatId }) => {
    disableSeat(seatId);
  });

  //verifying the booking
  checkCollision();

  //enabling already booked seats
  loadUserSelectedSeats();

  //enabling the book button
  enableBookButton();

  // Get all seat elements
  const eleSeats = document.getElementsByClassName("seat");

  // Register on click seat
  for (let index = 0; index < eleSeats.length; index++) {
    const ele = eleSeats[index];
    // Register click event only when seat is not-booked
    if (ele.getAttribute("seat") === true) {
      // Seat is booked
      continue;
    }

    registerSeatClickEvent(ele);

  }



};

// Wait until page is ready
window.addEventListener("load", () => {
  // Page is ready
  fetch(file)
    .then((response) => response.json())
    .then(function (data) {
      bookedSeat = data;
      main();
      //console.log(bookedSeat);
    })
    .catch((error) => {
      console.error("here", error);
    });

});

let clearButton = document.getElementById("clear");
clearButton.onclick = function(){
  localStorage.clear();
  location.reload();
}

const checkCollision = function () {
  let BSeat = []
  let USSeat = []
  bookedSeat.forEach ( ( element ) => {
    BSeat.push( Object.values( element ) );
  });
  userSelection.forEach ( ( element ) => {
    USSeat.push( Object.values( element ) );
  });
  for ( let i = 0 ; i < BSeat.length ; i++ ){

    for ( let j = 0 ; j < USSeat.length ; j++ ){

      if( BSeat[i] === USSeat[j] ){

        let elementToBeRemoved = userSelection.find(
          (item) => item.seatId === USSeat(j)
        );
        userSelection.splice( userSelection.indexOf(elementToBeRemoved), 1 );

      }

    }
  }
}