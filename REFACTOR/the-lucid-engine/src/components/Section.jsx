import React, { useState } from 'react'

export default function Section({ title, text }) {
    const [open, setOpen] = useState(false)
    return (
        <section className="section">
            <button className="section-title" onClick={() => setOpen(!open)} title="Click to expand/collapse">
                {title}
            </button>
            {open && <p className="section-content">{text}</p>}
        </section>
    )
}
