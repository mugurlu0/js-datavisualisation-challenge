//color picker
randomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


//table1
var tr = table1.rows;
var table1Labels = new Array;
var table1Years = new Array;

//retrieve country names(labels) and push in array
for (i = 2; i < tr.length; i++) {
  table1Labels.push(tr[i].cells[1].textContent)
}

//retrieve years label and push in array
for (j = 2; j < tr[1].cells.length; j++) {
  table1Years.push(tr[1].cells[j].textContent)
}
//retrieve all crime numbers in one array
var table1Data = [];
for (k = 2; k < tr.length; k++) {
  for (l = 2; l < tr[1].cells.length; l++) {
    (table1Data.push(parseInt(tr[k].cells[l].textContent)))
  };
}
//slice and create new array each time years.length is reached
// function arraySlicer(arrayName, maxInArray) {
//     var newArray = [];
//     for (var i = 0; i < arrayName.length; i += maxInArray)
//         newArray.push(arrayName.slice(i, i + maxInArray));
//     return newArray;
// }
//call the array slicer
// var table1Data = arraySlicer(table1Data, 11);
var table1Dataset = new Array;

function array1New(index, arrayName) {
  var arrayNew = [];
  for (var i = index; i < arrayName.length; i += 11) {
    arrayNew.push(arrayName[i]);
  }
  return arrayNew;
}

//push label and data in dataset object
for (var o = 0; o < table1Years.length; o++) {
  table1Dataset.push({
    label: table1Years[o],
    data: array1New(o, table1Data),
    backgroundColor: randomColor(),
    hoverBackgroundColor: "rgba(232,105,90,0.8)",
    hoverBorderColor: "red",
  })
}
var canvaTable1 = document.createElement("canvas");
canvaTable1.id = "table1Chart";
var insertTable1 = document.getElementsByTagName("h3");
insertTable1[0].appendChild(canvaTable1);

var ctx = document.getElementById('table1Chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: table1Labels,
    datasets: table1Dataset,
  },
});
//table2

var trTwo = table2.rows;
var table2Labels = new Array;
var table2Years = new Array;

//country names
for (i = 1; i < trTwo.length; i++) {
  table2Labels.push(trTwo[i].cells[1].textContent.replace(/\s/g, ""))
}

//years
for (j = 2; j < trTwo[0].cells.length; j++) {
  table2Years.push(trTwo[0].cells[j].textContent)
}

//data1

var table2Data = [];

var table2Data1 = new Array;
for (i = 1; i < table2Labels.length + 1; i++) {
  table2Data1.push(parseInt(trTwo[i].cells[2].textContent));
}

//data2

var table2Data2 = [];
for (j = 1; j < table2Labels.length + 1; j++) {
  table2Data2.push(parseInt(trTwo[j].cells[3].textContent));
}

table2Data.push(table2Data1, table2Data2);

var table2Dataset = new Array;

for (var o = 0; o < table2Years.length; o++) {
  table2Dataset.push({
    label: table2Years[o],
    data: table2Data[o],
    backgroundColor: randomColor(),
    hoverBackgroundColor: "rgba(232,105,90,0.8)",
    hoverBorderColor: "red",
  })
}
var canvaTable2 = document.createElement("canvas");
canvaTable2.id = "table2Chart";
var insertTable2 = document.getElementsByTagName("h4");
insertTable2[2].appendChild(canvaTable2);
var space = document.createTextNode("<br>");
canvaTable2.appendChild(space);


var ctx2 = document.getElementById('table2Chart').getContext('2d');
var myChart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: table2Labels,
    datasets: table2Dataset,
  },
});

(() => {
  var canvas = document.createElement("canvas");
  var insertCanvas = document.getElementsByTagName("h1");
  insertCanvas[0].appendChild(canvas);
  var xhr = new XMLHttpRequest();
  var ajaxNames = new Array;
  var ajaxData = new Array;

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      xhr.response.forEach(function (value) {
          ajaxNames.push(parseInt(value[0])),
            ajaxData.push(parseInt(value[1]));
        }),

        canvas.id = "myChart";
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ajaxNames,
          datasets: [{
            data: ajaxData,
            label: "Live Chart from External JSON",
            borderWidth: 4,
            borderColor: "#7bd8f1",
            backgroundColor: "#f0abd8",
            hoverBackgroundColor: "rgba(232,105,90,0.8)",
            hoverBorderColor: "red",
          }],
        },
        options: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              fontSize: 18,
            }
          }
        },
      });
      updateChart();
    }
  }
  xhr.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10", true);
  xhr.responseType = "json";
  xhr.send();

  function updateChart() {
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        xhr.response.forEach(function (value) {
          ajaxNames.push(parseInt(value[0]));
          ajaxData.push(parseInt(value[1]));
        })
      }
    }
    setTimeout(function () {
      updateChart()
    }, 1000);
    xhr.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart=" + (ajaxNames.length + 1) + "&ystart=&length=20&type=json", true);
    xhr.responseType = "json";
    xhr.send();
  }
})();