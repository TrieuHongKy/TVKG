<template>
  <div class="map--content">
    <div class="map--box basis-1 md:basis-1/2">
      <div v-for="map in mapInfo" :key="map.id" class="map--address">
        <div class="map--info">
          <h1 class="map--title">{{ map.companyName }}</h1>
          <h2 class="map--text">{{ map.address }}</h2>
          <a class="map--text" :href="'tel:' + map.phone">Điện thoại: {{ map.phone }}</a>
          <a class="map--text" :href="'mailto:' + map.email">Email: {{ map.email }}</a>
        </div>
        <div class="map--frame">
          <iframe
            :src="map.map"
            width="100%"
            height="310"
            style="border: 0"
            :allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Văn phòng đại diện của TVKG.vn"
          ></iframe>
        </div>
      </div>
    </div>
    <div class="map--form basis-1 md:basis-1/2 p-4 rounded-lg border mt-4 dark:border-gray-600 h-fit">
      <h1 class="map--formtitle text-primary font-semibold text-xl text-center md:text-left mt-0 mb-6">
        Gửi thông tin liên hệ
      </h1>
      <form class="form">
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              id="floating_name"
              v-model="name"
              type="text"
              name="floating_name"
              class="map--forminput peer"
              required
            />
            <label for="floating_name" class="map--formlabel">Họ và tên</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              id="floating_phonenumber"
              v-model="phone"
              type="tel"
              name="floating_phonenumber"
              class="map--forminput peer"
              required
            />
            <label for="floating_phonenumber" class="map--formlabel">Điện thoại</label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-6 group">
            <input
              id="floating_phone"
              v-model="email"
              type="email"
              name="floating_email"
              class="map--forminput peer"
              required
            />
            <label for="floating_phone" class="map--formlabel">Email</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              id="floating_address"
              v-model="address"
              type="text"
              name="floating_adress"
              class="map--forminput peer"
              required
            />
            <label for="floating_address" class="map--formlabel">Địa chỉ</label>
          </div>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <textarea
            id="floating_content"
            v-model="content"
            rows="10"
            name="floating_content"
            class="map--forminput peer"
            required
          ></textarea>
          <label for="floating_content" class="map--formlabel">Nội dung liên hệ</label>
        </div>
        <div class="w-full md:w-1/6">
          <UButton class="w-full rounded-2xl justify-center" @click="addContact()">Gửi</UButton>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { Contact } from '~/types/contact'

export default defineComponent({
  name: 'InfoWidget',
  setup() {
    const contactStore = useContactStore()
    const { contact } = storeToRefs(contactStore)
    const { createContact } = contactStore
    const authStore = useAuthStore()
    const { user } = storeToRefs(authStore)

    const name = ref('')
    const phone = ref('')
    const email = ref('')
    const address = ref('')
    const content = ref('')

    const contactData = ref<Array<Contact>>([])

    onMounted(async () => {
      // await createContact()
    })

    const addContact = async () => {
      await createContact({
        id: 0,
        user_id: user.value?.id,
        name: name.value,
        email: email.value,
        address: address.value,
        content: content.value,
        phone: phone.value
      } as unknown as Contact)
    }

    const mapInfo = [
      {
        id: 1,
        companyName: 'Trụ sở  TimViecKienGiang.vn',
        address: 'Thường Thạnh, Cái Răng, Cần Thơ',
        phone: '0799.999.888',
        email: 'tvkg-contact@gmail.com',
        map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125728.97736769015!2d103.9336525045832!3d10.014335777826153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a797ae3123a7d9%3A0x777f083ade3cbcd3!2zVMOsbSBWaeG7h2MgS2nDqm4gR2lhbmc!5e0!3m2!1svi!2s!4v1691074911822!5m2!1svi!2s'
      }
    ]
    return {
      name,
      email,
      phone,
      address,
      content,
      mapInfo,
      addContact,
      contactData
    }
  }
})
</script>
<style scoped>
.map--content {
  @apply flex flex-col md:flex-row gap-4;
}
.map--address {
  @apply rounded-lg border mt-4 p-4 dark:border-gray-600;
}
.map--address .map--info {
  @apply text-center md:text-left basis-1/2 md:my-auto mb-4;
}
.map--info .map--title {
  @apply text-primary font-semibold text-xl;
}
.map--info .map--text {
  @apply text-sm my-4 dark:text-tertiary-light block;
}
.map--frame {
  @apply flex justify-center basis-1/2 rounded-lg;
}
.map--formlabel {
  @apply peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6;
}
.map--forminput {
  @apply block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary;
}
</style>
