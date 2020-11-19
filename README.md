###### tags: `JavaScript` `Documentation` `learning notes`

# Googlekeep clone

wanna to see it? [here](https://bernardoaguayoortega.github.io/google-keep-clone/public/)

This project is made with vanilla js, of course css3 and html5

## How was it builded?

With modern js,this project has a javascript class call **App**

### inside constructor

```js
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

// methods

// add event listener
this.addEventListeners();

// render app
this.render();
```
