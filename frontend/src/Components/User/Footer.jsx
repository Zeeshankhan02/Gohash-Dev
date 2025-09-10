import React from "react";

function Footer() {
  return (
    <footer className="bg-danger text-light text-center py-4 mt-5">
      <div className="container">
        <h5 className="fw-bold mb-2">Gohash Gulbarga</h5>
        <p className="mb-1">© 2025 All rights reserved.</p>
        <p className="mb-0">
          Follow us on{" "}
          <a href="#" className="text-light text-decoration-none mx-1">Facebook</a> |{" "}
          <a href="#" className="text-light text-decoration-none mx-1">Instagram</a> |{" "}
          <a href="#" className="text-light text-decoration-none mx-1">Twitter</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
