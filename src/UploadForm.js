import React, {useEffect} from "react"
import Button from 'react-bootstrap/Button'

class UploadForm extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef();
  }

  handleSubmit(event){
    event.preventDefault()
    alert("Submit: " + this.fileInput.current.files[0].name)
  }

  initBtn(){
  }

  // useEffect(function(){
  //   initBtn()
  // },[]);

  render(){
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload Your Resume Here
          <input
            type="file"
            ref={this.fileInput}
            className="form-control"
            id="resume"
            name="resume"
            accept=" .pdf"
            required
          />
        </label>
        <input className="my-2 btn btn-primary bg-wb" type="submit" value="Upload" />
      </form>

      {/* progress bar */}
      <div className="progress w-25 invisible" id="progress">
          <div className="progress-bar" role="progressbar" style={{width:"0%"}} id="progress-bar">
          </div>
      </div>
      </div>
    );
  }


}

export default UploadForm
