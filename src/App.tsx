import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

class TextContentPanel extends React.Component {
  state = { text: '' };
  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
    this.loadText();
    console.log("CCC")
         // @ts-ignore comment.
    this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
      console.log("Updated")
             // @ts-ignore comment.
      const text = await this.props.getTextOnPage();
      const txt2 = "Wibble " + text;
      this.setState({txt2});
    }
    );
  }

  componentWillUnmount() {
         // @ts-ignore comment.
    this.props.documentViewer.removeEventListener('pageNumberUpdated', this.handlePageNumberUpdated);
  }

  loadText = async () => {
         // @ts-ignore comment.
    const text = await this.props.getTextOnPage();
    this.setState({text});
  }

  render() {

    return (
      <div className='custom-panel'>
        {this.state.text}
      </div>
    );
  }
}

function App() {
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    // @ts-ignore comment.
    WebViewer(
      {
        path: '/lib',
        initialDoc: '/files/WebviewerDemoDoc.pdf',
        licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
         
        ui: 'beta' // enable Modular UI
      },
      viewer.current as HTMLDivElement
    ).then((instance) => {
      console.log("AAAA");
      const { Core } = instance;
      const { documentViewer } = instance.Core;


      const getTextOnPage = async () => {
        console.log("EEE");
        console.log(documentViewer);
        const doc = documentViewer.getDocument();
        if (doc) {
          console.log("DDD");
          const currentPageNum = documentViewer.getCurrentPage();
          const info = doc.getPageInfo(currentPageNum);
          const rect = new Core.Math.Rect(0, 0, info.width, info.height)
          const text = await doc.getTextByPageAndRect(currentPageNum, rect);
          return text;
        }

        //if no document is loaded then return an empty string 
        return "ZZZ";
      }

      const createPanel = () => {
        //Add a new panel that contains the text                 
        instance.UI.addPanel(
          {
            dataElement: 'customPanel',
            location: 'right',
            // @ts-ignore comment.
           // render: () => <div>'{getTextOnPage}'</div>
              render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
          });
      }

      createPanel();
      instance.UI.openElements(['customPanel']);
    });
  }, []);

  console.log("BBB");
  return (
    <div className="App">
      <div className="header">React sample1</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;