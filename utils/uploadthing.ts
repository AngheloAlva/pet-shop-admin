import { generateComponents } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()

// use in a component like this:
// import '@uploadthing/react/styles.css'

// const MyComponent = () => {
// <UploadButton
//   endpoint='imageUploader'
//   onClientUploadComplete={(res) => {
//     console.log('Files: ', res)
//     alert('Files uploaded successfully!')
//   }}
//   onUploadError={(error: Error) => {
//     alert(`ERROR!!! ${error.message}`)
//   }}
// />
// }
