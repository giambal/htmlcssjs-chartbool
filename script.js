
function piallaTutto() {

  /*var canvasCont=$(".canvas-container");
  canvasCont.remove();

  var template=$("#canvas-template").html();
  var compiled=Handlebars.compile(template);
  var newCanvas=compiled();

  canvasCont.append(newCanvas);*/

  $("#myChart").html("");
  $("#myChart2").html("");
}

function postData() {

  var opt=$(".name-selection");
  var date=$("#sales-date");
  var amount=$("#sales-qnt");

  var outData={

    salesman: opt.val() ,
    amount: amount.val(),
    date: date.val(),

  };

  $.ajax({

      url:"http://157.230.17.132:4002/sales",
      method:"POST",
      data:outData,
      success:function (inData,state) {

        getData();
      },

      error : function(request, state, error) {

        console.log("request", request);
        console.log("state", state);
        console.log("error", error);
      }
    });
}

function getData() {

  piallaTutto();

  $.ajax({

      url:"http://157.230.17.132:4002/sales",
      method:"GET",
      success:function (inData,state) {

        printLineChart(inData);
        printPieChart(inData);
      },

      error : function(request, state, error) {

        console.log("request", request);
        console.log("state", state);
        console.log("error", error);
      }
    });
}

function printLineChart(inData) {

  var totMonth={

    "gennaio": 0 ,
    "febbraio": 0 ,
    "marzo": 0 ,
    "aprile": 0 ,
    "maggio": 0 ,
    "giugno": 0 ,
    "luglio": 0 ,
    "agosto": 0 ,
    "settembre": 0 ,
    "ottobre": 0 ,
    "novembre": 0 ,
    "dicembre": 0
  };

  for (var i = 0; i < inData.length; i++) {
    var d=inData[i];
    var amount=Number(d.amount);
    var date=d.date;

    var mom=moment(date , "DD/MM/YYYY");
    var monthName=mom.locale("it").format("MMMM");
    totMonth[monthName]+=amount;
  }

  var keys = Object.keys(totMonth);
  var values = Object.values(totMonth);

  var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        labels: keys,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgba(102, 250, 255, 0.3)',
            borderColor: 'rgba(102, 204, 255, 0.3)',
            data: values,
          },
        ]},


      // Configuration options go here
      options: {}
    });



}

function printPieChart(inData) {

  var totPers={

  };

  var totale=0;


  for (var i = 0; i < inData.length; i++) {

    var d=inData[i];

    var pers=d.salesman;
    var amount=d.amount;

    totale+=Number(amount);
    if (!totPers[pers]) {

      totPers[pers]=0;
    }
    totPers[pers]+= Number(amount);
  }



  var keys = Object.keys(totPers);
  var values = Object.values(totPers);

  for (var i = 0; i < values.length; i++) {
    values[i]=parseFloat((values[i]/totale)*100).toFixed(2);
  }



  var ctx = document.getElementById('myChart2').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'pie',
      // The data for our dataset
      data: {
        labels: keys,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: ['rgba(102, 204, 255, 0.3)' , 'rgba(204, 102, 255 ,0.3)','rgba(255, 255, 77 ,0.3)','rgba(26, 255, 140, 0.3)'],
          borderColor: 'rgb(30, 30, 30)',
          data: values
        }]
      },

      // Configuration options go here
      options: {}
    });

    createOpt(totPers);
}

function createOpt(totPers) {

  var select = $(".name-selection");

  var keys = Object.keys(totPers);

  for (var i = 0; i < keys.length; i++) {
    var pers=keys[i];
    var opt=document.createElement("option");
    opt.value=pers;
    opt.text=pers;
    select.append(opt);
  }
}

function init() {

  getData();

  var btn=$("#btn");
  btn.click(postData);
}


$(document).ready(init);
