// User seat selection
const userSelection = [];
// Seats that are already booked
const bookedSeat = [{ seatId: "1-0" }, { seatId: "1-1" }, { seatId: "1-6" }];

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
  console.log(`on click seat with ID: ${seatId || "none"}`);
};

/**
 * Register click event for seat
 * @param {*} ele - DOM element
 */
const registerSeatClickEvent = function (ele) {
  ele.addEventListener("click", onClickSeat);
};

const main = function () {
  // Disable all booked seats
  bookedSeat.forEach(({ seatId }) => {
    disableSeat(seatId);
  });

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
  main();
});
