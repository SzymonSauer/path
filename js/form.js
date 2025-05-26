const errorMsg = document.querySelector('.error');
const submitBtn = document.querySelector('.submit');
const noteText = document.querySelector('#note');
const therapyType = document.querySelector('.type');
const therapyTypeDiv = document.querySelector('.form-box-therapy-type');
const emailDiv = document.querySelector('.form-box-email');
const emailInput = document.querySelector('#email-form');
const dateDiv = document.querySelector('.form-box-date');
const dateInput = document.querySelector('.date');
const hourDiv = document.querySelector('.form-box-hour');
const hourInput = document.querySelector('.hour');
const divPopup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.close');
const popupCloseBtn2 = document.querySelector('#reload');

const wrapperForm = document.querySelector('.wrapper-form');
const offerBtns = document.querySelectorAll('.offers__option-btn');
const chooseBtns = document.querySelectorAll('.psychotherapy__card-info-btn');
const showFormExpBtns = document.querySelector('.form-show-exploreBtns');
const showFormChooseBtns = document.querySelector('.form-show-chooseBtns');
const closeBtn = document.querySelector('.fa-solid');
const closeFormClass = document.querySelector('.form-close');

const btnExploreThird = document.querySelector('.btn-test');

//I set the current date - it will not be possible to select an earlier date.
// const date = new Date();
// let day = date.getDate() + 1;
// let month = date.getMonth() + 1;
// let year = date.getFullYear();

//I put the values in the form in an array
// let currentDate = `${year}-${month}-${day}`;
// dateInput.min = currentDate;

const currentDateInput = () => {
	const date = new Date();
	let day = date.getDate() + 1;
	let month = date.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	let year = date.getFullYear();
	let currentDate = `${year}-${month}-${day}`;
	dateInput.min = currentDate;
};

currentDateInput();

const inputsArray = [
	therapyType.value,
	dateInput.value,
	hourInput.value,
	emailInput.value,
];

const showError = (input, message) => {
	input.classList.add('error-visible');
	input.textContent = message;
};

const removeError = (input) => {
	input.classList.remove('error-visible');
};

const checkEmail = (input) => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (input.value.match(re)) {
		removeError(errorMsg);
	} else if (input.value == '') {
		showError(errorMsg, 'The field is empty, please fill in the data.');
	} else {
		showError(errorMsg, 'The form contains errors, please correct your email.');
	}
};

noteText.textContent = 'Add a note (optional)';
const makeNote = (e) => {
	console.log(e.target.classList.value);

	if (e.target.classList.value === 'note-body') {
		noteText.style.color = 'black';
		noteText.textContent = '';
	}
};

const changeColorInput = (input) => {
	if (input.value !== '') {
		input.classList.add('input-color');
	} else {
		input.classList.remove('input-color');
	}
};

// const test = (e) => {
// 	console.log(e);
// };

//Pomysł na funkcję jest dobry - ze popup sie pokazuje gdy wszystkie pola są wypełnione. Tylko jak sprawdzić czy są wypełnione? Nie można zrobić if input.value !== '' to pokaż popup, bo nie wszystkie inputy
//mają '' kiedy nic nie jest wybrane. Dlatego postaraj się znaleźć za pomocą event jakis element który jest taki sam dla wszystkich inputów, gdy nic nie jest wybrane. (Może nie ma czegoś takiego - wtedy trzeba wymyślić coś innego)

//Każdy z inputów czy selectów ma coś takiego jak input.defaultValue. W przypadku typów terapii i godziny te wartości są undifined (może można im przydzielić domyślną wartość?).
//Wtedy można w funkcji showPopup znliczać błędy na tej podstawie, tzn. if (input.value == input.defaultValue){ counter++}. Zastanów się

const showPopup = () => {
	const inputsArray = [dateInput.value, hourInput.value, emailInput.value];
	let numberOfInputs = inputsArray.length + 1;
	let counter = 0;

	for (let i = 0; i < numberOfInputs; i++) {
		if (
			therapyType.selectedIndex == '0' ||
			inputsArray[i] == '7:00 am' ||
			inputsArray[i] == '' ||
			errorMsg.classList.contains('error-visible')
		) {
			counter++;
		}
	}

	if (counter == 0) {
		divPopup.classList.add('show-popup');
	}

	console.log(counter);
};

const reloadPage = () => {
	location.reload();
};

dateDiv.addEventListener('input', function () {
	changeColorInput(dateDiv);
});

hourDiv.addEventListener('input', function () {
	changeColorInput(hourDiv);
});

therapyTypeDiv.addEventListener('input', function () {
	changeColorInput(therapyTypeDiv);
});

noteText.addEventListener('click', makeNote);
changeColorInput(emailDiv);

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	checkEmail(emailInput);
	showPopup();
});

// offerBtns.forEach((button) => {
// 	button.addEventListener('click', () =>
// 		wrapperForm.classList.toggle('form-show')
// 	);
// });

const changeTop = () => {
	(window.scrollY + window.scrollY * 0.1).toFixed(0) + 'px';
};

btnExploreThird.addEventListener('click', changeTop);

// offerBtns.forEach((button) => {
// 	button.addEventListener('click', () =>
// 		// wrapperForm.classList.add('form-show-exploreBtns')
// 		wrapperForm.classList.toggle('form-show-exploreBtns')(
// 			(showFormExpBtns.style.top = topValue.toFixed(0) + 'px')
// 		)
// 	);
// });

let topValue;
//Robie funkcje, ktora wywołuje formularz w miejscu, gdzie kliknięto przycisk, aby go wywołać.
// Efekt ten chcę osiągnąć w ten sposób, że wartość window.scroolY podaję do top w klasie css, przechowujacej pozycje formularza (po wywołaniu)
//Najpierw trzeba wartość windows.scrollY przeonwertować na number za pomoca parseInt - dodac jakaś wartosc, np. 100 - nastepnie te wartosc przypisac do zmiennej. Tę zmienna przekonwertowac na string, do ktorego trzeba dodac +'px'. Taka wartosc tradia do to w klasie css

//Ponisza funkcja jest ok i działa. Pojawia się jednak problem jak zamknac formularz? Dodaj x na formularzu, na ktiry dasz listener do zamkniecia
offerBtns.forEach((button) => {
	button.addEventListener(
		'click',
		() =>
			(showFormExpBtns.style.top =
				(window.scrollY + window.scrollY * 0.12).toFixed(0) + 'px')
	);
});

offerBtns.forEach((button) => {
	button.addEventListener('click', () =>
		wrapperForm.classList.add('form-show-exploreBtns')
	);
});

chooseBtns.forEach((button) => {
	button.addEventListener(
		'click',
		() =>
			(showFormChooseBtns.style.top =
				(window.scrollY + window.scrollY * 0.12).toFixed(0) + 'px')
	);
});

chooseBtns.forEach((button) => {
	button.addEventListener('click', () =>
		wrapperForm.classList.add('form-show-chooseBtns')
	);
});

const closeForm = () => {
	showFormChooseBtns.style.top = -500 + 'px';
	showFormExpBtns.style.top = -500 + 'px';
	wrapperForm.classList.remove('form-show-chooseBtns');
	wrapperForm.classList.remove('form-show-exploreBtns');
};

closeBtn.addEventListener('click', closeForm);

popupCloseBtn.addEventListener('click', function () {
	console.log('reload');
	window.location.reload(true);
	// reloadPage();
});

popupCloseBtn.addEventListener('click', reloadPage);

//Robie funkce, ktora wywołuje formularz w miejscu, gdzie kliknięto przycisk, aby go wywołać.
// Efekt ten chcę osiągnąć w ten sposób, że wartość window.scroolY podaję do top w klasie css, przechowujacej pozycje formularza (po wywołaniu)
