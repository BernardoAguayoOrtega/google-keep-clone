class App {
	constructor() {
		this.$form = document.querySelector('#form');

    this.$noteTitle = document.querySelector('#note-title');

    this.$formButtons = document.querySelector('#form-buttons');

		this.addEventListeners();
	}

	addEventListeners() {
		document.body.addEventListener('click', (event) => {
			this.handleFormClick(event);
		});
	}

	handleFormClick(event) {
		const ifFormClicked = this.$form.contains(event.target);

		if (ifFormClicked) this.openForm;
	}

	openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block'
    this.$formButtons.style.display = 'block'
	}
}

new App();
