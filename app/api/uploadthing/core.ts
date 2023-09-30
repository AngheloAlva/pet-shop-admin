import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const auth = (req: Request) => ({ id: 'fakeId' })

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error('Unauthorized')
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload comlete for userId: ', metadata.userId)
      console.log('File url', file.url)
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
