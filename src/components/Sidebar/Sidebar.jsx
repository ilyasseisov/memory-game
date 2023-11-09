import './index.css';

export default function Sidebar({ isActive, children }) {
  // hooks
  // functions
  // return
  return (
    <>
      <div className={`sidebar ${isActive ? 'show' : ''}`}>{children}</div>
      <div className='sidebar-overlay'></div>
    </>
  );
}
