import MenuNavbar from "app/components/MenuNavbar";

const LayoutFrontal = ({ children }) => {
  return (
    <>
      <MenuNavbar />
      <div className="container">{children}</div>
    </>
  );
};

export default LayoutFrontal;
