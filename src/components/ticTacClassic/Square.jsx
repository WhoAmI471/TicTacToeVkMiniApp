function Square({ value, setSquareValue, size }) {
  return (
    <button 
      onClick={setSquareValue}
      style={{
        width: size,
        height: size,
        color: value ? '#61dafb' : '#282c34',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '10px',
        borderRadius: '15px',
        boxShadow: '0px 0px 15px 0px rgba(0, 0, 0, 0.1)',
        border: 'none',
        background: 'rgb(255, 255, 255)'
      }}
    >
      {value == null ?
        <div style={{ width: '100%', height: '100%', border: 'none'}}></div>
        :
        <img src={value} alt="symbol" style={{ width: '90%', height: '90%', border: 'none'}}/>
      }
    </button>
  );
}

export default Square;
