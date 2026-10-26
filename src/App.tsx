import "./App.css";
import Header from "./components/shared/Header";
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
        </div>
    );
}

export default App;
