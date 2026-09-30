import { useFetch } from "./hooks/useFetch";
import { DepartmentForm } from "./components/DepartmentForm";
import { DepartmentList } from "./components/DepartmentList";

// Deteta automaticamente se está no Codespaces ou no computador local
const isCodespaces = window.location.hostname.includes("github.dev");

const URL_API = isCodespaces
  ? `https://${window.location.hostname.replace(/-\d+\.app\.github\.dev$/, "-3000.app.github.dev")}/departments`
  : "http://localhost:3000/departments";

function App() {
  const { data: departments, setData: setDepartments, loading } = useFetch(URL_API);

  const handleCadastrar = async (novoDep) => {
    try {
      const res = await fetch(URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoDep),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar no servidor");
      }

      const addedDepartment = await res.json();

      setDepartments((prev) => (prev ? [...prev, addedDepartment] : [addedDepartment]));
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Não foi possível conectar ao servidor backend.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "600px" }}>
      <header className="text-center mb-4">
        <h1 className="h3">Gestão de RH</h1>
        <p className="text-muted">Cadastro e Consulta de Departamentos</p>
      </header>

      <DepartmentForm
        onCadastrar={handleCadastrar}
        departments={departments || []}
      />

      <DepartmentList departments={departments} loading={loading} />
    </div>
  );
}

export default App;