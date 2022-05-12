import { GlobalProvider} from '../context/GlobalState';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header/Header';
import List from './Lists/List';
import ScrollTopButton from './Buttons/ScrollTopButton/ScrollTopButton';
import Footer from './Footer/Footer';


function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="App">
            <Header/>
            <List/>
            <Footer/>
        </div>
        <ScrollTopButton/>
      </GlobalProvider>
    </Router>
  );
}

export default App;
