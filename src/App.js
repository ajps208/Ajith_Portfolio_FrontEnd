import './App.css';
import { Home } from './Components/Home';
import { useDarkModeStore } from './Helper/Store/DarkModeStore';

function App() {
  const { darkMode} = useDarkModeStore();
  return (
    <div  className={darkMode ? "dark-mode" : "light-mode"} style={{width:"100%",}}>
    <Home/>
    </div>
  );
}

export default App;
