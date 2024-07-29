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
socket.on('SEVER_RETURN_ANNOUNCEMENT', function(data) {
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
        <a class="dropdown-item d-flex align-items-center" href="#">
            <div class="dropdown-list-image mr-3">
                <img class="rounded-circle" src=${roomChat.user.avatar?roomChat.user.avatar:"img/undraw_profile_3.svg"}
                    alt="...">
                <div class=${roomChat.messageEnd.read==true?"":"font-weight-bold"}></div>
            </div>
            <div class="font-weight-bold">
                <div class="text-truncate">${roomChat.messageEnd.content}</div>
                <div class="small text-gray-500">${roomChat.user.fullName} &middot; ${roomChat.messageEnd.timeDifference}</div>
            </div>
        </a>
        `;
    });
    dropdownList.innerHTML+= `<a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>`
   }
})