
import * as firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCBm9FtSUx3lFgxxKZKMHLjealg1e5JOis",
    authDomain: "vue-notez.firebaseapp.com",
    databaseURL: "https://vue-notez.firebaseio.com",
    projectId: "vue-notez",
    storageBucket: "vue-notez.appspot.com",
    messagingSenderId: "890847432340",
    appId: "1:890847432340:web:d4139cef5622503b3e6e81"
  };
  export const db = firebase
    .initializeApp({ projectId: firebaseConfig.projectId })
    .firestore()
    