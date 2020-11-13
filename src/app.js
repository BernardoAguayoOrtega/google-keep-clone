class App {
	constructor() {
		// local variables
		this.notes = [];

		// dom elements
		this.$placeholder = document.querySelector('#placeholder');
		this.$form = document.querySelector('#form');
		this.$notes = document.querySelector('#notes');
		this.$noteTitle = document.querySelector('#note-title');
		this.$noteText = document.querySelector('#note-text');
		this.$formButtons = document.querySelector('#form-buttons');

		// add event listener
		this.addEventListeners();
	}

	addEventListeners() {
		document.body.addEventListener('click', (event) => {
			this.handleFormClick(event);
		});

		this.$form.addEventListener('submit', (event) => {
			event.preventDefault();
			const title = this.$noteTitle.value;
			const text = this.$noteText.value;
			const hasNote = title || text;
			if (hasNote) {
				// add note
				this.addNote({ title, text });
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
		this.displayNotes();
		this.closeForm();
	}

	displayNotes() {
		const hasNotes = this.notes.length > 0;
		this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

		this.$notes.innerHTML = this.notes
			.map(
				(note) => `
        <div style="background: ${note.color};" class="note">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
							<i class="fas fa-palette fa-2x"></i>
              <i class="far fa-trash-alt fa-2x"></i>
            </div>
          </div>
        </div>
     `,
			)
			.join('');
	}
}

new App();
