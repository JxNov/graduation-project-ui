import os from 'os'

export default defineEventHandler(() => {
  const networkInterfaces = os.networkInterfaces()

  const wifi = networkInterfaces['Wi-Fi']
  const ethernet = networkInterfaces['Ethernet']

  return { wifi, ethernet }
})