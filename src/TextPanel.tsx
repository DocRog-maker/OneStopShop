   // @ts-ignore comment.
export default  function TextPanel({props}) {
    // const [currentTxt, setCurrentTxt] = useState<string>('');
  //  console.log(currentTxt);
    console.log(props);
    console.log('currentTxt ^^');
    const logit=()=>{
        console.log({ props}); 
        console.log('-----'); 
    }
    return (
        <>
          {console.log('Rendering')}
         {console.log(props)}
         {console.log('^^^^^^^')}
         {/* <div> */}
        <div onClick={logit} className='textpanel'>
        <div onResize={logit} className='textpanel'>
       ' { props}'
        </div>
        </div>
        </>
    );
}
