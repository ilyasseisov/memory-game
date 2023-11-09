import './index.css';

export default function Popup({ onClick, gameDuration, children }) {
  // hooks
  // functions
  // return
  return (
    <>
      <div className='popup show'>
        <h1 className='title-text'>Congrats 🎉</h1>
        {children}
        <h2>
          <span>
            {`0${Math.floor((gameDuration / 60000) % 60)}`.slice(-2)}:
          </span>
          <span>{`0${Math.floor((gameDuration / 1000) % 60)}`.slice(-2)}</span>
        </h2>
        <a onClick={onClick} className='btn'>
          New game
        </a>
      </div>
      <div className='popup-overlay'></div>
    </>
  );
}
