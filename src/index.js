
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 40; // size of square (w & h)
const xSpacing = 200;
const ySpacing = 100;

let inputCount, hiddenLayers, outputCount;

let neurons = [];




document.getElementById('renderbtn').addEventListener('click', function () {
  //Reset all old renders
  neurons = [];


  // <!-- Get User Values for the ANN -->
  inputCount = parseInt(document.getElementById('inputCount').value);
  let userHiddenLayers = document.getElementById('hiddenLayerCount').value;
  hiddenLayers = userHiddenLayers.split(',').map(Number); 
  outputCount = 2; 

  
  document.querySelector('.toHide').style.display = 'block';





  




    // FUNCTION 1  -- RENDER NETWORK
  function renderNetwork(inputCount, hiddenLayers, outputCount){
    totalLayers = 1 + hiddenLayers.length + 1; 

    console.log('- - - - - - - - - - - - - - -\n- - - - - - - - - - - - - - -\n\n- - - - - - - - - - - - - - -\n'); 
    console.log('Total Layers: ', totalLayers); // Total layers in the neural network. (Input, hidden + output layers count)

    nV = [inputCount, hiddenLayers, outputCount].flat(); //nV - neuronValues // flattens the 2d array to 1d [1,[2,3],4] = [1,2,3,4]
    console.log('nV.flat() = ', nV);
    return nV; //returns flat array [1,2,3,4]
    
  }
  renderNetwork(inputCount, hiddenLayers, outputCount); // the canvas will display columns with e.g. [1,2,3,4] neurons]










    // FUNCTION 2  -- DYNAMIC CANVAS SIZE
  function calculateCanvasSize(inputCount, hiddenLayers, outputCount) {
      const totalLayers = 2 + hiddenLayers.length;
      const layerWithMostNeurons = Math.max(inputCount, ...hiddenLayers, outputCount); // Math.max() = returns the number with the highest value // ...[3,4,5] = 3,4,5 


      const width = totalLayers * xSpacing + size;
      const height = layerWithMostNeurons * ySpacing + size;
    
      return { width, height };
    }

  const { width, height } = calculateCanvasSize(inputCount, hiddenLayers, outputCount);
  canvas.width = width;
  canvas.height = height;










    // FOR-Loop 1 -- CREATE 1D & 2D NEURON ARRAYs for FUTURE WORK
    let xDistance = 100;
    let allObjects = []; //to gather each neuron in a 1d array // will be used to create lines

for (i=0; i<nV.length; i++) // loop through flattened array
{
  let yDistance = 50;
  let eachObjects = []; // to gather each neuron according to layer


    for (p=0; p<nV[i]; p++) //loop through each layer
    {
      let obj1 = {x: xDistance, y: yDistance, fired: false}; // obj is a neuron. Remember these properties, x,y & false. We'll use them again
      eachObjects.push(obj1); 
      allObjects.push(obj1);

      // Increase Height
      yDistance += ySpacing; // or +100 if ySpacing doesn't work 
    }

    neurons.push(eachObjects); //eachObjects[] = is a single elemt of this 2D Array

    // Create Space between Layers
    xDistance += xSpacing; // or +200 if ySpacing doesn't work
}
console.log('allObjects = ', allObjects);
console.log('neurons = ', neurons);










    // DRAW LINES
  function drawLines () {
    
    ctx.strokeStyle = 'rgb(210, 210, 210)'; // #acff30
    ctx.lineWidth = 2;
    
     
    for (i=0; i<neurons.length-1; i++) {
    
     for (j=0; j<neurons[i].length; j++) { // Stop drawing lines at second-to-the-last layer
    
       const start = neurons[i][j]; // Neuron in the current layer
       const x1 = start.x + (size / 2);  //start.x. - x is a property of obj1 (a single neuron). See above
       const y1 = start.y + (size / 2); // this ensures the lines start from the middle of each neuron
    
       for (let k = 0; k < neurons[i + 1].length; k++) { // Loop through next layer
       const end = neurons[i+1][k]; // Neuron in the next layer
       const x2 = end.x + (size / 2);
       const y2 = end.y + (size / 2);
       
      //  console.log(`Connecting (x1:${x1}, y1:${y1}) to (x2:${x2}, y2:${y2})`); //A nice visualization of waht each line connects to
    
       ctx.moveTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.stroke(); 
       }
     
      }
    }
  }

  drawLines();










    // FUNCTION 3 -- DRAW NEURONS
 function drawNeurons(neurons) {

 for (i=0; i<neurons.length; i++) {
   for (let neuron of neurons[i]) {
    if (neurons[i] == neurons[0])
    {
      ctx.fillStyle = 'rgb(211, 211, 211)'; 
      ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)
    }
    else if (neurons[i] == neurons[neurons.length - 1])
    {
      ctx.fillStyle = 'grey';
      ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)

    }
    else 
    {
      ctx.fillStyle = 'rgba(172, 255, 48, 0.38)'; // Preferred Main color - #acff30
      ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)
    }
   }
 } 
}

drawNeurons(neurons);










  // UPDATE NEURONS TO SHOW FIRED & UN-FIRED NEURONS (active & inactive)
function updateFiredNeurons(firedNeuronsFromServer) {
  for (let layerIndex = 0; layerIndex < firedNeuronsFromServer.length; layerIndex++) {
    for (
      let neuronIndex = 0; 
      neuronIndex < firedNeuronsFromServer[layerIndex].length; 
      neuronIndex++) 
    {
      const didFire = firedNeuronsFromServer[layerIndex][neuronIndex] === 1;  // compares both value and type. So 1===1 (true),  0===1 (false)
      neurons[layerIndex + 1][neuronIndex].fired = didFire;
    }
  }

  // Clear just the neurons (squares), not the lines, & re-draw
  for (i=0; i<neurons.length; i++) {
    for (let neuron of neurons[i]) {

         if (neurons[i] == neurons[0])
         {
           ctx.fillStyle = 'rgb(211, 211, 211)'; 
           ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)
         }
         else if (neurons[i] == neurons[neurons.length - 1])
         {
           ctx.fillStyle = 'grey';
           ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)
     
         }
         else 
         {
           ctx.fillStyle = neuron.fired ? 'rgb(172, 255, 48)' : 'rgb(255, 0, 0)';
           ctx.fillRect(neuron.x, neuron.y, size, size); //create squares (neurons)
         }
    }
  }
}










    // Add the OUTPUT VALUE of every NEURON to the Right
  function addNumericalValues (inputofEachLayer) {
    for (i=0; i<neurons.length; i++) {
      let j = 0;
      for (let neuron of neurons[i]) { 
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';

        const value = inputofEachLayer[i][j];

        ctx.fillText(value.toFixed(2), (neuron.x + size + 5), (neuron.y + (size/2)));
        j++;
      }
    }
  }










  // Handle Last USER Inputs (after the 1st RenderNetwork()) 
const form = document.getElementById('inputForm');
const resultDiv = document.getElementById('result');
const resultDivValues = document.getElementById('resultValues');
const warningDiv = document.getElementById('outputWarning');





  form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputStr = document.getElementById('input').value;
  const rawArray = inputStr.split(','); 
  const inputArray = rawArray.map(x => x.trim()).map(Number);
      console.log("inputArray: ", inputArray);





  // Check for invalid input values
  const isInvalid = inputArray.some(val => isNaN(val));

  if (isInvalid || inputArray.length !== inputCount) {
    warningDiv.innerText = `Please enter exactly ${inputCount} valid numbers separated by commas (e.g., 1,2,3)`;
    return;
  }

  warningDiv.innerText = ''; // clear any previous warnings
  




  // SEND INFORMATION & AWAIT RESPONSE from the BACKEND
      const response = await fetch('/send-input', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input: inputArray, allNeuronLayersCombined: neurons, inputCount, hiddenLayers, outputCount })
  })


  const data = await response.json();
  console.log('𓆝 𓆟 𓆞 𓆝 𓆟 𓆝 𓆟 𓆞 𓆝 𓆟 \n 𓆝 𓆟 𓆞 𓆝 𓆟 𓆝 𓆟 𓆞 𓆝 𓆟 \nReceived from server:', data);
  console.log('Output received from server:', data.finalOutputs);
  console.log('FiredNeurons received from server:', data.firedNeurons);
  console.log('eachLayerInputValues received from server:', data.eachLayerInputValues);





  // REDRAW CANVAS (Network) with NEW DATA from the BACKEND
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines();
  updateFiredNeurons(data.firedNeurons); // redraws all Neurons, but update 'firedNeurons' to be Red
  addNumericalValues(data.eachLayerInputValues); // add numerical output values beside neurons





  // SHOW USER their final OUTPUT from the NETWORK
    if (Array.isArray(data.finalOutputs) && data.finalOutputs.length > 0) {
    resultDiv.innerText = 'Output: \n';
    resultDivValues.innerText = data.finalOutputs.join(', ');
    

      // Show celebration GIF
      const gif = document.getElementById('gifDiv');
      gif.style.display = 'block';

      // Hide GIF after 3 seconds
      setTimeout(() => {
        gif.style.display = 'none';
      }, 900);

    } else if (data.error) {
    resultDiv.innerText = 'Error: ' + data.error;
    } else {
    resultDiv.innerText = 'No output or unexpected result.';
    }
  });


});

