<template>
  <div>
    <div class="profile__section flex flex-col md:flex-row h-auto">
      <div class="profile__information--avatar">
        <USkeleton class="h-20 w-20" :ui="{ rounded: 'rounded-full' }" />
      </div>
      <div class="profile__information--content items-center md:items-start space-y-2 p-2">
        <USkeleton class="h-4 w-4/5 md:w-[250px]" />

        <USkeleton class="h-4 w-full md:w-[400px]" />

        <USkeleton class="h-4 w-1/3 md:w-[300px]" />

        <USkeleton class="h-4 w-1/2 md:w-[200px]" />
      </div>
      <div class="profile__information--action">
        <USkeleton class="h-8 w-[120px] rounded-full" />
        <USkeleton class="h-8 w-[120px] rounded-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.profile__information--avatar {
  @apply relative w-2/3 mx-auto md:mx-0 md:w-1/6 rounded-full flex justify-center items-center mb-4 md:mb-0;
}
.profile__information--content {
  @apply w-full md:w-5/12 text-center md:text-left p-2 flex flex-col gap-2;
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
