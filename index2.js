const roomNameEl = document.querySelector("#room-name-select");
const participantNumEl = document.querySelector("#numberOfParticipants");
const startTimeEl = document.querySelector("#startTime");
const endTimeEl = document.querySelector("#endTime");
const btnEl = document.querySelector("#click");

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

btnEl.addEventListener("click", createRoom);

const bookingDetails = [];

function isInBetween(time, reqStartTime, reqEndTime) {
    return time > reqStartTime && time < reqStartTime;
}

function checkAvailabiliy(reqStartTime, reqEndTime) {
    function checkRoomDetails(bookingDetail) {
        const isStartTimeBetweenBookings = isInBetween(
            reqStartTime,
            bookingDetail.from,
            bookingDetail.to
        );

        if (isStartTimeBetweenBookings) {
            return false;
        }

        const isEndTimeBetweenBookings = isInBetween(
            reqEndTime,
            bookingDetail.from,
            bookingDetail.to
        );
        if (isEndTimeBetweenBookings === true) {
            return false;
        }

        return true;
    }

    if (bookingDetails.length === 0) {
        return true;
    } else {
        const newArr = bookingDetails.map(checkRoomDetails);

        return doesArrayContainTrue(newArr);
    }
}

function doesArrayContainTrue(array) {
    if (array.includes(true)) {
        return false;
    } else {
        return true;
    }
}

function createRoom() {
    const roomName = roomNameEl.value;
    const participantNum = participantNumEl.value;
    const reqStartTime = startTimeEl.value;
    const reqEndTime = endTimeEl.value;
    const isAvailable = checkAvailabiliy(reqStartTime, reqEndTime);
    if (isAvailable === true) {
        const bookingDetailsObj = {
            roomName: roomName,
            participantNum: participantNum,
            from: startTime,
            to: endTime,
        };

        bookingDetails.push(bookingDetailsObj);
        console.log(bookingDetails);
    } else {
        alert("Not availble");
    }
}