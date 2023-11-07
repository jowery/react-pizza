import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PizzaBlock from '../components/PizzaBlock';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { SearchContext } from '../App';

function Home() {
  const category = useSelector((state) => state.category.value);
  const sort = useSelector((state) => state.sort.value);
  const { search } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const sorts = ['rating', 'price', 'title'];

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://6548b571dd8ebcd4ab236f45.mockapi.io/items?category=${
        category > 0 ? category : ''
      }&sortBy=${sorts[sort]}&order=asc&title=${search ? search : ''}`
    )
      .then((response) => response.json())
      .then((json) => setPizzas(json))
      .finally(() => setLoading(false));
  }, [category, sort, search]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {!loading
          ? pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)
          : [...new Array(10)].map((_, index) => <Placeholder key={index} />)}
      </div>
    </>
  );
}

export default Home;
