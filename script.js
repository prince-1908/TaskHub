// taking data from localStorage and keeping it in a variable "getLocalDataVar"
let getLocalData = () => {
	if (localStorage.getItem('todo') == null) {
		return [];
	}
	else {
		return JSON.parse(localStorage.getItem('todo'));
	}
}
let getLocalDataVar = getLocalData();

// taking note container from doc and storing it in a variable "noteContainer"
let noteContainer = document.getElementById("noteContainer");

// targeting buttons
let addNote = document.getElementById('addNote');
let delAll = document.getElementById("delAll");
let saveNote = document.getElementById("saveNote");
let tempSave = document.getElementById("tempSave");


// printing notes
let getNotes = () => {
	let getTitle = "";
	let getDescription = "";
	let html = "";

	for (let i = 0; i < getLocalDataVar.length; i++) {

		getTitle = getLocalDataVar[i].title;
		getDescription = getLocalDataVar[i].description;

		html += `<div id="note">
  						<div>
								<div id="note-content">
	    						<h2 class="note-item note-content">${getTitle}</h2>
	    						<p class="note-item note-content">${getDescription}</p>
								</div>
								<div id="note-btns">
  	  						<button onclick="edit(${i})" class="note-item note-btn">Edit</button>
  	  						<button onclick="dlt(${i})" class="note-item note-btn">Delete</button>
								</div>
  						</div>
						</div>`;
	}

	if (getLocalDataVar.length == 0) {
		noteContainer.innerHTML = `<h1 id="empty">Notes are Empty</h1>`
	}
	else {
		noteContainer.innerHTML = html;
	}
}
getNotes();

// adding notes
addNote.addEventListener('click', function(e) {
	e.preventDefault();

	let titleContent = document.getElementById('title').value;
	let descriptionContent = document.getElementById('description').value;

	let pushData = {
		title: titleContent,
		description: descriptionContent
	}

	getLocalDataVar.push(pushData);

	localStorage.setItem('todo', JSON.stringify(getLocalDataVar));

	getNotes();

	document.getElementById('title').value = "";
	document.getElementById('description').value = "";
});

// deleting all notes

delAll.addEventListener('click', function(e) {
	localStorage.clear();
	getNotes();
});

// editing note
let edit = (i) => {
	saveNote.style.display = "inline";
	addNote.style.display = "none";

	tempSave.value = i;

	let getTitle = getLocalDataVar[i].title;
	let getDescription = getLocalDataVar[i].description;

	document.getElementById('title').value = getTitle;
	document.getElementById('description').value = getDescription;
}

saveNote.addEventListener('click', function(e) {
	e.preventDefault();

	saveNote.style.display = "none";
	addNote.style.display = "inline";

	let index = tempSave.value;

	getLocalDataVar[index].title = document.getElementById('title').value;
	getLocalDataVar[index].description = document.getElementById('description').value;


	localStorage.setItem('todo', JSON.stringify(getLocalDataVar));
	getNotes();
});

// deleting a note
let dlt = (i) => {
	getLocalDataVar.splice(i, 1);
	localStorage.setItem('todo', JSON.stringify(getLocalDataVar));
	getNotes();
}