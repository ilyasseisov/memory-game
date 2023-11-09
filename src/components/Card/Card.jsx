import './index.css';

export default function Card({ image, onClick, selected }) {
  // hooks
  // functions
  // return
  return (
    <>
      <div className='card'>
        <div className={`${selected && 'selected'}`}>
          <img src={image} className='card-face' />
          <img
            src={'assets/rect.png'}
            onClick={onClick}
            className='card-back'
          />
        </div>
      </div>
    </>
  );
}
