import { packages } from '../data/siteContent.js'

export default function Pricing({ onSelectPackage }) {
  return (
    <section className="section pricing" id="paquetes">
      <div className="section-heading">
        <h2>Paquetes</h2>
      </div>
      <div className="pricing-grid">
        {packages.map((item) => (
          <article className={`price-card${item.featured ? ' price-card--featured' : ''}`} key={item.name}>
            <h3>{item.name}</h3>
            <p className="price-card__price">{item.price}</p>
            <ul>
              {item.features.map((feature, index) => (
                <li className={item.name === 'Esencial' && index === 2 ? 'muted' : ''} key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              aria-label={`Seleccionar paquete ${item.name}`}
              className={`button ${item.featured ? 'button--dark' : 'button--outline'}`}
              onClick={() => onSelectPackage(item.name)}
              type="button"
            >Seleccionar</button>
          </article>
        ))}
      </div>
    </section>
  )
}
