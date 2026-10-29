import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, MapPin, Menu, X } from 'lucide-react';
import './styles.css';

const address = '121 Salem Street, Boston, MA 02113';
const directions = 'https://www.google.com/maps/search/?api=1&query=North+End+Creamery+121+Salem+Street+Boston+MA+02113';
const reviews = 'https://www.yelp.com/biz/north-end-creamery-boston';
const images = {
  hero: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1500&q=88',
  storefront: 'https://images.squarespace-cdn.com/content/v1/65ee6a71c4f0f556c7e2c247/da004608-3e0a-4eba-aa72-bcd7861f3515/North-End-Ice-Cream.jpg?format=1500w',
  shop: 'https://images.squarespace-cdn.com/content/v1/65ee6a71c4f0f556c7e2c247/bd6be321-ae77-46b4-8c14-6b4d1793dccb/The-North-End-Creamery.jpg?format=1200w',
  taro: 'https://images.unsplash.com/photo-1544419716-beb1a615c494?auto=format&fit=crop&w=1100&q=85',
  matcha: 'https://images.unsplash.com/photo-1747092485234-ab75ab29040f?auto=format&fit=crop&w=1100&q=85',
  pistachio: 'https://images.unsplash.com/photo-1707553851664-5985b32734c0?auto=format&fit=crop&w=1100&q=85',
  lavender: 'https://images.unsplash.com/photo-1657673986058-da7b608df229?auto=format&fit=crop&w=1100&q=85',
  oreo: 'https://images.unsplash.com/photo-1533072561526-0d9ee358c8bc?auto=format&fit=crop&w=1100&q=85',
};

const flavors = [
  { name: 'Taro', tone: 'lilac', image: images.taro },
  { name: 'Ginger Matcha', tone: 'matcha', image: images.matcha },
  { name: 'Pistachio Port Wine', tone: 'pistachio', image: images.pistachio },
  { name: 'Vegan Honey Lavender', tone: 'lavender', image: images.lavender },
  { name: 'Chocolate-Covered Oreo', tone: 'chocolate', image: images.oreo },
];

function Wordmark() {
  return <a className="wordmark" href="#top" aria-label="North End Creamery home"><span>NORTH END<br /><b>CREAMERY</b></span></a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flavorIndex, setFlavorIndex] = useState(0);
  const flavor = flavors[flavorIndex];
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <>
    <header className="site-header" id="top">
      <div className="nav-shell"><Wordmark /><nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><a href="#scoops" onClick={closeMenu}>The scoops</a><a href="#story" onClick={closeMenu}>Our story</a><a href="#visit" onClick={closeMenu}>Find us</a><a className="nav-visit" href={directions} target="_blank" rel="noreferrer" onClick={closeMenu}>Get directions <ArrowUpRight size={16}/></a></nav><button className="mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal><p className="hero-location">Boston’s North End · 121 Salem Street</p><h1 id="hero-title">A little<br /><em>wonder</em> on<br />Salem Street.</h1><p className="hero-intro">Color, curiosity, and a cold scoop around the corner.</p><div className="hero-actions"><a className="button button-green" href="#scoops">Our flavors showcase <ArrowRight size={18}/></a><a className="quiet-link" href={directions} target="_blank" rel="noreferrer"><MapPin size={16}/> Get directions</a></div></div>
        <div className="hero-art" data-reveal><div className="hero-image-frame"><img src={images.hero} alt="A bowl of colorful ice cream scoops" fetchPriority="high"/></div><div className="hero-caption"><span>HOMEMADE ICE CREAM</span><span>NORTH END, BOSTON</span></div></div>
      </section>

      <section className="flavor-section" id="scoops">
        <div className="flavor-top" data-reveal><h2>Not your<br/>usual <em>scoop.</em></h2><div className="flavor-intro"><p>A few of the flavors that make this little counter worth a closer look.</p><p className="availability">Flavors can rotate. Ask what’s in the case today.</p></div></div>
        <div className="flavor-feature" data-reveal><div className="flavor-photo" key={flavor.name}><img src={flavor.image} alt={`${flavor.name} ice cream`} loading="lazy"/></div><div className="flavor-detail"><h3 key={flavor.name + '-heading'}>{flavor.name}</h3><div className="flavor-controls" role="group" aria-label="Choose a featured flavor">{flavors.map((item, i) => <button key={item.name} aria-label={`Show ${item.name}`} aria-pressed={i === flavorIndex} className={i === flavorIndex ? 'active' : ''} onClick={() => setFlavorIndex(i)}>{item.name}</button>)}</div><a className="text-arrow" href={reviews} target="_blank" rel="noreferrer">Reviews <ArrowUpRight size={16}/></a></div></div>
      </section>

      <section className="neighborhood" id="story"><div className="neighborhood-photo" data-reveal><img src={images.storefront} alt="North End Creamery storefront" loading="lazy"/></div><div className="neighborhood-copy" data-reveal><h2>One stop<br />on a <em>longer walk.</em></h2><p className="neighborhood-lead">A neighborhood scoop window on Salem Street, in the middle of one of Boston’s most walkable corners.</p><p>Homemade ice cream, colorful candy, and a sweet stop along your North End walk.</p><a className="button button-outline" href={directions} target="_blank" rel="noreferrer">See the neighborhood <ArrowUpRight size={17}/></a></div></section>

      <section className="visit-section" id="visit"><div className="visit-header" data-reveal><h2>Right in the<br/><em>middle of it.</em></h2><p>Make North End Creamery one sweet stop on a Salem Street wander.</p></div><a className="map-card" href={directions} target="_blank" rel="noreferrer" aria-label={`Get directions to ${address}`} data-reveal><div className="map-grid" aria-hidden="true"><span className="street street-one">SALEM ST</span><span className="street street-two">NORTH ST</span><span className="street street-three">PRINCE ST</span><span className="map-pin"><MapPin size={25} fill="currentColor"/></span><span className="map-label">NORTH END<br/>BOSTON</span></div><div className="map-card-footer"><span><strong>121 Salem Street<br/>Boston, MA 02113</strong></span><span className="map-cta">Open in Maps <ArrowUpRight size={18}/></span></div></a></section>

      <section className="closing-band"><div className="closing-image" data-reveal><img src={images.shop} alt="Inside North End Creamery" loading="lazy"/></div><div className="closing-copy" data-reveal><h2>Follow the<br/>sweet spot.</h2><a className="button button-cream" href={directions} target="_blank" rel="noreferrer">Head to Salem Street <ArrowRight size={18}/></a><p>Hours and flavors may change. Check before visiting.</p></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><Wordmark/><p>North End Creamery<br/>121 Salem Street<br/>Boston, MA 02113</p><div className="footer-links"><a href="#scoops">Flavors</a><a href="#story">Our story</a><a href={directions} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={14}/></a></div><span className="footer-tag">A SWEET LITTLE<br/>NORTH END STOP.</span></div><div className="footer-bottom"><span>Independent redesign concept · Confirm current hours and flavors with the shop.</span></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
