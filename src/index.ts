
import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';

import { EActivationFunction } from './lib/neuronal-net/activation-functions';
import NeuronalNet from './lib/neuronal-net/neuronal-net';





const app = Express();
app.use(bodyParser.json()); // to parse JSON from requests


// Serve static files (e.g., index.html, styles.css)
app.use(Express.static(path.join(__dirname)));


// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});






// RECIEVED INPUT from the BROWSER
app.post('/send-input', (req, res) => {
  const input = req.body.input;
  const allNeuronLayersCombined = req.body.allNeuronLayersCombined;
  const inputCount = req.body.inputCount;
  const hiddenLayers = req.body.hiddenLayers;
  const outputCount = req.body.outputCount;


  console.log('Received input from client:', " | ",input, " | ", inputCount, " | ", hiddenLayers);

  try {

    const nn = new NeuronalNet({
      activationFunction: EActivationFunction.SIGMOID,
      inputCount: inputCount,
      outputCount: outputCount,
      hiddenLayers: hiddenLayers 
    }, 
    allNeuronLayersCombined
  );


    const output = nn.send(input); // Process input through the network in the BACKEND  //That's why we imported functions above since this file & the backend are both (.ts) files
    res.json(output); // Send result back to FRONTEND //Output = {finalOutputs: [...], firedNeurons: [...],  etc}
    
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Neural network error' });
  }
});






// Start the Sercer
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

