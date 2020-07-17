export const extractData = (object) => {
    let dataObject = {};
    console.log('object', object);
    Object.keys(object).forEach(key => {
        if (key !== 'formIsValid') dataObject[key] = object[key].value;
    })
    return dataObject;
}


export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) isValid = value.trim() !== '' && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules.isEmail) {
        const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}


export const onValueChangeHandler = (event, config, configKey, key, setMethod) => {
    const updatedConfig = { ...config };
    const updatedConfigElement = { ...config[configKey][key] }
    updatedConfigElement.value = event.target.value;
    updatedConfigElement.valid = checkValidity(updatedConfigElement.value, updatedConfigElement.validation);
    updatedConfigElement.touched = true;
    updatedConfig[configKey][key] = updatedConfigElement;

    let formIsValid = true;
    for (let key in updatedConfig[configKey]) {
        updatedConfig.formIsValid = updatedConfig[configKey][key].valid && formIsValid;
    }

    setMethod(updatedConfig)
}

export const linkBuilder = (title) => {
    return title.toLowerCase().replace(/\s/g, "-");
} 
