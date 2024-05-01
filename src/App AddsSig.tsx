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
      const { documentViewer, PDFNet } = instance.Core;
      instance.UI.enableFeatures([instance.UI.Feature.FilePicker, instance.UI.Feature.ContentEdit]);

      const doc = await instance.Core.createDocument('/files/US_popn.docx', { extension: "docx", officeOptions: { doTemplatePrep: true } })
      console.log('aaa');

      let t = '';
      await fetch('/files/cad_population.json')
        .then((r) => r.text())
        .then(text => {
          t = text;
        })
  // console.log(t)
const j = JSON.parse(t)

console.log(j);

const k = {'lastupdated': j[0].lastupdated , 'country': j[1][0].countryiso3code,  "years": j[1] };
console.log(k);
//const k1 = JSON.stringify(k);
console.log('j');

// const j0= {"years":[{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2022","value":333287557,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2021","value":332031554,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2020","value":331511512,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2019","value":328329953,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2018","value":326838199,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2017","value":325122128,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2016","value":323071755,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2015","value":320738994,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2014","value":318386329,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2013","value":316059947,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2012","value":313877662,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2011","value":311583481,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2010","value":309327143,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2009","value":306771529,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2008","value":304093966,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2007","value":301231207,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2006","value":298379912,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2005","value":295516599,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2004","value":292805298,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2003","value":290107933,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2002","value":287625193,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2001","value":284968955,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2000","value":282162411,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1999","value":279040000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1998","value":275854000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1997","value":272657000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1996","value":269394000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1995","value":266278000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1994","value":263126000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1993","value":259919000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1992","value":256514000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1991","value":252981000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1990","value":249623000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1989","value":246819000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1988","value":244499000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1987","value":242289000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1986","value":240133000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1985","value":237924000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1984","value":235825000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1983","value":233792000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1982","value":231664000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1981","value":229466000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1980","value":227225000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1979","value":225055000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1978","value":222585000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1977","value":220239000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1976","value":218035000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1975","value":215973000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1974","value":213854000,"unit":"","obs_status":"","decimal":0}]}
// const j0z= {"years":[{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2023","value":null,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2022","value":333287557,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2021","value":332031554,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2020","value":331511512,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2019","value":328329953,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2018","value":326838199,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2017","value":325122128,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2016","value":323071755,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2015","value":320738994,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2014","value":318386329,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2013","value":316059947,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2012","value":313877662,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2011","value":311583481,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2010","value":309327143,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2009","value":306771529,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2008","value":304093966,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2007","value":301231207,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2006","value":298379912,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2005","value":295516599,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2004","value":292805298,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2003","value":290107933,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2002","value":287625193,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2001","value":284968955,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"2000","value":282162411,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1999","value":279040000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1998","value":275854000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1997","value":272657000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1996","value":269394000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1995","value":266278000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1994","value":263126000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1993","value":259919000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1992","value":256514000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1991","value":252981000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1990","value":249623000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1989","value":246819000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1988","value":244499000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1987","value":242289000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1986","value":240133000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1985","value":237924000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1984","value":235825000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1983","value":233792000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1982","value":231664000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1981","value":229466000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1980","value":227225000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1979","value":225055000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1978","value":222585000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1977","value":220239000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1976","value":218035000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1975","value":215973000,"unit":"","obs_status":"","decimal":0},{"indicator":{"id":"SP.POP.TOTL","value":"Population, total"},"country":{"id":"US","value":"United States"},"countryiso3code":"USA","date":"1974","value":213854000,"unit":"","obs_status":"","decimal":0}]}
//    const j2=  {"years":[{"countryiso3code":"USA","date":"2022","value":'333287557'},{"countryiso3code":"USA","date":"2021","value":'332031554'},{"countryiso3code":"USA","date":"2020","value":'331511512'},{"countryiso3code":"USA","date":"2019","value":'328329953'}]};
         
// const j1= {"page":1,"pages":2,"per_page":50,"total":64,"sourceid":"2","lastupdated":"2024-03-28"}

// const f =  new File(fileName:"/files/usa_population.json");
      // const reader = new FileReader();

      function saveBlob(blob:Blob, fileName:string) {
        var a = document.createElement("a");
        document.body.appendChild(a);
      //  a.style = "display: none";
    
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
      // const j = reader.readAsText('/files/usa_population.json')\
      documentViewer.addEventListener('documentLoaded', async () => {
        console.log('A0');
        await PDFNet.initialize();
        const doc = await documentViewer.getDocument().getPDFDoc();
    console.log('A1');
        // Run PDFNet methods with memory management
        await PDFNet.runWithCleanup(async () => {
          console.log('A2');
          // lock the document before a write operation
          // runWithCleanup will auto unlock when complete
          doc.lock();
          console.log('AA3');
          // Add an StdSignatureHandler instance to PDFDoc, making sure to keep track of it using the ID returned.
          const sigHandlerId = await doc.addStdSignatureHandlerFromURL('/files/newpkcs12.pfx', 'pass.example');
          console.log('AA4');
          // Retrieve the unsigned approval signature field.
          /** * Note: Replace approvalFieldName with the field name in the document * that is being signed and approved */

     //     const firstPage = await doc.getPage(1);
//console.log(firstPage)
console.log('firstPage')
const page1 = await doc.getPage(1);
    //  const newField = await doc.fieldCreate('NewField',  PDFNet.Field.Type.e_signature)
      const approvalSigField = await doc.createDigitalSignatureField("newfield");
    //       const sigField = await PDFNet.SignatureWidget.createWithField(
    //         doc,
    //         await PDFNet.Rect.init(400, 100, 600, 150),
    //         newField as any
    //       );
    //       await sigField.refreshAppearance();//
    //       await page1.annotPushBack(sigField);
    console.log(approvalSigField)
           console.log('A5');
          const foundApprovalField = await doc.getField("newField");
          console.log(foundApprovalField);
        //  const approvalSigField = await PDFNet.DigitalSignatureField.createFromField(foundApprovalField);
         // const approvalSigField = await doc.createDigitalSignatureField();

        // const sigField1= await doc.createDigitalSignatureField("employee.signature");
        // const signature = await PDFNet.SignatureWidget.createWithField(
        //   doc,
        //   await PDFNet.Rect.init(0, 100, 200, 150),
        //     // @ts-ignore
        //   sigField1 
        // );
        // await signature.refreshAppearance();
        // await page1.annotPushBack(signature);

       console.log(approvalSigField);
           console.log('A6');
          // // (OPTIONAL) Add more information to the signature dictionary.
         //  await approvalSigField.setLocation("Vancouver, BC");
          // await approvalSigField.setReason("Document approval.");
          // await approvalSigField.setContactInfo("www.apryse.com");
          console.log('A6.1');
          // // (OPTIONAL) Add an appearance to the signature field.
          const img = await PDFNet.Image.createFromURL(doc, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWxmJAnpUp0HOruTptDma_939-fQDnzMzgbzmqs6dZuw&s');
        //  //const img = await PDFNet.Image.c
          const approvalSignatureWidget = await PDFNet.SignatureWidget.createWithDigitalSignatureField(doc, await PDFNet.Rect.init(400, 100, 600, 150), approvalSigField);
          console.log('A6.2'); 
          await approvalSignatureWidget.createSignatureAppearance(img);

         //  const page1 = await doc.getPage(1);
           page1.annotPushBack(approvalSignatureWidget);
          console.log('AA7');
          // Prepare the signature and signature handler for signing.
          await approvalSigField.signOnNextSaveWithCustomHandler(sigHandlerId);
          console.log('A8');
          // The actual approval signing will be done during the save operation.
          const buf = await doc.saveMemoryBuffer(0);
          const blob = new Blob([buf], { type: 'application/pdf' });
          saveBlob(blob,'signed_doc.pdf');
          console.log('A9');
       //   saveAs(blob, 'signed_doc.pdf');
        }, 'demo:1691546275889:7c59401e03000000008d32a204e8ee933c71f5612baed9652518f1a03b');

      });
      function replacer(key:string, value:object) {
        // Filtering out properties
          // @ts-ignore
        if (value && value !== 'null' && value !== 'undefined')
        {
          if (typeof value === "number") {
            // @ts-ignore
      return value.toString();
    }
    return value;
        }
        return 'null'
        // if (typeof value === "number") {
        //         // @ts-ignore
        //   return value.toString();
        // }
        // return value.toString();;
      }

      // const js = JSON.stringify(k, replacer)
      // console.log(js); 
      // await doc.applyTemplateValues(JSON.parse(js));

      // // console.log('bbb'); 
      // const data = await doc.getFileData({ downloadType: "pdf", finishedWithDocument: true });
      // console.log(data);
      // console.log('data');
      // instance.Core.documentViewer.loadDocument(data, { extension: 'pdf' });


      // const js = JSON.stringify(k, replacer)
      // console.log(js); 
   //   await doc.applyTemplateValues(JSON.parse(js));

     // console.log('bbb'); 
    //   const data = await doc.getFileData({ downloadType: "templateFilledOffice", finishedWithDocument: true });
    //   // console.log(data);
    //   // console.log('data');
    //   // instance.Core.documentViewer.loadDocument(data, { extension: 'docx' });

    //        const file = new File([data], "filled.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    // await  instance.Core.documentViewer.loadDocument(file, { extension: 'docx', enableOfficeEditing: true  });


      //await instance.Core.documentViewer.loadDocument('/files/US_popn.docx', {extension:"docx", enableOfficeEditing: true, officeOptions: {doTemplatePrep: true, templateValues: { lastupdated: '1-2-3', }}})

    //  console.log('DDD');
      // @ts-ignore
      //   instance.UI.disableFeatures([instance.UI.Feature.ThumbnailMultiselect]);
      //   instance.UI.disableFeatures([instance.UI.Feature.ThumbnailReordering, instance.UI.Feature.ThumbnailMerging]);

      //   instance.UI.disableElements(['pageManipulationOverlayButton', 'pageManipulationOverlay', 'thumbDelete']);
    });
  }, []);
  //  instance.UI.enableElements(['contentEditButton']);
  //   instance.UI.disableElements(['ThumbnailMultiselect']);
  //   'MultipleViewerMerging',
  // ]);
  // const {Core} = instance;
  // const{ annotationManager} = Core;

  // const selectedAnnotation = annotationManager.getSelectedAnnotations()[0];

  // console.log('AAAAA');
  // const { Core } = instance;
  // const { documentViewer } = Core;

  // //Optional: Use this to preload the worker if you know that the user will edit the PDF
  //  const contentEditManager = new ContentEditManager(documentViewer);
  //  Core.ContentEdit.preloadWorker(contentEditManager);

  // const contentEditTool = documentViewer.getTool(Core.Tools.ToolNames.CONTENT_EDIT);
  // documentViewer.setToolMode(contentEditTool);
  // const selectedAnnotations = annotationManager.getSelectedAnnotations();
  // console.log(selectedAnnotations);
  // console.log('selectedAnnotation');

  // instance.UI.disableElements(['outlinesPanelButton']);
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
  // annotationManager.addEventListener('annotationChanged', async (annotations, action) => {
  //     // @ts-ignore 
  //   annotations.forEach(async (annot) => {

  //     console.log( annot.getAssociatedLinks())
  //     console.log ('type')
  //     if (annot.isContentEditPlaceholder()) {

  //       const content = await Core.ContentEdit.getDocumentContent(annot);

  //     //  console.log(content);
  //       console.log ('Valid')
  //     }
  //     else{
  //       console.log(annot)
  //       console.log ('Not valid')
  //     }

  //   });
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
  //  });
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

  //   });
  // }, []);

  console.log("BBB1");
  return (
    <div className="App">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;