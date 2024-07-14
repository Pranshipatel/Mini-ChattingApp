const socket = io();

const input = document.querySelector(".input");
const messageMain = document.querySelector(".message-main")

document.querySelector(".send").addEventListener("click",function(){
    socket.emit("message",input.value);
})

input.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        if(event.shiftKey){
            const cursorpos = this.selectionStart;
            this.value = this.value.slice(0,cursorpos)+ "\n" + this.value.slice(cursorpos);
            this.selectionStart = cursorpos;
            this.selectionEnd = cursorpos;
        }
        else{
            event.preventDefault();
            socket.emit("message",input.value);
            input.value = "";
        }
    }
})

let container = ``;
socket.on("message",function(message){
    container = `<div class="bg-blue-500 text-white rounded-lg p-2">
                 <div>${message}</div>
                 </div>`
    document.querySelector(".messages").innerHTML += container
    messageMain.scrollTop = messageMain.scrollHeight;
})

