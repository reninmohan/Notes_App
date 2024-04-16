const createButton = document.getElementById("noteBtn");
const notesContainer = document.getElementById("notes-container");


showNotes()
function createNote(){
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `<p contenteditable="true" class="input" placeholder="Type here..."></p>
    <button class="deletebtn"><img src="./assets/bin.png"></button>`;
    const firstNode = notesContainer.firstChild;
    notesContainer.insertBefore(note,firstNode);
    saveNotes()
}



function handleEvent(event){
    const select = event.target;
    if(select.tagName ==="IMG"){
        select.parentElement.parentElement.remove();
         saveNotes();
    }else if(select.tagName === "P"){
       const notes = document.querySelectorAll(".note");
        notes.forEach(element =>{
            element.onkeyup =()=>{
                saveNotes();
            }
        })
    }
}

createButton.addEventListener('click', createNote)
notesContainer.addEventListener('click', handleEvent);


function saveNotes(){
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
}

document.addEventListener('keydown', event=>{
    if(event.key ==="Enter"){
        document.execCommand("insertLineBreak")// manually executing insertLineBreak
        event.preventDefault() //prevent default action of the Enter Key
    }
})