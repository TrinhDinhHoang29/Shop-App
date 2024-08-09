// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const funcArrFillerSame = (ordersSuccess)=>{
  const arrProductOrder = ordersSuccess.reduce((total,current)=>total.concat(current.products),[]);
  const arrNew = arrProductOrder.map((value)=>{
      value.totalQuantity = arrProductOrder.reduce((total,current)=>value.product_id==current.product_id?total+current.quantity:total,0);
      return value;
  }) 
  const resultArrFilterSame = [];
  arrNew.forEach(element => {
      if(!resultArrFilterSame.find(item=>item.product_id==element.product_id))
         {
          resultArrFilterSame.push(element)
      }
  });
  return resultArrFilterSame.sort((a,b)=>a.totalQuantity-b.totalQuantity).slice(0,3);
}

function getDataTop3SongViewsMax(index){
  const elementDataUsers = document.querySelector("[data-products-max-orders]");
  const dataUsers = JSON.parse(elementDataUsers.getAttribute("data-products-max-orders"));
  const products = JSON.parse(elementDataUsers.getAttribute("data-products"))
  const product = products.find((item)=>funcArrFillerSame(dataUsers).find((item,indexFind)=>indexFind===index).product_id==item._id);
  const result = funcArrFillerSame(dataUsers).find((item,indexFind)=>indexFind===index);
  result.title = product.title;
  return result;
}

const innerTitleTop3Product = document.querySelectorAll(".title-top3-product i")
if(innerTitleTop3Product.length>0){
  innerTitleTop3Product.forEach((element,index)=>{
    element.innerHTML = getDataTop3SongViewsMax(index).title;
  })
}


// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [getDataTop3SongViewsMax(0).title,getDataTop3SongViewsMax(1).title,getDataTop3SongViewsMax(2).title],
    datasets: [{
      data: [getDataTop3SongViewsMax(0).totalQuantity,getDataTop3SongViewsMax(1).totalQuantity,getDataTop3SongViewsMax(2).totalQuantity],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
