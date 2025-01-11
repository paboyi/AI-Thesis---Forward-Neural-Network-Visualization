import { EActivationFunction } from './lib/neuronal-net/activation-functions';
import NeuronalNet from './lib/neuronal-net/neuronal-net';

const nn = new NeuronalNet({
  activationFunction: EActivationFunction.SIGMOID,
  inputCount: 3,
  outputCount: 2,
  hiddenLayers: [4]
});

nn.send([1, 0, 2]);
