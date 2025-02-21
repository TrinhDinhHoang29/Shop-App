// show alert -----------------------
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const dataTime =parseInt( showAlert.getAttribute("data-time"));
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
   },dataTime);
   setTimeout(()=>{
    document.querySelector(".messages").remove();
},dataTime+2000);
}
//end alert--------------------------