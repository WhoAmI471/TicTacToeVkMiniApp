function Square({ value, setSquareValue, size }) {
  return (
    <button
      onClick={setSquareValue}
      style={{
        width: "14vmin",
        height: "14vmin",
        color: value ? "#61dafb" : "#282c34",
        marginLeft: "2px",
        marginRight: "2px",
        marginBottom: "4px",
        borderRadius: "10px",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.1)",
        border: "none",
        background: "rgb(255, 255, 255)",
      }}
    >
      {value == null ? (
        <div style={{ width: "100%", height: "100%", border: "none" }}></div>
      ) : (
        <img
          src={value}
          alt="symbol"
          style={{ width: "90%", height: "90%", border: "none" }}
        />
      )}
    </button>
  );
}

export default Square;
