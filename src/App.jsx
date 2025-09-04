import React, { useState } from 'react'
items: [ { description: 'Cotton fabric', quantity: 100, unitPrice: 5 } ],
invoiceNo: `INV-${Date.now()}`,
date: new Date().toISOString().slice(0,10),
currency: 'USD'
}


const resp = await fetch('/api/invoice', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(invoice)
})


if(resp.ok){
const blob = await resp.blob()
const url = URL.createObjectURL(blob)
window.open(url)
}else{
alert('Invoice generation failed')
}
}


return (
<div className="app">
<aside className="sidebar">
<h2>Export Tools</h2>
<button onClick={generateInvoice}>Generate Sample Invoice</button>
<button onClick={()=>alert('Packing list demo — use the form in production')}>Generate Packing List</button>
<div className="workflow">
<h3>Workflow</h3>
<ol>
<li>IEC Registration</li>
<li>Export Invoice</li>
<li>Packing List</li>
<li>Customs Filing</li>
<li>Shipping</li>
</ol>
</div>
</aside>
<main className="chat">
<div className="messages">
{messages.filter(m=>m.role!=='system').map((m, i) => (
<div key={i} className={`msg ${m.role}`}>
<div className="role">{m.role}</div>
<div className="content">{m.content}</div>
</div>
))}
</div>


<div className="composer">
<input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendMessage()} placeholder="Ask about export process, or say 'generate invoice'"/>
<button onClick={sendMessage} disabled={loading}>{loading ? '...' : 'Send'}</button>
</div>
</main>
</div>
)
}