import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [modes, setModes] = useState(null);
  const [fieldSize, setFieldSize] = useState(null);
  const [hovers, setHovers] = useState([]);

  useEffect(() => {
    axios.get('https://demo1030918.mockable.io/').then(({ data }) => {
      setModes(data);
    });
  }, []);

  const onSquareHover = (row, col, element) => {
    if (element.classList.contains('active')) element.classList.remove('active');
    else element.classList.add('active');
    setHovers([...hovers, `row:${row} col:${col}`]);
  };

  return (
    <div className="content">
      <div className="flex menu">
        <select name="cars" onChange={(e) => setSelectedMode(e.target.value)}>
          <option label="PICK MODE" />
          {modes &&
            Object.keys(modes).map((item) => (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            ))}
        </select>
        <button
          className="btn"
          onClick={() => (selectedMode ? setFieldSize(modes[selectedMode].field) : null)}>
          START
        </button>
      </div>
      {fieldSize && (
        <div className="flex">
          <div>
            {Array(fieldSize)
              .fill(null)
              .map((_, row) => (
                <div key={row} className="flex">
                  {Array(fieldSize)
                    .fill(null)
                    .map((_, col) => (
                      <div
                        key={col}
                        className="square"
                        onMouseOver={(e) => onSquareHover(row + 1, col + 1, e.target)}></div>
                    ))}
                </div>
              ))}
          </div>
          {hovers.length !== 0 && (
            <div className="hover">
              <h2>Hover squares</h2>
              {hovers
                .slice(0)
                .reverse()
                .map((item, idx) => (
                  <div key={idx} className="hover_item">
                    {item}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
