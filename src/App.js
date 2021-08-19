import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ScrollTop from './components/ScrollTop';
import Footer from './components/Footer';
import List from './components/List';
import CoinDetails from './components/CoinDetails';

function App() {  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchDisplay, setSearchDisplay] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');
  const [globalData, setGlobalData] = useState([]);    
  
  return (
    <Router>
      <div className="App">
        <Header 
          search={search} setSearch={setSearch} searchDisplay={searchDisplay} setSearchDisplay={setSearchDisplay} 
          darkMode={darkMode} setDarkMode={setDarkMode} globalData={globalData} setGlobalData={setGlobalData}
        />        
        
        <div className="content">          
          <Switch>
            <Route exact path="/">
              <List 
                data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} 
                searchDisplay="searchDisplay" setSearchDisplay={setSearchDisplay} error={error} setError={setError} 
              />
            </Route>
            <Route path="/:id">
              <CoinDetails 
                isLoading={isLoading} setIsLoading={setIsLoading} searchDisplay="searchDisplay" setSearchDisplay={setSearchDisplay}
                error={error} setError={setError}
              />
            </Route>
          </Switch>
        </div>
        
        <ScrollTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
