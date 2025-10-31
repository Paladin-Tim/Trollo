import { Input } from "antd";
import type { GetProps } from "antd";
import { useDispatch } from "react-redux";
import { searchBids } from "../../../redux/actions/search-bids";
import "./SearchBar.scss";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    dispatch(searchBids(value));
  };

  interface SearchChangeEvent {
    target: HTMLInputElement;
  }

  const handleSearchChange = ({ target }: SearchChangeEvent): void => {
    if (target.value === "") {
      dispatch(searchBids(""));
    }
  };

  return (
    <section className="header__search-bar">
      <Search
        placeholder="Поиск заявок"
        onSearch={(value) => onSearch(value)}
        onChange={handleSearchChange}
        enterButton
      />
    </section>
  );
};
