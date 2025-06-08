import React, { useEffect, useState } from "react";
import { database } from "./firebaseConfig";
import { ref, onValue } from "firebase/database";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const speedRef = ref(database, "vehicle_speed_log");
    onValue(speedRef, (snapshot) => {
      const raw = snapshot.val();
      if (raw) {
        const list = Object.entries(raw).map(([timestamp, val]) => ({
          timestamp,
          speed: val.speed,
        }));
        // urutkan terbaru di atas
        setData(list.sort((a, b) => b.timestamp - a.timestamp));
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>🚗 Log Kecepatan Mobil</h1>
      <table>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Kecepatan (km/h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.timestamp}>
              <td>{new Date(Number(entry.timestamp)).toLocaleString()}</td>
              <td>{entry.speed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
