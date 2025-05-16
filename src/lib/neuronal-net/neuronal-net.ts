
import { EActivationFunction } from './activation-functions';
import Neuron from './neuron';


interface INeuronalNetOptions {
  activationFunction: EActivationFunction;
  inputCount: number;
  outputCount: number;
  hiddenLayers: number[]; // It's an Array Of the amount of neuron per hidden layer
}






export default class NeuronalNet {
  private layers: Neuron[][];




  private initializeLayers(options: INeuronalNetOptions, allNeuronLayersCombined: [[{}]]) {
    let layers: Neuron[][] = [];

    for (
      let layerIndex = 0;
      layerIndex < options.hiddenLayers.length + 1; // go through Hidden layers + output layer
      layerIndex++
    ) {
      const neuronAmount: number =
        layerIndex < options.hiddenLayers.length
          ? options.hiddenLayers[layerIndex] // Neuron amount for the current hidden layer
          : options.outputCount; // Neuron amount in the output layer

      let layer: Neuron[] = [];

      // console.log('neuRON Amount befor anythin ', neuronAmount);

      for (let neuronIndex = 0; neuronIndex < neuronAmount; neuronIndex++) {

        // console.log("allNeuronLayersCombined: ", allNeuronLayersCombined);

        layer.push(
          new Neuron({
            activationFunction: options.activationFunction,
            previousLayerNeuronAmount:
              layerIndex === 0
                ? options.inputCount
                : allNeuronLayersCombined[layerIndex].length
          })
        );
        // console.log("previous Layer Neuron Index: ", allNeuronLayersCombined[layerIndex].length);
        // console.log('layer index here: ', layerIndex);
      }

      layers.push(layer);
    }
    console.log("layers: ", layers);

    return layers;

  }









  constructor(options: INeuronalNetOptions, allNeuronLayersCombined: [[{}]]) {
    this.layers = this.initializeLayers(options, allNeuronLayersCombined);
  }









  public send(userInputs: number[]) {
    let inputsToNeuron: number[] = userInputs;
    let firedNeurons: number[][] = [[]];

    let eachLayerInputValues: number[][] = [];
    eachLayerInputValues.push(userInputs); //getting the 1st Input


  
    for (let layerIndex = 0; layerIndex < this.layers.length; layerIndex++) {
      
      let outputsToNextLayer: number[] = [];
      for (
        let neuronIndex = 0;
        neuronIndex < this.layers[layerIndex].length;
        neuronIndex++
      ) {
        const neuron = this.layers[layerIndex][neuronIndex];
        console.log("\n\nThis Neuron's position: ",[layerIndex],"",[neuronIndex],"");   // OR  console.log(`This is Neuron[${layerIndex}][${neuronIndex}]`);
        console.log("This Neuron's attributes: \n", this.layers[layerIndex][neuronIndex]);
        
        const l = neuron.send(inputsToNeuron);

        console.log(" Activation function returned: ", l);
        outputsToNextLayer.push(l[0]);
        (firedNeurons[layerIndex] ??= []).push(l[1]);
      }
      inputsToNeuron = outputsToNextLayer;
      eachLayerInputValues.push(inputsToNeuron); //adding other inputs

      console.log("\n Outputs (i.e. Inputs for the next Neural-Layer): ", inputsToNeuron);
    }

    const finalOutputs = inputsToNeuron;
    console.log("\n\n Final Output from neural-nets.ts: \n", finalOutputs, "\n");
    console.log("\nFiredNeurons: \n", firedNeurons);
    console.log("\n each Layer INPUT(output) values: \n", eachLayerInputValues);


    return {finalOutputs, firedNeurons, eachLayerInputValues}; // Just return the data for index.ts to use

  }

}

