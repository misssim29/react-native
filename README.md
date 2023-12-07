# REACT-NATIVE

## 공식사이트

리액트 공식사이트 : <https://reactnative.dev/>

리액트 네비게이션사이트(Route) : <https://reactnavigation.org/>

## 윈도우 세팅하기

1.  window powershell 에서 choco 써보고
    Chocolatey v1.2.0(버전 다를수 있음)
    Please run 'choco -?' or 'choco <command> -?' for help menu.
    나오면 깔려있는거 없으면 직접 설치해야함
    <https://chocolatey.org/install>

2.  choco install -y nodejs-lts microsoft-openjdk11

3.  android studio 설치
    Android SDK에서
    ![Alt text](image.png)
    30버전으로 설치
    ![Alt text](image-1.png)
    이미지와같이 설치

4.  환경변수 설정
    환경변수 검색해서 ![img.png](img.png)
    변수명 ANDROID_HOME 설치한 sdk 폴더랑 연결
    자바설치하고
    JAVA_HOME 변수 설정!! -> git bash로 경로 찾아서 연결

> javac 설치경로 확인하는 방법

git bash 열어서 which choco, which javac 하면 경로 나옴
(없으면 java부터 설치해야함)

## MAC IOS+Window 셋팅 (ios는 macbook 있어야함...)

1.  터미널 켜서 which brew 해서 버전 안나오면
    <https://brew.sh/> 가서 설치

2.  brew install node, brew install watchman 설치

brew tap homebrew/cask-versions

brew install --cask zulu11

<https://reactnative.dev/docs/environment-setup?guide=native&platform=android&os=macos&package-manager=npm> 참고

3. 앱스토어로 가서 xcode 설치

4. android studio 맥용으로 설치

5. 환경변수 설정 <https://kitty-geno.tistory.com/166>

6. command line tools 설치 <https://reactnative.dev/docs/environment-setup?guide=native&platform=ios&os=macos&package-manager=npm> 참고

7. sudo gem install cocoapods

8. 프로젝트 생성

9. xcode로 workspace 열어주기

---

## react-native 설치

npm i -g react-native

react-native init 프로젝트명 --template react-native-template-typescript

## android studio 셋팅

![Alt text](image-3.png) 오른쪽 위 버튼 클릭

![Alt text](image-4.png) create device

대충 작은 디바이스 선택하고(갤럭시 폴드같은거) next 누르고 R 다운로드

터미널에서 npm run android

## 에뮬레이터 실행 안될때

https://ninedc.tistory.com/71 참고(JAVA 버전 높아서 생기는 문제)

powershell 관리자권한으로 실행

npx react-native run-android
cd android
./gradlew wrapper clean
cd ..
npx react-native run-android

## flipper 설치

(console이나 devtool 확인하는거)

powshell 관리자로 열어서 choco install openssl

(ios는 watchman도 설치)

npm i react-native-flipper redux-flipper rn-async-storage-flipper @react-native-async-storage/async-storage --force

### flipper plugin 추천

async-storage

redux-debugger

## 앱이름 바꾸는법

![Alt text](image-6.png)

1. app.json에 displayName 변경
2. android>app>src>main>res>values>strings.xml 에서 app_name 변경
3. ios> 파일명> info.plist 에서 원래이름부분 변경

```
<key>CFBundleDisplayName</key>
<string>원래이름</string>
```

## 라우터(네비) 설치

npm i @react-navigation/native @react-navigation/native-stack
npm i react-native-screens react-native-safe-area-context

cd ios > npx pod-install (ios 전용)

npm install @react-navigation/bottom-tabs

## Components

참고 : <https://reactnative.dev/docs/components-and-apis>

### 버튼의 종류

제일 기본적인거 : Pressable (나머지는 운영체제마다 다르게 나타날수있어서)
Pressable, TouchableNativeFeedback, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback
