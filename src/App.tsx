import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import styled from "@emotion/styled";
import { VerifiedDapps } from './verifiedDapps';

function extractRootDomain(u: string) {
  const domain = new URL(u).hostname;
  const elems = domain.split('.');
  const iMax = elems.length - 1;
    
  const isSecondLevel = elems.length >= 3 && (elems[iMax] + elems[iMax - 1]).length <= 5;
  return elems.splice( isSecondLevel ? -3 : -2 ).join('.');	
}

function App() {

  const [url, setUrl] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      const currUrl = extractRootDomain(tabs[0].url as string);
      if (VerifiedDapps[currUrl] != undefined) {
        setIsVerified(true);  
      }
      setUrl(currUrl);
      // use `url` here inside the callback because it's asynchronous!
    });  
  }, []); 
  
  return (
    <Container>
      <p>{isVerified ? "Verified!!" : "NOT VERIFIED"}</p>
      <p>{url}</p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

export default App;
