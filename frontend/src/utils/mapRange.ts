export default function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
  return outputMin + (outputMax - outputMin) * ((value - inputMin) / (inputMax - inputMin));
}