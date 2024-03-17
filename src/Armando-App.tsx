import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';

// class TextContentPanel extends React.Component {
//   state = { text: '' };
//   // Called after the component is mounted, similar to the initial effect in useEffect
//   componentDidMount() {
//     this.loadText();
//          // @ts-ignore comment.
//     this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
//              // @ts-ignore comment.
//       const text = await this.props.getTextOnPage();
//       this.setState({text});
//     }
//     );
//   }

//   componentWillUnmount() {
//          // @ts-ignore comment.
//     this.props.documentViewer.removeEventListener('pageNumberUpdated', this.handlePageNumberUpdated);
//   }

//   loadText = async () => {
//          // @ts-ignore comment.
//     const text = await this.props.getTextOnPage();
//     this.setState({text});
//   }

//   render() {

//     return (
//       <div className='custom-panel'>
//         {this.state.text}
//       </div>
//     );
//   }
// }

const App = () => {
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/PDFTRON_about.pdf',
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
        return ""; 
        }

        const createPanel = () => { 
        //Add a new panel that contains the text                 
        instance.UI.addPanel(
          { 
            dataElement: 'customPanel', 
            location: 'right', 
                 // @ts-ignore comment.
                 render: () =><div>{getTextOnPage}</div>
           // render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
          });
        }

        createPanel();

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