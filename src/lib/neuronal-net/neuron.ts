import {
  ActivationFunction,
  EActivationFunction
} from './activation-functions';

interface INeuronOptions {
  activationFunction: EActivationFunction;
  previousLayerNeuronAmount: number;
}

export default class Neuron {
  private options: INeuronOptions;
  private weights: number[] = [];

  private initializeWeights(neuronAmount: number) {
    this.weights = [];
    for (let i = 0; i < neuronAmount; i++) {
      this.weights.push(Math.random());
    }
  }

  private transmissionFunction(inputs: number[]): number {
    let result = 0;
    for (let i = 0; i < inputs.length; i++) {
      result += inputs[i] * this.weights[i];
    }

    // x1 * w1 + x2 * w2 + ... + xn * wn
    return result;
  }

  constructor(options: INeuronOptions) {
    this.options = options;
    this.initializeWeights(options.previousLayerNeuronAmount);
  }

  public send(inputs: number[]): number {
    if (inputs.length !== this.weights.length) {
      throw new Error('Input length does not match weight length.');
    }

    const activationValue = this.transmissionFunction(inputs);
    return ActivationFunction.activate(
      this.options.activationFunction,
      activationValue
    );
  }
}
