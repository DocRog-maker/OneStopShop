import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

type TextContentPanelProps = {
  // using `interface` is also ok
  getTextOnPage: () => Promise<string>;
  documentViewer: any
};

class TextContentPanel extends React.Component<TextContentPanelProps> {
  state = { text: 'text' };
  loadText = async () => {
    const text = await this.props.getTextOnPage();
    console.log(text);
    console.log('^^^^^');
    if (text) {
      console.log('H')
      if (text.length > 0) {
        console.log('HI')
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
        // initialDoc: '/files/PDF-a and Digital Signature-v1.pdf',
        initialDoc: '/files/WebviewerDemoDoc.pdf',
        ui: 'beta',
        licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
        // loadAsPDF:true,
      },
      viewer.current as HTMLDivElement,
    ).then((instance) => {
      const { Core, UI } = instance;
      const { documentViewer } = instance.Core;
      instance.UI.enableFeatures([instance.UI.Feature.FilePicker])


      const getTextOnPage = async () => {
        console.log("H1")
        const doc = documentViewer.getDocument();
        console.log("H2")
        if (doc) {
          console.log("H4")
          console.log(doc)
          const currentPageNum = documentViewer.getCurrentPage();
          const info = doc.getPageInfo(currentPageNum);
          const rect = new Core.Math.Rect(0, 0, info.width, info.height)
          const text = await doc.getTextByPageAndRect(currentPageNum, rect);
          const text1 = doc.getPageInfo(currentPageNum);
          console.log(text1)
          return text;
          // const layersArray =  await doc.getLayersArray();
          //   const text: string = `<ul>${layersArray.map(layer => `<li>${layer.name}</li>`).join("")}</ul>`;

          // const annots = Core.annotationManager.getAnnotationsList()
          // console.log(annots)
          // const text3: string = annots.map(annotation => annotation.Subject).join(" -- ");
          // console.log("HH4.25")
          // console.log(annots)
          // console.log("HH4.35")
          // console.log(text3)
          // const links = Core.annotationManager.getAnnotationsList().filter(annotation => annotation instanceof Core.Annotations.TextUnderlineAnnotation)
          //  //const links =  doc.getLinks(currentPageNum);
          // console.log("HH4.5")
          // console.log(links)
          //         // const text: string =  layersArray.join(" ");
          //       //   console.log(text2)
          //          // const text =  doc.getLinks(currentPageNum);
          //           console.log("HH5")
          //           console.log(text)
          //           console.log("HH6")
          //           if (!text)
          //             {
          //               return "no layers"
          //             }
          //           return text;
          //         }
          //         console.log("HH3")
          //         //if no document is loaded then return an empty string 
          //         return "No document";
        }
      };
        const createPanel = () => {
          //Add a new panel that contains the text
          instance.UI.addPanel(
            {
              dataElement: 'customPanel',
              location: 'right',
              // @ts-ignore 
              render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
            });

          // Bookmark Panel
          instance.UI.addPanel({
            dataElement: 'textEditingPanel1',
            location: 'left',
            // @ts-ignore 
            render: instance.UI.Panels.CHANGE_LIST,
          });
        }
 // @ts-ignore 
        // const groupedLeftHeaderButtons = new instance.UI.Components.GroupedItems({
        //    // @ts-ignore 
        //   dataElement: 'groupedLeftHeaderButtons',
        //   grow: 0,
        //   gap: 12,
        //   position: 'start',
        //   style: {},
        //   items: [
        //     Core.Tools.ContentEditTool,
        //   ],
        //   // either make this visible all the time or only when active
        //   alwaysVisible: true,
        // });
        createPanel();
        instance.UI.openElements(['customPanel']);
       // instance.UI.openElements(['textEditingPanel1']);
        // @ts-ignore 
        // const defaultTopHeader = new instance.UI.Components.ModularHeader({
        //   dataElement: 'default-top-header',
        //   // @ts-ignore 
        //   placement: 'top',
        //   grow: 0,
        //   gap: 12,
        //   position: 'start',
        //   stroke: true,
        //   dimension: {
        //     paddingTop: 8,
        //     paddingBottom: 8,
        //     borderWidth: 1
        //   },
        //   style: {},
        //   items: [
        //     groupedLeftHeaderButtons,
        //   ]
        // });
        
      //   instance.UI.setModularHeaders([defaultTopHeader]);
      //   const contentEditTool = documentViewer.getTool(Core.Tools.ToolNames.CONTENT_EDIT);
      //   documentViewer.setToolMode(contentEditTool);
      //  instance.UI.ToolbarGroup.EDIT
      //   var res = instance.UI.getPanels();
      //   console.log(res);
      //   console.log("panels");
        // const callback = () => {
        //   // unsubscribe immediatly after invoking
        //   // const links = Core.annotationManager.getAnnotationsList().filter(annotation => annotation instanceof Core.Annotations.Link)
        //   const links = Core.annotationManager.getAnnotationsList()
        //   //const links =  doc.getLinks(currentPageNum);
        //   console.log("HH66")
        //   console.log(links)
        // }
        // documentViewer.addEventListener('annotationsLoaded ', callback);
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