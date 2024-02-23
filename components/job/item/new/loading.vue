<template>
  <div class="item__special sticky top-20">
    <div class="special--label flex flex-row items-center gap-1 pb-4">
      <h2 class="text-lg font-semibold text-green-800 dark:text-primary">VIỆC LÀM MỚI NHẤT</h2>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="job in 5" :key="job" class="ct-card p-4">
        <div class="special--company flex flex-row space-x-2">
          <div class="company--avatar flex items-center justify-center">
            <USkeleton class="h-[60px] w-[90px]" />
          </div>
          <div class="company--infor w-full flex flex-col gap-1 justify-center space-y-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
            <div class="infor--description w-full flex">
              <div class="flex items-center w-full md:w-1/2 gap-1 sm:gap-2">
                <USkeleton class="h-4 w-[120px]" />
              </div>
              <div class="flex items-center w-full md:w-1/2 gap-1 sm:gap-2">
                <USkeleton class="h-4 w-[120px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts"></script>
<style scoped></style>
