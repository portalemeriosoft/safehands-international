import { allCountries } from "./countries";



const time_in_minutes = (x) => {
    let time;

    if (x === 0) {
        time = '';
    } else if (x === 1) {
        time = x + ' minute';
    } else if (x > 1 && x < 60) {
        time = x + ' minutes';
    } else {
        time = '';
    }
    return time

}

const time_in_hours = (t) => {
    let time;
    if (t >= 60) {

        let hours = Math.floor(t / 60)
        const remaining_time = t - (hours * 60)
        const timeInMinutes = time_in_minutes(remaining_time);

        if (hours === 1) {
            time = '1 Hour';
        } else if (hours > 1 && hours < 24) {
            time = hours + ' Hours';
        } else {
            time = '';
        }

        if (timeInMinutes !== '') {
            time = time + ' and ' + timeInMinutes;
        }

    } else {
        time = time_in_minutes(t);
    }
    return time
}

export const time_display = (t) => {
    let time;
    if (t >= 1440) {

        let days = Math.floor(t / 1440)
        let remaining_time = t - (days * 1440)
        let timeInHrs = time_in_hours(remaining_time);
        if (days === 1) {
            time = '1 Day';
        } else if (days > 1) {
            time = days + ' Days';
        } else {
            time = '';
        }

        if (timeInHrs !== '') {
            time = time + ', ' + timeInHrs;
        }

    } else {
        time = time_in_hours(t);
    }
    return time
}


export const displayPhoneNumber = (dialling_code, phone) => {
    let phoneNumber = dialling_code && "+" + dialling_code + " ";
    phoneNumber += phone && phone;
    return phoneNumber;
};

export const displayCountry = (country_code) => {
    const [country] = allCountries.filter((x) => x[1] === country_code);
    return country[0];
}

export const displayBillingAddress = (billing_address) => {
    let address = billing_address.address;
    address += billing_address.home_town && ", " + billing_address.home_town;
    address += billing_address.city && ", " + billing_address.city;
    address += billing_address.country && ", " + billing_address.country;
    address +=
        billing_address.country_code &&
        " " + billing_address.country_code.toUpperCase();
    address += billing_address.zip_code && " " + billing_address.zip_code;
    return address;
};