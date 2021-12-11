var subCount = 0;
var chanName = "YouTube";
var subCountInp;
$("#subs").css("color", "black");

$(".index__channelName--J7TfO").click(function() {
    chanName = document.querySelector(".index__channelName--J7TfO").innerText;
    chanName = window.prompt("What is " + chanName + "'s new name?");
    $(".index__channelName--J7TfO").text(chanName);
    $("#chanName").text(chanName);
});

$("#submit").click(function() {
  subCountInp = parseInt($("#subs").val());
  subCount = subCountInp;
  $("#subCount").html(subCount);
  $("#subCountNO").html(subCount.toLocaleString());
});

setInterval(() => {
  $("title").html(subCount + " subscribers - " + chanName + "'s realtime YouTube statistics | YouTube Subscriber Counter")
}, 100);

$("#hide").click(function() {
  $(".inputStuff").css("display", "none");
  $("#hide").html("Use Ctrl + X to bring it back");
  setTimeout(() => {
    $("#hide").css("display", "none");
  }, 1000);
});

hotkeys('ctrl+x', function(event, handler) {
  $("#hide").html("Hide");
  $(".inputStuff").css("display", "block");
  $("#hide").css("display", "block");
});

var min = parseInt(document.getElementById("rateMin").value);
var max = parseInt(document.getElementById("rateMax").value);

var rateNumb = Math.round( Math.random() * (max - min) + min);

var rateSetInt;


$("#setRates").click(function() {
  rateSetInt = setInterval(function(){
    min = parseInt(document.getElementById("rateMin").value);
    max = parseInt(document.getElementById("rateMax").value);
    numb = Math.round( Math.random() * (max - min) + min);
    subCount = subCount + numb;
    document.getElementById("subCount").innerHTML = subCount;
  }, 2000);
});

generate: (state, counter) => {
    state.rows = state.rows || [];
    state.rows.push([startDate.toISOString(), Math.random() * 10]);
    trimArray(state.rows);
    return JSON.stringify(state.rows);
  }

  let chart; // global

  /**
* Request data from the server, add it to the graph and set a timeout to request again
*/
async function requestData() {
    const result = await fetch('https://demo-live-data.highcharts.com/time-rows.json');
    if (result.ok) {
      const data = await result.json();
      const [date, value] = data[0];
      const point = [new Date(date).getTime(), value * 10];
      const series = chart.series[0],
        shift = series.data.length > 20; // shift if the series is longer than 20
      // add the point
      chart.series[0].addPoint([Date.now(), subCount]);
      // call it again after one second
      setTimeout(requestData, 1000);
      
    }
  }

  setTimeout(() => {
    window.addEventListener('load', function () {
      chart = new Highcharts.Chart({
        chart: {
          renderTo: 'chart',
          defaultSeriesType: 'spline',
          events: {
            load: requestData
          }
        },
        title: {
          text: 'Live Subscriber Graph'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
          maxZoom: 20 * 1000
        },
        yAxis: {
          minPadding: 0.2,
          maxPadding: 0.2,
          title: {
            text: 'Subs',
            margin: 80
          }
        },
        series: [{
          name: 'Subs',
          data: []
        }]
      });
    });
  }, );