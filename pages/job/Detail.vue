<template>
  <div>
    <color-mode></color-mode>
    <div class="flex flex-col gap-6">
      <div>
        <!-- JobDetails_Heading -->
      </div>
      <div class="flex flex-col sm:flex-row gap-8">
        <div class="w-full sm:w-[60%] md:w-[70%] flex flex-col gap-8">
          <div class="flex flex-col gap-8 p-4 border-default">
            <div>
              <job-detail-overview></job-detail-overview>
            </div>
            <div>
              <!-- JobDetails_Content -->
            </div>
          </div>
          <div class="p-4 border-default">
            <!-- JobDetails_CompanyJobs -->
          </div>
        </div>
        <div class="w-full sm:w-[40%] md:w-[30%] flex flex-col gap-8">
          <div class="border-default">
            <job-detail-information></job-detail-information>
          </div>
          <div class="border-default">
            <!-- JobDetails_RelatedJobs -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
