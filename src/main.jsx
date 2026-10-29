import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, MapPin, Menu, X } from 'lucide-react';
import './styles.css';

const address = 'Harbor Quarter, Boston, MA (fictional location)';
const directions = 'https://www.google.com/maps/search/?api=1&query=Morrow+Creamery+Harbor+Quarter+Boston+fictional+demo';
const storyLink = '#story';
const images = {
  hero: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1500&q=88',
  storefront: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1500&q=88',
  shop: 'https://images.unsplash.com/photo-1501446529957-6226bd447c46?auto=format&fit=crop&w=1200&q=88',
  taro: 'https://images.unsplash.com/photo-1544419716-beb1a615c494?auto=format&fit=crop&w=1100&q=85',
  matcha: 'https://images.unsplash.com/photo-1747092485234-ab75ab29040f?auto=format&fit=crop&w=1100&q=85',
  pistachio: 'https://images.unsplash.com/photo-1707553851664-5985b32734c0?auto=format&fit=crop&w=1100&q=85',
  lavender: 'https://images.unsplash.com/photo-1657673986058-da7b608df229?auto=format&fit=crop&w=1100&q=85',
  oreo: 'https://images.unsplash.com/photo-1533072561526-0d9ee358c8bc?auto=format&fit=crop&w=1100&q=85',
};

const flavors = [
  { name: 'Taro Cloud', tone: 'lilac', image: images.taro },
  { name: 'Matcha Lemon Cream', tone: 'matcha', image: images.matcha },
  { name: 'Pistachio Praline', tone: 'pistachio', image: images.pistachio },
  { name: 'Blueberry Basil Ripple', tone: 'lavender', image: images.lavender },
  { name: 'Malted Cookie Crunch', tone: 'chocolate', image: images.oreo },
];

function Wordmark() {
  return <a className="wordmark" href="#top" aria-label="Morrow Creamery home"><span>MORROW<br /><b>CREAMERY</b></span></a>;
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
        <div className="hero-copy" data-reveal><p className="hero-location">Boston’s Harbor Quarter · Fictional creamery concept</p><h1 id="hero-title">A little<br /><em>wonder</em> on<br />Harbor Lane.</h1><p className="hero-intro">Color, curiosity, and a cold scoop around the corner.</p><div className="hero-actions"><a className="button button-green" href="#scoops">Our flavors showcase <ArrowRight size={18}/></a><a className="quiet-link" href={directions} target="_blank" rel="noreferrer"><MapPin size={16}/> Get directions</a></div></div>
        <div className="hero-art" data-reveal><div className="hero-image-frame"><img src={images.hero} alt="A bowl of colorful ice cream scoops" fetchPriority="high"/></div><div className="hero-caption"><span>HOMEMADE ICE CREAM</span><span>HARBOR QUARTER, BOSTON</span></div></div>
      </section>

      <section className="flavor-section" id="scoops">
        <div className="flavor-top" data-reveal><h2>Not your<br/>usual <em>scoop.</em></h2><div className="flavor-intro"><p>A few of the flavors that make this little counter worth a closer look.</p><p className="availability">Flavors can rotate. Ask what’s in the case today.</p></div></div>
        <div className="flavor-feature" data-reveal><div className="flavor-photo" key={flavor.name}><img src={flavor.image} alt={`${flavor.name} ice cream`} loading="lazy"/></div><div className="flavor-detail"><h3 key={flavor.name + '-heading'}>{flavor.name}</h3><div className="flavor-controls" role="group" aria-label="Choose a featured flavor">{flavors.map((item, i) => <button key={item.name} aria-label={`Show ${item.name}`} aria-pressed={i === flavorIndex} className={i === flavorIndex ? 'active' : ''} onClick={() => setFlavorIndex(i)}>{item.name}</button>)}</div><a className="text-arrow" href={storyLink}>Our story <ArrowUpRight size={16}/></a></div></div>
      </section>

      <section className="neighborhood" id="story"><div className="neighborhood-photo" data-reveal><img src={images.storefront} alt="Morrow Creamery counter" loading="lazy"/></div><div className="neighborhood-copy" data-reveal><h2>One stop<br />on a <em>longer walk.</em></h2><p className="neighborhood-lead">A neighborhood scoop window in the fictional Harbor Quarter, inspired by Boston’s walkable streets.</p><p>Small-batch ice cream and colorful candy, made for a slow walk along the harbor.</p><a className="button button-outline" href={directions} target="_blank" rel="noreferrer">See the neighborhood <ArrowUpRight size={17}/></a></div></section>

      <section className="visit-section" id="visit"><div className="visit-header" data-reveal><h2>Right in the<br/><em>middle of it.</em></h2><p>Make Morrow Creamery one sweet stop on a Harbor Quarter wander.</p></div><a className="map-card" href={directions} target="_blank" rel="noreferrer" aria-label={`View the fictional location in ${address}`} data-reveal><div className="map-grid" aria-hidden="true"><span className="street street-one">HARBOR LN</span><span className="street street-two">ALDER ROW</span><span className="street street-three">FERRY WALK</span><span className="map-pin"><MapPin size={25} fill="currentColor"/></span><span className="map-label">HARBOR QUARTER<br/>BOSTON</span></div><div className="map-card-footer"><span><strong>Harbor Quarter<br/>Boston, MA</strong></span><span className="map-cta">Open in Maps <ArrowUpRight size={18}/></span></div></a></section>

      <section className="closing-band"><div className="closing-image" data-reveal><img src={images.shop} alt="Inside Morrow Creamery" loading="lazy"/></div><div className="closing-copy" data-reveal><h2>Follow the<br/>sweet spot.</h2><a className="button button-cream" href={directions} target="_blank" rel="noreferrer">Find us in the Harbor Quarter <ArrowRight size={18}/></a><p>Fictional demo location · Hours and flavors are illustrative.</p></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><Wordmark/><p>Morrow Creamery<br/>Harbor Quarter<br/>Boston, MA</p><div className="footer-links"><a href="#scoops">Flavors</a><a href="#story">Our story</a><a href={directions} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={14}/></a></div><span className="footer-tag">A FICTIONAL<br/>NEIGHBORHOOD SCOOP.</span></div><div className="footer-bottom"><span>Fictional creamery concept · Location and menu are illustrative.</span></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
