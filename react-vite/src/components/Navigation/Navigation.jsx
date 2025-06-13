import "./Navigation.css";
// import SplineBrain from '../SplineBrain/SplineBrain'
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

            {/* <SplineBrain className='brain'/> */}
    </div>
  );
}

export default Navigation;
