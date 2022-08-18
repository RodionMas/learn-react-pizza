import React from "react";
import Categories from "../Components/Categories/Categories";
import Pizza from "../Components/Pizza/Pizza";
import Sort from "../Components/Sort/Sort";
import PizzaSkeleton from "../Components/Pizza/PizzaSkeleton";
import Pagination from "../Components/Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const [isFetching, setIsFetching] = React.useState(true);
  const [pizzas, setPizzas] = React.useState([]);
  //pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  //category
  const [category, setCategory] = React.useState(0);
  const [sort, setSort] = React.useState(0);

  //sort
  const [open, setOpen] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState({
    name: "популярности(DESC)",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setIsFetching(true);
    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "asc" : "desc";
    const categoryBy = category > 0 ? `category=${category}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    fetch(
      `https://62f6c299a3bce3eed7c7622d.mockapi.io/items?${categoryBy}&page=${currentPage}&limit=${6}&${search}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => {
        setIsFetching(false);
        return response.json();
      })
      .then((json) => {
        setPizzas(json);
        window.scrollTo(0, 0);
      });
  }, [category, activeSort, searchValue, currentPage]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            category={category}
            onClickCategory={(id) => setCategory(id)}
          />
          <Sort
            setOpen={setOpen}
            activeSort={activeSort}
            setActiveSort={setActiveSort}
            open={open}
            sort={sort}
            onClickSort={(index) => {
              setActiveSort(index);
              setOpen(false);
            }}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            // Не забыть поменять Math.random() на нормальный кей
            isFetching
              ? [...new Array(6)].map((el, index) => (
                  <PizzaSkeleton key={index} />
                ))
              : pizzas.map((el) => <Pizza key={Math.random()} {...el} />)
          }
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
};

export default Home;
