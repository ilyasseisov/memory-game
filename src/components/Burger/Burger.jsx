import './index.css';

export default function Burger({ isActive, onClick }) {
  // hooks
  // functions
  // return
  return (
    <>
      <div className='burger' onClick={onClick}>
        <div className={`trigger ${isActive ? 'active' : ''}`}>
          <span></span>
        </div>
      </div>
    </>
  );
}
