import axios from 'axios'
import { defineStore } from 'pinia'
import type { Contact } from '~/types/contact'

export const useContactStore = defineStore('contact', () => {
  const toast = useToast()
  const config = useRuntimeConfig()
  const contact = ref<Contact | null>(null)

  const createContact = async (data: Contact) => {
    const res = await axios.post(`${config.public.API_ROOT + config.public.API_PREFIX}/contacts`, {
      ...data
    })
    console.log('test data contact', res.data.result)
    if (res.status === 201) {
      contact.value = res.data.result
      toast.add({
        title: 'Gửi nội dung liên hệ thành công',
        icon: 'i-heroicons-check-circle-solid',
        timeout: 2000
      })
    }
    if (res.status === 422) {
      contact.value = res.data.result
      toast.add({
        title: 'Gửi nội dung liên hệ thất bại',
        icon: 'i-heroicons-x-circle-solid',
        timeout: 2000
      })
    }
  }

  return { contact, createContact }
})
