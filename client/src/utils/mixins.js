import axios from 'axios'
import moment from 'moment'
import 'moment/locale/zh-tw'

export const timeTransformFilter = {
  filters: {
    timeTransform (timestamp) {
      if (!timestamp) return '-'
      return moment(timestamp).format('LL')
    }
  }
}

export const dateFormatterFilter = {
  methods: {
    dateFormatter (date) {
      return moment(date).format('LL')
    }
  }
}

export const placeholderAvatarFilter = {
  filters: {
    placeholderAvatar (url) {
      if (url) return url
      return 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    }
  }
}

export const dateTransformFilter = {
  filters: {
    dateTransform (timestamp) {
      if (!timestamp) return '-'
      return moment(timestamp).format('YYYY-MM-DD')
    }
  }
}

export const padEndFilter = {
  filters: {
    padEnd (value) {
      if (!value) return '-'
      return value.toString().padEnd(3, '.0')
    }
  }
}

export const textTruncateFilter = {
  filters: {
    textTruncate (content, textLength = 50) {
      if (!content.length) return '無介紹'
      if (content.length <= textLength) return content
      return `${content.slice(0, textLength)}...`
    }
  }
}

export const getGeoMethods = {
  methods: {
    async getLocation (storeLocation) {
      // update processing status
      this.isProcessing = true
      // Get geocoding location
      try {
        const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode'
        const language = 'zh-TW'
        const activeDistricts = ['信義區', '大安區', '中山區', '松山區']
        const addressGroup = document.querySelector('.form-address-group')
        const { data } = await axios.get(`${BASE_URL}/json?address=${this[storeLocation].address}&language=${language}&components=country:TW&key=${this.apiKey}`)

        let addressComponents = []
        let district = []

        // check if it's not zero result
        if (data.results.length) {
          // Retrieve district from data
          addressComponents = data.results[0].address_components
          district = addressComponents.filter(item => activeDistricts.includes(item.long_name))
        }

        // validate address
        if (data.status !== 'OK' || !district.length || addressComponents.length <= 4) {
          // set address form group to invalid
          addressGroup.classList.add('invalid')
          // show warning message
          this.validationMsg.address = '請確認為台北市信義、松山、大安、中山區的完整地址'
          this.isProcessing = false
          return
        }

        // clear invalid and warning sign
        addressGroup.classList.remove('invalid')
        this.validationMsg.address = ''

        // update location data
        this[storeLocation].lat = data.results[0].geometry.location.lat
        this[storeLocation].lng = data.results[0].geometry.location.lng
        this[storeLocation].location = district[0].long_name
        this[storeLocation].address = data.results[0].formatted_address
        this.afterReceiveGeo()
      } catch (error) {
        // update processing status
        this.isProcessing = false
        this.warningMessage = 'Oops！設定時有些狀況，請稍後再試！'
      }
    }
  }
}

export const handleFileChangeMethod = {
  methods: {
    handleFileChange (event, targetName) {
      const files = event.target.files
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this[targetName].image = imageURL
    }
  }
}
