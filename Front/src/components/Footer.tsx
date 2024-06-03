import Terms from "./Terms";

const Footer = () => {
  return (
    <footer className="bg-[#FF9F00] py-5 -mb-8 w-full">
      <div className="mt-8 text-center">
        <p className="text-[#010101]">
          2024 &copy; MascoCuidado. Todos los derechos reservados.
        </p>
        <p className="text-[#010101] font-thin">No-Country | c17-11-t</p>
        <Terms />
      </div>
    </footer>
  );
};

export default Footer;
