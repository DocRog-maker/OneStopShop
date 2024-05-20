import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';
import './App.css';

//import j from '/files/usa_population.json';

function App() {
  const viewer = useRef<HTMLDivElement>(null);
  const licKey = '[licenseKey]]'
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    // @ts-ignore comment.
    WebViewer(
      {
        path: '/lib',
        licenseKey: licKey,
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
        enableOfficeEditing: true,
        fullAPI: true,
      },
      viewer.current as HTMLDivElement
    ).then(async (instance) => {
      const { documentViewer, PDFNet, annotationManager } = instance.Core;
      const { VerificationOptions } = instance.UI;

      VerificationOptions.addTrustedCertificates(['/files/certificate.pem'])

      instance.UI.enableFeatures([instance.UI.Feature.FilePicker, instance.UI.Feature.ContentEdit]);

      function openAsOffice() {
        documentViewer.loadDocument('/files/empty.docx', { enableOfficeEditing: true })
      }

      function loginAsAdmin() {
        annotationManager.setCurrentUser('Justin');
        annotationManager.promoteUserToAdmin()
        const allAnnots = annotationManager.getAnnotationsList();
        annotationManager.showAnnotations(allAnnots);
      }

      function loginAsUser() {
        annotationManager.setCurrentUser('Sally');
        annotationManager.demoteUserFromAdmin();
        annotationManager.disableReadOnlyMode();
        const allAnnots = annotationManager.getAnnotationsList();
        annotationManager.showAnnotations(allAnnots);
      }

      // Log a user in as readonly - and hide Freehand and text highlight annotations
      function loginAsReadonly() {
        annotationManager.setCurrentUser('Brian');
        annotationManager.enableReadOnlyMode();
        const allAnnots = annotationManager.getAnnotationsList();
        const hideList = allAnnots.filter(annot => {
          console.log(annot)
          return annot instanceof instance.Core.Annotations.FreeHandAnnotation ||
            annot instanceof instance.Core.Annotations.TextHighlightAnnotation;
        });

        // @ts-ignore
        annotationManager.hideAnnotations(hideList);
      }

      async function addSignature() {
        await PDFNet.initialize();
        const doc = await documentViewer.getDocument().getPDFDoc();
        // Run PDFNet methods with memory management
        await PDFNet.runWithCleanup(async () => {
          // runWithCleanup will auto unlock when complete
          doc.lock();
          // Add an StdSignatureHandler instance to PDFDoc, making sure to keep track of it using the ID returned.
          const sigHandlerId = await doc.addStdSignatureHandlerFromURL('/files/certificate.pfx', 'weak-password1');
          const approvalSigField = await doc.createDigitalSignatureField("newfield");
          const approvalSignatureWidget = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, await PDFNet.Rect.init(500, 20, 600, 100), approvalSigField);

          // // (OPTIONAL) Add an appearance to the signature field.
          const img = await PDFNet.Image.createFromURL(doc, 'https://cdn.iconscout.com/icon/free/png-256/free-signed-2653334-2202906.png');
          await approvalSignatureWidget.createSignatureAppearance(img);

          //We will need to get the first page so that we can add an approval signature field to it
          const page1 = await doc.getPage(1);
          page1.annotPushBack(approvalSignatureWidget);

          // Prepare the signature and signature handler for signing.
          await approvalSigField.signOnNextSaveWithCustomHandler(sigHandlerId);
          // The actual approval signing will be done during the save operation.
          const buf = await doc.saveMemoryBuffer(0);
          const blob = new Blob([buf], { type: 'application/pdf' });

          //Save via any mechanism that you like - saveBlob creates a link, then clicks the link
          saveBlob(blob, 'signed_doc.pdf');
          instance.UI.loadDocument(blob, { filename: 'signed_doc.pdf' });
        }, licKey);
      }

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/template.png',
          title: 'Create template',
          onClick: openAsOffice,
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/can.png',
          title: 'Get Canadian data',
          onClick: fillTemplateCan,
        });
      });
      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/usa.png',
          title: 'Get US data',
          onClick: fillTemplateUsa,
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/sally.png',
          title: 'Login as User',
          onClick: loginAsUser,
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/justin.png',
          title: 'Login as Admin',
          onClick: loginAsAdmin,
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/brian.png',
          title: 'Login as Readonly',
          onClick: loginAsReadonly,
        });
      });

      instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '/approve.png',
          title: 'Approve and Save',
          onClick: addSignature,
        });
      });

      //The data returned form the world bank has been stored as static files. 
      //While it is JSON, it's structure isn';'t how DocGen needs it, so tweak the structure
      async function getJSONData(country: string) {
        let t = '';
        await fetch('/files/' + country + '_population.json')
          .then((r) => r.text())
          .then(text => {
            t = text;
          })
        const j = JSON.parse(t)
        const k = { 'lastupdated': j[0].lastupdated, 'country': j[1][0].countryiso3code, "years": j[1] };

        return k
      };

      //Template filling requires json to only contain text values, so replace any that are not.
      function replacer(key: string, value: object) {
        // Filtering out properties
        // @ts-ignore
        if (value && value !== 'null' && value !== 'undefined') {
          if (typeof value === "number") {
            // @ts-ignore
            return value.toString();
          }
          return value;
        }
        return 'null'
      }


      //This is one way to save a document. Others exist.
      function saveBlob(blob: Blob, fileName: string) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };

      async function fillTemplateUsa() {
        await fillTemplate('us');
      }

      async function fillTemplateCan() {
        await fillTemplate('cn');
      }
      async function fillTemplate(countrycode: string) {
        const docStart = documentViewer.getDocument();
        var s = await docStart.getFileData()
        const k = await getJSONData(countrycode);
        const js = JSON.stringify(k, replacer)
        const doc = await instance.Core.createDocument(s, { extension: "docx", officeOptions: { doTemplatePrep: true } });
        await doc.applyTemplateValues(JSON.parse(js));

        // The output of DocGen can be a PDF or a DOCX file - change the value of createPDF to change the type.
        const createPDF = true;
        if (createPDF) {
          const data = await doc.getFileData({ downloadType: "pdf", finishedWithDocument: true });
          instance.Core.documentViewer.loadDocument(data, { extension: 'pdf' });
        }
        else {
          //Create a docx output
          const data = await doc.getFileData({ downloadType: "templateFilledOffice", finishedWithDocument: true });
          const file = new File([data], "filled.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
          await instance.Core.documentViewer.loadDocument(file, { extension: 'docx', enableOfficeEditing: true });
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;