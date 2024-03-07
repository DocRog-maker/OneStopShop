import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import TextPanel from './TextPanel';

function App() {
  const viewerDiv = useRef<HTMLDivElement>(null);
 const [currentTxt, setCurrentTxt] = useState<string>('');
 const [count, setCount] = useState<number>(0);

 useEffect(() => {
  console.log('count VV');
  console.log({count});
},[count])

  useEffect(() => {
    console.log('currentTxt VV');
    console.log({currentTxt});
  },[currentTxt])


  useEffect(() => {
    WebViewer({
      path: 'lib',
      //   initialDoc:'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      initialDoc: 'files/WebviewerDemoDoc.pdf',
      ui: 'beta' // enable Modular UI
    }, viewerDiv.current as HTMLDivElement).then((instance) => {
     // const [currentTxt, setCurrentTxt] = useState<string>('');
      const { UI, Core } = instance;
      const { Tools } = Core;
      const { documentViewer } = instance.Core;


      //     documentViewer.addEventListener('documentLoaded', async () => {
      //       const doc = documentViewer.getDocument();
      //       console.log(doc.getFilename());

      //       console.log('XXXX');
      //       const info = doc.getPageInfo(1);

      //       console.log(info);
      //       console.log('YYYY');

      //       const rect = new Core.Math.Rect(0, 0, info.width, info.height)
      //  //const rect1 = await Core.Math.Rect.init(0, 0, info.height, info.width)
      //    const txt = await  doc.getTextByPageAndRect(1, rect);

      //       console.log(txt);
      //       console.log('ZZZ');
      //     });
      //     console.log('dddd');
      // Menu Flyout Button
      // @ts-ignore comment.
      const mainMenu = new UI.Components.MainMenu();
      // View Controls
      // @ts-ignore comment.
      const viewControlsToggle = new UI.Components.ViewControls();
      // Zoom Controls
      // @ts-ignore comment.
      const zoomControls = new UI.Components.Zoom();
      // Pan Tool Button
      // @ts-ignore comment.
      const panToolButton = new UI.Components.ToolButton({
        dataElement: 'panToolButton',
        toolName: Tools.ToolNames.PAN,
      });

      // @ts-ignore comment.
      const myButton = new instance.UI.Components.StatefulButton({
        initialState: 'Show',
        states: {
          Show: {
            img: 'icon-save',
            onClick: async (update:any) => {


              update('Hide');

              const doc = documentViewer.getDocument();
           //   console.log(doc);
            //  console.log('doc');
              if (doc) {
                const currentPageNum = documentViewer.getCurrentPage();
              //  console.log(currentPageNum);
                const info = doc.getPageInfo(currentPageNum);
                const rect = new Core.Math.Rect(0, 0, info.width, info.height)
                const txt = await doc.getTextByPageAndRect(currentPageNum, rect);
                console.log('count');
                console.log({count});
                var c = {count}.count;
                var cNew = c+1;
                setCurrentTxt(txt);
                setCount(cNew);
                // @ts-ignore comment.
              
                instance.UI.openElements(['customPanel']);
                
               // documentViewer.refreshAll();
              }
            },
            title: 'Show',
          },
          Hide: {
            img: 'digital_signature_warning',
            onClick: (update:any) => {
              update('Show');
              instance.UI.closeElements(['customPanel']);
              // @ts-ignore comment.
              const panelsList = instance.UI.getPanels();
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

      const z= 'zzz';
      instance.UI.addPanel({
        dataElement: 'customPanel',
        location: 'left',
        // @ts-ignore comment.
        icon: 'icon-save',
          // @ts-ignore comment.
          render: () =>  <TextPanel props={currentTxt}  />
        //render: () =>  <TextPanel />
        // render: () => {
        //  console.log( currentTxt );
        //  console.log('{currentTxt}');
        //   const div = document.createElement('div');

        //   // @ts-ignore comment.
        //  // div.innerHTML = "X " +  currentTxt;
        //   return div;
        // }
      })

     //
      // @ts-ignore comment.
      // const testButton = new instance.UI.Components.CustomButton({
      //   // label: 'test',
      //   title: 'Get page text',
      //   onClick: async () => {
          
      //     const doc = documentViewer.getDocument();
      //     if (doc) {
      //       const currentPageNum = documentViewer.getCurrentPage();
      //       console.log(doc.getFilename());

      //       console.log('XXXX');
      //       const info = doc.getPageInfo(currentPageNum);

      //     //  console.log(info);
      //      // console.log('YYYY');

      //       const rect = new Core.Math.Rect(0, 0, info.width, info.height)
      //       //const rect1 = await Core.Math.Rect.init(0, 0, info.height, info.width)
      //       const txt = await doc.getTextByPageAndRect(currentPageNum, rect);

      //      // console.log(txt);
      //       setCurrentTxt(txt);
      //       // @ts-ignore comment.
      //       instance.UI.addPanel({
      //         dataElement: 'customPanel',
      //         location: 'left',
      //         // @ts-ignore comment.
      //         icon: 'icon-save',
      //          // @ts-ignore comment.
      //        //  render: () =>  <TextPanel />
      //         render: () =>  <TextPanel currentTxt="FFF"  />
      //         // //  console.log({ currentTxt });
      //         // //  console.log('{currentTxt}');
      //         //   const div = document.createElement('div');
      //         //   // @ts-ignore comment.
      //         //   div.innerHTML = txt;
      //         //   return div;
             
      //       });
      //       instance.UI.openElements(['customPanel']);
      //     }
      //     //   console.log('button clicked!'),
      //   },
      //   img: 'icon-form-field-text',
      // });

      //     // @ts-ignore comment.
      // instance.UI.addPanel({
      //   dataElement: 'customPanel',
      //   location: 'left',
      //       // @ts-ignore comment.
      //   icon: 'icon-save',
      //   render: () => {
      //     console.log({currentTxt});
      //     console.log('{currentTxt}');
      //     const div = document.createElement('div');
      //         // @ts-ignore comment.
      //     div.innerHTML = {currentTxt};
      //     return div;
      //   }
      // });

      // @ts-ignore comment.
      const panelsList = instance.UI.getPanels();
      // setting the first panel location
     // panelsList[0].setLocation('right');
      console.log(panelsList);
      console.log('panelsList');

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
          viewControlsToggle,
          zoomControls,
         // testButton,
          myButton,
          panToolButton,
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
