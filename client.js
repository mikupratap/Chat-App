let socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");

console.log("rishabh");

const name=prompt("ENTER YOUR NAME TO JOIN"); 

const append=(message , position)=>{
    let messageelement = document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
}
form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message=messageinput.value;
    console.log(message);
    append(`you: ${message}` , 'right');
    socket.emit('send' , message); 
    messageinput.value='';

})

socket.emit('new-user-joined' , name);

socket.on('user-joined' , name =>{
  append(`${name} joined the chat ` , 'right');
})

socket.on('receive' , data=>{
    append(`${data.name}: ${data.message}` , 'left' );
})