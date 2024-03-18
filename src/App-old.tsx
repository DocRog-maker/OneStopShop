import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

class TextContentPanel extends React.Component {
  state = { text: '' };
  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
    this.loadText();
    // @ts-ignore comment.
    this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
      this.loadText();
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


function App() {
  const viewerDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    WebViewer({
      path: 'lib',
      initialDoc: 'files/WebviewerDemoDoc.pdf',
      ui: 'beta' // enable Modular UI
    }, viewerDiv.current as HTMLDivElement).then((instance) => {
      const { UI, Core } = instance;
      const { documentViewer } = instance.Core;


      UI.enableFeatures([UI.Feature.FilePicker]);

      // @ts-ignore comment.
      const mainMenu = new UI.Components.MainMenu();

      const getTextOnPage = async () => {
        const doc = documentViewer.getDocument();
        if (doc) {
          const currentPageNum = documentViewer.getCurrentPage();
          const info = doc.getPageInfo(currentPageNum);
          const rect = new Core.Math.Rect(0, 0, info.width, info.height)
          const text = await doc.getTextByPageAndRect(currentPageNum, rect);
          return text;
        }
        //if no document is loaded then return something to help debugging
        return "No data";
      }


      const createPanel = () => {
        //Add a new panel that contains the text                 
        // @ts-ignore comment.
        instance.UI.addPanel(
          {
            dataElement: 'customPanel',
            location: 'right',
            // @ts-ignore comment.
            render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
          });
      }

      documentViewer.addEventListener('documentLoaded', () => {
        createPanel();
      });

      // @ts-ignore comment.
      const myStatefulButton = new instance.UI.Components.StatefulButton({
        initialState: 'Show',
        states: {
          Show: {
            // There are either prebuilt icons, or you can add one to the public folder and reference it
            img: '/files/text-contents-icon.svg',
            onClick: async (update: any) => {
              update('Hide');
              const doc = documentViewer.getDocument();
              if (doc) {
                //Make the panel visible
                instance.UI.openElements(['customPanel']);
              }
            },
            title: 'Show',
          },
          Hide: {
            img: '/files/close-text-contents-icon.svg',
            onClick: (update: any) => {
              update('Show');
              instance.UI.closeElements(['customPanel']);
            },
            title: 'Close',
          },
        },
        // Mount is a function that gets called when the button is mounted
        // use it to set the initial state or do other setup
        mount: () => { },
        // Unmount is a function that gets called when the button is unmounted
        // use it to clean up any resources
        unmount: () => { },
      });

      // @ts-ignore comment.
      const topHeader = new instance.UI.Components.ModularHeader({
        dataElement: 'default-top-header',
        placement: 'top',
        grow: 0,
        gap: 12,
        position: 'end',
        setJustifyContent: ('center'),
        stroke: true,
        dimension: {
          paddingTop: 8,
          paddingBottom: 8,
          borderWidth: 1
        },
        style: {},
        items: [
          mainMenu,
          myStatefulButton,
          // you could add many other items if you wish
        ]
      });
      // @ts-ignore comment.
      instance.UI.setModularHeaders([topHeader]);
    });
  }
    , [])
  return (
    <>
      <div className='webviewer' ref={viewerDiv}></div>
    </>
  )
}

export default App
