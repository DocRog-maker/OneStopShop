import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

type TextContentPanelProps = {
  // using `interface` is also ok
  getTextOnPage: () => Promise<string>;
  documentViewer: any
};

class TextContentPanel extends React.Component<TextContentPanelProps> {
  state = { text: '' };
  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
   // this.loadText();
    
    // // @ts-ignore comment.
    // this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
    //   console.log('F3')
    //   const text = await this.props.getTextOnPage();
    //   console.log(text)
    //   this.setState({ text });
    // });

    // this.props.documentViewer.addEventListener('pageNumberUpdated', this.loadText);
    // this.props.documentViewer.addEventListener('documentLoaded', this.loadText);
    this.props.documentViewer.addEventListener(['pageNumberUpdated','documentLoaded'], this.loadText);
    
    // @ts-ignore comment.
    // this.props.documentViewer.addEventListener('documentLoaded', async () => {
    //   console.log('F2')
    //   const text = await this.props.getTextOnPage();
    //   console.log(text)
    //   this.setState({ text });
    // });
  }

  componentWillUnmount() {
    // @ts-ignore comment.
    // this.props.documentViewer.removeEventListener('pageNumberUpdated', this.handlePageNumberUpdated);
    this.props.documentViewer.removeEventListener(['pageNumberUpdated'], this.loadText);
  }

  loadText = async () => {
    console.log('F1')
    const text = await this.props.getTextOnPage();
    console.log(text)
    this.setState({ text });
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
        licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current as HTMLDivElement,
    ).then((instance) => {
      const { Core } = instance;
      const { documentViewer } = instance.Core;

      const getTextOnPage = async () => {
        const doc = documentViewer.getDocument();
        if (doc) {
          const currentPageNum = documentViewer.getCurrentPage();
          const info = doc.getPageInfo(currentPageNum);
          const rect = new Core.Math.Rect(0, 0, info.width, info.height)
          const text = await doc.getTextByPageAndRect(currentPageNum, rect);
          return text;
        }

        //if no document is loaded then return an empty string 
        return "No document";
      }

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

      createPanel();
      instance.UI.openElements(['customPanel']);
    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;