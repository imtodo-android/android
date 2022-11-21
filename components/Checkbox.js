import { useState } from 'react';
import done from '../assets/done.svg';
export default function Checkbox() {
  const [chClasses, setChClasses] = useState('');
  const [iconOpacity, setIconOpacity] = useState(0);  


  function changeClass(){
    if(chClasses === ''){
       setChClasses('active-checkbox'); 
       setIconOpacity(1);
    }
    else{
        setIconOpacity(0);
        setTimeout(()=>{
            setIconOpacity('unvisible')
        },250)
        setChClasses('');
    }
  }

  return (
        <div onClick={() => changeClass()} className={`checkbox ${chClasses}`}>
            {
                iconOpacity !== 'unvisible' &&
                <img src={done} style={{opacity: iconOpacity, transition:'250ms'}} width="15" />
            }
        </div>
  );
}