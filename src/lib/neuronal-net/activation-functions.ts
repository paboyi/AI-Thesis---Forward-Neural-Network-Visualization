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
  ): number {
    switch (activationFunction) {
      case EActivationFunction.SIGMOID:
        return ActivationFunction.sigmoid(value);
    }
  }
}
