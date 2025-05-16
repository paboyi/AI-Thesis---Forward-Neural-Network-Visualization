
export enum EActivationFunction {
  SIGMOID
}

export class ActivationFunction {
  public static sigmoid(value: number): number {
    return 1 / (1 + Math.exp(-value));
  }




  public static activate(
    activationFunction: EActivationFunction,
    value: number
  ): number [] {
    switch (activationFunction) {
      case EActivationFunction.SIGMOID:

      const sigmoidValue = ActivationFunction.sigmoid(value);
      let fired;
      let activationValues: number [] = [];

      // console.log("Sigmoid value: ", sigmoidValue);

        if ( sigmoidValue > 0.6) 
        {
          fired = 1;
          activationValues = [sigmoidValue, fired];
          return activationValues;
        }
        else 
        { 
          fired = 0;
          activationValues = [0, fired];
          return activationValues;
        } 
    }
    
  }
}

