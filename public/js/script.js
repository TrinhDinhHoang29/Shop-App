


//aplayer
const dataSongJson  = document.querySelector("[data-song]");
if(dataSongJson){
    const dataSong = JSON.parse(dataSongJson.getAttribute("data-song"));
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        theme: '#e9e9e9',
        audio: [{
            name: dataSong.title,
            artist: dataSong.fullNameSinger,
            url: dataSong.audio,
            cover: dataSong.avatar
        }]
    });
  
    ap.on("play",async ()=>{
        let counter = 0;

        const loadMusic = setInterval(()=>{
            counter++;
            if(counter===60){
                const slug = window.location.href.split("/")[5];
                fetch(`/songs/views/${slug}`,{
                    method:"PATCH"
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code===200){
                        const musicViews = document.querySelector(".views-music");
                        musicViews.innerHTML = data.views;
                    }
                })

            }
        },1000);
        
       
        
        ap.on("pause",()=>{
            clearInterval(loadMusic);
        })     
    });
   
    
}



//end aplayer

//preview img start ----------------------------------------
const uploadImages = document.querySelector("[upload-image]");
if(uploadImages){
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

//send otp 
const funcSendOtp = (url,option)=>{
    fetch(url,option)
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
}
const sendOtp = document.querySelector("[send-otp-client]");
if(sendOtp){
    sendOtp.addEventListener("click",()=>{
        const option = {
            method:"POST"
        }
        funcSendOtp("/otps/create",option);
    })
}

const sendOtpForgotPassword = document.querySelector("[send-otp-forgot-password]");
if(sendOtpForgotPassword){
    sendOtpForgotPassword.addEventListener("click",()=>{
        const email = document.querySelector("[email-forgot-password]").value;
        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                email:email
              })
            
        }
        funcSendOtp("/otps/create-forgot-password",option);
    })
}

//end send otp



// findSuggest
const findHeader = document.querySelector(".find-header > input");
if(findHeader){
    findHeader.addEventListener("focus",()=>{
        const parentSuggest = document.querySelector(".suggest-find-header");
        parentSuggest.style.display="block";
    })
    findHeader.addEventListener("blur",()=>{
        const parentSuggest = document.querySelector(".suggest-find-header");
        setTimeout(()=>{
            parentSuggest.style.display="none";
        },500)
     
    })
    findHeader.addEventListener("keyup",()=>{
       fetch(`/search/suggestFindMusic?keyword=${findHeader.value}`)
       .then(res=>res.json())
       .then(data=>{
        if(data.code===200){
            const parentSuggest = document.querySelector(".suggest-find-header");
            parentSuggest.textContent = "";
            data.data.forEach(song=>{
                const elementA = document.createElement('a');
                elementA.classList.add("result-find-header")
                elementA.classList.add("my-1")
                elementA.classList.add("mx-3")
                elementA.classList.add("row")
                elementA.href = `/songs/detail/${song.slug}`;
                elementA.innerHTML = `
                <div class="inner-find-img col-3"> 
                    <img src="${song.avatar}" width="100%" height="100%" alt="" />
                </div>
                <div class="inner-find-text col-9">
                    <div class="inner-find-title">
                        <h5>${song.title}</h5>
                    </div>
                    <div class="inner-find-singer">${song.fullNameSinger}</div>
                </div>
                `;
                parentSuggest.appendChild(elementA);
            }) 
        }
       })
       
    })
}


// findSuggest




//favorite 
const loveMusics = document.querySelectorAll("[love-music]");
if(loveMusics.length>0){
    loveMusics.forEach(loveMusic=>{
        loveMusic.addEventListener("click",()=>{
            const idSong = loveMusic.getAttribute("data-id-song");
            fetch(`/favorites/create/${idSong}`)
            .then(res=>res.json())
            .then(data=>{
                if(data.code===200){
                    loveMusic.querySelector("i").classList.toggle("text-danger");
                }
            })
        })
    })
}

//end favorite




const likeMusics = document.querySelectorAll("[like-music]");
if(likeMusics.length>0){
    likeMusics.forEach(likeMusic=>{
        likeMusic.addEventListener("click",()=>{
            const idSong = likeMusic.getAttribute("data-id-song");
            fetch(`/songs/like/${idSong}`)
            .then(res=>res.json())
            .then(data=>{
                if(data.code===200){
                    likeMusic.querySelector("span").innerHTML = data.data.like.length;
                    likeMusic.querySelector("i").classList.toggle("text-secondary");
                }
            })
        })
    })
}


