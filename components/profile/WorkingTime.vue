<template>
  <div>
    <div class="p-4">
      <div class="flex justify-between">
        <div class="font-semibold text-lg">
          <div class="text-lg">Thời gian làm việc</div>
        </div>
        <div v-if="workTime && !public" class="flex items-center justify-center font-bold gap-3">
          <UIcon
            name="i-heroicons-pencil-square"
            class="w-5 h-5 text-center rounded-full border-primary border text-primary cursor-pointer"
            @click="openTemplate('editWorkingTime')"
          ></UIcon>
        </div>
      </div>
      <div v-if="workTime.name" class="mt-4">
        <p>{{ workTime.name }}</p>
      </div>
      <div v-if="!public && workTime.name === ''" class="mt-2">
        <p class="text-gray-500">Bạn chưa có thời gian làm việc cụ thể</p>
        <u
          class="text-sm text-green-600 font-medium hover:text-primary cursor-pointer"
          @click="openTemplate('editWorkingTime')"
          >Thêm thời gian làm việc</u
        >
      </div>
      <div v-if="public && workTime.name === ''" class="mt-2 text-gray-500">
        Tài khoản này chưa có thời gian làm việc cụ thể
      </div>
    </div>
    <UModal v-model="openModal" prevent-close>
      <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center text-lg">
            <p v-if="nameModal === 'editWorkingTime'">Thời gian làm việc</p>
          </div>
        </template>
        <UFormGroup>
          <div>
            <div v-if="nameModal === 'editWorkingTime'" class="flex flex-col gap-4">
              <div class="font-medium">Giờ làm việc hằng tuần</div>
              <p class="text-sm px-2">Chọn mức độ làm việc để chúng tôi tìm công việc phù hợp với bạn</p>
              <div class="p-2 text-sm font-medium">
                <span>Tôi có thể làm việc</span>
                <div class="pt-4 flex flex-col gap-2">
                  <URadio v-for="time of workingTime" :key="time.name" v-model="setWorkingTime" v-bind="time" />
                </div>
              </div>
              <div class="contract">
                <p class="font-medium text-sm">Hợp đồng thuê</p>
                <div class="p-2">
                  <UCheckbox
                    v-model="acceptWorkingTime"
                    name="acceptWorkingTime"
                    label="Tôi sẵn sàng đón nhận các cơ hội hợp đồng"
                  />
                  <p class="text-sm font-normal pt-2 text-gray-900 dark:text-theme-light">
                    Điều này có nghĩa là bạn sẽ bắt đầu với một hợp đồng và sau đó có thể khám phá lựa chọn toàn thời
                    gian.
                  </p>
                </div>
                <i v-if="workingTimeError !== ''" class="text-xs text-red-600">{{ workingTimeError }}</i>
              </div>
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
                variant="solid"
                class="px-6"
                @click="cancelWorkingTime()"
                >Hủy</UButton
              >
            </div>
            <div class="SaveButton">
              <UButton
                v-if="nameModal === 'editWorkingTime'"
                :ui="{ rounded: 'rounded-full' }"
                size="lg"
                color="primary"
                variant="outline"
                class="px-6"
                @click="saveWorkingTime()"
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    public: {
      type: Boolean,
      default: false
    },
    workTime: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const openModal = ref(false)
    const nameModal = ref('')
    const { workTime } = props

    const openTemplate = (modal: string) => {
      nameModal.value = modal
      openModal.value = true
    }
    const workingTime = [
      {
        name: 'Trên 40 giờ/tuần',
        value: 'Trên 40 giờ/tuần',
        label: 'Trên 40 giờ/tuần'
      },
      {
        name: 'Trên 30 giờ/tuần',
        value: 'Trên 30 giờ/tuần',
        label: 'Trên 30 giờ/tuần'
      },
      {
        name: 'Trên 20 giờ/tuần',
        value: 'Trên 20 giờ/tuần',
        label: 'Trên 20 giờ/tuần'
      },
      {
        name: 'Không muốn công khai',
        value: 'Không muốn công khai',
        label: 'Không muốn công khai'
      }
    ]
    const setWorkingTime = ref('')

    const acceptWorkingTime = ref(false)
    const workingTimeError = ref('')

    const saveWorkingTime = () => {
      const selectedWorkTime = workingTime.find((workTime) => workTime.value === setWorkingTime.value)
      if (selectedWorkTime && acceptWorkingTime.value == true) {
        workTime.name = selectedWorkTime.name
        workTime.value = selectedWorkTime.value
        workTime.label = selectedWorkTime.label
        workingTimeError.value = ''
        openModal.value = false
      } else {
        workingTimeError.value = 'Hãy chọn thời gian làm việc và đồng ý với hợp đồng của chúng tôi'
      }
    }
    const cancelWorkingTime = () => {
      setWorkingTime.value = workTime.name
      openModal.value = false
    }
    return {
      // profilesworkTime,
      workingTime,
      workingTimeError,
      setWorkingTime,
      acceptWorkingTime,
      saveWorkingTime,
      cancelWorkingTime,
      openModal,
      nameModal,
      openTemplate
    }
  }
})
</script>

<style scoped></style>
