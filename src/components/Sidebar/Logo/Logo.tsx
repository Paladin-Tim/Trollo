import { Link } from "react-router-dom";
import "./Logo.scss";

export const Logo = () => {
  return (
    <Link to="/">
      <section className="logo"></section>
    </Link>
  );
};
