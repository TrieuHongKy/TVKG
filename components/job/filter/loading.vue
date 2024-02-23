<template>
  <div class="job__filter ct-card shadow-sm rounded-lg">
    <UForm>
      <div class="flex flex-col gap-3">
        <UFormGroup name="salary">
          <p class="filter--heading">
            <USkeleton class="h-4 w-[200px]" />
          </p>
          <div class="filter--secleted my-3">
            <USkeleton class="h-4 w-[300px]" />
          </div>
        </UFormGroup>
        <UFormGroup name="location">
          <p class="filter--heading"><USkeleton class="h-4 w-[200px]" /></p>
          <div class="filter--secleted my-3">
            <USkeleton class="h-4 w-[300px]" />
          </div>
        </UFormGroup>
        <UFormGroup name="position">
          <button class="filter--heading">
            <p class="filter--heading"><USkeleton class="h-4 w-[200px]" /></p>
          </button>
          <div class="filter--secleted my-3">
            <UFormGroup>
              <div class="filter--options space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
        <UFormGroup name="type">
          <button class="filter--heading">
            <p class="filter--heading"><USkeleton class="h-4 w-[200px]" /></p>
          </button>
          <div class="filter--secleted my-3">
            <UFormGroup>
              <div class="filter--options space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
        <UFormGroup name="experience">
          <button class="filter--heading">
            <p class="filter--heading"><USkeleton class="h-4 w-[200px]" /></p>
          </button>
          <div class="filter--secleted my-3">
            <UFormGroup>
              <div class="filter--options space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[250px]" />
              </div>
            </UFormGroup>
          </div>
        </UFormGroup>
      </div>
    </UForm>
  </div>
</template>
<script lang="ts"></script>
<style scoped>
.job__filter {
  @apply hidden sticky top-20 md:block basis-1/4 p-4 h-fit;
}
.filter--heading {
  @apply text-sm sm:text-base font-semibold flex flex-row justify-between w-[96%];
}
.filter--options {
  @apply flex flex-col gap-1;
}
.filter--icon {
  @apply transform transition-transform duration-300 ease-out;
}
</style>
