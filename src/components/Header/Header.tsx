import { SearchBar } from "./SearchBar";
import { ControlPanel } from "../ControlPanel";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <SearchBar />
      <ControlPanel />
    </header>
  );
};
