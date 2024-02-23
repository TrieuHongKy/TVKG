<template>
  <div class="w-full md:w-[75%]">
    <div class="min-h-[725px] sm:min-h-[773px] md:min-h-[867px]">
      <div class="flex flex-col gap-4 p-4">
        <p class="text-sm font-semibold flex items-center gap-1">
          <USkeleton class="h-4 w-[200px] bg-card-light dark:bg-card-dark" />
        </p>
        <div v-for="i in 10" :key="i" class="col-span-1">
          <div
            class="flex flex-row sm:px-2 w-full gap-2 md:gap-4 p-2 md:p-4 shadow-md hover:shadow-lg rounded-xl dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <div class="flex items-center justify-center min-w-[80px] max-w-[120px]">
              <USkeleton class="h-full w-[120px]" />
            </div>
            <div class="flex flex-col justify-center sm:gap-2 w-full">
              <div class="line-clamp-1 text-green-600 hover:text-primary text-base sm:text-xl font-semibold">
                <USkeleton class="h-4 w-[400px]" />
              </div>
              <div class="flex items-center justify-between w-full">
                <div class="line-clamp-1 hover:text-primary text-xl">
                  <USkeleton class="h-4 w-[350px]" />
                </div>
                <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
              </div>
              <div class="grid grid-cols-12 gap-0 sm:gap-4">
                <div class="flex flex-row gap-1 items-center col-span-5 md:col-span-3">
                  <USkeleton class="h-4 w-[150px]" />
                </div>
                <div class="flex flex-row gap-1 items-center col-span-6 md:col-span-3">
                  <USkeleton class="h-4 w-[200px]" />
                </div>
                <div class="flex flex-row md:hidden gap-1 items-center col-span-1">
                  <USkeleton class="h-6 w-6" :ui="{ rounded: 'rounded-full' }" />
                </div>
                <div class="hidden md:flex flex-row gap-1 items-center col-span-6">
                  <USkeleton class="h-4 w-[300px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center pt-4">
      <!-- <UPagination v-model="page" size="md" :page-count="itemsPerPage" :total="totalItems" /> -->
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped></style>
