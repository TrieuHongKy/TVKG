<script lang="ts">
import { ref } from 'vue'

interface Urls {
  name: string
  link: string
}

interface Footer {
  id: number
  name: string
  urls: Urls[]
}

interface SocialNetwork {
  id: number
  icon: string
  name: string
  href: string
}

export default {
  setup() {
    const footer_menu_top = ref<Footer[]>([
      {
        id: 1,
        name: 'Dành cho nhà tuyển dụng',
        urls: [
          {
            name: 'Tìm hồ sơ ứng viên',
            link: '#'
          },
          {
            name: 'Bảng giá đăng tin',
            link: '#'
          },
          {
            name: 'Đăng tin tuyển dụng',
            link: '#'
          },
          {
            name: 'Quản lý hồ sơ tiềm năng',
            link: '#'
          },
          {
            name: 'Cẩm nang tuyển dụng',
            link: '#'
          }
        ]
      },
      {
        id: 1,
        name: 'Dành cho ứng viên',
        urls: [
          {
            name: 'Tạo hồ sơ',
            link: '#'
          },
          {
            name: 'Cách tìm việc',
            link: '#'
          },
          {
            name: 'Việc làm mới nhất',
            link: '#'
          },
          {
            name: 'Việc làm cấp quản lý',
            link: '#'
          },
          {
            name: 'Lao động phổ thông',
            link: '#'
          }
        ]
      },
      {
        id: 1,
        name: 'Liên hệ',
        urls: [
          {
            name: 'Địa chỉ: Đ. Nguyễn Văn Cừ, khu phố 3, Phú Quốc, Kiên Giang',
            link: '#'
          },
          {
            name: 'Email: TVKG@gmail.org',
            link: '#'
          },
          {
            name: 'Số điện thoại: 0964556760',
            link: '#'
          }
        ]
      }
    ])
    const footer_menu_bottom = ref<Footer[]>([
      {
        id: 1,
        name: 'dành cho khách hàng',
        urls: [
          {
            name: 'Điều khoản dịch vụ',
            link: '/policy/terms-of-service'
          },
          {
            name: 'Chính sách bảo mật',
            link: '/policy/privacy-policy'
          }
        ]
      }
    ])

    const social_network = ref<SocialNetwork[]>([
      {
        id: 1,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>',
        name: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100094499061066'
      },
      {
        id: 1,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>',
        name: 'Linkedin',
        href: 'https://facebook.com'
      },
      {
        id: 1,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path></svg>',
        name: 'Youtube',
        href: 'https://facebook.com'
      }
    ])

    return {
      footer_menu_top,
      social_network,
      footer_menu_bottom,
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<template>
  <footer class="bg-secondary text-tertiary-light m-2 rounded-2xl text-sm/[14px] p-5 md:pt-10 md:px-10 md:pb-10">
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div v-for="(item, index) in footer_menu_top" :key="index" class="col-span-1">
          <div class="font-bold text-xl py-4 md:py-0 mb-6">
            {{ item.name }}
          </div>
          <div class="list-menu">
            <ul>
              <li
                v-for="(contentItem, contentIndex) in item.urls"
                :key="contentIndex"
                class="mb-3 sm:pr-36 md:pr-8 leading-6"
              >
                <a :href="contentItem.link">
                  {{ contentItem.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-1">
          <social-network-facebook />
        </div>
      </div>
    </div>
    <div class="sub-footer mx-auto w-full max-w-screen-xl">
      <div class="social-network block md:flex items-center py-3">
        <div class="title text-center md:text-start mb-3 md:mb-0 pr-2">Theo dõi chúng tôi:</div>
        <ul class="flex justify-center gap-2 md:justify-end">
          <li v-for="(item, index) in social_network" :key="index" class="m-1">
            <!-- eslint-disable vue/no-v-html -->
            <a :href="item.href" v-html="item.icon"></a>
          </li>
        </ul>
      </div>
      <hr />
      <div class="py-3 block md:flex text-center">
        <div class="mb-6 md:mb-0">&copy; 2023 - {{ currentYear }} Tìm Việc Kiên Giang.</div>
        <ul v-for="(item, index) in footer_menu_bottom" :key="index" class="ms-3 flex flex-wrap justify-center md:flex">
          <li v-for="(contentItem, contentIndex) in item.urls" :key="contentIndex" class="ms-3 mb-3">
            <NuxtLink :href="contentItem.link">{{ contentItem.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer .list-menu a {
  @apply block;
}

footer .social-network ul li {
  @apply border-double border-2 border-tertiary-light rounded-full w-[36px] h-[36px];
}

footer .social-network ul li a {
  @apply h-[100%] flex justify-center items-center;
}

footer a {
  fill: white;
}
</style>
