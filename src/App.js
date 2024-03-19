import './App.css';
import React, { useState } from 'react';
import jeepImg from './image/jeep_lowExp.jpg';

function App() {
  const routes = {
    '01A': ['Alpha', 'Bravo', 'Charlie', 'Echo', 'Golf'],
    '02B': ['Alpha', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '03C': ['Charlie', 'Delta', 'Foxtrot', 'Hotel', 'India'],
    '04A': ['Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf'],
    '04D': ['Charlie', 'Echo', 'Foxtrot', 'Golf', 'India'],
    '06B': ['Delta', 'Hotel', 'Juliet', 'Kilo', 'Lima'],
    '06D': ['Delta', 'Foxtrot', 'Golf', 'India', 'Kilo'],
    '10C': ['Foxtrot', 'Golf', 'Hotel', 'India', 'Juliet'],
    '10H': ['Foxtrot', 'Hotel', 'Juliet', 'Lima', 'November'],
    '11A': ['Foxtrot', 'Golf', 'Kilo', 'Mike', 'November'],
    '11B': ['Foxtrot', 'Golf', 'Lima', 'Oscar', 'Papa'],
    '20A': ['India', 'Juliet', 'November', 'Papa', 'Romeo'],
    '20C': ['India', 'Kilo', 'Lima', 'Mike', 'Romeo'],
    '42C': ['Juliet', 'Kilo', 'Lima', 'Mike', 'Oscar'],
    '42D': ['Juliet', 'November', 'Oscar', 'Quebec', 'Romeo'],
  }

  const validJeepCodes = Object.keys(routes);

  const [jeepCodes, setJeepCodes] = useState('');
  const [jeepRoutes, setJeepRoutes] = useState([]);
  

  const handleChange = (event) => {
    setJeepCodes(event.target.value);
  };

  const handleGetRouteButtonClick = () => {
    const enteredCodesArray = jeepCodes.split(',').map((code) => code.trim());
    const uniqueCodesSet = new Set(enteredCodesArray);

    // Step 2: Check for Invalid Codes
    const invalidCodes = enteredCodesArray.filter((code) => !routes.hasOwnProperty(code));
    if (invalidCodes.length > 0) {
      alert(`Invalid Jeep code(s): ${invalidCodes.join(', ')}`);
      return;
    }

    // Step 3: Process Unique Codes and Generate Highlighted Routes
    const commonPlaces = {};
    const colors = {};
    const codesColors = {};
    const highlightedRoutes = [];

    uniqueCodesSet.forEach((code) => { // Iterate over unique codes
      routes[code].forEach((place) => {
        if (!commonPlaces[place]) {
          commonPlaces[place] = [code];
          colors[place] = getRandomColor();
        } else {
          commonPlaces[place].push(code);
          if (commonPlaces[place].length > 1) {
            const commonCodes = commonPlaces[place].sort().join('-');
            if (!codesColors[commonCodes]) {
              codesColors[commonCodes] = getRandomColor();
              commonPlaces[place].forEach((c) => {
                colors[c] = codesColors[commonCodes];
              });
            }
          }
        }
      });
    });

    uniqueCodesSet.forEach((code) => { // Iterate over unique codes
      const places = routes[code];
      const highlightedPlaces = places.map((place) => {
        const pair = commonPlaces[place].sort().join('-');
        const color = codesColors[pair] || 'white';
        return `<span style="color: ${color}">${place}</span>`;
      });
      highlightedRoutes.push(`${code} => ${highlightedPlaces.join(' <-> ')}`);
    });

    setJeepRoutes(highlightedRoutes);
    setJeepCodes('');
  };

  const handleClearButtonClick = () => {
    setJeepRoutes([]);
    setJeepCodes('');
  };

  const getRandomColor = () => {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (isBrownish(r, g, b) || isBlackish(r, g, b) || isGrayish(r, g, b));

    // Convert RGB to hexadecimal format
    const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return color;
  };

  const isBrownish = (r, g, b) => {
    const brownThreshold = 200;
    return r < brownThreshold && g < brownThreshold && b < brownThreshold;
  };

  const isBlackish = (r, g, b) => {
      const blackThreshold = 200;
      return r < blackThreshold && g < blackThreshold && b < blackThreshold;
  };

  const isGrayish = (r, g, b) => {
      const grayThreshold = 200;
      return Math.abs(r - g) < grayThreshold && Math.abs(g - b) < grayThreshold && Math.abs(b - r) < grayThreshold;
  };

  const matrixSize = 5;
  const jeepCodeMatrix = [];
  for (let i = 0; i < validJeepCodes.length; i += matrixSize) {
    jeepCodeMatrix.push(validJeepCodes.slice(i, i + matrixSize));
  }

  return (
    <div className="App"
      style={{
        backgroundImage: `url(${jeepImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <h2 style={{ color: 'white' }}>Jeep Codes:</h2>
        <table style={{ color: 'white', borderCollapse: 'collapse'}}>
          <tbody>
            {jeepCodeMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((code, columnIndex) => (
                  <td key={columnIndex} style={{ border: '1px solid white', padding: '8px' }}>{code}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      <div style={{ 
          flex: 1 ,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <h1 style={{ color: 'white' }}>Enter Jeep Codes</h1>
        <input
          type="text"
          value={jeepCodes}
          onChange={handleChange}
          placeholder="(e.g., 01A,02B,03C)"
          style={{
            width: '300px',
            height: '40px',
            fontSize: '16px',
            padding: '8px',
            marginBottom: '20px',
          }}
        />
        <div>
          <button
            onClick={handleClearButtonClick}
            style={{
              width: '150px',
              height: '40px',
              fontSize: '20px',
              backgroundColor: '#b22222',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginRight: '20px'

            }}
          >
            Clear
          </button>
          <button
            onClick={handleGetRouteButtonClick}
            style={{
              width: '150px',
              height: '40px',
              fontSize: '20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Get Routes
          </button>
        </div>
        <div>
        {jeepRoutes.length > 0 && (
          <div style={{ maxHeight: '300px', overflowY: 'auto', color: 'white' }}>
            <h2>Routes:</h2>
            <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '24px' }}>
              {jeepRoutes.map((route, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: route }}></li>
              ))}
            </ul>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
