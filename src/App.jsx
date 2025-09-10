import React, { useState } from "react";

function App() {
  const [invoice, setInvoice] = useState({
    items: [
      { description: "Cotton fabric", quantity: 100, unitPrice: 5 }
    ],
    invoiceNo: `INV-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    currency: "USD"
  });

  // Calculate total amount
  const getTotal = () => {
    return invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Invoice Generator</h1>
      <h2>Invoice No: {invoice.invoiceNo}</h2>
      <p>Date: {invoice.date}</p>
      <p>Currency: {invoice.currency}</p>

      <h3>Items</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price ({invoice.currency})</th>
            <th>Total ({invoice.currency})</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{item.quantity * item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>
        Grand Total: {getTotal()} {invoice.currency}
      </h3>
    </div>
  );
}

export default App;
