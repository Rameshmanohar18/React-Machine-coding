// ─── Apartment Card ───
export default function ApartmentCard({ apartment, index }) {
  return (
    <div
      className='apartment-card'
      style={{
        animationDelay: `${index * 60}ms`,
      }} /* dynamic value — must stay inline */
    >
      <div className='card-image-wrap'>
        <span className='card-emoji'>{apartment.image}</span>
        <div className='price-badge'>
          ${apartment.price.toLocaleString()}/mo
        </div>
      </div>
      <div className='card-body'>
        <h3 className='card-title'>{apartment.title}</h3>
        <p className='card-desc'>{apartment.description}</p>
        <div className='card-meta'>
          <span>🛏 {apartment.beds}</span>
          <span>🚿 {apartment.baths}</span>
          <span>📐 {apartment.sqft} ft²</span>
        </div>
      </div>
    </div>
  );
}
