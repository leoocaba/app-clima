import React from "react";

export const HeaderComponent = () => {
  return (
    <header className="bg-dark text-white w-100">
      <div className="container-fluid">
        <div className="row m-0 p-0">
          <div className="d-flex align-content-center justify-content p-0 m-0">
            <div className="col my-auto py-1">
              <h1 className="m-0 p-1">Nuestro Clima</h1>
            </div>
            <div className="col py-1">
              <img
                className="p-1"
                src="src\assets\icon.png"
                alt="Nuestro clima"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
