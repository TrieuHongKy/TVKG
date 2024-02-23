import axios from 'axios'

export const useAddressStore = defineStore('address', () => {
  const provinces = ref()
  const districts = ref()
  const wards = ref()

  const province = ref()
  const district = ref()
  const ward = ref()

  const getProvinces = async () => {
    provinces.value = []
    const config = useRuntimeConfig()
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/province`)
    if (res.status === 200) {
      provinces.value = res.data.result
      districts.value = []
      wards.value = []
    }
  }

  const getDistricts = async (id: number) => {
    districts.value = []
    const config = useRuntimeConfig()
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/district/${id}`)
    if (res.status === 200) {
      districts.value = res.data.result
    }
  }

  const getWards = async (id: number) => {
    wards.value = []
    const config = useRuntimeConfig()
    const res = await axios.get(`${config.public.API_ROOT + config.public.API_PREFIX}/ward/${id}`)
    if (res.status === 200) {
      wards.value = res.data.result
    }
  }

  return {
    province,
    provinces,
    district,
    districts,
    ward,
    wards,
    getProvinces,
    getDistricts,
    getWards
  }
})
