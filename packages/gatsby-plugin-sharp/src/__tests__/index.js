const path = require(`path`)

jest.mock(`async/queue`, () => () => {
  return {
    push: jest.fn(),
  }
})

const {
  base64,
  fluid,
  fixed,
  queueImageResizing,
  getImageSize,
} = require(`../`)

describe(`gatsby-plugin-sharp`, () => {
  const args = {
    duotone: false,
    grayscale: false,
    rotate: false,
  }
  const absolutePath = path.join(__dirname, `images/test.png`)
  const file = getFileObject(absolutePath)

  describe(`queueImageResizing`, () => {
    it(`should round height when auto-calculated`, () => {
      // Resize 144-density.png (281x136) with a 3px width
      const result = queueImageResizing({
        file: getFileObject(path.join(__dirname, `images/144-density.png`)),
        args: { width: 3 },
      })

      // Width should be: w = (3 * 136) / 281 = 1.451957295
      // We expect value to be rounded to 1
      expect(result.height).toBe(1)
    })
  })

  describe(`fluid`, () => {
    it(`includes responsive image properties, e.g. sizes, srcset, etc.`, async () => {
      const result = await fluid({ file })

      expect(result).toMatchSnapshot()
    })

    it(`adds pathPrefix if defined`, async () => {
      const pathPrefix = `/blog`
      const result = await fluid({
        file,
        args: {
          pathPrefix,
        },
      })

      expect(result.src.indexOf(pathPrefix)).toBe(0)
      expect(result.srcSet.indexOf(pathPrefix)).toBe(0)
    })

    it(`keeps original file name`, async () => {
      const result = await fluid({
        file,
      })

      expect(result.src.indexOf(file.name)).toBe(8)
      expect(result.srcSet.indexOf(file.name)).toBe(8)
    })

    it(`accounts for pixel density`, async () => {
      const result = await fluid({
        file: getFileObject(path.join(__dirname, `images/144-density.png`)),
        args: {
          sizeByPixelDensity: true,
        },
      })

      expect(result).toMatchSnapshot()
    })

    it(`can optionally ignore pixel density`, async () => {
      const result = await fluid({
        file: getFileObject(path.join(__dirname, `images/144-density.png`)),
        args: {
          sizeByPixelDensity: false,
        },
      })

      expect(result).toMatchSnapshot()
    })

    it(`does not change the arguments object it is given`, async () => {
      const args = { maxWidth: 400 }
      await fluid({
        file,
        args,
      })

      expect(args).toEqual({ maxWidth: 400 })
    })

    it(`infers the maxWidth if only maxHeight is given`, async () => {
      const args = { maxHeight: 20 }
      const result = await fluid({
        file: getFileObject(path.join(__dirname, `images/144-density.png`)),
        args,
      })

      expect(result.presentationWidth).toEqual(41)
    })
  })

  describe(`fixed`, () => {
    console.warn = jest.fn()

    beforeEach(() => {
      console.warn.mockClear()
    })

    afterAll(() => {
      console.warn.mockClear()
    })

    it(`does not warn when the requested width is equal to the image width`, async () => {
      const args = { width: 1 }

      const result = await fixed({
        file,
        args,
      })

      expect(result.width).toEqual(1)
      expect(console.warn).toHaveBeenCalledTimes(0)
    })

    it(`warns when the requested width is greater than the image width`, async () => {
      const args = { width: 2 }

      const result = await fixed({
        file,
        args,
      })

      expect(result.width).toEqual(1)
      expect(console.warn).toHaveBeenCalledTimes(1)
    })

    it(`correctly infers the width when only the height is given`, async () => {
      const args = { height: 10 }

      const result = await fixed({
        file: getFileObject(path.join(__dirname, `images/144-density.png`)),
        args,
      })

      expect(result.width).toEqual(21)
    })
  })

  describe(`base64`, () => {
    it(`converts image to base64`, async () => {
      const result = await base64({
        file,
        args,
      })

      expect(result).toMatchSnapshot()
    })
  })

  describe(`image quirks`, () => {
    // issue https://github.com/nodeca/probe-image-size/issues/20
    it(`handles padding bytes correctly`, () => {
      const result = getImageSize(
        getFileObject(path.join(__dirname, `images/padding-bytes.jpg`))
      )

      expect(result).toMatchSnapshot()
    })
  })
})

function getFileObject(absolutePath) {
  return {
    id: `${absolutePath} absPath of file`,
    name: `test`,
    absolutePath,
    extension: `png`,
    internal: {
      contentDigest: `1234`,
    },
  }
}
