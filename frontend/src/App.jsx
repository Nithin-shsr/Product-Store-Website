import NavBar from "./components/NavBar.jsx"
import Homepage from "./pages/HomePage.jsx"
import ProductPages from "./pages/ProductPage.jsx"

import { Routes, Route } from "react-router-dom"
function App() {
    return (
        <div className="min-h-screen bg-base-200 transition-colors duration-300">
            <NavBar/>

            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/product/:id" element={<ProductPages/>}/>
            </Routes>
        </div>
    )
}

export default App
