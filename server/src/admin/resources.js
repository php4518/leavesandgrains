const fs = require('fs');
const path = require('path');
const uploadFeature = require('@admin-bro/upload')
const User = require('../modules/user/user.model');
const Dish = require('../modules/dish/dish.model');
const { disableAdminUserAction } = require('../utils');
const validation = {
  mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'],
}
const publicDir = path.join(__dirname, '../../public');

class MyProvider extends uploadFeature.BaseProvider {
  constructor() {
    // it requires bucket as a parameter to properly pass it to other methods
    super('public')
  }

  async delete(key, bucket, context) {
    await fs.promises.unlink(this.path(key, publicDir))
  }

  path(key, bucket, context) {
    return `/${path.join(bucket || this.bucket, key)}`;
  }

  async upload(file, key, context) {
    const filePath = this.path(key, publicDir)
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    await fs.promises.rename(file.path, filePath)
  }
}

const provider = new MyProvider()

module.exports = [
  {
    resource: User,
    options: {
      properties: {
        _id: {
          type: 'string',
          isVisible: { list: false, edit: false, filter: false, show: true },
        },
        password: {
          type: 'string',
          isVisible: { list: false, edit: true, filter: false, show: false },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                password: await User.generatePassword(request.payload.password),
              }
            }
            return request
          },
        },
        edit: { isAccessible: disableAdminUserAction },
        delete: { isAccessible: disableAdminUserAction },
      }
    }
  },
  {
    resource: Dish,
    options: {
      listProperties: ['title', 'price', 'servingWeight', 'category', 'proteinType', 'isActive'],
      properties: {
        _id: {
          isVisible: { list: false, edit: false, filter: false, show: true },
        },
        instructions: {
          type: 'richtext',
          isVisible: { list: false, edit: true, filter: false, show: true },
        },
        image: {
          isVisible: { list: false, edit: true, filter: false, show: true },
        },
        images: {
          isVisible: { list: false, edit: false, filter: false, show: false },
        },
        imageMimeType: {
          isVisible: { list: false, edit: false, filter: false, show: false },
        },
        createdAt: {
          isVisible: { list: true, edit: false, filter: true, show: true },
        },
        updatedAt: {
          isVisible: { list: true, edit: false, filter: true, show: true },
        }
      },
      actions: {
        delete: { isAccessible: false },
      }
    },
    features: [uploadFeature({
      provider,
      properties: {
        key: 'images',
        file: 'image',
        mimeType: 'imageMimeType',
      },
      uploadPath: (record, filename) => `dishes/${record.id()}/${new Date().getTime()}.${filename.split('.').pop()}`,
      multiple: true,
      validation,
    })],
  },
]
