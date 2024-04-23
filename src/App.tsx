import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

class TextContentPanel extends React.Component {
  state = { text: '' };
  // Called after the component is mounted, similar to the initial effect in useEffect
  componentDidMount() {
    this.loadText();
    console.log("CCC")
    // @ts-ignore comment.
    this.props.documentViewer.addEventListener('pageNumberUpdated', async () => {
      console.log("Updated")
      // @ts-ignore comment.
      const text = await this.props.getTextOnPage();
      const txt2 = "Wibble " + text;
      this.setState({ txt2 });
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
  const viewer = useRef<HTMLDivElement>(null);
  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    // @ts-ignore comment.
    WebViewer(
      {
        path: '/lib',
        //initialDoc: '/files/PDF-a and Digital Signature-v1.pdf',
        initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
        licenseKey: 'your_license_key',  // sign up to get a free trial key at https://dev.apryse.com
        //  preloadWorker: 'contentEdit'

        //  ui: 'beta' // enable Modular UI
      },
      viewer.current as HTMLDivElement
    ).then(async (instance) => {
      instance.UI.enableFeatures([instance.UI.Feature.FilePicker]);
      instance.UI.enableElements(['contentEditButton']);
      // const {Core} = instance;
      // const{ annotationManager} = Core;

      // const selectedAnnotation = annotationManager.getSelectedAnnotations()[0];

      console.log('AAAAA');
      const { Core } = instance;
      const { documentViewer, annotationManager } = Core;

      // //Optional: Use this to preload the worker if you know that the user will edit the PDF
      //  const contentEditManager = new ContentEditManager(documentViewer);
      //  Core.ContentEdit.preloadWorker(contentEditManager);

      const contentEditTool = documentViewer.getTool(Core.Tools.ToolNames.CONTENT_EDIT);
      documentViewer.setToolMode(contentEditTool);
      const selectedAnnotations = annotationManager.getSelectedAnnotations();
      console.log(selectedAnnotations);
      console.log('selectedAnnotation');
      // if (selectedAnnotation && selectedAnnotation.isContentEditPlaceholder()) {
      //   const r: Core.Annotations.RectangleAnnotation = new Core.Annotations.RectangleAnnotation(selectedAnnotation);
      //   const content = await Core.ContentEdit.getDocumentContent(r);

      //   // pass content to library that can display rich text, for example Quill

      // }


      // documentViewer.addEventListener('annotationsLoaded', async () => {
      //   const annots = annotationManager.getAnnotationsList()
      //   console.log(annots);
      //   console.log('annots');

      //   const annots1 = annots.filter(annot => annot.isContentEditPlaceholder());
      //   console.log(annots1);
      //   console.log('annots1');
      //   // if (annots1.length>0)
      //   //   {
      //   //     // @ts-ignore 
      //   //    const content = await Core.ContentEdit.getDocumentContent(annots1[0]);
      //   //    console.log(content);
      //   //   }
      //   const annotsSel = annotationManager.getSelectedAnnotations();
      //   console.log(annotsSel);
      //   console.log('annotsSel');

      //   const annotsSwl1 = annotsSel.filter(annot => annot.isContentEditPlaceholder());
      //   console.log(annotsSwl1);
      //   console.log('annotsSwl1');
      // });
      annotationManager.addEventListener('annotationChanged', async (annotations, action) => {
          // @ts-ignore 
        annotations.forEach(async (annot) => {

          console.log( annot.getAssociatedLinks())
          console.log ('type')
          if (annot.isContentEditPlaceholder()) {
  
            const content = await Core.ContentEdit.getDocumentContent(annot);
  
          //  console.log(content);
            console.log ('Valid')
          }
          else{
            console.log(annot)
            console.log ('Not valid')
          }
  
        });
      //  if (action === 'add') {
          // @ts-ignore 
          // const editAnnotations = annotations.filter(annot => annot.isHTMLAnnotation());
          // console.log(editAnnotations);
          // console.log ('AAAAA')
//           const editAnnotations = annotations.filter(annot => annot.isContentEditPlaceholder());
//           if (editAnnotations.length > 0) {
//             console.log(editAnnotations);
//             console.log ('AAAAA')
//             // @ts-ignore 
//            editAnnotations.forEach(async annot => {
//               const content = await Core.ContentEdit.getDocumentContent(annot);
//              console.log(content)
//              console.log(annot)
//              console.log('content')
//            })
//            // annotationManager.deleteAnnotation(editAnnotations[1]);
//           //  console.log(editAnnotations[0].X);
//           //  editAnnotations[0].X = 200;

// //annotationManager.trigger(Core.AnnotationManager.Events.ANNOTATION_CHANGED, ['modify', [editAnnotations[0]], {}]);
//           }
      //    const newContent = '<p><span style="font-family: SourceSansProSemi;font-weight: bold;font-size: 30px;color: #444444;"><strong>Important Factors when Choosing a PDF Library</strong></span></p>';
        //   await Core.ContentEdit.updateDocumentContent(editAnnotations[0], newContent);
       // }
      });
      // documentViewer.addEventListener('pageNumberUpdated', () => {
      //   const annots = annotationManager.getAnnotationsList()
      //   console.log(annots);
      //   console.log('annotsZ');

      //   const annots1 = annots.filter(annot => annot.isContentEditPlaceholder());
      //   console.log(annots1);
      //   console.log('annots1Z');
      //   annots1.forEach( async annot => {
      //     // @ts-ignore 
      //     const content = await Core.ContentEdit.getDocumentContent(annot);
      //       console.log(content);
      //     // if (annots1.length>0)
      //   //   {
      //   //     // @ts-ignore 
      //   //    const content = await Core.ContentEdit.getDocumentContent(annots1[0]);
      //   //    console.log(content);
      //   //   }

      //   const annotsSel = annotationManager.getSelectedAnnotations();
      //   console.log(annotsSel);
      //   console.log('annotsSelZ');

      //   const annotsSwl1 = annotsSel.filter(annot => annot.isContentEditPlaceholder());
      //   console.log(annotsSwl1);
      //   console.log('annotsSwl1Z');
      // });
      // documentViewer.addEventListener('annotationsLoaded', () => {
      //   //const annots = annotationManager.getAnnotationsList().filter(annot => annot instanceof Core.Annotations.RectangleAnnotation);;
      //   //const annots = annotationManager.getAnnotationsList().filter(annot => annot.ToolName="AnnotationCreateRectangle");
      //   //const annots = annotationManager.getAnnotationsList().map(annot => annot.getContentEditAnnotationId);
      //   const annots = annotationManager.getAnnotationsList()
      //   console.log(annots);
      //   console.log('annots');

      //   const annots1 = annotationManager.getAnnotationsList().filter(annot => annot.isContentEditPlaceholder());
      //   console.log(annots1);
      //   console.log('annots1');
      //   // const annots = annotationManager.getAnnotationsList().map(annot => annot.type;
      //   // annotationManager.selectAnnotations(annots);
      // });
      //       const selectedAnnotation = annotationManager.getSelectedAnnotations()[0];
      //       console.log(selectedAnnotation);
      // if (selectedAnnotation && selectedAnnotation.isContentEditPlaceholder()) {
      //  const r: Core.Annotations.RectangleAnnotation = new Core.Annotations.RectangleAnnotation(selectedAnnotation);
      //   const content = await Core.ContentEdit.getDocumentContent(selectedAnnotation);
      // console.log(content);
      // console.log('^content^');
      // pass content to library that can display rich text, for example Quill

      // }
      // else{
      //   console.log('No annotation');
      // }

      // later after the content has been updated this will update it on the page
      //await Core.ContentEdit.updateDocumentContent(annotation, newContent);

    });
  }, []);

  console.log("BBB1");
  return (
    <div className="App">
      <div className="header">React sample1</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;