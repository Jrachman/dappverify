import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function extractRootDomain(u: string) {
  const domain = new URL(u).hostname;
  const elems = domain.split('.');
  const iMax = elems.length - 1;
    
  const isSecondLevel = elems.length >= 3 && (elems[iMax] + elems[iMax - 1]).length <= 5;
  return elems.splice( isSecondLevel ? -3 : -2 ).join('.');	
}

function App() {

  const [url, setUrl] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      setUrl(extractRootDomain(tabs[0].url as string));
      // use `url` here inside the callback because it's asynchronous!
    });  
  }, []); 
  
  return (
    <div className="App">
      <p>{url}</p>
    </div>
  );
}

export default App;
