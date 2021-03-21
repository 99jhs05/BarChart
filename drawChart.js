//let container = document.getElementById("container");
let button = document.getElementById("btn");
let text = document.getElementById("text");
let form = document.getElementById("dataForm");
let dataInput = document.getElementById("dataInput");
let canvas = document.getElementById("chart");

let data;

button.addEventListener("click", function() {
  try{
    data = JSON.parse(dataInput.value);
    hideElements();
    drawChart(data, "");
  }catch (err){text.textContent = "Invalid format!"}
});

function hideElements(){
  button.style.display = "none"
  text.style.display = "none"
  form.style.display = "none"
}

function drawChart(data, options){
  let ctx = canvas.getContext("2d");
  let w = canvas.width;
  let h = canvas.height;

  ctx.transform(1, 0, 0, -1, 0, h);

  ctx.fillStyle = "#2C599D";
  ctx.fillRect(0, 0, w, h);

  let dataAsArray = convertObjectToArray(data);
  let maximumValue = getMaximumValueFromDataArray(dataAsArray);
  //barwidth? barsXoffset? barsYoffset?

  for(let i = 0; i<dataAsArray.length; i++){
    ctx.fillStyle = "#F98125";
    ctx.fillRect(w*i/dataAsArray.length, 0, w/10, h*dataAsArray[i][1]/maximumValue);
  }
  
  function convertObjectToArray(data){
    let arr = [];
    for(let property in data){
      arr.push([property, data[property]]);
    }
    return arr;
  }

  function getMaximumValueFromDataArray(data){
    let max = 0;
    data.forEach((value) => {
      if(value[1] > max) max = value[1];
    });
    return max
  }
}