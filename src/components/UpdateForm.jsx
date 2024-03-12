import { supabaseClient } from "app/database/supabase";
import Link from 'next/link';
import { useEffect, useState } from "react";

const UpdateForm = ({ id }) => {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [curp, setCurp] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchRegisterDetails = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("usuarios")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setName(data.name || "");
        setLastName(data.last_name || "");
        setCurp(data.curp || "");
        setPhoneNumber(data.phone_number || "");
        setEmail(data.email || "");
        setBirthdate(data.birthdate || "");
        setSex(data.sex || "");
        setSelectedAddress(data.address || "");
      } catch (error) {
        console.error("Error al cargar los detalles del registro:", error.message);
      }
    };

    if (id) {
      fetchRegisterDetails();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabaseClient
        .from("usuarios")
        .update({
          name,
          last_name,
          curp,
          phone_number,
          email,
          birthdate,
          sex,
          address: selectedAddress,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      console.log("Registro actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el registro:", error.message);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data, error } = await supabaseClient.from("colonias").select("*");

        if (error) {
          throw error;
        }

        setAddress(data || []);
      } catch (error) {
        console.error("Error al cargar las direcciones:", error.message);
      }
    };

    fetchAddress();
  }, []);

  return (
    <>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Apellidos:</label>
          <input type="text" id="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="curp">CURP:</label>
          <input type="text" id="curp" value={curp} onChange={(e) => setCurp(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Teléfono:</label>
          <input type="text" id="phone_number" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input type="date" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="form-control input-md" />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Sexo:</label>
          <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)} className="form-control">
            <option value="">Seleccione...</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <select id="address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} className="form-control">
            {address.map((address) => (
              <option key={address.id} value={address.id}>
                {address.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="SubmitButton">Actualizar</button>
        {/* Enlace para volver */}
        <Link href="/registers">Volver a la lista de registros</Link>
      </form>
    </>
  );
}

export default UpdateForm;
