import './index.css';

export default function Header({ gameDuration }) {
  // hooks
  // functions
  // return
  return (
    <>
      <header>
        <h4>
          <span>
            {`0${Math.floor((gameDuration / 60000) % 60)}`.slice(-2)}:
          </span>
          <span>{`0${Math.floor((gameDuration / 1000) % 60)}`.slice(-2)}</span>
        </h4>
      </header>
    </>
  );
}
