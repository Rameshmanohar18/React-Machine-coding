// ─────────────────────────────────────────────
// Q1 — EmployeeCard: Render employee in HTML template
// ─────────────────────────────────────────────
export default function EmployeeCard({ employee }) {
  if (!employee) return null;

  return (
    <div className='employee-card'>
      <div className='card-avatar'>
        {employee.name?.charAt(0).toUpperCase()}
      </div>
      <div className='card-body'>
        <h3 className='card-name'>{employee.name}</h3>
        <p className='card-meta'>
          <span className='label'>Email:</span> {employee.email}
        </p>
        <p className='card-meta'>
          <span className='label'>Phone:</span> {employee.phone}
        </p>
        <p className='card-meta'>
          <span className='label'>Company:</span> {employee.company?.name}
        </p>
        <p className='card-meta'>
          <span className='label'>City:</span> {employee.address?.city}
        </p>
      </div>
    </div>
  );
}
