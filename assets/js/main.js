//Formulario
const form = document.querySelector(".form__container");

// Campos del Formulario
const cardNumber = document.getElementById("card__number");
const cardHolder = document.getElementById("card__holder");
const expiryDate = document.getElementById("card__expires");
const cvvCode = document.getElementById("cvv__code");

// Elementos de la tarjeta ui
const cardNumberText = document.querySelector(".card-number-text");
const cardHolderText = document.querySelector(".card-holder-text");
const expiryDateText = document.querySelector(".expiry-date-text");
const cvvText = document.querySelector(".expiry-date-text");

//Contenedores de los mensajes de error de cada campo
const cardNumberErrorMessage = document.querySelector(".card__number-input--error");
const cardHolderErrorMessage = document.querySelector(".card__holder-input--error");
const cardExpiresErrorMessage = document.querySelector(".card__expires-input--error");
const cvvErrorMessage = document.querySelector(".cvv-input--error");

//Expresiones regulares para validar los campos
const numeroRegex = /^\d{13,16}$/;
const nombreRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']+$/;
const cvvRegex = /^\d{3}$/;

// Funcion para validar el campo de numeros de tarjeta y mostrar o esconder mensajes de error
const validateCardNumber = () => {
    if (cardNumber.value === "") {
        cardNumberErrorMessage.innerHTML = "El número de tarjeta es obligatorio.";
        return false;
    } else if (!numeroRegex.test(cardNumber.value)) {
        cardNumberErrorMessage.innerHTML = "El número solo puede contener dígitos y debe tener entre 13 y 16 caracteres.";
        return false;
    } else {
        cardNumberErrorMessage.innerHTML = "";
        return true;
    }
};

// Funcion para validar el campo de nombre del titular y mostrar o esconder mensajes de error
const validateCardHolder = () => {
    if (cardHolder.value === "") {
        cardHolderErrorMessage.innerHTML = "El nombre del titular es obligatorio.";
        return false;
    } else if (!nombreRegex.test(cardHolder.value)) {
        cardHolderErrorMessage.innerHTML = "El nombre del titular no permite caracteres especiales o números.";
        return false;
    } else {
        cardHolderErrorMessage.innerHTML = "";
        return true;
    }
};

// Funcion para validar el campo de fecha de expiracion y mostrar o esconder mensajes de error
const validateExpiryDate = () => {
    let dateNow = new Date();
    let yearNow = dateNow.getFullYear() % 100;

    let [month, year] = expiryDate.value.split("/");
    month = parseInt(month);
    year = parseInt(year);

    if (!month || !year) {
        cardExpiresErrorMessage.innerHTML = "Los campos de fecha no son validos";
        return false;
    } else if ((month < 1 || month > 12) || (year < 22 || year > yearNow + 5)) {
        cardExpiresErrorMessage.innerHTML = "Los meses deben ser entre 1 y 12 y un año entre " + (yearNow - 2) + " y " + (yearNow + 5);
        return false;
    } else {
        cardExpiresErrorMessage.innerHTML = "";
        return true;
    }
}

// Funcion para validar el campo de cvv y mostrar o esconder mensajes de error
const validateCVV = () => {
    if (cvvCode.value === "") {
        cvvErrorMessage.innerHTML = "El CVV de tarjeta es obligatorio.";
        return false;
    } else if (!cvvRegex.test(cvvCode.value)) {
        cvvErrorMessage.innerHTML = "El CVV solo puede contener 3 dígitos.";
        return false;
    } else {
        cvvErrorMessage.innerHTML = "";
        return true;
    }
};

// Funcion para validar todos los campos del formulario y agregar en un bloque la tarjeta para posteriormente enviarla a la base de datos
const checkForm = event => {
    event.preventDefault();

    if (validateCardNumber() && validateExpiryDate() && validateCardHolder() && validateCVV()) {
        addCard(); // agregamos tarjeta en el bloque
        sendCreditCardToDB(); // enviamos tarjeta a la base de datos
    };
};

// Funcion para limpiar el formulario
function clearForm() {
    var elementosFormulario = form.elements;

    for (var i = 0; i < elementosFormulario.length; i++) {
        if (elementosFormulario[i]) {
            elementosFormulario[i].value = '';
        }
    }
}

// Eventos del formulario
cardNumber.addEventListener("blur", validateCardNumber);
expiryDate.addEventListener("blur", validateExpiryDate);
cardHolder.addEventListener("blur", validateCardHolder);
cvvCode.addEventListener("blur", validateCVV);

// Eventos realizados al pulsar los botones de enviar y limpiar
form.addEventListener("submit", checkForm);
form.addEventListener("reset", clearForm);

// Funcion que observa y escribe los valores de las teclas pulsadas para el campo de numeros de tarjeta
cardNumber.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardNumberText.innerText = "1234 5678 0987 6421";
    } else {
        const valuesOfInput = e.target.value.replace(" ", "");

        if (e.target.value.length > 12) {
            cardNumberText.innerText = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        }
        else if (e.target.value.length > 8) {
            cardNumberText.innerText = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            cardNumberText.innerText = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            cardNumberText.innerText = valuesOfInput;
        }
    }
});

// Funcion que observa y escribe los valores de las teclas pulsadas para el campo de nombre del titular
cardHolder.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardHolderText.innerHTML = "DANIEL A DOMINGUEZ";
    } else {
        cardHolderText.innerHTML = e.target.value.toUpperCase();
    }
})

// Funcion que observa y escribe los valores de las teclas pulsadas para el campo de fecha de expiracion
expiryDate.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        expiryDateText.innerHTML = "01/24";
    } else {
        const valuesOfInput = e.target.value.replace("/", "");

        if (e.target.value.length > 2) {
            e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            expiryDateText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            expiryDateText.innerHTML = valuesOfInput;
        }
    }
})

// Funcion que agrega un bloque con los valores enviados en el formulario
function addCard() {
    var numbers = cardNumber.value;
    var numberMask = numbers.substring(0, 2) + "**********" + numbers.substring(12); //Enmascaramos los numeros de la tarjeta
    var holder = cardHolder.value.toUpperCase();
    var date = expiryDate.value;

    // Crear un nuevo elemento div para la tarjeta
    var newCard = document.createElement('div');

    // Agrega el contenido al nuevo elemento
    newCard.innerHTML = `<div class="card">
                            <div class="card__header">
                                <h2 class="bank__name">
                                    monobank <span> | Universal Bank</span>
                                </h2>
                                <img src="sources/nfc.svg" alt="Wireless icon">
                            </div>
                            <div class="card__body">
                                <div class="chip__icon">
                                    <img src="sources/chip.svg" alt="Chip icon">
                                </div>
                                <div class="card__number">
                                    <div class="card-number-text">${numberMask}</div>
                                </div>
                                <div class="card__footer">
                                    <div class="card__info">
                                        <div class="card__expires">
                                            <p>VALID THRU</p>
                                            <div class="expiry-date-text">${date}</div>
                                        </div>
                                        <div class="card__holder">
                                            <div class="card-holder-text">${holder}</div>
                                        </div>
                                    </div>
                                    <div class="cardtype__icon">
                                        <img src="sources/mastercard.svg" alt="Mastercard icon">
                                        <img src="sources/visa.svg" alt="Visa icon" hidden>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    document.getElementById('card__Container').appendChild(newCard);
}

// Funcion que envia datos del formulario a la base de datos
function sendCreditCardToDB() {
    const formulario = document.getElementById('creditCardForm');
    const formData = new FormData(formulario);

    fetch('http://localhost:3500/api/creditcard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
}
