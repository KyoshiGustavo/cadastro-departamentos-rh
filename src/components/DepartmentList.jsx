export function DepartmentList({ departments, loading }) {
  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Carregando departamentos...</p>
      </div>
    );
  }

  return (
    <div className="card p-3 shadow-sm">
      <h3 className="card-title h5 mb-3">Departamentos Cadastrados</h3>
      {!departments || departments.length === 0 ? (
        <p className="text-muted">Nenhum departamento cadastrado.</p>
      ) : (
        <ul className="list-group">
          {departments.map((dep) => (
            <li
              key={dep.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{dep.name}</span>
              <span className="badge bg-secondary rounded-pill">
                {dep.acronym}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}