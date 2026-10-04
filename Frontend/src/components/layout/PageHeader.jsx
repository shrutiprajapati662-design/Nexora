import { Link } from "react-router-dom";
import NexoraLogo from "../../assets/company/logo/nexora-logo.svg";

function PageHeader() {
  return (
    <header className="relative z-20 px-8 py-6">
      <Link
        to="/"
        className="flex w-fit items-center gap-3"
      >
        <img src={NexoraLogo} alt="Nexora" className="h-14 w-14 shrink-0" />

        <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
          Nexora
        </span>
      </Link>
    </header>
  );
}

export default PageHeader;