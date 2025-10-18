import { Input } from "antd";
import type { GetProps } from "antd";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

export const SearchBar = () => {
  return (
    <section className="header__search-bar">
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </section>
  );
};
