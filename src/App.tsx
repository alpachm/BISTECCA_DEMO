import { useState } from "react";
import "./App.css";
import Header from "./components/shared/Header";
import Cart from "./components/shared/Cart";
import Footer from "./components/shared/Footer";
import Hero from "./components/Hero";
import Products from "./components/Products";

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-primary-text">
            <Header onCartOpen={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <Products />
            </main>
            <Footer />
            <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}

export default App;
