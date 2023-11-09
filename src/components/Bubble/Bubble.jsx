import './index.css';
import { useState } from 'react';

export default function Bubble({ clearLocalStorage }) {
  // hooks
  const [isActive, setIsActive] = useState(false);
  // functions
  function calloutIsActive() {
    setIsActive(true);
  }
  function calloutIsNotActive() {
    setIsActive(false);
  }

  // return
  return (
    <>
      <div className='bubble'>
        <div className={`callout ${isActive ? 'active' : ''}`}>
          <p>Are you sure?</p>
          <div className='actions' onClick={calloutIsNotActive}>
            <button onClick={clearLocalStorage} className='small'>
              yes
            </button>
            <button className='small'>no</button>
          </div>
        </div>
        <button onClick={calloutIsActive} className='primary'>
          Reset progress
        </button>
      </div>
    </>
  );
}
