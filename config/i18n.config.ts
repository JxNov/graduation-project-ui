const fileNames = [
  'common',
  'menu',
  'auth'
]

function getFileList(locale: string) {
  return fileNames.map(name => `${locale}/${name}.json`)
}

export default {
  legacy: false,
  locales: [
    { code: 'en', name: 'English (US)', files: getFileList('en'), iso: 'en-US', flag: 'united-states' },
    { code: 'vi', name: 'Tiếng Việt', files: getFileList('vi'), iso: 'vi-VN', flag: 'vietnam' }
  ],
  langDir: 'lang',
  defaultLocale: 'vi'
}