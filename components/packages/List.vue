<template>
  <div v-for="pack in packageData" :key="pack.id" class="flex flex-col justify-center items-center border-default">
    <div class="flex flex-col gap-4 w-full p-4 items-center">
      <div class="text-lg font-semibold">{{ pack.name }}</div>
      <div class="space-y-1 w-full">
        <URadio v-for="(durati, index) in pack.package" :key="index" v-model="pack.selectPackage" v-bind="durati">
          <template #label>
            <div class="">
              <p class="flex gap-2">
                {{ formatCurrency(durati.salary) }} đ
                <span>({{ durati.value }})</span>
              </p>
            </div>
          </template>
        </URadio>
      </div>
    </div>
    <!-- </div> -->
    <div class="w-full py-4 border-t border-primary flex flex-col items-center gap-2">
      <div>
        <UButton to="#" :ui="{ rounded: 'rounded-full' }" color="primary" variant="solid">Đăng Ký Ngay</UButton>
      </div>
      <p>Có thể đăng ký ngay</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formatCurrency } from '~/utils/formatter'
import { packages } from '~/apis/mock-data/packages'

export default defineComponent({
  props: {
    selectPackage: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const selected = ref('sms')
    // const { selectPackage: selectedPackage } = props
    const selectedPackage = ref(props.selectPackage)
    const packageData = ref(packages)

    return { selectedPackage, selected, formatCurrency, packageData }
  }
})
</script>

<style scoped></style>
