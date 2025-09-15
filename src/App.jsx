import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:10000"; // replace with your deployed backend

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const login = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      setRole(data.role);
    }
  };

  const signup = async () => {
    await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    alert("Signup done, please login!");
  };

  const askAI = async () => {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setHistory([...history, data]);
  };

  useEffect(() => {
    if (role === "admin") {
      // Load users summary
      setUsers([
        // In production, create a proper /admin/users route
        { email: "demo@user.com", role: "user", totalChats: 5, totalInvoices: 2 },
      ]);
    }
  }, [role]);

  if (!token) {
    return (
      <div>
        <h2>Login / Signup</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button onClick={signup}>Signup</button>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <h3>Users</h3>
        <ul>
          {users.map((u, i) => (
            <li key={i}>
              {u.email} ({u.role}) | Chats: {u.totalChats} | Invoices: {u.totalInvoices}
            </li>
          ))}
        </ul>
        <h3>📊 Export Reports</h3>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label> End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <br /><br />
        <a
          href={`${API_BASE}/admin/export-all?start=${startDate}&end=${endDate}`}
          target="_blank"
          rel="noreferrer"
        >
          Export Excel (Filtered)
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask AI..." />
      <button onClick={askAI}>Ask</button>
      <h3>Chat History</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            <b>You:</b> {h.query} <br />
            <b>AI:</b> {h.reply}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
