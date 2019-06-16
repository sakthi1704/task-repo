export const INPUTACTION = 'inputValue';

export default function inputAction(value) {
  return {
    type: INPUTACTION,
    payload: {
      value
    }
  };
}
