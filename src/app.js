class App {
	constructor() {
		this.$form = document.querySelector('#form');

		this.addEventListeners();
	}

	addEventListeners() {
		document.body.addEventListener('click', (event) => {
			this.handleFormClick(event);
		});
	}

	handleFormClick(event) {
		const ifFormClicked = this.$form.contains(event.target);

		ifFormClicked ? '' : '';
	}
}

new App();
