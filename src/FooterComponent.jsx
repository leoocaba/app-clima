import React from "react";

export const FooterComponent = () => {
  const instagram = "https://instagram.com/leoocaba";

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center align-items-center">
        <p className="d-flex justify-content-center m-0 p-0">
          Hecho con ❤️ por{" "}
          <a
            className="d-flex d-inline p-0 m-0 mx-1"
            href={instagram}
            target="_blank"
          >
            @leoocaba
          </a>
        </p>
      </div>
    </footer>
  );
};
