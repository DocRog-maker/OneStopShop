   // @ts-ignore comment.
export default  function TextPanel({props}) {
    // const [currentTxt, setCurrentTxt] = useState<string>('');
  //  console.log(currentTxt);
    console.log(props);
    console.log('currentTxt ^^');
    return (
        <>
         {console.log(props)}
         {console.log('^^^^^^^')}
        <div className='textpanel'>
       ' { props}'
        </div>
      </>
    );
}
