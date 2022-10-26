// atom.js
import { atom, selector } from 'recoil';

let loginState = atom({
  key: 'loginState',
  default: 0,
});

let inputState = atom({
  // 기존에서 추가된 아톰.
  key: 'input',
  default: 0,
});

let pharmacyWorking = atom({
  key: 'pharmacyWorking',
  default: '',
});

export { loginState, inputState, pharmacyWorking };
