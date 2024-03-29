<script lang="ts">
import { ref, computed, watch } from 'vue'

interface Connect {
  id: number
  date: string
  category: number
  action: string
  connects: string
}

export default {
  setup() {
    let selectedTime = ref('7')
    let selectedCategory = ref('')
    let currentPage = ref(1)
    let itemsPerPage = ref(10)
    const columns = ref([
      { key: 'date', label: 'Thời Gian' },
      { key: 'action', label: 'Hành Động' },
      { key: 'connects', label: 'Kết Nối' }
    ])
    const connects = ref<Connect[]>([
      { id: 1, date: '2023-10-10', category: 1, action: 'Front-end Developer', connects: '+10' },
      { id: 1, date: '2023-10-01', category: 1, action: 'Front-end Developer', connects: '+10' },
      { id: 2, date: '2023-09-15', category: 2, action: 'Back-end Developer', connects: '+8' },
      { id: 3, date: '2023-08-25', category: 3, action: 'UI/UX Designer', connects: '+15' }
    ])

    const timeOptions = [
      { label: '7 ngày trước', value: 7 },
      { label: '30 ngày trước', value: 30 },
      { label: '90 ngày trước', value: 90 }
    ]

    const categoryOptions = [
      { id: 1, name: 'test' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' }
    ]

    const filteredConnect = computed(() => {
      const daysAgo = parseInt(selectedTime.value)
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - daysAgo)

      watch(selectedTime, () => {
        currentPage.value = 1
      })

      return connects.value.filter((person: Connect) => {
        const meetsTimeFilter = new Date(person.date) >= currentDate
        const meetsCategoryFilter = !selectedCategory.value || person.category === Number(selectedCategory.value)

        return meetsTimeFilter && meetsCategoryFilter
      })
    })

    const selectedTimeLabel = computed(() => {
      const selectedValue = selectedTime.value
      const selectedOption = timeOptions.find((option) => option.value === Number(selectedValue))
      return selectedOption ? selectedOption.label : ''
    })

    const categoryOptionsWithAll = computed(() => {
      const allOption = { id: '', name: 'Tất cả' }
      return [allOption, ...categoryOptions]
    })

    const paginatedConnect = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value
      const endIndex = startIndex + itemsPerPage.value
      return filteredConnect.value.slice(startIndex, endIndex)
    })

    return {
      selectedTime,
      selectedCategory,
      currentPage,
      itemsPerPage,
      columns,
      connects,
      timeOptions,
      categoryOptions,
      filteredConnect,
      selectedTimeLabel,
      categoryOptionsWithAll,
      paginatedConnect,
      prevPage() {
        if (currentPage.value > 1) {
          currentPage.value--
        }
      },
      nextPage() {
        if (currentPage.value * itemsPerPage.value < filteredConnect.value.length) {
          currentPage.value++
        }
      }
    }
  }
}
</script>

<template>
  <div class="connects-history container mx-auto p-5 md:px-20 md:py-10">
    <div class="title text-3xl md:text-5xl mb-10">Lịch Sử Kết Nối</div>
    <div class="grid grid-rows-2 md:grid-cols-2">
      <div class="col-span-1">
        <div class="grid grid-cols-2">
          <div class="balance col-span-1 lg:px-10">
            <div class="title text-lg md:text-xl mb-3">Số dư của tôi</div>
            <div class="amount text-2xl md:text-3xl mb-3"><NumberOfConnects></NumberOfConnects> Kết nối</div>
            <button class="py-1 px-2 md:py-2 md:px-3 bg-primary rounded-full text-white">Mua Kết Nối</button>
          </div>
          <div class="image col-span-1 relative">
            <svg
              class="w-36 h-36 absolute inset-y-0 right-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 145 130"
              aria-hidden="true"
              role="img"
            >
              <path
                d="M6.4 4.5h134.2c2.4 0 4.4 2 4.4 4.4v101.5c0 2.4-2 4.4-4.4 4.4H6.4c-2.4 0-4.4-2-4.4-4.4V8.9c0-2.4 1.9-4.4 4.4-4.4z"
                fill="#f2f7f2"
              ></path>
              <linearGradient
                id="connects-announcement-66-a-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="141.609"
                y1="16.463"
                x2="141.609"
                y2="126.844"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#9aaa97"></stop>
                <stop offset=".93" stop-color="#c3d2c3"></stop>
              </linearGradient>
              <path
                d="M140.2 3.2h-1.5c2.4 0 4.4 2 4.4 4.4v101.5c0 2.4-2 4.4-4.4 4.4h1.5c2.4 0 4.4-2 4.4-4.4V7.6c0-2.5-2-4.4-4.4-4.4z"
                fill="url(#connects-announcement-66-a-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-b-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="71.654"
                x2="143.049"
                y2="71.654"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#c3d2c3"></stop>
                <stop offset=".93" stop-color="#c3d2c3"></stop>
              </linearGradient>
              <path
                d="M4.4 3.2h134.2c2.4 0 4.4 2 4.4 4.4v101.5c0 2.4-2 4.4-4.4 4.4H4.4c-2.4 0-4.4-2-4.4-4.4V7.6c0-2.5 2-4.4 4.4-4.4z"
                fill="url(#connects-announcement-66-b-uid-1)"
              ></path>
              <path
                d="M140.2 7.6v101.5c0 .9-.7 1.6-1.6 1.6H4.8c-.9 0-1.6-.7-1.6-1.6V7.6c0-.9.7-1.6 1.6-1.6h133.8c.9 0 1.6.7 1.6 1.6z"
                fill="#13544e"
              ></path>
              <path
                d="M123.6 106.5v-7.3H74.2C73.7 84.1 62.9 72 49.6 72h-4.9c-13.6 0-24.6 12.6-24.6 28.2 0 3.6.6 7.1 1.8 10.5h50.5c.5-1.5.9-3 1.2-4.5v.3h3.6v4.2h49.9v-4.2h-3.5z"
                fill="#0d3a35"
              ></path>
              <linearGradient
                id="connects-announcement-66-c-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="42.83"
                y1="49.515"
                x2="42.83"
                y2="111.115"
                gradientTransform="matrix(1 0 0 -1 .004 130.007)"
              >
                <stop offset="0" stop-color="#e4ebe4"></stop>
                <stop offset=".69" stop-color="#fff"></stop>
              </linearGradient>
              <polygon
                points="20.7,19.9 63.5,18.9 65,79.5 22.2,80.5"
                fill="url(#connects-announcement-66-c-uid-1)"
              ></polygon>
              <linearGradient
                id="connects-announcement-66-d-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="107.683"
                y1="43.573"
                x2="107.683"
                y2="104.62"
                gradientTransform="matrix(1 0 0 -1 -.005 130.001)"
              >
                <stop offset="0" stop-color="#e4ebe4"></stop>
                <stop offset=".31" stop-color="#e7ede7"></stop>
                <stop offset=".51" stop-color="#eff3ef"></stop>
                <stop offset=".68" stop-color="#fefffe"></stop>
                <stop offset=".69" stop-color="#fff"></stop>
              </linearGradient>
              <polygon
                points="86.6,25.4 129.4,25.8 128.8,86.4 85.9,86"
                fill="url(#connects-announcement-66-d-uid-1)"
              ></polygon>
              <path
                d="M86.6 25.4L86 81.6l17.7.3c1.5 0 3.2 0 4.7-.8.8-.4 5.9-3.3 9.4-5.3.2-.1.5-.3.7-.5.5-.5.8-1.1.8-1.8l.7-47.7-33.4-.4z"
                fill="#c3d2c3"
              ></path>
              <path
                d="M29.3 31.5c-.2.3-.5.4-1 .4s-.8-.1-1-.4c-.2-.3-.3-.7-.3-1v-.1h.6v.1c0 .2 0 .3.1.5 0 .1.1.2.2.3.1.1.3.1.5.1.3 0 .5-.1.6-.3v-.6l-.1-3.1h.6l.1 3.1c0 .4-.1.7-.3 1zm2.2.1c-.3-.2-.6-.5-.8-.8-.4-.8-.4-1.6-.1-2.4.2-.3.4-.6.8-.8.7-.4 1.6-.4 2.3-.1.3.2.6.5.8.8.4.8.4 1.6.1 2.4-.2.3-.4.6-.8.9-.3.2-.7.3-1.1.3-.5 0-.9-.1-1.2-.3zm2-.5c.2-.2.4-.4.5-.7.1-.3.2-.6.2-.9 0-.3-.1-.6-.2-.9-.1-.3-.3-.5-.6-.6-.6-.3-1.3-.3-1.8 0-.2.2-.4.4-.5.7-.2.6-.2 1.3 0 1.8.1.3.3.5.6.7.6.3 1.3.3 1.8-.1zm4.7-1.9c.2 0 .5.2.6.3.2.2.3.5.3.8 0 .4-.1.7-.4 1-.3.2-.6.4-1.1.4h-1.9l-.1-4.5h1.8c.5 0 .8.1 1.1.3.3.2.4.5.4.8 0 .4-.2.8-.7.9zm-.7-.1c.3 0 .5-.1.6-.2.2-.3.2-.7 0-1-.2-.1-.4-.2-.6-.2h-1.4v1.4h1.4zm-1.2 2.1h1.4c.6 0 .9-.3.9-.8 0-.2-.1-.4-.2-.6-.2-.1-.4-.2-.6-.2h-1.6l.1 1.6zm5.1-4.1h1.8c.4 0 .8.1 1.1.3.3.2.4.5.4 1 0 .4-.1.8-.4 1-.3.2-.7.4-1.1.3H42v1.9h-.6v-4.5zm.6 2.1h1.3c.2 0 .4-.1.6-.2.3-.4.3-.9 0-1.2-.2-.1-.4-.2-.6-.2H42v1.6zm4.4 2c-.3-.2-.6-.5-.8-.8-.4-.8-.4-1.6-.1-2.4.2-.3.4-.6.8-.8.7-.4 1.6-.4 2.3-.1.3.2.6.5.8.8.4.8.4 1.6.1 2.4-.2.3-.4.6-.8.8-.8.5-1.6.5-2.3.1zm2-.4c.2-.2.4-.4.5-.7.2-.6.2-1.3 0-1.8-.1-.3-.3-.5-.6-.6-.6-.3-1.3-.3-1.8 0-.2.2-.4.4-.5.7-.2.6-.2 1.3 0 1.8.1.3.3.5.6.7.6.2 1.2.2 1.8-.1zm4.7-1.8c.2.1.4.2.5.4.1.2.2.5.2.7 0 .5-.3.9-.7 1.1-.3.1-.6.2-.9.2-.3 0-.7 0-1-.2-.3-.1-.5-.3-.7-.5-.2-.2-.3-.5-.3-.9h.6c0 .3.2.6.4.8.2.2.6.3 1 .3s.6-.1.8-.2c.2-.1.3-.3.2-.6 0-.2 0-.3-.1-.5-.1-.1-.2-.2-.4-.3-.3-.1-.6-.2-.8-.2-.3 0-.5-.1-.7-.2-.2-.1-.4-.2-.5-.4-.2-.2-.2-.4-.2-.7 0-.3.1-.7.4-.9.3-.2.6-.3 1.1-.3.4 0 .8.1 1.2.3.3.3.5.6.5 1h-.6c0-.3-.2-.5-.4-.7-.2-.2-.5-.2-.8-.2-.3 0-.5.1-.7.2-.2.1-.3.3-.2.5 0 .2 0 .3.1.4.1.1.2.2.3.2.1 0 .4.1.7.2.3.3.7.4 1 .5zm2.5-1.8h-1.5v-.5l3.6-.1v.5h-1.5l.1 4h-.6l-.1-3.9zm-27.9 12l29.7-.7c.3 0 .5.2.5.4 0 .3-.2.5-.4.5l-29.7.7c-.3 0-.5-.2-.5-.4 0-.3.2-.5.4-.5zm-.2 5.1l29.7-.6c.3 0 .5.2.5.4 0 .3-.2.5-.4.5l-29.7.6c-.3 0-.5-.2-.5-.4s.2-.4.4-.5zm.4 4.7l29.7-.7c.3 0 .5.2.5.4 0 .3-.2.5-.4.5l-29.7.7c-.3 0-.5-.2-.5-.4 0-.3.2-.5.4-.5zm.2 4.9l29.7-.7c.3 0 .5.2.5.4 0 .3-.2.5-.4.5l-29.7.7c-.3 0-.5-.2-.5-.4-.1-.3.1-.5.4-.5zm.1 4.9l20-.5c.3 0 .5.2.5.4 0 .3-.2.5-.4.5l-20 .5c-.3 0-.5-.2-.5-.4-.1-.3.1-.5.4-.5z"
                fill="#14a800"
              ></path>
              <path
                d="M42.6 22c1.1 0 2-.9 2-2 0-.2 0-.4-.1-.6l-3.9.1c-.3 1.1.4 2.2 1.5 2.5.2-.1.4 0 .5 0z"
                fill="#c3d2c3"
              ></path>
              <radialGradient
                id="connects-announcement-66-e-uid-1"
                cx="40.47"
                cy="111.807"
                r="4.27"
                gradientTransform="matrix(1 0 0 -1 0 130)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f66dbc"></stop>
                <stop offset=".28" stop-color="#f36cba"></stop>
                <stop offset=".47" stop-color="#ea67b3"></stop>
                <stop offset=".64" stop-color="#db60a8"></stop>
                <stop offset=".79" stop-color="#c55699"></stop>
                <stop offset=".93" stop-color="#a94985"></stop>
                <stop offset=".93" stop-color="#a84884"></stop>
              </radialGradient>
              <circle cx="42" cy="19.4" r="2" fill="url(#connects-announcement-66-e-uid-1)"></circle>
              <linearGradient
                id="connects-announcement-66-f-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="95.518"
                y1="49.423"
                x2="95.518"
                y2="110.404"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#e4ebe4"></stop>
                <stop offset=".31" stop-color="#e7ede7"></stop>
                <stop offset=".51" stop-color="#eff3ef"></stop>
                <stop offset=".68" stop-color="#fefffe"></stop>
                <stop offset=".69" stop-color="#fff"></stop>
              </linearGradient>
              <path
                d="M115.1 74.5c-3.4 2-8.6 4.9-9.4 5.3-1.5.8-3.2.8-4.7.8l-27.4-.4.9-60.6 42.8.6-.7 52c0 .7-.3 1.4-.8 1.8-.2.2-.5.4-.7.5z"
                fill="url(#connects-announcement-66-f-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-g-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="112.2"
                y1="50.627"
                x2="107.109"
                y2="59.306"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset=".22" stop-color="#c3d2c3"></stop>
                <stop offset=".33" stop-color="#c8d6c8"></stop>
                <stop offset=".7" stop-color="#d5e0d5"></stop>
              </linearGradient>
              <path
                d="M115.1 74.5c-3.5 2-8.5 4.8-9.4 5.3 1.7-1 4.8-7.5 4.8-7.5 1.1.3 3.1 3.4 5.3 1.7-.2.2-.5.4-.7.5z"
                fill="url(#connects-announcement-66-g-uid-1)"
              ></path>
              <g fill="#14a800">
                <path
                  d="M82.7 31.4c-.2.3-.5.4-1 .4s-.8-.2-1-.4c-.2-.3-.3-.7-.3-1v-.1h.6v.6c0 .1.1.2.2.3.1.1.3.1.5.1.3 0 .5-.1.6-.2.1-.2.2-.5.2-.7v-3.1h.6v3.1c-.1.3-.2.7-.4 1zm2.2.1c-.3-.2-.6-.5-.8-.8-.4-.8-.3-1.7 0-2.4.2-.3.5-.6.8-.8.7-.4 1.6-.4 2.3 0 .3.2.6.5.8.8.4.8.3 1.6 0 2.4-.2.3-.5.6-.8.8-.7.4-1.6.4-2.3 0zm2-.4c.2-.2.4-.4.6-.7.2-.6.3-1.2 0-1.8-.1-.3-.3-.5-.5-.7-.3-.2-.6-.3-.9-.3-.3 0-.6.1-.9.2-.2.2-.4.4-.6.7-.1.3-.2.6-.2.9 0 .3 0 .6.2.9.1.3.3.5.5.7.6.4 1.3.4 1.8.1zm4.8-1.7c.2.1.5.2.6.4.2.2.3.5.2.8 0 .4-.1.7-.4 1-.3.2-.6.3-1.1.3h-1.9l.1-4.5H91c.5 0 .8.1 1.1.3.3.2.4.5.4.8-.1.4-.3.8-.8.9zm-.7-.2c.3 0 .5-.1.6-.2.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.2-.1-.4-.2-.6-.2h-1.4v1.4H91zm-1.3 2.1h1.4c.6 0 .9-.3.9-.8 0-.2-.1-.4-.2-.6-.1-.2-.3-.2-.6-.2h-1.6l.1 1.6zm5.2-3.9h1.8c.4 0 .8.1 1.1.3.3.2.4.5.4 1s-.1.8-.4 1c-.3.2-.7.3-1.1.3h-1.2v1.9h-.6v-4.5zm.6 2.1h1.3c.2 0 .5 0 .6-.2.3-.4.3-.8 0-1.2-.2-.1-.4-.2-.6-.2h-1.3v1.6zm4.3 2.2c-.3-.2-.6-.5-.8-.8-.4-.8-.3-1.7 0-2.4.2-.3.5-.6.8-.8.7-.4 1.6-.4 2.3 0 .3.2.6.5.8.8.4.8.3 1.7 0 2.4-.2.3-.5.6-.8.8-.8.5-1.6.4-2.3 0zm2-.4c.2-.2.4-.4.6-.7.2-.6.3-1.2 0-1.8-.1-.3-.3-.5-.5-.7-.6-.3-1.3-.4-1.8 0-.2.2-.4.4-.6.7-.2.6-.3 1.2 0 1.8.1.3.3.5.5.7.6.3 1.2.3 1.8 0zm4.7-1.6c.2.1.4.2.5.4.1.2.2.5.2.8 0 .5-.3.9-.7 1.1-.3.1-.6.2-.9.2-.3 0-.7-.1-1-.2-.6-.2-1-.8-1-1.4h.6c0 .3.1.6.4.8.2.2.6.3 1 .3s.6-.1.8-.2c.2-.1.3-.3.3-.5s0-.3-.1-.5c-.1-.1-.2-.2-.4-.3-.3-.1-.5-.2-.8-.2-.3-.1-.5-.1-.7-.2-.2-.1-.4-.2-.5-.4-.1-.2-.2-.4-.2-.7 0-.3.1-.7.4-.9.3-.2.6-.3 1.1-.3.4 0 .8.1 1.2.4.3.3.5.6.5 1.1h-.6c0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.2-.3 0-.5 0-.7.2-.2.1-.3.3-.3.4 0 .2 0 .3.1.4.1.1.2.2.3.2.1 0 .4.1.7.2.3 0 .6.1.9.2zm2.7-1.6h-1.5v-.5l3.6.1v.5h-1.5l-.1 4h-.6l.1-4.1zM80.8 38.9l29.7.4c.3 0 .5.2.5.5s-.2.5-.5.5l-29.7-.4c-.3 0-.5-.2-.5-.5s.3-.5.5-.5zm-.1 5l29.7.4c.3 0 .5.2.5.5s-.2.5-.5.5l-29.7-.4c-.3 0-.5-.2-.5-.5.1-.3.3-.5.5-.5zm0 4.9l29.7.4c.3 0 .5.2.5.5s-.2.5-.5.5l-29.7-.4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zm-.1 4.9l29.7.4c.3 0 .5.2.5.5s-.2.5-.5.5l-29.7-.4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5z"
                ></path>
                <path
                  d="M80.7 48.8l29.7.4c.3 0 .5.2.5.5s-.2.5-.5.5l-29.7-.4c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zm-.2 9.8l20 .3c.3 0 .5.2.5.5s-.2.5-.5.5l-20-.3c-.3 0-.5-.2-.5-.5.1-.3.3-.5.5-.5z"
                ></path>
              </g>
              <path
                d="M95.2 21.5c0 1.1.9 2 2 2s2-.9 2-2c0-.6-.2-1.1-.7-1.5h-2.7c-.3.3-.6.9-.6 1.5z"
                fill="#c3d2c3"
              ></path>
              <radialGradient
                id="connects-announcement-66-h-uid-1"
                cx="95.098"
                cy="110.281"
                r="4.27"
                gradientTransform="matrix(1 0 0 -1 0 130)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f66dbc"></stop>
                <stop offset=".28" stop-color="#f36cba"></stop>
                <stop offset=".47" stop-color="#ea67b3"></stop>
                <stop offset=".64" stop-color="#db60a8"></stop>
                <stop offset=".79" stop-color="#c55699"></stop>
                <stop offset=".93" stop-color="#a94985"></stop>
                <stop offset=".93" stop-color="#a84884"></stop>
              </radialGradient>
              <circle cx="96.6" cy="20.9" r="2" fill="url(#connects-announcement-66-h-uid-1)"></circle>
              <path
                d="M5.4 9.7c0-.9.7-1.6 1.6-1.6h133.3v-.5c0-.9-.7-1.6-1.6-1.6H4.8c-.9 0-1.6.7-1.6 1.6v101.5c0 .9.7 1.6 1.6 1.6h.6V9.7z"
                fill="#0d3a35"
              ></path>
              <linearGradient
                id="connects-announcement-66-i-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="4.372"
                y1="19.286"
                x2="4.372"
                y2="124.022"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#c3d2c3"></stop>
                <stop offset=".93" stop-color="#9aaa97"></stop>
              </linearGradient>
              <path
                d="M4.3 109.1V7.6C4.3 6.7 5 6 5.9 6H4.4c-.9 0-1.6.7-1.6 1.6v101.5c0 .9.7 1.6 1.6 1.6h1.5c-.9 0-1.6-.7-1.6-1.6z"
                fill="url(#connects-announcement-66-i-uid-1)"
              ></path>
              <g fill="#9aaa97">
                <path d="M21.9 110.7c.3 1 .7 1.9 1.1 2.8h48.2c.4-.9.8-1.9 1.1-2.8H21.9z"></path>
                <rect x="77.2" y="110.7" width="49.9" height="2.8"></rect>
              </g>
              <linearGradient
                id="connects-announcement-66-j-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="5.996"
                y1="4.185"
                x2="121.001"
                y2="4.185"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#c3d2c3" stop-opacity="0"></stop>
                <stop offset=".01" stop-color="#c3d2c3" stop-opacity=".05"></stop>
                <stop offset=".06" stop-color="#c3d2c3" stop-opacity=".3"></stop>
                <stop offset=".12" stop-color="#c3d2c3" stop-opacity=".51"></stop>
                <stop offset=".18" stop-color="#c3d2c3" stop-opacity=".69"></stop>
                <stop offset=".23" stop-color="#c3d2c3" stop-opacity=".83"></stop>
                <stop offset=".28" stop-color="#c3d2c3" stop-opacity=".92"></stop>
                <stop offset=".34" stop-color="#c3d2c3" stop-opacity=".98"></stop>
                <stop offset=".39" stop-color="#c3d2c3"></stop>
                <stop offset=".44" stop-color="#c3d2c3"></stop>
                <stop offset=".72" stop-color="#c3d2c3"></stop>
                <stop offset=".78" stop-color="#c3d2c3" stop-opacity=".78"></stop>
                <stop offset=".93" stop-color="#c3d2c3" stop-opacity=".23"></stop>
                <stop offset="1" stop-color="#c3d2c3" stop-opacity=".01"></stop>
              </linearGradient>
              <path
                d="M6.9 124.9h113.2c.5 0 .9.4.9.9s-.4.9-.9.9H6.9c-.5 0-.9-.4-.9-.9s.4-.9.9-.9z"
                fill="url(#connects-announcement-66-j-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-k-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="103.582"
                y1="6.795"
                x2="53.65"
                y2="6.795"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".1" stop-color="#ee9f50"></stop>
                <stop offset=".34" stop-color="#efa253"></stop>
                <stop offset=".53" stop-color="#f2ab5d"></stop>
                <stop offset=".69" stop-color="#f6bb6e"></stop>
                <stop offset=".83" stop-color="#fccd81"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <rect x="53.7" y="119.6" width="49.9" height="7.3" fill="url(#connects-announcement-66-k-uid-1)"></rect>
              <linearGradient
                id="connects-announcement-66-l-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="101.627"
                y1="14.073"
                x2="51.695"
                y2="14.073"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".1" stop-color="#ee9f50"></stop>
                <stop offset=".34" stop-color="#efa253"></stop>
                <stop offset=".53" stop-color="#f2ab5d"></stop>
                <stop offset=".69" stop-color="#f6bb6e"></stop>
                <stop offset=".83" stop-color="#fccd81"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <rect x="51.7" y="112.3" width="49.9" height="7.3" fill="url(#connects-announcement-66-l-uid-1)"></rect>
              <path
                d="M82.1 112.3c9.4 0 19.5 4.1 19.5 4.1v-4.1H82.1zm-28.4 7.3v3c0-1.6 23.3-3.1 26.8-3.1l-26.8.1z"
                fill="#ce7e3c"
              ></path>
              <linearGradient
                id="connects-announcement-66-m-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="111.091"
                y1="21.351"
                x2="61.16"
                y2="21.351"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".1" stop-color="#ee9f50"></stop>
                <stop offset=".34" stop-color="#efa253"></stop>
                <stop offset=".53" stop-color="#f2ab5d"></stop>
                <stop offset=".69" stop-color="#f6bb6e"></stop>
                <stop offset=".83" stop-color="#fccd81"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <rect x="61.2" y="105" width="49.9" height="7.3" fill="url(#connects-announcement-66-m-uid-1)"></rect>
              <linearGradient
                id="connects-announcement-66-n-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="107.516"
                y1="28.63"
                x2="57.584"
                y2="28.63"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".1" stop-color="#ee9f50"></stop>
                <stop offset=".34" stop-color="#efa253"></stop>
                <stop offset=".53" stop-color="#f2ab5d"></stop>
                <stop offset=".69" stop-color="#f6bb6e"></stop>
                <stop offset=".83" stop-color="#fccd81"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <rect x="57.6" y="97.7" width="49.9" height="7.3" fill="url(#connects-announcement-66-n-uid-1)"></rect>
              <path d="M61.2 105v3c0-1.6 23.3-3.1 26.8-3.1l-26.8.1z" fill="#ce7e3c"></path>
              <linearGradient
                id="connects-announcement-66-o-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="31.589"
                y1="3.288"
                x2="31.589"
                y2="59.77"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#ee9f50"></stop>
                <stop offset=".33" stop-color="#efa253"></stop>
                <stop offset=".58" stop-color="#f2ab5d"></stop>
                <stop offset=".81" stop-color="#f6bb6e"></stop>
                <stop offset="1" stop-color="#fccd81"></stop>
              </linearGradient>
              <path
                d="M33.7 70.2h-4.2c-13.6 0-24.6 12.6-24.6 28.2s11 28.2 24.6 28.2h4.2c13.6 0 24.6-12.6 24.6-28.2s-11-28.2-24.6-28.2z"
                fill="url(#connects-announcement-66-o-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-p-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="14.969"
                y1="12.806"
                x2="52.414"
                y2="50.252"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#eb9546"></stop>
                <stop offset=".4" stop-color="#fccd81"></stop>
                <stop offset=".74" stop-color="#ee9f50"></stop>
                <stop offset=".79" stop-color="#f3b062"></stop>
                <stop offset=".85" stop-color="#f8c073"></stop>
                <stop offset=".92" stop-color="#fbca7e"></stop>
                <stop offset="1" stop-color="#fccd81"></stop>
              </linearGradient>
              <ellipse cx="33.7" cy="98.5" rx="24.6" ry="28.2" fill="url(#connects-announcement-66-p-uid-1)"></ellipse>
              <linearGradient
                id="connects-announcement-66-q-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="17.391"
                y1="15.229"
                x2="49.992"
                y2="47.829"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset=".11" stop-color="#ee9f50"></stop>
                <stop offset=".23" stop-color="#f3b062"></stop>
                <stop offset=".4" stop-color="#f8c073"></stop>
                <stop offset=".59" stop-color="#fbca7e"></stop>
                <stop offset=".81" stop-color="#fccd81"></stop>
              </linearGradient>
              <ellipse cx="33.7" cy="98.5" rx="21.4" ry="24.6" fill="url(#connects-announcement-66-q-uid-1)"></ellipse>
              <g fill="#ce7e3c">
                <polygon points="34.7,91.5 33.9,90.7 33.9,91.6"></polygon>
                <path
                  d="M44.3 92.3c-3.9 0-6.1 2.9-6.8 6-.4-.9-.7-1.8-1-2.7l-2 1.3-.7-5.1v1h-3.4v7.8c0 2.8-1.1 4.9-3.3 4.9s-3.4-2.1-3.4-4.9v-7.8l-1.2-1.2-.5 1 .2.2h-1.6v7.8c0 2.3.6 4.3 1.8 5.8 1.2 1.5 2.8 2.3 4.7 2.3 3.8 0 6.4-3.3 6.4-8.1v-5.2c.4 1.7 1.3 5 3.1 7.9l-2.3 9H33l2 2h3.2l1.1-7.8c.4.3.7.7 1.2.9 1 .8 2.3 1.2 3.5 1.3h.3c3.9 0 7-3.5 7-8.1s-3.1-8.3-7-8.3zm0 13.1c-2.4 0-4-2.1-4.4-3 .6-5.2 2.2-6.9 4.4-6.9s3.9 2 3.9 4.9-1.7 5-3.9 5z"
                ></path>
              </g>
              <path
                d="M14.1 100.3c0-13.6 9.6-24.6 21.4-24.6 4.9 0 9.5 1.9 13.1 5.1-3.9-4.3-9.1-7-15-7-11.8 0-21.4 11-21.4 24.6 0 7.9 3.3 15 8.3 19.5-3.9-4.4-6.4-10.7-6.4-17.6z"
                fill="#ce7e3c"
              ></path>
              <linearGradient
                id="connects-announcement-66-r-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="33.967"
                y1="17.879"
                x2="33.967"
                y2="39.75"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#ee9f50"></stop>
                <stop offset=".19" stop-color="#efa253"></stop>
                <stop offset=".34" stop-color="#f2ab5d"></stop>
                <stop offset=".48" stop-color="#f6bb6e"></stop>
                <stop offset=".59" stop-color="#fccd81"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <path
                d="M42.3 103.3c-2.4 0-4-2.1-4.4-3 .6-5.2 2.2-6.9 4.4-6.9s3.9 2 3.9 4.9-1.7 5-3.9 5m0-13c-3.9 0-6.1 2.9-6.8 6-.7-1.5-1.2-3.6-1.7-5.5h-5.4v7.8c0 2.8-1.1 4.9-3.3 4.9s-3.4-2.1-3.4-4.9v-7.8h-3.1v7.8c0 2.3.6 4.3 1.8 5.8 1.2 1.5 2.8 2.3 4.7 2.3 3.8 0 6.4-3.3 6.4-8.1v-5.2c.4 1.7 1.3 5 3.1 7.9l-1.7 11h3.2l1.1-7.8c.4.3.7.7 1.2.9 1 .8 2.3 1.2 3.5 1.3h.3c3.9 0 7-3.5 7-8.1s-3-8.3-6.9-8.3"
                fill="url(#connects-announcement-66-r-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-s-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="24.196"
                y1="22.858"
                x2="43.477"
                y2="42.139"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".09" stop-color="#f6ba6d"></stop>
                <stop offset=".21" stop-color="#f1aa5c"></stop>
                <stop offset=".35" stop-color="#ee9e4f"></stop>
                <stop offset=".54" stop-color="#ec9748"></stop>
                <stop offset="1" stop-color="#eb9546"></stop>
              </linearGradient>
              <path
                d="M43.2 103.3c-2.4 0-4-2.1-4.4-3 .6-5.2 2.2-6.9 4.4-6.9s3.9 2 3.9 4.9-1.7 5-3.9 5m0-13c-3.9 0-6.1 2.9-6.8 6-.7-1.5-1.2-3.6-1.6-5.5h-5.4v7.8c0 2.8-1.1 4.9-3.3 4.9s-3.4-2.1-3.4-4.9v-7.8h-3.1v7.8c0 2.3.6 4.3 1.8 5.8 1.2 1.5 2.8 2.3 4.7 2.3 3.8 0 6.4-3.3 6.4-8.1v-5.2c.4 1.7 1.3 5 3.1 7.9l-1.7 11h3.2l1.1-7.8c.4.3.7.7 1.2.9 1 .8 2.3 1.2 3.5 1.3h.3c3.9 0 7-3.5 7-8.1s-3.1-8.3-7-8.3"
                fill="url(#connects-announcement-66-s-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-t-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="43.882"
                y1="6.942"
                x2="43.882"
                y2="56.116"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#fccd81"></stop>
                <stop offset=".57" stop-color="#f4b467"></stop>
                <stop offset="1" stop-color="#ee9f50"></stop>
              </linearGradient>
              <path
                d="M33.7 73.9h-1C44 74.5 53 85.3 53 98.5s-9 23.9-20.4 24.6h1c11.8 0 21.4-11 21.4-24.6s-9.5-24.6-21.3-24.6z"
                fill="url(#connects-announcement-66-t-uid-1)"
              ></path>
              <linearGradient
                id="connects-announcement-66-u-uid-1"
                gradientUnits="userSpaceOnUse"
                x1="19.296"
                y1="3.288"
                x2="19.296"
                y2="59.77"
                gradientTransform="matrix(1 0 0 -1 0 130)"
              >
                <stop offset="0" stop-color="#ee9f50"></stop>
                <stop offset=".33" stop-color="#efa253"></stop>
                <stop offset=".58" stop-color="#f2ab5d"></stop>
                <stop offset=".81" stop-color="#f6bb6e"></stop>
                <stop offset="1" stop-color="#fccd81"></stop>
              </linearGradient>
              <path
                d="M29.5 70.2c-13.6 0-24.6 12.6-24.6 28.2s11 28.2 24.6 28.2h4.2c-13.6 0-24.6-12.6-24.6-28.2s11-28.2 24.6-28.2h-4.2z"
                fill="url(#connects-announcement-66-u-uid-1)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="col-span-1 relative">
        <div class="grid grid-cols-2 absolute inset-x-0 bottom-0">
          <div class="col-span-1 px-1 md:px-5">
            <USelect
              v-model="selectedCategory"
              :options="categoryOptionsWithAll"
              value-attribute="id"
              option-attribute="name"
            />
          </div>
          <div class="col-span-1 px-1 md:px-5">
            <USelect v-model="selectedTime" :options="timeOptions" value-attribute="value" option-attribute="label">
              {{ selectedTimeLabel }}
            </USelect>
          </div>
        </div>
      </div>
    </div>
    <div class="history">
      <UTable :columns="columns" :rows="paginatedConnect" />
      <div class="pagination py-10 flex justify-end gap-3 px-3">
        <button :class="{ 'disabled-button': currentPage === 1 }" :disabled="currentPage === 1" @click="prevPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          :class="{ 'disabled-button': currentPage * itemsPerPage >= filteredConnect.length }"
          :disabled="currentPage * itemsPerPage >= filteredConnect.length"
          @click="nextPage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.disabled-button svg {
  display: none;
}
</style>
