const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm">
      <p>
        Happy Easter! 🐰 {new Date().getFullYear()}
      </p>
      <p className="mt-1">
        This is a fun educational project tracking the Easter Bunny's imaginary journey.
      </p>
    </footer>
  );
};

export default Footer;