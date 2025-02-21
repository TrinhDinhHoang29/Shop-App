const elementCountAnnouncement = document.querySelector("[count-announcement]");
if(elementCountAnnouncement){
    const dropdownList = document.querySelector("[announcement-admin]");
    const countAnnouncement = dropdownList.querySelectorAll(".font-weight-bold");
    if(countAnnouncement.length==6){
        elementCountAnnouncement.innerHTML = `6+`
    }else{
        elementCountAnnouncement.innerHTML = countAnnouncement.length;

    }
}

const elementCountNotifications = document.querySelector("[count-notifications]");
if(elementCountNotifications){
    const dropdownList = document.querySelector("[notifications-admin]");
    const coutNotification = dropdownList.querySelectorAll(".font-weight-bold");
    if(coutNotification.length==6){
        elementCountNotifications.innerHTML = `6+`
    }else{
        elementCountNotifications.innerHTML = coutNotification.length;

    }
}

socket.on('SERVER_RETURN_ANNOUNCEMENT', function(data) {
   const dropdownList = document.querySelector("[announcement-admin]");
   if(dropdownList){
    const countAnnouncement = data.reduce((sum,current)=>current.messageEnd.read==false?sum+1:sum,0);
    if(countAnnouncement==6)
        elementCountAnnouncement.innerHTML = `6+`;
    else
        elementCountAnnouncement.innerHTML = countAnnouncement;
    dropdownList.innerHTML = `<h6 class='dropdown-header'>
                                    Message Center
                                </h6>`;
    data.forEach(roomChat => {
        dropdownList.innerHTML+=`
        <a class="dropdown-item d-flex align-items-center" href="/admin/chats/${roomChat._id}"}>
            <div class="dropdown-list-image mr-3 ">
                <img class="rounded-circle" src=${roomChat.user.avatar?roomChat.user.avatar:"img/undraw_profile_3.svg"}
                    alt="...">
                <div class=${roomChat.messageEnd.read==true?"":"font-weight-bold"}></div>
            </div>
            <div class="font-weight-bold">
                <div class="text-truncate">${roomChat.messageEnd.content}</div>
                <div class="small text-gray-500">${roomChat.user.fullName} &middot; ${roomChat.timeDifference}</div>
            </div>
        </a>
        `;
    });
    dropdownList.innerHTML+= `<a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>`
   }
})
socket.on("SERVER_RETURN_NOTIFICATION",(data)=>{
    const dropdownList = document.querySelector("[notifications-admin]");
    const coutNotification = dropdownList.querySelectorAll(".font-weight-bold");
    if(coutNotification.length==6){
        elementCountNotifications.innerHTML = `6+`
    }else{
        elementCountNotifications.innerHTML = coutNotification.length;

    }
    dropdownList.innerHTML = `<h6 class='dropdown-header'> Alerts Center </h6>`;
    data.forEach(notification=>{
        dropdownList.innerHTML+=`
          <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="mr-3">
                <div class="icon-circle bg-primary">
                    <i class="fas fa-file-alt text-white"></i>
                </div>
            </div>
            <div>
                <div class="small text-gray-500">${notification.fullName} - ${notification.timeDifference}</div>
                <span class=${notification.is_read==true?"":"font-weight-bold"}>
                ${notification.type==="reviews"?" Đã đánh giá một sản phẩm !!":"Đã đặt một đơn hàng mới !!"}
                </span>
            </div>
        </a>
        `;
    })


});
var form = document.getElementById('form');
var input = document.getElementById('input');
const bodyChat = document.querySelector(".inner-body");

if(form){
    // upload file preview
    const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images',{
        multiple:true,
        maxFileCount:6//Số lượng hình ảnh
    });

    //end upload file preview
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const content = input.value;
        const images = upload.cachedFileArray;
        if (content||images.length>0) {
        socket.emit('SERVER_SEND_MESSAGE',{
            content:content,
            images:images
        });
        input.value = '';
        }
        upload.resetPreviewPanel();
    });
}




socket.on('SERVER_RETURN_MESSAGE', function(data) {
    const chat = document.querySelector(".chat");
    if(chat.getAttribute("roomChatId")==data.room_chat_id){
        const innerBody = document.querySelector(".inner-body");
        if(innerBody){
            const element = document.createElement("div");
            let text = "";
            const myId = document.querySelector("[myId]").getAttribute("myId");
            
            if(data.user_id==myId){
                element.classList="inner-outgoing";
            }else{
                element.classList="inner-incoming";
                text+=`<div class="inner-name"> ${data.fullName}</div> `;
            }
            // socket.emit("CLIENT_SEND_TYPING","clear");
                text += `<div class="inner-content"> ${data.content} `;
            if(data.images.length>0){
                text+=`<div class="inner-images">`
                data.images.forEach(image => {
                    text+=`<img src="${image}" width="90px">`
                });
                text+=`</div>`
            }
            text+=`</div>`;
    
            element.innerHTML = text;
            innerBody.appendChild(element);
            bodyChat.scrollTop = bodyChat.scrollHeight;     
        }
    }
    
                  
});
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}

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



