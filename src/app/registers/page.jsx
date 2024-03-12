import RegisterTable from "app/components/RegisterTable";
import LayoutFrontal from "app/layout/LayoutFrontal";
import '../../styles/misEstilos.css';

const Registers = () => {
  return (
    <>
      <LayoutFrontal>
        <div className="main-registers-container">
          <h1 className="main-title ">REGISTROS</h1>
        </div>
        <RegisterTable />
      </LayoutFrontal>
    </>
  );
};

export default Registers;
