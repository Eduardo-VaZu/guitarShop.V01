import { useState, useEffect } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import db from "./data/db";

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(initialCart());

  useEffect(() => {
    setData(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      const updatedCart = cart.map((guitar) => {
        if (guitar.id === item.id) {
          return { ...guitar, quantity: guitar.quantity + 1 };
        }
        return guitar;
      });
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id) {
        return { ...guitar, quantity: guitar.quantity + 1 };
      }
      return guitar;
    });
    return setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((guitar) => {
      if (guitar.id === id) {
        return { ...guitar, quantity: guitar.quantity - 1 };
      }
      return guitar;
    });

    const filteredCart = updatedCart.filter((guitar) => guitar.quantity > 0);

    return setCart(filteredCart);
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((guitar) => guitar.id !== id);
    return setCart(updatedCart);
  }

  function voidCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        voidCart={voidCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              //cart={cart}
              //setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
