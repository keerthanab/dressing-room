module.exports = {
  variants: {
    items: {
      resize: {
        mini : "300x200",
        preview: "800x600"
      },
      crop: {
        thumb: "200x200"
      },
      resizeAndCrop: {
        large: {resize: "1000x1000", crop: "900x900"}
      }
    },

    gallery: {
      crop: {
        thumb: "100x100"
      }
    },
	
	projects: "dressing-room"
  },

  storage: {
    Rackspace: {
      auth: {
        username: "USERNAME",
        apiKey: "API_KEY",
        host: "lon.auth.api.rackspacecloud.com"
      },
      container: "CONTAINER_NAME"
    },
    S3: {
      key: '',
      secret: '',
      bucket: 'chiti',
      region: 'us-standard'
    }
  },

  debug: true
}