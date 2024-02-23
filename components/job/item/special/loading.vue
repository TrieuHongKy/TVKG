<template>
  <div class="item__special">
    <div class="special--label flex flex-row items-center gap-1 pb-4">
      <UIcon name="i-heroicons-star-solid" class="text-2xl text-primary dark:text-green-700" />
      <p class="text-lg font-semibold text-green-800 dark:text-primary">CÔNG TY NỔI BẬT</p>
    </div>
    <div class="flex flex-col gap-4">
      <div
        v-for="company in 10"
        :key="company"
        class="special--card rounded-xl sm:px-2 p-2 md:p-4 shadow-md hover:shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer company__section"
      >
        <div class="special--company flex w-full gap-2 md:gap-4">
          <USkeleton class="h-[80px] w-[120px]" />
          <div class="company--infor flex flex-col w-full basis-full sm:gap-2 py-2">
            <USkeleton class="h-4 w-[400px]" />
            <p class="infor--address text-gray-400 dark:text-gray-300 font-base text-base sm:text-lg line-clamp-1">
              <USkeleton class="h-4 w-[300px]" />
            </p>
            <div class="infor--description grid grid-cols-12">
              <div class="flex gap-1 items-center col-span-6 sm:col-span-2">
                <USkeleton class="h-4 w-[90px]" />
              </div>
              <div class="flex items-center gap-1 col-span-6 sm:col-span-5">
                <USkeleton class="h-4 w-[200px]" />
              </div>
              <div class="hidden sm:flex items-center gap-1 col-span-12 sm:col-span-5">
                <USkeleton class="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
        <div class="special--list">
          <div
            v-for="job in 2"
            :key="job"
            class="special--card [&:not(:first-child)]:border-t dark:border-gray-600 grid grid-cols-12 md:flex md:flex-row p-2"
          >
            <div
              class="col-span-12 md:w-[60%] text-base sm:text-lg py-2 text-green-700 dark:text-primary hover:text-primary dark:hover:text-green-600"
            >
              <p><USkeleton class="h-4 w-[400px]" /></p>
            </div>
            <div class="description col-span-12 grid-col-12 md:w-[40%] justify-between flex flex-row">
              <div class="col-span-4 flex items-center gap-1 sm:gap-2">
                <USkeleton class="h-4 w-[120px]" />
              </div>
              <div class="col-span-4 flex items-center gap-1 sm:gap-2">
                <USkeleton class="h-4 w-[120px]" />
              </div>
              <div class="post__detail--like items-center col-span-4 flex flex-row">
                <USkeleton class="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <USkeleton class="h-8 w-[200px]" />
    </div>
  </div>
</template>
<script lang="ts"></script>
<style scoped></style>
