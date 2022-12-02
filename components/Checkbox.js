import { useState } from 'react';
import done from '../assets/done.svg';
export default function Checkbox({ setSelected, irx, selected }) {
  const [chClasses, setChClasses] = useState('');
  const [iconOpacity, setIconOpacity] = useState(0);


  function changeClass() {
    if (chClasses === '') {
      selected.length > 0 ? setSelected([...selected, irx]) : setSelected([irx]);
      setChClasses('active-checkbox');
      setIconOpacity(1);
    }
    else {
      setIconOpacity(0);
      setTimeout(() => {
        setIconOpacity('unvisible')
      }, 250)
      setChClasses('');
      selected.map((num, index) => {
        if (num === irx) {
          setSelected(selected.splice(index + 1, 1));
        }
      })
    }
  }

  return (
    <div onClick={() => changeClass()} className={`checkbox ${chClasses}`}>
      {
        iconOpacity !== 'unvisible' &&
        <img src={done} style={{ opacity: iconOpacity, transition: '250ms' }} width="15" />
      }
    </div>
  );
}