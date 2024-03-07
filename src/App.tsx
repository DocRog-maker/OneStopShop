import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import TextPanel from './TextPanel';

function App() {
  const viewerDiv = useRef<HTMLDivElement>(null);
  const [currentTxt, setCurrentTxt] = useState<string>('');

  //Sanity to check to verify that the value is set
  useEffect(() => {
    console.log('currentTxt VV');
    console.log({ currentTxt });
  }, [currentTxt])


  useEffect(() => {
    WebViewer({
      path: 'lib',
      initialDoc: 'files/WebviewerDemoDoc.pdf',
      ui: 'beta' // enable Modular UI
    }, viewerDiv.current as HTMLDivElement).then((instance) => {
      const { UI, Core } = instance;
      const { documentViewer } = instance.Core;

      // Menu Flyout Button
      // @ts-ignore comment.
      const mainMenu = new UI.Components.MainMenu();

      // @ts-ignore comment.
      const myStatefulButton = new instance.UI.Components.StatefulButton({
        initialState: 'Show',
        states: {
          Show: {
            // Use an entirely inappropriate icon - fix later
            img: 'icon-view',
            onClick: async (update: any) => {
              update('Hide');
              const doc = documentViewer.getDocument();
              if (doc) {
                //Get and store the text for the current page
                const currentPageNum = documentViewer.getCurrentPage();
                const info = doc.getPageInfo(currentPageNum);
                const rect = new Core.Math.Rect(0, 0, info.width, info.height)
                const txt = await doc.getTextByPageAndRect(currentPageNum, rect);
                setCurrentTxt(txt);

                //This opens the element, but doesn't cause a refresh
                instance.UI.openElements(['customPanel']);
              }
            },
            title: 'Show',
          },
          Hide: {
            img: 'digital_signature_warning',
            onClick: (update: any) => {
              update('Show');
              instance.UI.closeElements(['customPanel']);
              // @ts-ignore comment.
              const panelsList = instance.UI.getPanels();
              //log panels to verify no leak
              console.log(panelsList);
              console.log('panelsList');
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

      //  const z= 'zzz';
      instance.UI.addPanel({
        dataElement: 'customPanel',
        location: 'left',
        // @ts-ignore comment.
        icon: 'icon-save',
        // @ts-ignore comment.
        render: () => <TextPanel props={currentTxt} />
      })

      // @ts-ignore comment.
      const topHeader = new instance.UI.Components.ModularHeader({
        dataElement: 'default-top-header',
        placement: 'top',
        grow: 0,
        gap: 12,
        position: 'start',
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
        ]
      });
      // @ts-ignore comment.
      instance.UI.setModularHeaders([topHeader]);
    }

    );

  }, [])
  return (
    <>
      <div className='webviewer' ref={viewerDiv}></div>
    </>
  )
}

export default App
