/**
 * Form handling script for contact page.
 */

document.addEventListener("DOMContentLoaded", () => {
    initForm();
});

/**
 * Handles form submission and validation.
 * @returns {void}
 */
function initForm() {
    const nameInputEl = document.getElementById('name');
    const emailInputEl = document.getElementById('email');
    const messageInputEl = document.getElementById('message');

    const errorOutput = {
        name: '',
        email: '',
        message: '',
    }

    const errorOutputEl =
        document.querySelector('output[name="error_output"]') ||
        console.log('Error output not found.');
    const charCountEl = document.querySelector('output[name="char_remain"]') ||
        console.log('Character count output not found.');

    nameInputEl.addEventListener('input', () => handleValidation('name', nameInputEl));
    emailInputEl.addEventListener('input', () => handleValidation('email', emailInputEl));
    messageInputEl.addEventListener('input', () => {
        handleValidation('message', messageInputEl);
        updateCharCount(messageInputEl);
    });

    /**
     * Handles validation for the form fields.
     * @param {string} field - The name of the field being validated.
     * @param {HTMLElement} inputEl - The input element to validate.
     * @return {void}
     */
    function handleValidation(field, inputEl) {
        const errorMsg = setCustomError(field, inputEl);
        updateError(field, errorMsg);
        updateOutput();
        if (!checkInputIsValid(inputEl)) {
            auditError(errorMsg);
        }
    }

    /**
     * Updates the character count display for a given input element.
     * @param {HTMLElement} inputEl - The input element to monitor.
     * @returns {void}
     */
    function updateCharCount(inputEl) {
        const maxLength = inputEl.maxLength;
        const currentLength = inputEl.value.length;
        const remainingChars = maxLength - currentLength;
        charCountEl.textContent = `Characters remaining: ${remainingChars}`;
    }

    /**
     * Uses checkValidity() to see if an input is valid modularly.
     * @param {object} inputEl - The element to check validity on.
     * @returns {boolean} - Whether the input is valid or not.
     */
    function checkInputIsValid(inputEl) {
        return inputEl.checkValidity();
    }

    /**
     * Sets and returns a custom validity message for the target element.
     * Custom messages are defined in this function.
     * @param {object} inputEl - The element accepting input.
     * @returns {string} - The custom validation message.
     */
    function setCustomError(elementName, inputEl) {
        const validity = inputEl.validity;
        const empty = validity.valueMissing;
        const badChars = validity.patternMismatch;
        const tooShort = validity.tooShort;

        if (empty) {
            inputEl.setCustomValidity(`Fill out your ${elementName}!`)
        }
        else if (badChars) {
            inputEl.setCustomValidity(`Please only use characters valid for a ${elementName}!`);
        }
        else if (tooShort) {
            inputEl.setCustomValidity(`${elementName} is too short!`);
        }
        else {
            inputEl.setCustomValidity('');
        }

        return inputEl.validationMessage;
    }

    /**
     * Updates given error to the output errors array.
     * @param {string} origin - The input origin of the message.
     * @param {string} errorMsg - The error message.
     * @returns {void}
     */
    function updateError(origin, errorMsg) {
        if (!(origin in errorOutput)) origin = 'default';

        if (errorMsg) errorOutput[origin] = `${origin} field: ${errorMsg}`
        else errorOutput[origin] = '';
    }

    let fadeOutTimer;

    /**
     * Updates the output element with the current information.
     * If there is no information, hides the element.
     * @returns {void}
     */
    function updateOutput() {
        const combinedErrors = Object.values(errorOutput)
            .filter(msg => msg !== '')
            .join('\n');

        clearTimeout(fadeOutTimer);

        if (combinedErrors) {
            errorOutputEl.textContent = combinedErrors;
            errorOutputEl.style.opacity = '1';
            errorOutputEl.style.visibility = 'visible';

            // auto hide after 3 seconds of no updates
            fadeOutTimer = setTimeout(() => {
                errorOutputEl.style.opacity = '0';
                errorOutputEl.style.visibility = 'hidden';
            }, 3000);
        } else {
            errorOutputEl.style.opacity = '0';
            errorOutputEl.style.visibility = 'hidden';
        }
    }

    const formErrors = [];
    const formErrorsEl = document.getElementById('form_errors');

    /**
     * Adds all formErrors encountered to an array.
     * @param {string} errorMsg - The error message to audit.
     */
    function auditError(errorMsg) {
        // only add if error triggered is different
        if (errorMsg !== formErrors[formErrors.length - 1]) {
            formErrors.push(errorMsg);
        }
    }

    // Sends all formErrors encountered on form submission.
    const form = document.querySelector('form');
    form.addEventListener('submit', () => {
        formErrorsEl.value = JSON.stringify(formErrors);
    });
}
