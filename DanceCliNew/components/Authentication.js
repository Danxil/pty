import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View } from 'react-native';
import withAuthentication from '../containers/withAuthentication';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Container from "./Container";

class Authentication extends Component {
  constructor() {
    super();

    this.state = {
      isNewUser: true,
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      this.props.subscribe(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token && !this.props.token) {
      this.props.subscribe(nextProps.token);
    }

    if (nextProps.userData && !this.props.userData) {
      if (this.state.isNewUser) {
        this.props.navigation.navigate('SignUpSuccess');

        setTimeout(() => {
          this.props.navigation.navigate('Home');
        }, 2000);
      } else {
        this.props.navigation.navigate('Home');
      }
    }
  }

  toggleNewUser(isNewUser = !this.state.isNewUser) {
    this.setState({ isNewUser });
  }

  render() {
    return (
      <Container>
        <View style={{ width: '100%' }}>
          {
            this.state.isNewUser ?
              <SignUp toggleNewUser={() => { this.toggleNewUser(); }} /> :
              <SignIn toggleNewUser={() => { this.toggleNewUser(); }} />
          }
        </View>
      </Container>
      )
  }
}

Authentication.defaultProps = {
  userData: null,
  token: null,
};

Authentication.propTypes = {
  subscribe: PropTypes.func.isRequired,
  token: PropTypes.string,
  userData: PropTypes.object,
};

export default withAuthentication(Authentication);
