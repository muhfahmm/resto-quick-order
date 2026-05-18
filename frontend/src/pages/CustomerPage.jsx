import React, { useState, useEffect } from 'react';

const CustomerPage = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3005/api/menu`)
      .then(res => res.json())
      .then(data => {
        setMenus(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      {/* Modern Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.brand}>🍽️ QuickOrder</div>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>Home</a>
          <a href="#menu" style={styles.navLink}>Menu</a>
          <a href="/admin/login" style={styles.navLinkAdmin}>Admin Panel</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Delicious Food, Delivered Fast!</h1>
          <p style={styles.heroSubtitle}>Scan. Order. Enjoy. The best digital menu experience.</p>
          <a href="#menu" style={styles.heroButton}>View Menu</a>
        </div>
      </header>

      {/* Menu Section */}
      <main id="menu" style={styles.main}>
        <h2 style={styles.sectionTitle}>Our Menu</h2>
        {loading ? (
          <p style={styles.loadingText}>Loading delicious items...</p>
        ) : (
          <div style={styles.menuGrid}>
            {menus.length > 0 ? menus.map(menu => (
              <div key={menu.id} style={styles.menuCard}>
                {menu.image_url && <img src={menu.image_url} alt={menu.name} style={styles.menuImage} />}
                <div style={styles.cardHeader}>
                  <span style={styles.categoryBadge}>{menu.category_name}</span>
                  <span style={styles.priceTag}>${Number(menu.price).toFixed(2)}</span>
                </div>
                <h3 style={styles.menuName}>{menu.name}</h3>
                <p style={styles.menuDesc}>{menu.description || 'A delicious treat for your cravings.'}</p>
                <button style={styles.orderBtn}>Add to Cart</button>
              </div>
            )) : (
              <p style={styles.loadingText}>Menu is currently empty. Please check back later!</p>
            )}
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© 2026 Quick Order Restaurant. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Inter', sans-serif", backgroundColor: '#f9fafb', minHeight: '100vh', margin: 0 },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  brand: { fontSize: '1.5rem', fontWeight: 'bold', color: '#ff5722' },
  navLinks: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  navLink: { textDecoration: 'none', color: '#374151', fontWeight: '500', transition: 'color 0.2s' },
  navLinkAdmin: { textDecoration: 'none', color: '#ffffff', backgroundColor: '#374151', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '500', fontSize: '0.9rem' },
  hero: { height: '60vh', background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', position: 'relative' },
  heroOverlay: { padding: '2rem', zIndex: 1 },
  heroTitle: { fontSize: '3.5rem', margin: '0 0 1rem 0', fontWeight: '800', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 },
  heroButton: { padding: '1rem 2.5rem', backgroundColor: 'white', color: '#ff5722', textDecoration: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s' },
  main: { padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '2.5rem', textAlign: 'center', color: '#1f2937', marginBottom: '3rem' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
  menuCard: { backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' },
  menuImage: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  categoryBadge: { backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' },
  priceTag: { fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' },
  menuName: { fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#1f2937' },
  menuDesc: { color: '#6b7280', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 },
  orderBtn: { width: '100%', padding: '0.75rem', backgroundColor: '#ff5722', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' },
  loadingText: { textAlign: 'center', fontSize: '1.2rem', color: '#6b7280', gridColumn: '1 / -1' },
  footer: { textAlign: 'center', padding: '2rem', backgroundColor: '#1f2937', color: '#9ca3af' }
};

export default CustomerPage;
