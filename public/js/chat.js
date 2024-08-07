var form = document.getElementById('form');
var input = document.getElementById('input');
const bodyChat = document.querySelector(".chat-body");
//upload file preview
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images',{
    multiple:true,
    maxFileCount:6//Số lượng hình ảnh
});

//end upload file preview
if(form){
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = input.value;
        const images = upload.cachedFileArray;
        if (content||images.length>0) {
        socket.emit('CLIENT_SEND_MESSAGE',{
            content:content,
            images:images
        });
        }
        input.value = '';
        bodyChat.scrollTop = bodyChat.scrollHeight;                   
    
        upload.resetPreviewPanel();
    });
}


const chatBubble = document.querySelector(".chat-bubble");
if(chatBubble){
    chatBubble.addEventListener("click",()=>{
        bodyChat.scrollTop = bodyChat.scrollHeight;

    })
}

socket.on('SERVER_RETURN_MESSAGE', function(data) {
    const chat = bodyChat.querySelector(".chat");
    const element = document.createElement("div");
    let text = "";
    const myId = chat.getAttribute("myId");
    element.classList="msg";
    if(data.user_id==myId){
        element.classList.add("sent");
    }else{
        element.classList.add("rcvd");
    }
    // socket.emit("CLIENT_SEND_TYPING","clear");
    element.setAttribute("data-time",data.date);
    // if(data.content)
        text += data.content;
    if(data.images.length>0){
        text+=`<div class="inner-images">`
        data.images.forEach(image => {
            text+=`<img src="${image}" width="90px">`
        });
        text+=`</div>`
    }
    element.innerHTML = text;
    chat.appendChild(element);
    bodyChat.scrollTop = bodyChat.scrollHeight;      
});
//Icon chat 
const showIcon = document.querySelector(".showIcon");
if(showIcon){
  showIcon.addEventListener("click",()=>{
      const classHidden = document.querySelector(".button-icon");
      classHidden.classList.toggle("hidden");
      
  })
}
document.querySelector('emoji-picker').addEventListener('emoji-click', event => {
  const inputChat = document.querySelector("#input");
//   socket.emit("CLIENT_SEND_TYPING","showTyping");
//   clearTimeout(typingRemove);
//   typingRemove= setTimeout(()=>{
//       socket.emit("CLIENT_SEND_TYPING","clear");
//     },3000);  
inputChat.value+=event.detail.unicode;
  inputChat.setSelectionRange(inputChat.value.length,inputChat.value.length);
  inputChat.focus();
});
//end Icon chat