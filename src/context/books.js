import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { listBooks } from "../api/queries";
import { processOrder } from "../api/mutations";

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const checkout = async (orderDetails) => {
    const payload = {
      id: uuidv4(),
      ...orderDetails,
    };
    try {
      console.log("Order is successful");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = () => {
    try {
      setLoading(true);
      const books = [
        {
          id: "1",
          image:
            "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1312051518l/8686068.jpg",
          title: "Devotion Of Suspect X",
          author: "Keigo Higashino",
          price: "15",
          featured: true,
          description:
            "The Devotion of Suspect X is a 2005 novel by Keigo Higashino, the third in his Detective Galileo series and is his most acclaimed work thus far. The novel won him numerous awards, including the 134th Naoki Prize, which is a highly regarded award in Japan.",
        },
        {
          id: "2",
          image:
            "https://images-na.ssl-images-amazon.com/images/I/51wtgYMGroL._SX321_BO1,204,203,200_.jpg",
          title: "The Twilight of the Idols and The Anti-Christ",
          price: "35",
          featured: true,
        },
        {
          id: "3",
          image: "https://m.media-amazon.com/images/I/51iqpxo43PL.jpg",
          title: "The Selfish Gene",
          price: "20",
          featured: true,
        },
      ];
      const featured = books.filter((book) => {
        return !!book.featured;
      });
      setBooks(books);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookContext.Provider value={{ books, featured, loading, checkout }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
