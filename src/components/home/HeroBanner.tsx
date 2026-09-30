import heroImg from '../../assets/hero.png'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

export function HeroBanner() {
  return (
    <div className="hero-section">
      <div className="hero-logos">
        <img
          src={heroImg}
          className="base-hero"
          width="140"
          height="147"
          alt="Hero background"
        />
        <img src={reactLogo} className="framework-logo" alt="React logo" />
        <img src={viteLogo} className="vite-logo" alt="Vite logo" />
      </div>
      <h1 className="page-title">Angular to React Lab</h1>
      <p className="page-subtitle">
        A dedicated interactive learning workspace designed for Angular developers mastering modern React patterns, hooks, and routing architecture.
      </p>
    </div>
  )
}
