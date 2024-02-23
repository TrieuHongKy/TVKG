<template>
  <div>
    <div class="profile__section flex flex-col md:flex-row h-auto">
      <div class="profile__information--avatar">
        <UAvatar
          class="cursor-pointer"
          :src="info?.image"
          :alt="info?.name"
          chip-color="primary"
          chip-text=""
          chip-position="bottom-right"
          size="3xl"
          @click="uploadFile = true"
        />
        <UModal v-model="uploadFile" :overlay="true">
          <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
              <div class="flex items-center text-lg">
                <p>Cập nhật ảnh đại diện</p>
              </div>
            </template>
            <UploadImage v-model="selectedFile" :file="file as any" />
            <template #footer>
              <div class="flex gap-4 justify-end">
                <div class="CancelButton">
                  <UButton
                    :ui="{ rounded: 'rounded-full' }"
                    size="lg"
                    color="primary"
                    variant="solid"
                    class="px-6"
                    @click="uploadFile = false"
                    >Hủy</UButton
                  >
                </div>
                <div class="DeletaButton">
                  <UButton
                    type="submit"
                    :ui="{ rounded: 'rounded-full' }"
                    size="lg"
                    color="primary"
                    variant="outline"
                    class="px-6"
                  >
                    Lưu
                  </UButton>
                </div>
              </div>
            </template>
          </UCard>
        </UModal>
      </div>
      <div class="profile__information--content">
        <p class="profile__information--name">
          {{ info?.name }}
        </p>
        <p v-if="info?.address" class="profile__information--infor">
          <UIcon class="shrink-0" name="i-heroicons-map-pin" />
          {{ info?.address ? info?.address + ',' : '' }}
          {{ address?.ward?.name ? address?.ward?.name + ',' : '' }}
          {{ address?.district?.name ? address?.district?.name + ',' : '' }}
          {{ address?.province?.name ? address?.province?.name : '' }}
        </p>
        <p v-if="info?.email" class="profile__information--infor">
          <UIcon name="i-heroicons-envelope" />
          {{ info?.email }}
        </p>
        <p v-if="info?.phone" class="profile__information--infor">
          <UIcon name="i-heroicons-phone" />
          {{ info?.phone }}
        </p>
      </div>
      <div v-if="isOwnerProfile" class="profile__information--action">
        <!-- <UButton
          color="primary"
          variant="outline"
          size="md"
          :ui="{ rounded: 'rounded-full' }"
          class="profile__information--button"
        >
          <nuxt-link>Xem Công Khai</nuxt-link>
        </UButton> -->
        <UButton
          color="primary"
          size="md"
          :ui="{ rounded: 'rounded-full' }"
          class="profile__information--button"
          @click="openTemplate('editInformation')"
          >Cập nhật thông tin</UButton
        >
      </div>
    </div>
    <UModal v-if="isOwnerProfile" v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'editInformation'">Thông tin cá nhân</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'editInformation'" class="flex flex-col gap-4">
              <div class="grid gap-3">
                <div class="flex flex-col gap-1">
                  <label for="first_name">Họ và Tên</label>
                  <UInput v-model="name" placeholder="Hãy nhập tên của bạn..." size="lg" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Tỉnh / Thành phố</label>
                  <USelectMenu
                    v-model="province"
                    :searchable="provinces"
                    :options="provinces"
                    placeholder="Tỉnh / Thành phố"
                    searchable-placeholder="Tìm kiếm địa điểm..."
                    size="xl"
                    option-attribute="name"
                    @change="getDistricts(province.id)"
                  >
                    <template #option="{ option: m }">
                      <span class="truncate">{{ m.name }}</span>
                    </template>
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> không tồn tại
                    </template>
                  </USelectMenu>
                </div>
                <div class="flex flex-col gap-1">
                  <label>Quận / Huyện</label>
                  <USelectMenu
                    v-model="district"
                    :disabled="!province"
                    :searchable="districts"
                    :options="districts"
                    placeholder="Quận / Huyện"
                    searchable-placeholder="Tìm kiếm địa điểm..."
                    size="xl"
                    option-attribute="name"
                    @change="getWards(district.id)"
                  >
                    <template #option="{ option: m }">
                      <span class="truncate">{{ m.name }}</span>
                    </template>
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> không tồn tại
                    </template>
                  </USelectMenu>
                </div>
                <div class="flex flex-col gap-1">
                  <label>Phường / Xã</label>
                  <USelectMenu
                    v-model="ward"
                    :disabled="!province || !district"
                    :searchable="wards"
                    :options="wards"
                    placeholder="Phường / Xã"
                    searchable-placeholder="Tìm kiếm địa điểm..."
                    size="xl"
                    option-attribute="name"
                  >
                    <template #option="{ option: m }">
                      <span class="truncate">{{ m.name }}</span>
                    </template>
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> không tồn tại
                    </template>
                  </USelectMenu>
                </div>
                <div class="flex flex-col gap-1">
                  <label>Địa chỉ chi tiết</label>
                  <UInput v-model="addressDetail" placeholder="Hãy nhập địa chỉ của bạn" size="lg" />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Email</label>
                  <UInput v-model="email" type="email" placeholder="Nhập Email của bạn" size="lg" disabled />
                </div>
                <div class="flex flex-col gap-1">
                  <label>Số điện thoại</label>
                  <UInput v-model="phone" placeholder="Nhập số điện thoại của bạn" size="lg" />
                </div>
              </div>
              <!-- <i v-if="newInfor.error.value !== ''" class="text-xs text-red-600">{{ newInfor.error.value }}</i> -->
            </div>
          </div>
        </UFormGroup>
        <template #footer>
          <div class="flex gap-4 justify-end">
            <div class="CancelButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="cancelInformation()"
                >Hủy</UButton
              >
            </div>
            <div class="SaveButton">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="solid"
                class="px-6"
                @click="updateInformation()"
                >Lưu</UButton
              >
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Address } from '~/types/profile'

export default defineComponent({
  props: {
    infor: {
      type: Object,
      default: null
    },
    addressData: {
      type: Object,
      default: null
    },
    isOwnerProfile: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update-information'],
  async setup(props, { emit }) {
    const addressStore = useAddressStore()
    const { provinces, districts, wards, province, district, ward } = storeToRefs(addressStore)
    const { getDistricts, getWards } = addressStore

    // const toggleRef = ref(props.public)
    // const toggleClicked = () => {
    //   toggleRef.value = !toggleRef.value
    //   emit('public-profile', toggleRef.value)
    // }
    const uploadFile = ref(false)
    const selectedFile = ref()
    const { addressData } = props
    const openModal = ref(false)
    const nameModal = ref('')

    const file = computed(() => {
      if (selectedFile.value) {
        return URL.createObjectURL(selectedFile.value)
      }
    })

    const profileStore = useProfileStore()
    const { info } = storeToRefs(profileStore)
    const setInfo = profileStore.setInfo

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }

    const name = ref('')
    const address = ref<Address | null>(null)
    const email = ref('')
    const phone = ref('')
    const image = ref()
    const addressDetail = ref('')

    onMounted(async () => {
      await addressStore.getProvinces()
      await setInfo(props.infor)
      name.value = props.infor?.name
      address.value = addressData as Address
      email.value = props.infor?.email
      phone.value = props.infor?.phone
      // image.value = props.infor?.image
      addressDetail.value = props.infor?.address
    })

    // function onFileChange(event: { target: { files: any[] } }) {
    //   const file = event.target.files[0]
    //   // Do something with the file
    // }

    const updateInformation = () => {
      emit('update-information', {
        name: name.value,
        // address: address.value,
        phone: phone.value,
        image: image.value,
        address: addressDetail.value,
        province_id: province.value.id,
        district_id: district.value.id,
        ward_id: ward.value.id
      })
      openModal.value = false
      nameModal.value = ''
    }

    const cancelInformation = () => {
      // image.value = props.image
      name.value = props?.infor?.name
      addressDetail.value = props?.infor?.address
      email.value = props?.infor?.email
      phone.value = props?.infor?.phone
      openModal.value = false
    }
    return {
      getDistricts,
      getWards,
      province,
      provinces,
      districts,
      district,
      wards,
      ward,
      name,
      addressDetail,
      address,
      image,
      phone,
      email,
      info,
      selectedFile,
      file,
      uploadFile,
      // profileId,
      // toggleRef,
      // toggleClicked,
      // newInfor,
      // saveInformation,
      cancelInformation,
      openModal,
      nameModal,
      openTemplate,
      updateInformation
    }
  }
})
</script>

<style scoped>
.profile__information--avatar {
  @apply relative w-2/3 mx-auto md:mx-0 md:w-1/6 rounded-full flex justify-center items-center mb-4 md:mb-0;
}
.profile__information--content {
  @apply w-full md:w-5/12 text-center md:text-left p-4 flex flex-col gap-2;
}
.profile__information--name {
  @apply font-semibold w-full text-xl dark:text-tertiary-light;
}
.profile__information--infor {
  @apply flex items-center justify-center md:justify-start md:items-center gap-1 md:gap-2 w-full mx-auto md:mx-0 rounded-2xl;
}
.profile__information--action {
  @apply w-full md:w-5/12 flex items-center justify-center md:justify-end gap-2;
}
.profile__information--button {
  @apply flex justify-center px-6;
}
</style>
