import { EActivationFunction } from './activation-functions';
import Neuron from './neuron';

interface INeuronalNetOptions {
  activationFunction: EActivationFunction;
  inputCount: number;
  outputCount: number;
  hiddenLayers: number[]; // Array of neuron amounts per hidden layer
}

export default class NeuronalNet {
  private layers: Neuron[][];

  private initializeLayers(options: INeuronalNetOptions) {
    let layers: Neuron[][] = [];

    for (
      let layerIndex = 0;
      layerIndex < options.hiddenLayers.length + 1; // Hidden layers + output layer
      layerIndex++
    ) {
      const neuronAmount: number =
        layerIndex < options.hiddenLayers.length
          ? options.hiddenLayers[layerIndex] // Neuron amount of the current hidden layer
          : options.outputCount; // Neuron amount of the output layer

      let layer: Neuron[] = [];

      for (let neuronIndex = 0; neuronIndex < neuronAmount; neuronIndex++) {
        layer.push(
          new Neuron({
            activationFunction: options.activationFunction,
            previousLayerNeuronAmount:
              layerIndex === 0
                ? options.inputCount
                : layers[layerIndex - 1].length
          })
        );
      }

      layers.push(layer);
    }

    return layers;
  }

  constructor(options: INeuronalNetOptions) {
    this.layers = this.initializeLayers(options);
  }

  public send(inputs: number[]) {
    let outputs: number[] = inputs;
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      let layerOutputs: number[] = [];
      for (
        let neuronIndex = 0;
        neuronIndex < this.layers[layerIndex].length;
        neuronIndex++
      ) {
        const neuron = this.layers[layerIndex][neuronIndex];
        layerOutputs.push(neuron.send(outputs));
      }
      outputs = layerOutputs;
    }

    console.log(outputs);
  }
}
