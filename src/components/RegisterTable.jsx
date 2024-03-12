"use client";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { supabaseClient } from "app/database/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterTable = () => {
  const [registers, setRegisters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRegisters = async () => {
      const { data, error } = await supabaseClient.from("usuarios").select("*");

      if (error) {
        console.error("Error cargando los registros:", error);
      } else {
        setRegisters(data);

        if (!data) {
          console.error("No hay registros");
        }
      }
    };

    fetchRegisters();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabaseClient
        .from("usuarios")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      setRegisters((prevRegisters) =>
        prevRegisters.filter((register) => register.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el registro:", error.message);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">CURP</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Email</th>
            <th scope="col">Fecha de nacimiento</th>
            <th scope="col">Sexo</th>
            <th scope="col">Dirección</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registers.map((register, index) => (
            <tr key={register.id}>
              <th scope="row">{index + 1}</th>
              <td>{register.name}</td>
              <td>{register.curp}</td>
              <td>{register.phone_number}</td>
              <td>{register.email}</td>
              <td>{register.birthdate}</td>
              <td>{register.sex}</td>
              <td>{register.address}</td>
              <td>
                {/* Botón para eliminar */}
                <button
                  className="ToggleBtn ToggleBtnDelete"
                  onClick={() => handleDelete(register.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="ToggleBtn"
                  onClick={() => router.push(`/updated/${register.id}`)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RegisterTable;
