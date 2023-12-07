import React from 'react';
import {
  Alert,
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useCallback, useState, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const canGoNext = email && password;

  const onChangeEmail = useCallback((text: any) => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback((text: any) => {
    setPassword(text);
  }, []);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);
  return (
    <View>
      <View style={Styles.inputWrapper}>
        <Text style={Styles.label}>이메일</Text>
        <TextInput
          style={Styles.textInput}
          placeholder="이메일을 입력해주세요."
          onChangeText={onChangeEmail}
          value={email}
          importantForAccessibility="yes" // 여기부터 아래 3개 로그인 자동완성 시켜주는 기능
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next" // 키보드에서 다음버튼
          keyboardType="email-address" //키보드타입 이메일의경우 @ 자동으로 띄워줌
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }} //엔터눌렀을때
          blurOnSubmit={false} //키보드 내려갔다 나오게 하지않고 유지시키기
          ref={emailRef}
        />
      </View>
      <View style={Styles.inputWrapper}>
        <Text style={Styles.label}>비밀번호</Text>
        <TextInput
          style={Styles.textInput}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          importantForAccessibility="yes"
          autoComplete="password"
          textContentType="newPassword"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
          clearButtonMode="while-editing" //텍스트입력하면 지우기 뜨는 기능인데 ios에서만됨
        />
      </View>
      <View style={Styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? Styles.loginButton
              : [Styles.loginButton, Styles.loginButtonActive]
          }
          disabled={!canGoNext}>
          <Text style={Styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  textInput: {
    padding: 5,
    // borderBottomWidth: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fonrWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
  },
  buttonZone: {
    alignItems: 'center',
  },
});

export default SignIn;
