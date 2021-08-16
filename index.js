const roomNameInputEl = document.querySelector("#room-name-select");
const numOfParticipants = document.querySelector("#numberOfParticipants");
const startTime = document.querySelector("#startTime");
const endTime = document.querySelector("#endTime");
const clickBtn = document.querySelector("#click");
const message = document.querySelector("#message");

const roomDetails = [
    { roomName: "A", capacity: 10 },
    { roomName: "B", capacity: 20 },
    { roomName: "C", capacity: 30 },
];

const roomNameSelectEl = document.querySelector("#room-name-select");
roomDetails.forEach(function(roomDetail) {
    const optionEl = document.createElement("option");
    optionEl.value = roomDetail.roomName;
    optionEl.innerText = roomDetail.roomName;
    roomNameSelectEl.append(optionEl);
});

const bookingDetailsEl = document.querySelector("#booking-details");

clickBtn.addEventListener("click", bookRoom);
const bookingDetails = [];

function convertTimeToInt(time) {
    const timeInStr = time.replace(":", "");
    return parseInt(timeInStr);
}

function checkRoomAvailable(participantNu, startTimeValue, endTimeValue) {
    if (bookingDetails.length === 0) {
        return true;
    }

    const startTimeInt = convertTimeToInt(startTimeValue);
    const endTimeInt = convertTimeToInt(endTimeValue);
    if (startTimeValue < endTimeValue) {
        return false;
    }

    let isStartTimeinMiddle, isEndTimeInMiddle;
    const bookingCompareArr = bookingDetails.map(function(bookingDetail) {
        if (bookingDetail.pNumber > participantNu) {
            return false;
        }
        const startTimeIntExistingBooking = convertTimeToInt(bookingDetail.from);
        const endTimeIntExistingBooking = convertTimeToInt(bookingDetail.to);
        if (
            startTimeInt > startTimeIntExistingBooking &&
            startTimeInt < endTimeIntExistingBooking
        ) {
            isStartTimeinMiddle = true;
        }
        if (
            endTimeInt > startTimeIntExistingBooking &&
            endTimeInt < endTimeIntExistingBooking
        ) {
            isEndTimeInMiddle = true;
        }
        if (isStartTimeinMiddle === true || isEndTimeInMiddle === true) {
            return false;
        } else {
            return true;
        }
    });

    if (bookingCompareArr.includes(true)) {
        return true;
    } else {
        return false;
    }
}

function bookRoom(e) {
    e.preventDefault();
    let participantNu = numOfParticipants.value;
    let roomNameValue = roomNameInputEl.value;
    let startTimeValue = startTime.value;
    let endTimeValue = endTime.value;

    const isRoomAvailable = checkRoomAvailable(
        participantNu,
        startTimeValue,
        endTimeValue
    );
    if (isRoomAvailable) {
        let bookingDetail = {};

        bookingDetail.roomName = roomNameValue;

        bookingDetail.pNumber = participantNu;

        bookingDetail.from = startTimeValue;

        bookingDetail.to = endTimeValue;

        bookingDetails.push(bookingDetail);

        const rowEl = document.createElement("tr");
        const roomNameEl = document.createElement("td");
        roomNameEl.innerText = roomNameValue;
        const particNoEl = document.createElement("td");
        particNoEl.innerText = participantNu;
        const startTimeEl = document.createElement("td");
        startTimeEl.innerText = startTimeValue;
        const endTimeEl = document.createElement("td");
        endTimeEl.innerText = endTimeValue;

        rowEl.append(roomNameEl);
        rowEl.append(particNoEl);
        rowEl.append(startTimeEl);
        rowEl.append(endTimeEl);

        bookingDetailsEl.append(rowEl);
    } else {
        alert("No room available");
    }
}

// const roomBookingDetails = [
//     { roomName: "x", pNumber: 10, from: "10:00", to: "11:00" },
//     { roomName: "x", pNumber: 10, from: "11:00", to: "12:00" },
// ];