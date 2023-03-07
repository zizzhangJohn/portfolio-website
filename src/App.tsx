import { useState } from "react"
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Tech from "./Components/Tech";
import Projects from "./Components/Projects";
import Contact from "./Components/Contact";
function App() {
  const [darkMode, setDarkMode] = useState(true);
  const sectionScrollIds = [
    "home", "tech", "projects", "contact"
  ]
  return (
    <div data-theme={`${darkMode ? "dracula" : "emerald"}`}>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} sectionScrollIds={sectionScrollIds} />
      <Home sectionId={sectionScrollIds[0]} />
      <Tech darkMode={darkMode} sectionId={sectionScrollIds[1]} />
      <Projects darkMode={darkMode} sectionId={sectionScrollIds[2]} />
      <Contact darkMode={darkMode} sectionId={sectionScrollIds[3]} />
    </div>
  )
}

export default App
