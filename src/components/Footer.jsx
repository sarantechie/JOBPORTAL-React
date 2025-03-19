import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} JobPortal. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
