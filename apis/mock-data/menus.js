export const menuItems = [
  {
    id: 1,
    label: 'Tìm ứng viên',
    link: '/',
    submenu: [
      {
        label: 'Danh sách ứng viên',
        link: '/candidate',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        icon: 'i-heroicons-briefcase'
      },
      {
        label: 'Báo giá',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        link: '/',
        icon: 'i-heroicons-currency-dollar'
      },
      {
        label: 'Danh sách ứng viên',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        link: '/',
        icon: 'i-heroicons-academic-cap'
      },
      {
        label: 'Chính sách bảo mật',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        link: '/',
        icon: 'i-heroicons-academic-cap'
      }
    ]
  },
  {
    id: 2,
    label: 'Tìm công việc',
    link: '/heheh',
    submenu: [
      {
        label: 'Danh sách công việc',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        link: '/job',
        icon: 'i-heroicons-academic-cap'
      },
      {
        label: 'Tìm công việc',
        desc: 'Tìm những công việc phù hợp với bạn',
        link: '/search',
        icon: 'i-heroicons-academic-cap'
      },
      {
        label: 'Công việc yêu thích',
        desc: 'Hàng ngàn công việc mới được đăng mỗi ngày',
        link: '/',
        icon: 'i-heroicons-currency-dollar'
      }
    ]
  },
  // { id: 4, label: 'Doanh nghiệp', link: '/auth/signin' },
  { id: 7, label: 'Tin nhắn', link: '/message/5', hiddenDesk: false },
  { id: 3, label: 'Liên hệ', link: '/' },
  { id: 5, label: 'Đăng nhập', link: '/auth/signin', hiddenDesk: true },
  { id: 6, label: 'Đăng ký', link: '/auth/signup', hiddenDesk: true }
]

export const userMenus = [
  [
    {
      id: 1,
      label: 'Hồ sơ',
      link: '/profile/1',
      icon: 'i-heroicons-user'
    },
    {
      id: 2,
      label: 'Tài khoản của tôi',
      link: '/',
      icon: 'i-heroicons-user'
    },
    {
      id: 3,
      label: 'Công việc đã lưu',
      link: '/',
      icon: 'i-heroicons-user'
    },
    {
      id: 4,
      label: 'Lịch sử công việc',
      link: '/',
      icon: 'i-heroicons-user'
    },
    {
      id: 5,
      label: 'Đăng xuất',
      link: '/auth/signout',
      icon: 'i-heroicons-academic-cap'
    }
  ]
]
