//close img  start ------------------------
const closeImages = document.querySelector("[close-images-upload]");
if(closeImages){
    closeImages.addEventListener("click",()=>{
        const uploadImagesInput = document.querySelector("[upload-images-input]");
        const uploadImagesPreview = document.querySelectorAll("[upload-images-preview]");
        if(uploadImagesInput.value){
            uploadImagesInput.value="";
            uploadImagesPreview.forEach(item=>item.src="");

        }
        
    })
}
//close img end ---------------------------



//preview images 
const uploadImages = document.querySelector("[upload-images]");
if(uploadImages){
    const uploadImagesInput = document.querySelector("[upload-images-input]");
    const uploadImagesPreview = document.querySelectorAll("[upload-images-preview]");
    if(uploadImagesInput){
        uploadImagesInput.addEventListener("change",(e)=>{
            const files = e.target.files;
            if(files.length>3){
                const dataTransfer = new DataTransfer();
                for (let i = 0; i < 3; i++) {
                    dataTransfer.items.add(uploadImagesInput.files[i]);
                }
                uploadImagesInput.files = dataTransfer.files;
            }
            for(let i =0 ; i<files.length;i++ ){
                uploadImagesPreview[i].src = URL.createObjectURL(files[i]);
            }
            
        })
    }
}
//end preview images 


//preview img start ----------------------------------------
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImagesInput = document.querySelector("[upload-image-input]");
    const uploadImagesPreview = document.querySelector("[upload-image-preview]");
    if(uploadImagesInput){
        uploadImagesInput.addEventListener("change",(e)=>{
            const files = e.target.files[0];
            uploadImagesPreview.src = URL.createObjectURL(files);
        })
    }
}
//preview img end ------------------------------------------


//preview img start ----------------------------------------
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
    const uploadAudiosInput = document.querySelector("[upload-audio-input]");
    const uploadAudioPreview = document.querySelector("[upload-audio-preview]");
    if(uploadAudiosInput){
        uploadAudiosInput.addEventListener("change",(e)=>{
            const files = e.target.files[0];
            uploadAudioPreview.src = URL.createObjectURL(files);
        })
    }
}
//preview img end ------------------------------------------

//close img  start ------------------------
const closeImage = document.querySelector("[close-image-upload]");
if(closeImage){
    closeImage.addEventListener("click",()=>{
        const uploadImagesInput = document.querySelector("[upload-image-input]");
        const uploadImagesPreview = document.querySelector("[upload-image-preview]");
        if(uploadImagesInput.value){
            uploadImagesInput.value="";
            uploadImagesPreview.src="";
        }
    })
}
//close img end ---------------------------

//close audio  start ------------------------
const closeAudio = document.querySelector("[close-audio-upload]");
if(closeAudio){
    console.log(closeAudio)
    closeAudio.addEventListener("click",()=>{
        const uploadAudiosInput = document.querySelector("[upload-audio-input]");
        const uploadAudioPreview = document.querySelector("[upload-audio-preview]");
        if(uploadAudiosInput.value){
            uploadAudiosInput.value="";
            uploadAudioPreview.src="";
        }
        
    })
}
//close audio end ---------------------------

//update status 
const buttonStatus = document.querySelectorAll(".button-status");
if(buttonStatus.length>0){
    buttonStatus.forEach(item=>{
        item.addEventListener("click",(e)=>{
            const id = item.getAttribute("data-update").split(" ")[0];
            const status = item.getAttribute("data-update").split(" ")[1];
            const page = window.location.pathname.split("/")[2];
            const option = {
                method:"PATCH"
            }
            const link = `/admin/${page}/status/${id}/${status}`;
            fetch(link,option)
            .then(res=>res.json())
            .then(data=>{
                if(status === "active"){
                    item.setAttribute("data-update",`${id} inactive`)
                    item.classList.replace("bg-danger","bg-success");
                    item.innerHTML = "Đang hoạt động";
                }
                else{
                    item.setAttribute("data-update",`${id} active`)
                    item.classList.replace("bg-success","bg-danger");
                    item.innerHTML = "Dừng hoạt động";
                }
            });
        })
    })
}
// end update status


// delete topics
const buttonDelete = document.querySelectorAll(".btn-delete");
if(buttonDelete.length>0){
    buttonDelete.forEach(item=>{
        item.addEventListener("click",()=>{
            if (window.confirm("Bạn có chất muốn xoá !!")){
                const id = item.getAttribute("data-update");
                const page = window.location.pathname.split("/")[2];

                const link = `/admin/${page}/deleted/${id}/true`;
                fetch(link,{
                    method:"PATCH"
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code===200){
                        const trElement = item.closest("tr");
                        trElement.remove();
                    }             
                });
            }
        })
    })
}

// end delete topics




// xử lý checkbox changeMulti 
const sumCheckbox = document.querySelector("[sum-checkbox]");
if(sumCheckbox){
    const changeMulti = document.querySelectorAll("[change-multi]");
    sumCheckbox.addEventListener("click",()=>{
        if(sumCheckbox.checked==true){
            changeMulti.forEach(e=>e.checked=true)
        }else{
            changeMulti.forEach(e=>e.checked=false)
        }
    })
    changeMulti.forEach(item=>{
        item.addEventListener("click",()=>{
        let count = 0;
        changeMulti.forEach(element=>{
            if(element.checked==true)
                count++;
        })
        if(count==sumCheckbox.getAttribute("sum-checkbox")){
            sumCheckbox.checked=true;
        }else{
            sumCheckbox.checked=false;
        }  
        })
    })
}

// end xử lý checkbox changeMulti 


// changeMulti

const frmChangeMulti = document.querySelector("[form-changeMulti]");
if(frmChangeMulti){
    frmChangeMulti.addEventListener("submit",e=>{
        e.preventDefault();
        const typeUpdate = document.querySelector("[type-update]")
        if(typeUpdate.value=="delete-all"){
            if(window.confirm("Bạn có chất muốn xoá !!")==false)
                return;
        }
        const arrUpdate=[];
        const changeMulti = document.querySelectorAll("[change-multi]");
        changeMulti.forEach(i=>i.checked==true?arrUpdate.push(i.value):"");
        const inputChangeMulti = document.querySelector("[input-changeMulti]");
        inputChangeMulti.value = JSON.stringify(arrUpdate);
        frmChangeMulti.submit();
    })
}

//end changeMulti



//Bộ lọc
const typeFilter = document.querySelector("[type-filter]");
if(typeFilter){
    typeFilter.addEventListener("change",()=>{
        const value = typeFilter.value;
        const url = new URL(window.location.href);
       url.searchParams.set("typeFilter",value);
       window.location.href = url;
    })
}

//end Bộ lọc

//Sắp xếp

const typeSort = document.querySelector("[type-sort]");
if(typeSort){
    typeSort.addEventListener("change",()=>{
        const value = typeSort.value;
        const url = new URL(window.location.href);
       url.searchParams.set("sort",value);
       window.location.href = url;
    })
}

//end sắp xếp



//pagination start ---------------
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    let url = new URL(window.location.href);
    buttonsPagination.forEach(element=>{
        element.addEventListener("click",()=>{
            url.searchParams.set("page",element.getAttribute("button-pagination"));
            console.log(element.getAttribute("button-pagination"));
            window.location.href = url.href;
        })
    })
}
//pagination end --------------------


//view quantity item

const typeView = document.querySelector("[type-view]");
if(typeView){
    typeView.addEventListener("change",()=>{
        const value = typeView.value;
        const url = new URL(window.location.href);
       url.searchParams.set("limiteItem",value);
       window.location.href = url;
    })
}

//end view quantity item


// Update vi tri
const inputPosisions = document.querySelectorAll("[input-posision]");

if(inputPosisions.length>0){
    inputPosisions.forEach(inputPosision=>{
        inputPosision.addEventListener('change',(e)=>{
            if(inputPosision.value>0){
                const idSong = inputPosision.getAttribute("input-posision");
                const page = window.location.pathname.split("/")[2];

                const link = `/admin/${page}/posision/${idSong}/${inputPosision.value}`;
                fetch(link,{method:"PATCH"});
            }
        })
    })    
}

// end Update vi tri



//send otp 
const sendOtp = document.querySelector("[send-otp]");
if(sendOtp){
    sendOtp.addEventListener("click",()=>{
        const option = {
            method:"POST"
        }
        fetch("/admin/otps/create",option)
        .then(res=>res.json())
        .then(data=>{
            const mess = document.querySelector("[message-otp]")
            const label = mess.querySelector("label");
            if(data.code==200){
                label.textContent = "Đã gửi otp thành công";
            }else{
                label.textContent = "Không gửi otp được";

            }
        })
    })
}


//end send otp



// permission
const btnUpdateRole = document.querySelector("[btn-update-roles]");
if(btnUpdateRole){
    btnUpdateRole.addEventListener("click",()=>{
        const idRoleElements = document.querySelectorAll("[id-role]");
        let objUpdatePermissions = [];
        idRoleElements.forEach(item=>{
            objUpdatePermissions.push({
                id:item.getAttribute("id-role"),
                permissions:[]
            })
        });
        const rows = document.querySelectorAll("[row]");
        rows.forEach((row,index)=>{
            const inputPermissions = row.querySelectorAll("input[act]");
            inputPermissions.forEach((input,index)=>{
                const permission = input.getAttribute("act");
                if(input.checked===true)
                    objUpdatePermissions[index].permissions.push(permission);
            })
        })
        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "PATCH",
              body: JSON.stringify(objUpdatePermissions)
        }
        fetch("/admin/roles/permissions",option);
    })

}

const strDataRole = document.querySelector("[data-role]");
if(strDataRole){
    const dataRole = JSON.parse(strDataRole.getAttribute("data-role"));
    
    dataRole.forEach((role,index)=>{
        const rows = document.querySelectorAll("[row]");
        rows.forEach((row)=>{
            const inputPermissions = row.querySelectorAll("[act]");
            const valueinputPermission = inputPermissions[index].getAttribute("act");
            if(role.permissions.includes(valueinputPermission))
                inputPermissions[index].checked=true;
        })
    })
    
}
//end permission



//select status for ordered
const selectStatus = document.querySelectorAll('[select-status]');
if(selectStatus.length>0){
    selectStatus.forEach(item=>{
        item.addEventListener("change",()=>{
            const id = item.getAttribute("data-staus-update");
            const option = {
                method:"PATCH"
            }
            const link = `/admin/orders/status/${id}/${item.value}`;
            fetch(link,option)
            .then(res=>res.json())

        })
    })
}



// end select status for ordered
//click click-announcement
const announcementMessage = document.querySelector("[click-announcement]");
if(announcementMessage){
    announcementMessage.addEventListener("click",()=>{
        announcementMessage.querySelector("[count-announcement]").innerHTML = '';
    })
}

//end click-announcement