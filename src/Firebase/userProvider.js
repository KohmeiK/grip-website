import React, { Component, createContext } from "react";
import FirebaseContext from './index.js'

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  static contextType = FirebaseContext
  state = {
    user: null
  };

  componentDidMount = () => {
    const auth = this.context.auth
    auth.onAuthStateChanged(userAuth => {
      this.setState({ user: userAuth});
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
