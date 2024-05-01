import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/lib',
       config: "files/config.js" ,
        initialDoc: '/files/PDFTRON_about.pdf',
        licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current as HTMLDivElement,
    ).then((instance) => {
  
instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);
     
      })
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App