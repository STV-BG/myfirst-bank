import "./App.css";
function App() {
  return (
    <div className="bank-page">
      {" "}
      <div className="bank-card">
        {" "}
        <div className="bank-icon">✌️🔧🧱🏗️🏦💲💵🪙💰</div> <h1>MyFirst Bank</h1>{" "}
        <h2>Aplikacija je u izgradnji</h2>{" "}
        <p> Naša nova bankarska aplikacija je trenutno u razvoju. </p>{" "}
        <p>
          {" "}
          Uskoro ćete moći da upravljate svojim računima, transakcijama i drugim
          bankarskim uslugama.
        </p>{" "}
        <div className="status">
          {" "}
          <span className="status-dot"></span> Projekat u razvoju{" "}
        </div>{" "}
        <footer>© 2026 MyFirst Bank</footer>{" "}
      </div>{" "}
    </div>
  );
}
export default App;
