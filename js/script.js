const searchBtn = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;

    if (inputValue == '') {
        console.log('input value is null');
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data));
    }


}

//display phones.....

const displayPhones = (phones) => {
    //console.log(phones.length);

    if (phones.length == 0) {
        console.log('Data not found');
    } else {
        phones.forEach(phone => {
            //console.log(phone);
            console.log(phone.phone_name);
        });
    }

}