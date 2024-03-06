import logoImg from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="React food app logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart</button>
      </nav>
    </header>
  );
}
