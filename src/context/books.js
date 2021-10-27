import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { listBooks } from "../api/queries";
import { processOrder } from "../api/mutations";

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [bookImages, setBookImages] = useState([]);
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
      axios.get(`http://localhost:3200/images`).then((res) => {
        const bookImagesData = res.data;
        console.log(bookImagesData);
        setBookImages(bookImagesData);

        const books = [
          {
            id: "1",
            title: "The Twilight of the Idols and The Anti-Christ",
            price: "35",
            featured: true,
          },
          {
            id: "2",
            title: "Devotion Of Suspect X",
            author: "Keigo Higashino",
            price: "15",
            featured: true,
            description:
              "The Devotion of Suspect X is a 2005 novel by Keigo Higashino, the third in his Detective Galileo series and is his most acclaimed work thus far. The novel won him numerous awards, including the 134th Naoki Prize, which is a highly regarded award in Japan.",
          },
          {
            id: "3",
            title: "The Selfish Gene",
            price: "20",
            featured: true,
          },
        ];

        for (let i = 0; i < books.length; i++) {
          books[i]["image"] = "data:image/jpg;base64, " + bookImagesData[i];
        }
        const featured = books.filter((book) => {
          return !!book.featured;
        });
        setBooks(books);
        setFeatured(featured);
        setLoading(false);
      });
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
