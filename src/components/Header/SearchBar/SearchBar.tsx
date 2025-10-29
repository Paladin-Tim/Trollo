import { Input } from "antd";
import type { GetProps } from "antd";
import { useDispatch } from "react-redux";
import { searchBids } from "../../../redux/actions/search-bids";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

export const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    dispatch(searchBids(value));
  };

  const handleSearchchange = ({ target }) => {
    if (target.value === "") {
      dispatch(searchBids(""));
    }
  };

  return (
    <section className="header__search-bar">
      <Search
        placeholder="Поиск заявок"
        onSearch={(value) => onSearch(value)}
        onChange={handleSearchchange}
        enterButton
      />
    </section>
  );
};
