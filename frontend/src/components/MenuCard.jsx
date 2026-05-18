import React from 'react';

export default function MenuCard({ item, onAdd }) {
  return (
    <div className="menu-card">
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      <span>Rp {item.price.toLocaleString('id-ID')}</span>
      <button onClick={() => onAdd(item)}>Tambah</button>
    </div>
  );
}
