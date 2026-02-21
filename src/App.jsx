import { useEffect, useState } from "react";

const pageStyle = {
  textAlign: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
  padding: 40,
  color: "#fff",
  fontFamily: "cursive"
};

const btn = {
  padding: "12px 24px",
  margin: 10,
  fontSize: 18,
  borderRadius: 20,
  border: "none",
  cursor: "pointer",
  background: "#ff4d6d",
  color: "white"
};

function App() {
  const [config, setConfig] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  if (!config) return <h2>Loading...</h2>;

  // PAGE 0
  if (page === 0) {
    return (
      <div style={pageStyle}>
        <h1>{config.content.title}</h1>
        <p>{config.content.subtitle}</p>
        <button style={btn} onClick={() => setPage(1)}>YES 💕</button>
        <button style={btn}>NO 😢</button>
      </div>
    );
  }

  // PAGE 1
  if (page === 1) {
    return (
      <div style={pageStyle}>
        <h1>Memories 💖</h1>

        {config.couplePhotos.map((p, i) => (
          <div key={i}>
            <img src={p.image} style={{ width: 300, borderRadius: 20 }} />
            <p>{p.caption}</p>
          </div>
        ))}

        <button style={btn} onClick={() => setPage(2)}>Next →</button>
      </div>
    );
  }

  // PAGE 2
  if (page === 2) {
    return (
      <div style={pageStyle}>
        <h1>Songs 🎵</h1>

        {config.songs.map((s, i) => (
          <div key={i}>
            <img src={s.cover} style={{ width: 120, borderRadius: 12 }} />
            <p>{s.title}</p>
            <audio controls src={s.audio}></audio>
          </div>
        ))}

        <button style={btn} onClick={() => setPage(3)}>Next →</button>
      </div>
    );
  }

  // PAGE 3
  return (
    <div style={pageStyle}>
      <h1>{config.content.successMessage}</h1>
      <h2 style={{ fontSize: 36 }}>💝 HAPPY VALENTINE’S DAY 💝</h2>
    </div>
  );
}

export default App;
