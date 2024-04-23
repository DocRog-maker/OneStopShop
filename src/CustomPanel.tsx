import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

type TextContentPanelProps = {
  getTextOnPage: () => Promise<string>;
  documentViewer: any
};

class TextContentPanel extends React.Component<TextContentPanelProps> {
  state = { text: 'text' };
  loadText = async () => {
    console.log('AA')
    const text = await this.props.getTextOnPage();
    if (text) {
      if (text.length > 0) {
        this.setState({ text });
      }
    }
    this.setState({ text });
  }


  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
    this.props.documentViewer.addEventListener('pageNumberUpdated', this.loadText);
    this.props.documentViewer.addEventListener('documentLoaded', this.loadText);
  }

  componentWillUnmount() {
    this.props.documentViewer.removeEventListener(['pageNumberUpdated'], this.loadText);
    this.props.documentViewer.removeEventListener('documentLoaded', this.loadText);
  }

  render() {
    return (
      <div className='custom-panel'>
        {this.state.text}
      </div>
    );
  }
}

const App = () => {
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/lib',
        initialDoc: '/files/WebviewerDemoDoc.pdf',
        licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current as HTMLDivElement,
    ).then((instance) => {
      const { Core } = instance;
      const { documentViewer } = instance.Core;

      instance.UI.enableFeatures([instance.UI.Feature.FilePicker])
      const createPanel = () => {
        //Add a new panel that contains the text
        instance.UI.addPanel(
          {
            dataElement: 'customPanel',
            location: 'right',
            // @ts-ignore 
            render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
          });
      }

      const getTextOnPage = async () => {
        const doc = documentViewer.getDocument();
        if (doc) {
          const currentPageNum = documentViewer.getCurrentPage();
          const info = doc.getPageInfo(currentPageNum);
          const rect = new Core.Math.Rect(0, 0, info.width, info.height)
          const text = await doc.getTextByPageAndRect(currentPageNum, rect);
          return text;
        }
        else {
          //if no document is loaded then return an empty string 
          return "No document";
        }
      };
      createPanel();
      // @ts-ignore 
      instance.UI.openElements(['customPanel']);

    });
  }, []);
  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;