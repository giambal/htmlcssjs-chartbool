function getLineChart() {

  $.ajax({

    url:"http://157.230.17.132:4002/sales",
    method:"GET",
    success:function (inData,state) {


      for (var i = 0; i < inData.length; i++) {

        var mom=moment();

        var myDate=inData[i].date;

        var splitDate= myDate.split("/");

        console.log(splitDate);

        mom.year(splitDate[2]);
        mom.month(splitDate[1]-1);
        mom.date(splitDate[0]);

        var month=mom.format("MM");

        console.log(month);

        var ammontare=inData[i].amount;
        console.log(ammontare);
      }
    },

    error : function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }

  });
}



function init() {

  getLineChart();
}

$(document).ready(init);
