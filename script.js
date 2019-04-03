function getLineChart() {

  $.ajax({

    url:"http://157.230.17.132:4002/sales",
    method:"GET",
    success:function (inData,state) {


      var amountMonth=[0,0,0,0,0,0,0,0,0,0,0,0];

      for (var i = 0; i < inData.length; i++) {



        var myDate=inData[i].date;

        var splitDate= myDate.split("/");

        var month=Number(splitDate[1]);

        var ammontare=inData[i].amount;

        amountMonth[month-1]+=Number(ammontare);

      } // finisce il for
      graficoLine(amountMonth);
    }, // finisce il success



    error : function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}


function getPieChart() {

  $.ajax({

    url:"http://157.230.17.132:4002/sales",
    method:"GET",
    success:function (inData,state) {


      var tot=0;

      var totGiu=0;
      var totMar=0;
      var totRob=0;
      var totRic=0;

      var percArr=[0,0,0,0];


      for (var i = 0; i < inData.length; i++) {

        var persona=inData[i].salesman;

        var ammontare=inData[i].amount;

        tot+=ammontare;

        totGiu=

        percArr[0]=tot/totGiu;
        percArr[1]=tot/totMar;
        percArr[2]=tot/totRob;
        percArr[3]=tot/totRic;

      } // finisce il for
      console.log(percArr)

      graficoTorta(percArr);
    }, // finisce il success



    error : function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}


// funzione del grafico a linee

function graficoLine(amountMonth) {

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','october','november','december'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgba(50, 50, 50, 0.3)',
        borderColor: 'rgb(30, 30, 30)',
        data: amountMonth
      }]
    },

    // Configuration options go here
    options: {}
  });


}

// funzione grafico a torta


function graficoTorta(percArr) {

  var ctx = document.getElementById('myChart2').getContext('2d');
  var myPieChart = new Chart(ctx, {
      type: 'pie',

      data: {
        labels: ['marco', 'giuseppe' , 'riccardo' , 'roberto'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(50, 50, 50, 0.3)',
          borderColor: 'rgb(30, 30, 30)',
          data: percArr
        }]
      },
      options: {}
  });


}



function init() {

  getLineChart();
  getPieChart();
}

$(document).ready(init);
