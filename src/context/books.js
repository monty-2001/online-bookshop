import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      axios.get(`http://localhost:3200/images`).then((res) => {
        const bookImagesData = res.data;

        const books = [
          {
            id: "1",
            title: "12 Rules Of Life",
            author: "Jordan Peterson",
            price: "27",
            featured: false,
            description:
              "An Antidote to Chaos is a 2018 self-help book by Canadian clinical psychologist and psychology professor Jordan Peterson.",
          },
          {
            id: "2",
            title: "The Twilight of the Idols and The Anti-Christ",
            price: "35",
            featured: false,
            description:
              "Nietzsche's Twilight of the Idols is a 'grand declaration of war' on reason, psychology and theology, which combines highly charged personal attacks on his contemporaries (in particular Hegel, Kant and Schopenhauer) with a lightning tour of his own philosophy",
          },
          {
            id: "3",
            title: "Devotion Of Suspect X",
            author: "Keigo Higashino",
            price: "15",
            featured: true,
            description:
              "The Devotion of Suspect X is a 2005 novel by Keigo Higashino, the third in his Detective Galileo series and is his most acclaimed work thus far. The novel won him numerous awards, including the 134th Naoki Prize, which is a highly regarded award in Japan.",
          },
          {
            id: "4",
            title: "Don Quixote",
            price: "20",
            featured: false,
            description:
              "Don Quixote has become so entranced by reading romances of chivalry that he determines to become a knight errant and pursue bold adventures, accompanied by his squire, the cunning Sancho Panza. As they roam the world together, the aging Quixote's fancy leads them wildly astray, tilting at windmills, fighting with friars, and distorting the rural Spanish landscape into a fantasy of impenetrable fortresses and wicked sorcerers. At the same time the relationship between the two men grows in fascinating subtlety. Often considered to be the first modern novel, Don Quixote is a wonderful burlesque of the popular literature its disordered protagonist is obsessed with.",
          },
          {
            id: "5",
            title: "Either/Or",
            author: "kierkagaard Soren",
            price: "36",
            featured: false,
            description:
              "A masterpiece of duality, Either/Or is a brilliant exploration of the conflict between the aesthetic and the ethical - both meditating ironically and seductively upon Epicurean pleasures, and eloquently expounding the noble virtues of a morally upstanding life.",
          },
          {
            id: "6",
            title: "The God Equation",
            author: "Michio Kaku",
            price: "18",
            featured: false,
            description:
              "Kaku also explains the intense controversy swirling around this theory, with Nobel laureates taking opposite sides on this vital question. It is a captivating, gripping story; what’s at stake is nothing less than our conception of the universe.",
          },
          {
            id: "7",
            title: "Midnight's Children",
            author: "Salman Rushdie",
            price: "47",
            featured: true,
            description:
              "'Midnight’s Children’ by the renowned author Sulman Rushdie is an epic novel that opens up with a child being born at midnight on 15th August, 1947, just at a time when India is achieving Independence from centuries of foreign British colonial rule.",
          },
          {
            id: "8",
            title: "The Selfish Gene",
            author: "Richard Dawkins",
            price: "54",
            featured: true,
            description:
              "As influential today as when it was first published, The Selfish Gene has become a classic exposition of evolutionary thought. Professor Dawkins articulates a gene's eye view of evolution - a view giving center stage to these persistent units of information and in which organisms can be seen as vehicles for their replication.",
          },
          {
            id: "9",
            title: "Song Of Achilles",
            author: "Madeline Miller",
            price: "29",
            featured: false,
            description:
              "Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper - despite the displeasure of achilles's mother thetis, a cruel sea goddess. But when word comes that Helen of Sparta has been kidnapped, Achilles must go to war in distant Troy and fulfil his destiny. Torn between love and fear for his friend, Patroclus goes with him, little knowing that the years that follow will test everything they hold dear.",
          },
          {
            id: "10",
            title: "Stranger",
            author: "Albert Camus",
            price: "9",
            featured: false,
            description:
              "The classic literary masterpiece The Stranger (Vintage International) is a story about an Algerian, Meursault, the titular character who commits a murder after attending his mother’s funeral. His understanding of the world, his emotional spectrum, and the general absurdities of the time all combine to form a compelling read",
          },
          {
            id: "11",
            title: "War And Peace",
            author: "Leo Tolstoy",
            price: "19",
            featured: true,
            description:
              "An explosive tale of epic proportions, War and Peace, one of the best known Russian historical novels, is as much a story of love and adultery as it is of war and death. with a deep insight into the war-stricken Russia, it underlines the irrational motives of human behavior in both war and peace.",
          },
          {
            id: "12",
            title: "Zen Mind, Beginner's Mind",
            author: "Shunryu Suzuki",
            price: "50",
            featured: false,
            description:
              "So begins this most beloved of all American Zen books. Seldom has such a small handful of words provided a teaching as rich as has this famous opening line. In a single stroke, the simple sentence cuts through the pervasive tendency students have of getting so close to Zen as to completely miss what it's all about. It is an instant teaching on the first page--and that's just the beginning.",
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
