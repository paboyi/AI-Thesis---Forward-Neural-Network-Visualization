import Express from 'express';

import { EActivationFunction } from './lib/neuronal-net/activation-functions';
import NeuronalNet from './lib/neuronal-net/neuronal-net';

const nn = new NeuronalNet({
  activationFunction: EActivationFunction.SIGMOID,
  inputCount: 3,
  outputCount: 2,
  hiddenLayers: [4]
});

nn.send([1, 0, 2]);

const app = Express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
