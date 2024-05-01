import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';

//import j from '/files/usa_population.json';

function App() {
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    // @ts-ignore comment.
    WebViewer(
      {
        path: '/lib',
        licenseKey: 'demo:1691546275889:7c59401e03000000008d32a204e8ee933c71f5612baed9652518f1a03b',
        //  initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
        enableOfficeEditing: true,
        fullAPI:true,
      },
      viewer.current as HTMLDivElement
    ).then(async (instance) => {
      const { documentViewer } = instance.Core;

      async function setupTemplate() {
        const doc = await instance.Core.createDocument('/files/US_popn.docx', { extension: "docx", officeOptions: { doTemplatePrep: true } });
        const options = { "years": [{ "countryiso3code": "USA", "date": "2022", "value": "333287557" }, { "countryiso3code": "USA", "date": "2021", "value": "332031554" }, { "countryiso3code": "USA", "date": "2020", "value": "331511512" }, { "countryiso3code": "USA", "date": "2019", "value": "328329953" }] };
        await doc.applyTemplateValues(options);
        return doc;
      }

      async function createPDF () {
        const doc = await setupTemplate();
        const data = await doc.getFileData({ downloadType: "pdf", finishedWithDocument: true });
        instance.Core.documentViewer.loadDocument(data, { extension: 'pdf' });
      };

      async function createDOCX () {
        const doc = await setupTemplate();
        const data = await doc.getFileData({ downloadType: "templateFilledOffice", finishedWithDocument: true });
        const file = new File([data], "filled.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        await  instance.Core.documentViewer.loadDocument(file, { extension: 'docx', enableOfficeEditing: true  });
      };

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/kiwi.svg',
          onClick: createDOCX,
        });
      });
      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/gecko.png',
          onClick: createPDF,
        });
      });
    });
  }, []);
 

  console.log("BBB1");
  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;