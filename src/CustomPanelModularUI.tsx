import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';
import TextContentPanel from './components/TextContentPanel';


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
      },
      viewer.current as HTMLDivElement,
    ).then((instance) => {
      const { Core, UI } = instance;
      const { documentViewer, Tools } = instance.Core;
      instance.UI.enableFeatures([instance.UI.Feature.FilePicker])

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

      const createPanel = () => {
        //Add a new panel that contains the text
        instance.UI.addPanel(
          {
            dataElement: 'customPanel',
            location: 'right',
            icon: '/kiwi.svg',
            title: 'Custom Panel',
            // @ts-ignore 
            render: () => <TextContentPanel getTextOnPage={getTextOnPage} documentViewer={documentViewer} />,
          });
      }

      createPanel();

      // Menu Flyout Button
      // @ts-ignore 
      const mainMenu = new UI.Components.MainMenu();
      // View Controls
      // @ts-ignore 
      const viewControlsToggle = new UI.Components.ViewControls();
      // Zoom Controls
      // @ts-ignore 
      const zoomControls = new UI.Components.Zoom();
      // Pan Tool Button
      const panToolButton = new UI.Components.ToolButton({
        dataElement: 'panToolButton',
        // @ts-ignore 
        toolName: Tools.ToolNames.PAN,
      });

      // @ts-ignore 
      const tabPanel = new instance.UI.Components.TabPanel({
        dataElement: 'myTabPanel',
        panelsList: [
          {
            // @ts-ignore 
            render: 'customPanel'
          },
          {
            // @ts-ignore 
            render: instance.UI.Panels.FILE_ATTACHMENT // or 'fileAttachmentPanel'
          },
          {
            // @ts-ignore 
            render: instance.UI.Panels.THUMBNAIL // or 'thumbnailsPanel'
          },


        ],
        location: 'right'
      });

      instance.UI.addPanel(tabPanel);
      // Using the toggle button to open the Thumbnail panel
      const tabPanelToggle = new instance.UI.Components.ToggleElementButton({
        dataElement: 'tabPanelToggle',
        // @ts-ignore 
        toggleElement: 'myTabPanel',
      // img: 'icon-header-sidebar-line',
      img: '/kiwi.svg',
        title: 'Toggle Tab Panel',
      });


      const topHeader = new instance.UI.Components.ModularHeader({
        dataElement: 'default-top-header',
        // @ts-ignore 
        placement: 'bottom',
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
          tabPanelToggle,
          viewControlsToggle,
          zoomControls,
          panToolButton,
        ]
      });

      // We can also modify the justification in the header so it's centered
     topHeader.setJustifyContent('center')

      // tabPanel
      // Set the modular header in the UI
      instance.UI.setModularHeaders([topHeader]);

      // Then this button should be added to a container's item using the setItems API.
      // This container can be a modular header or a grouped items container.
      //  const defaultHeader = instance.UI.getModularHeader('default-top-header')
      //  defaultHeader.setItems([tabPanelToggle]);

      //     instance.UI.openElements(['customPanel']);
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