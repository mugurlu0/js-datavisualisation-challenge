//color picker
randomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


//table1
let tr = table1.rows;
let table1Labels = new Array;
let table1Years = new Array;

//retrieve country names(labels) and push in array
for (i = 2; i < tr.length; i++) {
  table1Labels.push(tr[i].cells[1].textContent)
}

//retrieve years label and push in array
for (j = 2; j < tr[1].cells.length; j++) {
  table1Years.push(tr[1].cells[j].textContent)
}
//retrieve all crime numbers in one array
let table1Data = [];
for (k = 2; k < tr.length; k++) {
  for (l = 2; l < tr[1].cells.length; l++) {
    (table1Data.push(parseInt(tr[k].cells[l].textContent)))
  };
}
//slice and create new array each time years.length is reached
// function arraySlicer(arrayName, maxInArray) {
//     let newArray = [];
//     for (let i = 0; i < arrayName.length; i += maxInArray)
//         newArray.push(arrayName.slice(i, i + maxInArray));
//     return newArray;
// }
//call the array slicer
// let table1Data = arraySlicer(table1Data, 11);
let table1Dataset = new Array;

function array1New(index, arrayName) {
  let arrayNew = [];
  for (let i = index; i < arrayName.length; i += 11) {
    arrayNew.push(arrayName[i]);
  }
  return arrayNew;
}

//push label and data in dataset object
for (let o = 0; o < table1Years.length; o++) {
  table1Dataset.push({
    label: table1Years[o],
    data: array1New(o, table1Data),
    backgroundColor: randomColor(),
    hoverBackgroundColor: "rgba(232,105,90,0.8)",
    hoverBorderColor: "red",
  })
}
let canvaTable1 = document.createElement("canvas");
canvaTable1.id = "table1Chart";
document.querySelectorAll("h3")[0].appendChild(canvaTable1);


let ctx = document.getElementById('table1Chart').getContext('2d');
let myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: table1Labels,
    datasets: table1Dataset,
  },
});
//table2

let trTwo = table2.rows;
let table2Labels = new Array;
let table2Years = new Array;

//country names
for (i = 1; i < trTwo.length; i++) {
  table2Labels.push(trTwo[i].cells[1].textContent.replace(/\s/g, ""))
}

//years
for (j = 2; j < trTwo[0].cells.length; j++) {
  table2Years.push(trTwo[0].cells[j].textContent)
}

//data1

let table2Data = [];

let table2Data1 = new Array;
for (i = 1; i < table2Labels.length + 1; i++) {
  table2Data1.push(parseInt(trTwo[i].cells[2].textContent));
}

//data2

let table2Data2 = [];
for (j = 1; j < table2Labels.length + 1; j++) {
  table2Data2.push(parseInt(trTwo[j].cells[3].textContent));
}

table2Data.push(table2Data1, table2Data2);

let table2Dataset = new Array;

for (let o = 0; o < table2Years.length; o++) {
  table2Dataset.push({
    label: table2Years[o],
    data: table2Data[o],
    borderColor: randomColor(),
    hoverBackgroundColor: "rgba(232,105,90,0.8)",
    hoverBorderColor: "red",
    fill: false
  })
}
let canvaTable2 = document.createElement("canvas");
canvaTable2.id = "table2Chart";
document.querySelectorAll("h4")[2].appendChild(canvaTable2);

let ctx2 = document.getElementById('table2Chart').getContext('2d');
let myChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: table2Labels,
    datasets: table2Dataset,
    
  },
   
});

let canvas = document.createElement("canvas");
document.querySelectorAll("h1")[0].appendChild(canvas);
let xhr = new XMLHttpRequest();
let ajaxNames = new Array;
let ajaxData = new Array;
let lastValue = 20;

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    xhr.response.forEach(function (value) {
        ajaxNames.push(parseInt(value[0])),
          ajaxData.push(parseInt(value[1]));
      }),

      canvas.id = "myChart";
  }
}
xhr.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart=0&ystart=10&length=20", true);
xhr.responseType = "json";
xhr.send();
updateChart();

function updateChart() {
  req = new XMLHttpRequest;
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      ajaxNames.shift();
      ajaxData.shift();
      ajaxNames.push(req.response[0][0]);
      ajaxData.push(req.response[0][1]);
      let ctx = document.getElementById("myChart");
      let myUpdatedChart = new Chart(ctx, {
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
            fill: true
          }]
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
    }
  }
  setTimeout( ()=> {
    updateChart()
  }, 1000);
  req.open("GET", "https://canvasjs.com/services/data/datapoints.php?xstart=" + (lastValue++) + "&ystart=10&length=1&type=json", true);
  req.responseType = "json";
  req.send();
}