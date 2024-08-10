import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductPage.css";

const ProductPage = () => {
  // Retrieve the products from the Redux store
  const products = useSelector((state) => state.products);
  
  // Get the dispatch function to send actions
  const dispatch = useDispatch();

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-page-container">
      <h1>Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <span>{product.name}</span>
              <span> - R{product.price}</span>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
