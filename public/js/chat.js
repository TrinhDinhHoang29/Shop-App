var form = document.getElementById('form');
var input = document.getElementById('input');
const bodyChat = document.querySelector(".chat-body");
//upload file preview
// const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images',{
//     multiple:true,
//     maxFileCount:6//Số lượng hình ảnh
// });

//end upload file preview
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const content = input.value;
    // const images = upload.cachedFileArray;
    // if (content||images.length>0) {
    // socket.emit('CLIENT_SEND_MESSAGE',{
    //     content:content,
    //     images:images
    // });
    // }
    socket.emit('CLIENT_SEND_MESSAGE',{
        content:content
    });
    input.value = '';
    bodyChat.scrollTop = bodyChat.scrollHeight;                   

    // upload.resetPreviewPanel();
});

const chatBubble = document.querySelector(".chat-bubble");
if(chatBubble){
    chatBubble.addEventListener("click",()=>{
        bodyChat.scrollTop = bodyChat.scrollHeight;

    })
}

socket.on('SEVER_RETURN_MESSAGE', function(data) {
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
    //     element.content = data.content;
    // if(data.images.length>0){
    //     text+=`<div class="inner-images">`
    //     data.images.forEach(image => {
    //         text+=`<img src="${image}" width="90px">`
    //     });
    //     text+=`</div>`
    // }
    element.innerHTML = data.content;
    chat.appendChild(element);
    bodyChat.scrollTop = bodyChat.scrollHeight;                   
});