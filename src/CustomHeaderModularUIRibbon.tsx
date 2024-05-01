import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';


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
      const { Tools } = instance.Core;
      // First let's define some tools that we can place in the grouped items containers
      const highlightToolButton = new instance.UI.Components.ToolButton({
        dataElement: 'my-highlightToolButton-',
        toolName: Tools.ToolNames.HIGHLIGHT,
        label:'gg',
        img:'aa'
      });

      const freeTextToolButton = new instance.UI.Components.ToolButton({
        dataElement: 'my-freeTextToolButton',
        // @ts-ignore 
        toolName: Tools.ToolNames.FREETEXT,
      });

      const rectangleToolButton = new instance.UI.Components.ToolButton({
        dataElement: 'my-rectangleToolButton',
        // @ts-ignore 
        toolName: Tools.ToolNames.RECTANGLE,
      });

      const polylineToolButton = new instance.UI.Components.ToolButton({
        dataElement: 'my-polylineToolButton',
        // @ts-ignore 
        toolName: Tools.ToolNames.POLYLINE,
      });

      // Now we can create two grouped items containers to hold the tools
      const textToolsGroupedItems = new instance.UI.Components.GroupedItems({
        // @ts-ignore 
        dataElement: 'textToolsGroupedItems',
        items: [
          freeTextToolButton,
          highlightToolButton,
        ],
      });

      const shapeToolsGroupedItems = new instance.UI.Components.GroupedItems({
        // @ts-ignore 
        dataElement: 'shapeToolsGroupedItems',
        style: {},
        items: [
          rectangleToolButton,
          polylineToolButton,
        ],
      });

      // Now we can create the ribbon items that will map to the grouped items containers
      const textRibbonItem = new instance.UI.Components.RibbonItem({
        dataElement: 'textRibbonItem',
        // @ts-ignore 
        label: 'Text Tools',
        // Ribbon items can support Icons
        img: 'icon-tool-text-free-text',
        groupedItems: ['textToolsGroupedItems'],
      });

      const shapeRibbonItem = new instance.UI.Components.RibbonItem({
        dataElement: 'shapeRibbonItem',
        // @ts-ignore 
        label: 'Shape Tools',
        img: 'icon-tool-shape-rectangle',
        // This maps to the grouped items container - a ribbon item can map to one or more grouped items containers
        groupedItems: ['shapeToolsGroupedItems'],
      });

      // Now we can create the ribbon group that will hold the ribbon items
      const ribbonGroup = new instance.UI.Components.RibbonGroup({
        // @ts-ignore 
        dataElement: 'my-ribbon-group',
        title: 'Custom Ribbon Group',
        // @ts-ignore 
        // Set an empty list - it will be populated later
        items: [
        ],
      });

      // Now let's bring it home by adding the ribbon group to the UI
      const topHeader = instance.UI.getModularHeader('default-top-header')
      // @ts-ignore 
      topHeader.setItems([ribbonGroup])
      // We can also modify the justification in the header so it's centered
      topHeader.setJustifyContent('center')

      // // And let's also add the tools grouped items to the tools header
      const toolsHeader = instance.UI.getModularHeader('tools-header')
      // @ts-ignore 
      toolsHeader.setItems([textToolsGroupedItems, shapeToolsGroupedItems])

      // Now set the ribbon items, after adding the ribbon to the header
      ribbonGroup.setItems([textRibbonItem, shapeRibbonItem]);
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