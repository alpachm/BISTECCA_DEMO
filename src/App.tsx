import "./App.css";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Hero from "./components/Hero";
import Products from "./components/Products";

function App() {
    return (
        <div className="min-h-screen bg-background text-primary-text">
            <Header />
            <main>
                <Hero />
                <Products />
            </main>
            <Footer />
        </div>
    );
}

export default App;
