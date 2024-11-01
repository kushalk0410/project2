async function fetchRooms() {
    const response = await fetch('api/getRooms.php');
    const rooms = await response.json();
    const roomList = document.getElementById('room-list');
    const roomSelect = document.getElementById('room-select');
    roomList.innerHTML = '';
    roomSelect.innerHTML = '';

    rooms.forEach(room => {
        const li = document.createElement('li');
        li.textContent = `${room.room_number} - ${room.room_type} - $${room.price}`;
        roomList.appendChild(li);

        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = room.room_number;
        roomSelect.appendChild(option);
    });
}

// Function to make a reservation
async function makeReservation() {
    const guestName = document.getElementById('guest-name').value;
    const roomId = document.getElementById('room-select').value;
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;

    await fetch('api/makeReservation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ room_id: roomId, guest_name: guestName, check_in: checkIn, check_out: checkOut }),
    });

    alert('Reservation made successfully!');
}

// Function to generate a bill
async function generateBill() {
    const reservationId = document.getElementById('reservation-id').value;
    const totalAmount = document.getElementById('total-amount').value;

    await fetch('api/generateBill.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ reservation_id: reservationId, total_amount: totalAmount }),
    });

    alert('Bill generated successfully!');
}

// Initial fetch of rooms
fetchRooms();
