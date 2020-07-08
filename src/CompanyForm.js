import React, {useEffect} from "react"

class CompanyForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {name:"",info:""}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleSubmit(event){
    event.preventDefault()
    alert("submitted: " + this.state.name + "  /  " + this.state.info  )
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }


  // useEffect(function(){
  //   initBtn()
  // },[]);

  render(){
    return(
      <form className="form-group mx-2" onSubmit={this.handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            className="form-control"
            id="company-name"
            required
          />
        </label>
        <br / >
        <label>
          Company Info:
          <textarea
            type="text"
            value={this.state.info}
            onChange={this.handleChange}
            name="info"
            className="form-control"
            id="company-info"
            required
          />
        </label>
        <br / >
        <input
          type="submit"
          className="my-2 btn btn-primary bg-wb"
          value="Upload"
          id="submit-btn"
        />
      </form>

    );
  }


}

export default CompanyForm
