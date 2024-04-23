import React from "react";

type TextContentPanelProps = {
    getTextOnPage: () => Promise<string>;
    documentViewer: any
  };
  
  class TextContentPanel extends React.Component<TextContentPanelProps> {
    state = { text: 'text' };
    loadText = async () => {
      const text = await this.props.getTextOnPage();
      if (text) {
        if (text.length > 0) {
          this.setState({ text });
        }
      }
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
  };

  export default TextContentPanel;