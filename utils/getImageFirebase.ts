import { getDownloadURL, ref as firebaseRef } from 'firebase/storage'
import { storage } from '~/config/firebase.config'

export const getImageFirebase = async (username: string, imageArr: string) => {
  const images = imageArr.replace(/[\[\]'"]+/g, '').split(',')
  const storageRef = firebaseRef(storage, `${username}/${images[0]}`)
  return await getDownloadURL(storageRef)
}