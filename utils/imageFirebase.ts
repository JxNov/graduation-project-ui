import { getDownloadURL, ref as firebaseRef } from 'firebase/storage'
import { storage } from '~/config/firebase.config'

export const getImageFirebase = async (username: string, imageArr: string) => {
  if (!imageArr) return ''
  const images = imageArr.replace(/[\[\]'"]+/g, '').split(',')
  const storageRef = firebaseRef(storage, `images/${username}/${images[0]}`)
  return await getDownloadURL(storageRef)
}

export const getAllImagesFirebase = async (username: string, imageArr: string) => {
  if (!imageArr) return []
  const images = imageArr.replace(/[\[\]'"]+/g, '').split(',')
  const promises = images.map(async (image) => {
    const storageRef = firebaseRef(storage, `images/${username}/${image}`)
    return await getDownloadURL(storageRef)
  })

  return await Promise.all(promises)
}