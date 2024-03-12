"use client";

import { supabaseClient } from "app/database/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MenuNavbar() {
  //Aquí haremos el manejo de estado para poner un encabezado
  const [encabezado, setEncabezado] = useState("");

  /* Ejemplo de consumo de datos de supabase */
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabaseClient.from("colonias").select();
      setEncabezado(data[7].municipio);
      data;
    };
    fetch();
  });
  return (
    <Navbar expand="lg" className="custom-navbar">
      <div className="Navbar-Design">
        <Image src="/images/logo.jpg" alt="Gobierno" width={100} height={100} />
        <Navbar.Brand href="#home" className="titulo-menu">
          CENSO ACAPULCO OTIS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="menu-item">
              Inicio
            </Nav.Link>
            <Nav.Link href="/registers" className="menu-item">
              Registros
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    </Navbar>
  );
}

export default MenuNavbar;
