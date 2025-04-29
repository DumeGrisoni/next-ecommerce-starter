import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Produits de la semaine</h1>
        <ProductList />
      </div>
      <div>
        <h1 className="text-2xl">Catégories</h1>
      </div>
      <div>
        <h1 className="text-2xl">Nouveautés</h1>
      </div>
    </div>
  );
};

export default HomePage;
