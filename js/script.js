//dynamically property change function 
const dynamicPropertyChange = (value, istrue) => {
    if (istrue) {
        document.getElementById('error').style.display = value;
    } else {
        document.getElementById('footer').style.position = value;
    }
}

//clear previous data...... 
const clearData = () => {
    const mainCard = document.getElementById('main-card');
    mainCard.textContent = '';
}



const searchBtn = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;

    clearData();
    dynamicPropertyChange('fixed', false);

    //check input value is null or not
    if (inputValue == '') {
        dynamicPropertyChange('block', true);
    } else {
        dynamicPropertyChange('none', true);
        loadPhones(inputValue);

    }
    //clear input field...
    input.value = '';
}

//make url dynamic by input value
const loadPhones = searchPhones => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhones}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

//display phones.....
const displayPhones = (phones) => {
    //console.log(phones.length);
    const mainCard = document.getElementById('main-card');

    clearData();
    //check array have items or not
    if (phones.length == 0) {
        dynamicPropertyChange('block', true);
    } else {
        phones.forEach(phone => {
            //console.log(phone.slug);
            //console.log(phone.phone_name);
            const div = document.createElement('div');
            div.className = "col-12 col-md-4 col-lg-4 col-xl-4";
            div.innerHTML = `
            <div class="card text-center m-auto shadow-lg p-3 mb-5 bg-body border-style" style="width: 18rem;">
               <img src="${phone.image}" class="img-fluid card-img-top" alt="...">
               <div class="card-body">
                <h5 class="card-title fw-bolder">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="moreDetails('${phone.slug}')" class="btn btn-outline-info">More Details</button>
               </div>
            </div>
            `;
            mainCard.appendChild(div);
        });
        dynamicPropertyChange('relative', false);

    }
}




//2nd part start here...
//see more details of phone by slug 
const moreDetails = (phoneId) => {
    console.log(phoneId);
}