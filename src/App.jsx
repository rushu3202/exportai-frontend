import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleExport = async () => {
    try {
      const res = await fetch("https://export-ai-i9ns.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResponse(data.message + ": " + data.data);
    } catch (error) {
      setResponse("Error connecting to backend!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ExportAI 🚀</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleExport}>Generate</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
