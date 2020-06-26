export const extractData = (object) => {
    let dataObject = {};
    Object.keys(object).forEach(key => {
        if(key !== 'formIsValid') dataObject[key] = object[key].value;
    })
    return dataObject;
}


export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if(rules.isEmail) {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
