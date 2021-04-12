import React from "react";

const MenuHeader = () => {
  return (
    <div
      className="menu-header section-dark"
      style={{ backgroundImage: "url(" + require("assets/img/menu-header.jpg").default + ")" }}
    >
      <div className="filter" />
    </div>
  );
}

export default MenuHeader;
