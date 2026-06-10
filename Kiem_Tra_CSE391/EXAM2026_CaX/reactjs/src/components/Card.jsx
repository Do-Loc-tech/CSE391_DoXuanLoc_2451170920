export default function Card({ title, children, label }) {
  return (
    <section className="card">
      <div className="card-header">
        <h2>{title}</h2>
        {label ? <span className="card-label">{label}</span> : null}
      </div>
      <div className="card-body">{children}</div>
    </section>
  )
}
