import { useState } from "react";
import "./App.css";
import Header from "./components/shared/Header";
import Cart from "./components/shared/Cart";
import FloatingButtons from "./components/shared/FloatingButtons";
import FlashOfferModal from "./components/shared/FlashOfferModal";
import Footer from "./components/shared/Footer";
import Hero from "./components/Hero";
import Products from "./components/Products";

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-primary-text">
            <FloatingButtons />
            <Header onCartOpen={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <Products />
            </main>
            <Footer />
            <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <FlashOfferModal />
        </div>
    );
}

export default App;
