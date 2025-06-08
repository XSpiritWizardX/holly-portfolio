import "./Navigation.css";
function Navigation() {
  return (
    <div
    className="navigation"
    >
            <a
            className="nav-link"
            href="/" >
              Home
            </a>
            <a
            className="nav-link"
            href="/about" >
              About Me
            </a>
            <a
            className="nav-link"
            href="/portfolio" >
              Portfolio
            </a>
            <a
            className="nav-link"
            href="/services" >
              Services
            </a>
            <a
            className="nav-link"
            href="/contact" >
              Contact
            </a>
            <a
            className="nav-link"
            href="/games" >
              Fun Icebreaker Game
            </a>
    </div>
  );
}

export default Navigation;
