import React from "react";

export const HeaderComponent = () => {
  const title = "Nuestro Clima";

  return (
    <header className="bg-dark text-white w-100">
      <div className="container-fluid">
        <h1 className="text-uppercase fs-3 m-auto p-3"> {title} </h1>
      </div>
    </header>
  );
};
