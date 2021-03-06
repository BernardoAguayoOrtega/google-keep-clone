class App {
	constructor() {
		// local variables
		this.notes = JSON.parse(localStorage.getItem('notes')) || [];
		this.title = '';
		this.text = '';
		this.id = '';

		// dom elements
		this.$placeholder = document.querySelector('#placeholder');
		this.$form = document.querySelector('#form');
		this.$notes = document.querySelector('#notes');
		this.$noteTitle = document.querySelector('#note-title');
		this.$noteText = document.querySelector('#note-text');
		this.$formButtons = document.querySelector('#form-buttons');
		this.$formCloseButton = document.querySelector('#form-close-button');
		this.$modal = document.querySelector('.modal');
		this.$modalTitle = document.querySelector('.modal-title');
		this.$modalText = document.querySelector('.modal-text');
		this.$modalCloseButton = document.querySelector('.modal-close-button');
		this.$colorTooltip = document.body.querySelector('#color-tooltip');
		this.$colorModal = document.body.querySelector('.color-modal');

		// add event listener
		this.addEventListeners();

		// render app
		this.render()
	}

	addEventListeners() {
		document.body.addEventListener('click', (event) => {
			this.handleFormClick(event);
			this.selectNote(event);
			this.openModal(event);
			this.deleteNote(event);
		});

		document.body.addEventListener('click', (event) => {
			this.openToolTip(event);
		});

		this.$colorModal.addEventListener('click', (event) => {
			this.closeToolTip(event);
		});

		this.$form.addEventListener('submit', (event) => {
			event.preventDefault();
			const title = this.$noteTitle.value;
			const text = this.$noteText.value;
			const hasNote = title || text;
			if (hasNote) {
				this.addNote({ title, text });
			}
		});

		this.$formCloseButton.addEventListener('click', (event) => {
			event.stopPropagation();
			this.closeForm();
		});

		this.$modalCloseButton.addEventListener('click', (event) => {
			this.closeModal(event);
		});

		this.$colorTooltip.addEventListener('click', (event) => {
			const color = event.target.dataset.color;
			if (color) {
				this.editNoteColor(color);
			}
		});
	}

	handleFormClick(event) {
		const isFormClicked = this.$form.contains(event.target);

		const title = this.$noteTitle.value;
		const text = this.$noteText.value;
		const hasNote = title || text;

		if (isFormClicked) {
			this.openForm();
		} else if (hasNote) {
			this.addNote({ title, text });
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

		this.$noteTitle.value = '';
		this.$noteText.value = '';
	}

	addNote({ title, text }) {
		const newNote = {
			title,
			text,
			color: 'white',
			id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
		};
		this.notes = [...this.notes, newNote];
		this.render();
		this.closeForm();
	}

	deleteNote(event) {
		event.stopPropagation();

		if (!event.target.matches('#toolbar-delete')) return;

		const id = event.target.dataset.id;

		this.notes = this.notes.filter((note) => note.id !== Number(id));

		this.render();
	}

	displayNotes() {
		const hasNotes = this.notes.length > 0;
		this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

		this.$notes.innerHTML = this.notes
			.map(
				(note) => `
        <div style="background: ${note.color};" class="note" data-id="${
					note.id
				}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
						<i class="fas fa-palette fa-2x" id="toolbar-color" data-id=${note.id}></i>
						<i class="far fa-trash-alt fa-2x" id="toolbar-delete" data-id=${note.id}></i>
            </div>
          </div>
        </div>
     `,
			)
			.join('');
	}

	saveNotes() {
		localStorage.setItem('notes', JSON.stringify(this.notes));
	}

	render() {
		this.saveNotes();
		this.displayNotes();
	}

	openModal(event) {
		if (
			event.target.matches('#toolbar-delete') ||
			event.target.matches('#toolbar-color')
		)
			return;

		if (event.target.closest('.note')) {
			this.$modal.classList.toggle('open-modal');
			this.$modalTitle.value = this.title;
			this.$modalText.value = this.text;
		}
	}

	closeModal(event) {
		this.editNote();
		this.$modal.classList.toggle('open-modal');
	}

	selectNote(event) {
		const $selectedNote = event.target.closest('.note');

		if (!$selectedNote) return;

		const [$noteTitle, $noteText] = $selectedNote.children;

		this.title = $noteTitle.innerText;
		this.text = $noteText.innerText;
		this.id = $selectedNote.dataset.id;
	}

	editNote() {
		const title = this.$modalTitle.value;
		const text = this.$modalText.value;
		this.notes = this.notes.map((note) =>
			note.id === Number(this.id) ? { ...note, title, text } : note,
		);
		this.render();
	}

	openToolTip(event) {
		if (!event.target.matches('#toolbar-color')) return;
		this.id = event.target.dataset.id;

		this.$colorModal.style.display = 'flex';

		this.$colorTooltip.style.display = 'flex';
	}

	closeToolTip(event) {
		if (!event.target.matches('.color-modal')) return;

		this.$colorModal.style.display = 'none';

		this.$colorTooltip.style.display = 'none';
	}

	editNoteColor(color) {
		this.notes = this.notes.map((note) =>
			note.id === Number(this.id) ? { ...note, color } : note,
		);
		this.render();
	}
}

new App();
