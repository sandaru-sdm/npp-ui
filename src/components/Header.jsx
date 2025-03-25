import React from "react";

function Header() {
  return (
    <div>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom bg-light">
          <a
            href="/"
            className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
          >
          </a>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 link-secondary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 link-dark">
                About
              </a>
            </li>
          </ul>

          <div class="col-md-3 text-end">
            <button type="button" className="btn btn-outline-danger me-2">
              Logout
            </button>
          </div>
        </header>
      <div className="b-example-divider"></div>
    </div>
  );
}

export default Header;
