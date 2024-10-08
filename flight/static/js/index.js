document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#flight-from").addEventListener("input", event => {
        flight_from(event);
    });

    document.querySelector("#flight-to").addEventListener("input", event => {
        flight_to(event);
    });

    document.querySelector("#flight-from").addEventListener("focus", event => {
        flight_from(event, true);
    });

    document.querySelector("#flight-to").addEventListener("focus", event => {
        flight_to(event, true);
    });

    const tripTypeSelect = document.getElementById('trip-type');
    const departDateInput = document.getElementById('depart_date');
    const returnDateInput = document.getElementById('return_date');

    function updateReturnDateState() {
        if (tripTypeSelect.value === "1") { // One Way Trip
            returnDateInput.value = '';
            returnDateInput.disabled = true;
        } else { // Round Trip
            returnDateInput.disabled = false;
            // Update the minimum date for return date based on departure date
            updateReturnDateMin();
        }
    }

    function updateReturnDateMin() {
        const selectedDepartDate = departDateInput.value;
        if (selectedDepartDate) {
            returnDateInput.setAttribute('min', selectedDepartDate);
        }
    }

    // Set the minimum date for departure date to today
    const today = new Date().toISOString().split('T')[0];
    departDateInput.setAttribute('min', today);

    // Initialize the state based on the default trip type
    updateReturnDateState();

    // Event listeners
    tripTypeSelect.addEventListener('change', updateReturnDateState);
    departDateInput.addEventListener('change', updateReturnDateMin);
});


// document.addEventListener("DOMContentLoaded", () => {


//     document.querySelectorAll('.trip-type').forEach(type => {
//         type.onclick = trip_type;
//     });

//     const departDateInput = document.getElementById('depart_date');
//     const returnDateInput = document.getElementById('return_date');

//     // Set the minimum date for departure date to today
//     const today = new Date().toISOString().split('T')[0];
//     departDateInput.setAttribute('min', today);

//     // Update the minimum return date based on the selected departure date
//     departDateInput.addEventListener('change', (event) => {
//         const selectedDepartDate = event.target.value;
//         returnDateInput.setAttribute('min', selectedDepartDate);
//     });

// });


function showplaces(input) {
    let box = input.parentElement.querySelector(".places_box");
    box.style.display = 'block';
}

function hideplaces(input) {
    let box = input.parentElement.querySelector(".places_box");
    setTimeout(() => {
        box.style.display = 'none';
    }, 300);
}

function selectplace(option) {
    let input = option.parentElement.parentElement.querySelector('input[type=text]');
    input.value = option.dataset.value.toUpperCase();
    input.dataset.value = option.dataset.value;
}

function flight_to(event, focus=false) {
    let input = event.target;
    let list = document.querySelector('#places_to');
    showplaces(input);
    if(!focus) {
        input.dataset.value = '';
    }
    if(input.value.length > 0) {
        fetch('query/places/'+input.value)
        .then(response => response.json())
        .then(places => {
            list.innerHTML = '';
            places.forEach(element => {
                let div = document.createElement('div');
                div.setAttribute('class', 'each_places_to_list');
                div.classList.add('places__list');
                div.setAttribute('onclick', "selectplace(this)");
                div.setAttribute('data-value', element.code);
                div.innerText = `${element.airport}, ${element.city} (${element.country})`;
                list.append(div);
            });
        });
    }
}

function flight_from(event, focus=false) {
    let input = event.target;
    let list = document.querySelector('#places_from');
    showplaces(input);
    if(!focus) {
        input.dataset.value = '';
    }
    if(input.value.length > 0) {
        fetch('query/places/'+input.value)
        .then(response => response.json())
        .then(places => {
            list.innerHTML = '';
            places.forEach(element => {
                let div = document.createElement('div');
                div.setAttribute('class', 'each_places_from_list');
                div.classList.add('places__list');
                div.setAttribute('onclick', "selectplace(this)");
                div.setAttribute('data-value', element.code);
                div.innerText = `${element.airport}, ${element.city} (${element.country})`;
                list.append(div);
            });
        });
    }
}

function trip_type() {
    document.querySelectorAll('.trip-type').forEach(type => {
        if(type.checked) {
            if(type.value === "1") {
                document.querySelector('#return_date').value = '';
                document.querySelector('#return_date').disabled = true;
            }
            else if(type.value === "2") {
                document.querySelector('#return_date').disabled = false;
            }
        }
    })
}

function flight_search() {
    if(!document.querySelector("#flight-from").dataset.value) {
        alert("Please select flight origin.");
        return false;
    }
    if(!document.querySelector("#flight-to").dataset.value) {
        alert("Please select flight destination.");
        return false;
    }
    if(document.querySelector("#one-way").checked) {
        if(!document.querySelector("#depart_date").value) {
            alert("Please select departure date.");
            return false;
        }
    }
    if(document.querySelector("#round-trip").checked) {
        if(!document.querySelector("#depart_date").value) {
            alert("Please select departure date.");
            return false;
        }
        if(!document.querySelector("#return_date").value) {
            alert("Please select return date.");
            return false;
        }
    }
}