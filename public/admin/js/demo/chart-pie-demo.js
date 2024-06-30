// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function getDataTop3SongViewsMax(index){
  const elementDataUsers = document.querySelector("[data-songs-max-views]");
  const dataUsers = JSON.parse(elementDataUsers.getAttribute("data-songs-max-views"));
  return dataUsers.find((item,indexFind)=>indexFind===index);
}

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [getDataTop3SongViewsMax(0).title,getDataTop3SongViewsMax(1).title,getDataTop3SongViewsMax(2).title],
    datasets: [{
      data: [getDataTop3SongViewsMax(0).views,getDataTop3SongViewsMax(1).views,getDataTop3SongViewsMax(2).views],
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
