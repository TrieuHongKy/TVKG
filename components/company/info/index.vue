<template>
  <div class="info__bussiness--content company__section">
    <p class="font-semibold">Thông tin công ty</p>
    <ul class="text-sm">
      <li class="info__bussiness--details">
        <UIcon name="i-heroicons-phone-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--link">
          <a :href="'tel:' + companyData?.user?.phone">
            {{ companyData?.user?.phone }}
          </a>
        </span>
      </li>
      <li class="info__bussiness--details pt-2">
        <UIcon name="i-heroicons-map-pin-solid" class="info__bussiness--icon" />
        <span :class="companyData?.company_address ? 'info__bussiness--link' : 'info__bussiness--description'"
          ><a :href="companyData?.company_address" target="_blank">
            {{ companyData?.company_address }}
          </a></span
        >
      </li>
      <li class="info__bussiness--details pt-2">
        <UIcon name="i-heroicons-globe-alt-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--link">
          <a :href="companyData?.website" target="_blank">
            {{ companyData?.website }}
          </a>
        </span>
      </li>
      <li class="info__bussiness--details pt-2">
        <UIcon name="i-heroicons-users-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--description"
          >Quy mô:
          {{ companyData?.company_size }}
          nhân viên</span
        >
      </li>
      <li class="info__bussiness--details pt-2">
        <UIcon name="i-heroicons-identification-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--description">
          Mã số thuế:
          {{ companyData?.tax_code }}
        </span>
      </li>
      <li class="info__bussiness--details pt-2">
        <UIcon name="i-heroicons-building-office-2-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--description"
          >Loại hình:
          {{ companyData?.company_type }}
        </span>
      </li>
      <li class="pt-2">
        <UIcon name="i-heroicons-chart-bar-solid" class="info__bussiness--icon" />
        <span class="info__bussiness--description"
          >Lĩnh vực:
          {{ companyData?.company_industry }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Company } from '~/types/job'

export default defineComponent({
  props: {
    companyData: {
      type: Object,
      required: true,
      default: () => ({}) as Company
    }
  },
  setup(props) {
    // const { companyId } = props
    // const businessStore = useBusinessStore()
    // const findBusinessById = businessStore.findBusinessById
    // const businessDetail = findBusinessById(Number(companyId))!
    // return { findBusinessById, businessDetail }
  }
})
</script>

<style scoped>
.info__bussiness--content {
  @apply flex flex-col gap-4 p-4 w-full;
}
.info__bussiness--details {
  @apply pb-2 border-b;
}
.info__bussiness--icon {
  @apply text-primary;
}
.info__bussiness--description {
  @apply pl-2;
}
.info__bussiness--link {
  @apply pl-2 hover:text-primary dark:text-primary dark:hover:text-white text-green-800;
}
</style>
