import { GlobalProvider} from '../context/GlobalState';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollTopButton from './Buttons/ScrollTopButton/ScrollTopButton';
import Layout from './Layout';


function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="App">
            <Layout/>
        </div>
        <ScrollTopButton/>
      </GlobalProvider>
    </Router>
  );
}

export default App;
