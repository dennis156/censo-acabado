"use client";
import { supabaseClient } from "app/database/supabase";
import { useEffect, useState } from "react";

const Form = () => {
  /* Vamos a manejar las variables de nuestro formulario */
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [curp, setCurp] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState([]);
  const [addressPerson, setAddressPerson] = useState("");

  /* Creamos funcion para mandar datos del formulario */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabaseClient.from("usuarios").insert([
        {
          name: name,
          last_name: last_name,
          curp: curp,
          phone_number: phone_number,
          email: email,
          birthdate: birthdate,
          sex: sex,
          address: addressPerson,
        },
      ]);

      if (error) {
        console.error("Error al insertar datos:", error.message);
      } else {
        console.log("Datos insertados correctamente:", data);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error.message);
    } finally {
      // Limpiar el formulario después de enviar los datos
      setName("");
      setLastName("");
      setCurp("");
      setPhoneNumber("");
      setEmail("");
      setBirthdate("");
      setSex("");
      setAddressPerson("");
      setAddress([]); // Limpiar el estado de address
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const { data, error } = await supabaseClient.from("colonias").select("*");
      setAddress(data);
    };

    fetchAddress();
  }, []);

  /*
  TAREA
  - Mandar los formuarios a nuestra base de datos
  - Investigar los tipos de campos del formulario correctos
  - En el campo y el campo dirección, mandar a traer información con useEffect
  */

  return (
    <>
      <form className="form-horizontal">
       
          {/* Form Name */}
          <legend>Registro de personas</legend>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="name">
              Nombre
            </label>
            <div className="">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nombre aquí"
                value={name}
                className="form-control input-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="last_name">
              Apellidos
            </label>
            <div className="">
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Apellidos aquí"
                value={last_name}
                className="form-control input-md"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="curpo">
              CURP
            </label>
            <div className="">
              <input
                id="curp"
                name="curp"
                type="text"
                placeholder="CURP (18)"
                value={curp}
                className="form-control input-md"
                onChange={(e) => setCurp(e.target.value)}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="phone_number">
              Teléfono
            </label>
            <div className="">
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                value={phone_number}
                placeholder="Teléfono"
                className="form-control input-md"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="email">
              Correo
            </label>
            <div className="">
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                placeholder="email@email.com"
                className="form-control input-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="control-label" htmlFor="birthdate">
              Fecha de Nacimiento
            </label>
            <div className="">
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                value={birthdate}
                placeholder="dd/mm/yyyy"
                className="form-control input-md"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
          </div>
          {/* Select Basic */}
          <div className="form-group">
            <label className="control-label" htmlFor="sex">
              Sexo
            </label>
            <div className="">
              <select
                id="sex"
                name="sex"
                className="form-control"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Seleccione...</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
          </div>
          {/* Select Basic */}
          <div className="form-group">
            <label className="control-label" htmlFor="address">
              Dirección
            </label>
            <div className="">
              <select
                id="address"
                name="address"
                value={address}
                className="form-control"
                onChange={(e) => setAddressPerson(e.target.value)}
              >
                {address.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
      
        <button className="SubmitButton" onClick={handleSubmit}>Enviar</button>
      </form>
    </>
  );
};

export default Form;
