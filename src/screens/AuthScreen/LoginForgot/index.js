import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import Text from '../../../components/Text';
import axios from 'axios';
import {
  FormInput,
  ButtonSubmit,
  OutlineFormInput,
} from '../../../components/index';
import {API_URL} from '@env';

import OutlineInput from 'react-native-outline-input';

const LoginForgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = () => {
    const data = {
      email: email,
      otp: otp,
    };

    axios
      .post(`${API_URL}/auth/findOTP`, data)
      .then((res) => {
        navigation.push('Reset');
        console.log('OTP sukses', res);
      })
      .catch(({response}) => {
        setErrMsg(response.data.message);
        console.log('error forgot', response);
      });
  };

  return (
    <View style={styles.container}>
      <Text size="xl3" children="Login" type="Bold" style={styles.title} />
      <View style={styles.FormInput}>
        <Text
          size="s"
          children="We have sent an email containing a password reset instruction to your email. please check your email"
          style={styles.pass}
        />
        <Text
          style={{
            marginBottom: 10,
            color: 'red',
            paddingRight: 10,
            fontSize: 15,
            textAlign: 'center',
          }}>
          {errMsg}
        </Text>
        <View style={styles.pass}>
          <OutlineInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            label="Email"
            activeValueColor="black"
            activeBorderColor="green"
            activeLabelColor="green"
            passiveBorderColor="black"
            passiveLabelColor="black"
            passiveValueColor="black"
          />
        </View>
        <OutlineInput
          value={otp}
          onChangeText={(otp) => setOtp(otp)}
          label="Otp"
          activeValueColor="black"
          activeBorderColor="green"
          activeLabelColor="green"
          passiveBorderColor="black"
          passiveLabelColor="black"
          passiveValueColor="black"
          secureTextEntry
        />
        <ButtonSubmit title="Login" bg="red" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 60,
  },
  FormInput: {
    justifyContent: 'center',
    height: '80%',
  },
  formI: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
  },

  forgot: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  pass: {
    marginBottom: 15,
  },
});

export default LoginForgot;

// import React, {Component} from 'react';
// import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
// import Text from '../../../components/Text';
// import {
//   FormInput,
//   ButtonSubmit,
//   OutlineFormInput,
// } from '../../../components/index';

// import OutlineInput from 'react-native-outline-input';

// export default class LoginForgot extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   handleChange(text) {
//     this.setState({email: text});
//   }

//   passwordChange(pass) {
//     this.setState({password: pass});
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text size="xl3" children="Login" type="Bold" style={styles.title} />
//         <View style={styles.FormInput}>
//           {/* <FormInput label="Name" placeholder="Name" style={styles.formI} />
//           <FormInput
//             label="Password"
//             placeholder="Password"
//             style={styles.formI}
//             secureTextEntry
//           /> */}

//           {/* <OutlineFormInput label="" passiveBorderColor='red' /> */}
//           <Text
//             size="s"
//             children="We have sent an email containing a password reset instruction to your email. please check your email"
//             style={styles.pass}
//           />
//           <View style={styles.pass}>
//             <OutlineInput
//               value={this.state.email}
//               onChangeText={(text) => this.handleChange(text)}
//               label="Email"
//               activeValueColor="black"
//               activeBorderColor="green"
//               activeLabelColor="green"
//               passiveBorderColor="black"
//               passiveLabelColor="black"
//               passiveValueColor="black"
//               // keyboardType="email-address"
//               // autoCompleteType=
//             />
//           </View>
//           <OutlineInput
//             value={this.state.password}
//             onChangeText={(pass) => this.passwordChange(pass)}
//             label="Password"
//             activeValueColor="black"
//             activeBorderColor="green"
//             activeLabelColor="green"
//             passiveBorderColor="black"
//             passiveLabelColor="black"
//             passiveValueColor="black"
//             secureTextEntry
//             // style={{marginTop: 8}}
//           />
//           <TouchableOpacity>
//             <View style={styles.forgot}>
//               <Image
//                 source={require('../../../assets/image/Vector.png')}
//                 style={{marginTop: 5, marginLeft: 5, paddingHorizontal: 10}}
//               />
//               <Text
//                 size="s"
//                 children="Forgot Your Password?"
//                 type="Bold"
//                 style={{fontWeight: 'bold'}}
//               />
//             </View>
//           </TouchableOpacity>

//           <ButtonSubmit title="Login" bg="red" />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#E5E5E5',
//     height: '100%',
//     paddingHorizontal: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     marginTop: 60,
//   },
//   FormInput: {
//     justifyContent: 'center',
//     height: '80%',
//   },
//   formI: {
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//     marginBottom: 10,
//     borderRadius: 8,
//   },

//   forgot: {
//     flexDirection: 'row-reverse',
//     paddingHorizontal: 10,
//     paddingTop: 10,
//   },

//   pass: {
//     marginBottom: 15,
//   },
// });
