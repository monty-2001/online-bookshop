import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";
import { useAuth0 } from "@auth0/auth0-react";

const BookDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { books } = useContext(BookContext);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth0();

  const bookFound = books.find((book) => {
    return book.id === id;
  });
  if (!bookFound) {
    return <h3>Loading...</h3>;
  }

  const { image: url, title, description, author, price } = bookFound;

  if (isAuthenticated) {
    return (
      <section className="book-details">
        <div className="detail-image">
          <img src={url} alt="10x Rule" />
        </div>
        <div className="detail-description">
          <h2>{title}</h2>
          <p>{description}</p>
          <h3>{author}</h3>
          <h4>Price - $ {price}</h4>
          <button
            className="btn"
            onClick={() => {
              addToCart({ ...bookFound, id });
              history.push("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="book-details">
      <div className="detail-image">
        <img src={url} alt="10x Rule" />
      </div>
      <div className="detail-description">
        <h2>{title}</h2>
        <p>{description}</p>
        <h3>{author}</h3>
        <h4>Price - $ {price}</h4>
        <button
          className="btn"
          onClick={() => {
            alert("Sign up for adding to cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
};

export default BookDetails;
