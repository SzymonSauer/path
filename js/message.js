const nameInput = document.querySelector('.contact__form-input');
const emailInputMsg = document.querySelector('#email');
const messageInput = document.querySelector('.contact__form-textarea');
const sendBtn = document.querySelector('.contact__form-btn');
const divPopupMsg = document.querySelector('.popup-message');
const closeBtnMsg = document.querySelector('.close-message');
const popupCloseBtnMsg = document.querySelector('#reload-message');
const errorMsgInfo = document.querySelector('.error-message');
const errorMsgInfoEmail = document.querySelector('.error-message-email');
const errorMsgInfoNote = document.querySelector('.error-message-note');

const inputsArrayMsg = [
	nameInput.value,
	emailInputMsg.value,
	messageInput.value,
];

const showErrorMsg = (input, message) => {
	input.classList.add('error-visible');
	input.textContent = message;
};

const removeErrorMsg = (input) => {
	input.classList.remove('error-visible');
};

//Functions created to check email
const showErrorMsgMail = (input, message) => {
	input.classList.add('error-visible-message');
	input.textContent = message;
};

const removeErrorMsgMail = (input) => {
	input.classList.remove('error-visible-message');
};

const checkEmailMsg = (input) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (input.value.match(re)) {
		removeErrorMsgMail(errorMsgInfoEmail);
	} else if (input.value == '') {
		showErrorMsgMail(
			errorMsgInfoEmail,
			'The field is empty, please fill in the data.'
		);
	} else {
		showErrorMsgMail(
			errorMsgInfoEmail,
			'The form contains errors, please correct your email.'
		);
	}
};

const checkFormField = (input) => {
	if (input.value == '') {
		showErrorMsg(errorMsgInfo, 'The field is empty, please fill in the data.');
	} else {
		removeErrorMsg(errorMsgInfo);
	}
};

const checkFormFieldNote = (input) => {
	if (input.value == '') {
		showErrorMsg(
			errorMsgInfoNote,
			'The field is empty, please fill in the data.'
		);
	} else {
		removeErrorMsg(errorMsgInfoNote);
	}
};

const showPopupMsg = () => {
	const inputsArrayMsg = [
		nameInput.value,
		emailInputMsg.value,
		messageInput.value,
	];
	let numberOfInputsMsg = inputsArrayMsg.length;
	let counter = 0;

	for (let i = 0; i < numberOfInputsMsg; i++) {
		if (
			inputsArrayMsg[i] == '' ||
			errorMsgInfoEmail.classList.contains('error-visible-message')
		) {
			counter++;
		}
	}

	if (counter == 0) {
		divPopupMsg.classList.add('show-popup');
	}

	console.log(counter);
};

closeBtnMsg.addEventListener('click', function () {
	console.log('reload');
	// window.location.reload(true);
	location.reload();
});

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	checkFormField(nameInput);
	checkFormFieldNote(messageInput);
	checkEmailMsg(emailInputMsg);
	showPopupMsg();
});
