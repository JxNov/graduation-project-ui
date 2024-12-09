import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const config = useRuntimeConfig()

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