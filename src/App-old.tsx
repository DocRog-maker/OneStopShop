import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

const event = new Event("makeVisible");

class TextContentPanel extends React.Component {
  state = { text: '' };
  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
    this.loadText();
         // @ts-ignore comment.
    this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
      console.log('1234')
      this.loadText();
             // @ts-ignore comment.
      // const text = await this.props.getTextOnPage();
      // const txt2 = "Wibble " + text;
      // this.setState({txt2});
    }
    );
       // @ts-ignore comment.

    this.props.documentViewer.addEventListener('visibilitychange', async () => {
      console.log('2234')
      this.loadText();
             // @ts-ignore comment.
      // const text = await this.props.getTextOnPage();
      // const txt2 = "Wibble " + text;
      // this.setState({txt2});
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
  const viewerDiv = useRef<HTMLDivElement>(null);
  const [pnlCustom, setPanelCustom]=useState<any>();
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
        //if no document is loaded then return an empty string 
       // return "Z";
      }

   
      const createPanel = () => {
        //Add a new panel that contains the text                 
        const pnl = {
          dataElement: 'customPanel',
          location: 'right',
          // @ts-ignore comment.
          //render: () => <div>getTextOnPage</div>
            render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
        };
         // @ts-ignore comment.
        instance.UI.addPanel(
           // @ts-ignore comment.
          pnl);
          setPanelCustom(pnl);
          console.log('settign pnlCustom');
          console.log(pnl);
          console.log({getTextOnPage})
      }

      documentViewer.addEventListener('documentLoaded', () => {
      createPanel();
      });
     // instance.UI.openElements(['customPanel']); 
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
                // //Get and store the text for the current page
                // const currentPageNum = documentViewer.getCurrentPage();
                // const info = doc.getPageInfo(currentPageNum);
                // const rect = new Core.Math.Rect(0, 0, info.width, info.height)
                // const txt = await doc.getTextByPageAndRect(currentPageNum, rect);

                //Add a new panel that contains the text                
                // instance.UI.addPanel({
                //   dataElement: 'customPanel',
                //   location: 'left',

                //   // @ts-ignore comment.
                //  render:()=>{
                //   return <div className='custom-panel'>
                //     {txt}
                //   </div>
                //  }
                // })

                //Make the panel visible
                instance.UI.openElements(['customPanel']);
                // if ({pnlCustom})
                // {
                //   const p = {pnlCustom}
                //   console.log("pnlCustom is NOT null")
                //   console.log(p)
                //    // @ts-ignore comment.
                // p.dispatchEvent(event);
                // }
                // else{
                //   console.log("pnlCustom is null")
                // }
              }
            },
            title: 'Show',
          },
          Hide: {
            img: '/files/close-text-contents-icon.svg',
            onClick: (update: any) => {
              update('Show');
              instance.UI.closeElements(['customPanel']);
                            
              // // @ts-ignore comment.
              // const panelsList= instance.UI.getPanels();

              // // Remove the created panel - alternatively you could write code to reuse the panel and update it.
              // // @ts-ignore comment.
              // const newList = panelsList.filter(element=> element._dataElement!='customPanel')

              // // @ts-ignore comment.
              // instance.UI.setPanels(newList);
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
        setJustifyContent:('center'),
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
    }

    );

  }
  , [])
  return (
    <>
      <div className='webviewer' ref={viewerDiv}></div>
    </>
  )
}

export default App
