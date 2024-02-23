<template>
  <div class="post__detail--heading">
    <p class="post__detail--type text-primary font-semibold text-lg">Bài viết</p>
    <p class="post__detail--title text-xl sm:text-2xl md:text-3xl my-3 font-semibold dark:text-gray-200">
      {{ post?.title }}
    </p>
    <div
      class="post__detail--information flex flex-col md:flex-row justify-between p-3 rounded-lg bg-gray-100 dark:bg-secondary"
    >
      <div class="post__detail--author flex flex-row">
        <div class="author--avatar my-auto flex mr-4">
          <UAvatar size="xl" :src="post?.user?.image" alt="post?.user?.name" class="my-auto" />
        </div>
        <div class="author--date flex flex-col justify-between gap-1 md:gap-0">
          <p class="text-primary text-lg hover:text-green-700 hover:cursor-pointer">
            {{ post?.user?.name }}
          </p>
          <p class="text-gray-500 text-md dark:text-gray-200">
            Ngày đăng:
            {{
              new Date(post?.published_at + '').toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup(props) {
    const postStore = usePostStore()
    const { post } = storeToRefs(postStore)
    const companyStore = useCompanyStore()
    const { company } = storeToRefs(companyStore)
    console.log(post)

    function formatDate(timestamp: number) {
      var date = new Date(timestamp * 1000)
      var day = date.getDate()
      var month = date.getMonth() + 1
      var year = date.getFullYear()
      return day + '/' + month + '/' + year
    }

    onMounted(async () => {})

    return {
      post,
      formatDate
    }
  }
})
</script>
<style scoped></style>
