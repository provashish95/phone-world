//dynamically property change function 
const dynamicPropertyChange = (value, istrue) => {
    if (istrue) {
        document.getElementById('error').style.display = value;
        return;
    } else {
        document.getElementById('footer').style.position = value;
        return;
    }
}
//clear previous data...... 
const clearData = (id) => {
    const mainCard = document.getElementById(id);
    mainCard.textContent = '';
    return;
}

//loading spinner ....
const toggleSpinner = diplaySpiner => {
    document.getElementById('spinner').style.display = diplaySpiner;
}



//get api data here .........
const searchBtn = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;

    toggleSpinner('block');
    clearData('main-card');
    dynamicPropertyChange('fixed', false);

    const singleCard = document.getElementById('single-card');
    //clear previous single data ....
    singleCard.textContent = '';

    //check input value is null or not
    if (inputValue == '') {

        dynamicPropertyChange('block', true);
        toggleSpinner('none');

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
    //console.log(phones.slice(0, 20));
    const mainCard = document.getElementById('main-card');
    clearData('main-card');
    //check array have items or not
    if (phones.length == 0) {
        dynamicPropertyChange('block', true);
        toggleSpinner('none');
    } else {
        phones.slice(0, 20).forEach(phone => {
            //console.log(phone.slug);
            //console.log(phone.phone_name);
            const div = document.createElement('div');

            div.className = "col-12 col-md-4 col-lg-4 col-xl-4";
            div.innerHTML = `
            <div class="card text-center m-auto shadow-lg p-3 mb-5 bg-body border-style" style="width: 18rem;">
               <img src="${phone.image}" class="img-fluid card-img-top" alt="Image not available">
               <div class="card-body">
                <h5 class="card-title fw-bolder">${phone.phone_name ? phone.phone_name : 'Name Not Fixed'}</h5>
                <p class="card-text">Brand: ${phone.brand ? phone.brand : 'Not Available'}</p>
                <button onclick="moreDetails('${phone.slug}')" class="btn btn-outline-info">More Details</button>
               </div>
            </div>
            
            `;
            mainCard.appendChild(div);
        });

        const div = document.createElement('div');
        div.className = "col-12 text-end mb-5";
        div.innerHTML = `
        <a class="btn btn-outline-info">See more...</a>
        `;
        mainCard.appendChild(div);

        toggleSpinner('none');
        dynamicPropertyChange('relative', false);

    }
}




//2nd part start here...
//see more details of phone by slug 
const moreDetails = (phoneId) => {

    //console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySinglePhone(data.data));
}

//display single phone details
const displaySinglePhone = (phoneDetails) => {

    //console.log(Object.keys(phoneDetails).length);

    if (Object.keys(phoneDetails).length === 0) {
        dynamicPropertyChange('block', true);
    } else {

        //get all value from sensors array...
        const sensors = phoneDetails.mainFeatures.sensors.map(sensor => sensor);
        //console.log(phoneDetails.others);
        const othersValues = Object.values(phoneDetails.others);
        //console.log(othersValues);

        const singleCard = document.getElementById('single-card');
        //clear previous single data ....
        clearData('single-card');

        const div = document.createElement('div');
        div.className = "col-12";
        div.innerHTML = `
        <div class="card mb-5 shadow-lg p-3 mb-5 bg-body border-style">
        <img src="${phoneDetails.image}" class="img-fluid card-img-top mx-auto"  style="width: 18rem;" alt="image Not Available">
        <div class="card-body mx-auto">
                <h3 class="card-title">${phoneDetails.name ? phoneDetails.name : 'Name Not Fixed'}</h3>
                <span>Released Date:</span><span class="text-muted"> ${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'Not Available'}</span><br>
                <span>Main Features</span><br>
                <span class="card-text">Storage: </span><span class="text-muted"> ${phoneDetails.mainFeatures.storage ? phoneDetails.mainFeatures.storage : 'Not Available'}</span><br>
                <span class="card-text">Display Size: </span><span class="text-muted"> ${phoneDetails.mainFeatures.displaySize ? phoneDetails.mainFeatures.displaySize : 'Not Available'}</span><br>
                <span class="card-text">ChipSet: </span><span class="text-muted"> ${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : 'Not Available'}</span><br>
                <span class="card-text">Memory: </span><span class="text-muted"> ${phoneDetails.mainFeatures.memory ? phoneDetails.mainFeatures.memory : 'Not Available'}</span><br>
                <span class="card-text">Sensors: </span><span class="text-muted"> ${sensors ? sensors : 'Not Available'}</span><br>
                <span class="card-text">Others: </span><span class="text-muted"> ${othersValues ? othersValues : 'Not Available'}</span><br>
                
            </div>
       </div>
        `;
        singleCard.appendChild(div);
    }

}