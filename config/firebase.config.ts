import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const config = useRuntimeConfig()

// const firebaseConfig = {
//   apiKey: 'AIzaSyD21GU-c6vaukfHMRCjhW3rfpPqrTIs56g',
//   authDomain: 'storage-d1deb.firebaseapp.com',
//   projectId: 'storage-d1deb',
//   storageBucket: 'storage-d1deb.appspot.com',
//   messagingSenderId: '409222404789',
//   appId: '1:409222404789:web:0e51dce54558289c5efcfc',
//   measurementId: 'G-M0RR3VSLM5'
// }

const firebaseConfig = {
  apiKey: config.public.firebase.apiKey,
  authDomain: config.public.firebase.authDomain,
  projectId: config.public.firebase.projectId,
  storageBucket: config.public.firebase.storageBucket,
  messagingSenderId: config.public.firebase.messagingSenderId,
  appId: config.public.firebase.appId,
  measurementId: config.public.firebase.measurementId
}

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

export { storage }