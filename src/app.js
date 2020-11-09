class App {
	constructor() {
		this.$form = document.querySelector('#form');
		this.$noteTitle = document.querySelector('#note-title');
		this.$noteText = document.querySelector('#note-text');
		this.$formButtons = document.querySelector('#form-buttons');

		this.addEventListeners();
	}

	addEventListeners() {
		document.body.addEventListener('click', (event) => {
			this.handleFormClick(event);
		});

		this.$form.addEventListener('submit', (event) => {
			event.preventDefault();

			const note = {
				title: this.$noteTitle.value,
				text: this.$noteTitle.value,
			};

			const hasNote = note.text || note.title ? true : false;

			console.log(note, hasNote);
			this.closeForm();
		});
	}

	handleFormClick(event) {
		const isFormClicked = this.$form.contains(event.target);

		if (isFormClicked) {
			this.openForm();
		} else {
			this.closeForm();
		}
	}

	openForm() {
		this.$form.classList.add('form-open');
		this.$noteTitle.style.display = 'block';
		this.$formButtons.style.display = 'block';
	}

	closeForm() {
		this.$form.classList.remove('form-open');
		this.$noteTitle.style.display = 'none';
		this.$formButtons.style.display = 'none';
	}
}

new App();
