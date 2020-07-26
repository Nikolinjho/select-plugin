import '@/styles/main.css';
import { Select } from './components/select-plugin/select-plugin';

// import {Select} from './components/select-plugin/select-plugin'

window.addEventListener('load', () => {
  const select = new Select('#select', {
    placeholder: 'Come get it',
    data: [
      {
        id: 1,
        value: 'Krot',
      },
      {
        id: 2,
        value: 'Json',
      },
      {
        id: 3,
        value: 'Assets',
      },
      {
        id: 4,
        value: 'Asdfas',
      },
    ],
    selectedId: 2,
    onSelect(item){
        console.log(item)
    }
  });

  window.s = select;
});
