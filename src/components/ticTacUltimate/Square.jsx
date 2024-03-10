export default function Square({ className, value, onSquareClick }) {
  return (
    <button className={className} onClick={onSquareClick}>
      {value && <img src={value} alt="" style={{ width: '100%', height: '100%', padding: '2px' }} />}
    </button>
  );
}
