import { useState } from "react";

export function DepartmentForm({ onCadastrar, departments = [] }) {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const siglaLimpa = acronym.trim().toUpperCase();

    if (siglaLimpa.length < 2 || siglaLimpa.length > 5) {
      setErrorMsg("A sigla deve ter entre 2 e 5 letras.");
      return;
    }

    const siglaExiste = departments.some(
      (d) => d.acronym.toUpperCase() === siglaLimpa
    );
    if (siglaExiste) {
      setErrorMsg("Esta sigla já está em uso por outro departamento.");
      return;
    }

    setIsSubmitting(true);

    const newDepartment = {
      name: name.trim(),
      acronym: siglaLimpa,
    };

    await onCadastrar(newDepartment);

    setName("");
    setAcronym("");
    setIsSubmitting(false);
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h3 className="card-title h5 mb-3">Cadastrar Novo Departamento</h3>
      
      {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do Departamento:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ex: Marketing"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sigla:</label>
          <input
            type="text"
            className="form-control"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            required
            placeholder="Ex: MKT"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}