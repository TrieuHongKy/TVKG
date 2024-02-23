export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    strategy: 'override',
    button: {
      color: {
        primary: {
          solid:
            'bg-primary dark:bg-primary border-primary text-white border dark:border-primary dark:text-tertiary hover:bg-transparent dark:hover:bg-transparent hover:text-primary dark:hover:text-primary',
          outline:
            'bg-transparent dark:bg-transparent hover:text-white text-primary dark:text-primary border-primary border dark:border-primary hover:bg-primary dark:hover:bg-primary dark:hover:text-tertiary'
        },
        white: {
          solid:
            'bg-white dark:bg-white border-white text-tertiary border dark:border-white dark:text-tertiary hover:bg-transparent dark:hover:bg-transparent hover:text-white dark:hover:text-white ring-0',
          outline:
            'bg-transparent dark:bg-transparent hover:text-tertiary text-white dark:text-white border-white border dark:border-white hover:bg-white dark:hover:bg-white dark:hover:text-tertiary'
        }
      }
    },
    modal: {
      container: 'flex min-h-full items-center justify-center text-center'
    },
    badge: {
      color: {
        white: {
          solid:
            'rounded-2xl text-xs bg-tag dark:bg-tag-dark text-tertiary h-fit w-fit px-4 py-1 hover:text-primary dark:hover:text-secondary-light hover:underline cursor-pointer;'
        },
        special: {
          solid:
            'rounded-2xl text-xs bg-tag dark:bg-tag-dark text-tertiary h-fit w-fit px-4 py-1 hover:text-primary dark:hover:text-secondary-light hover:underline cursor-pointer;'
        },
        primary: {
          solid:
            'rounded-2xl text-xs h-fit w-fit px-3 py-1 bg-primary hover:bg-[#108a00] text-white hover:cursor-default dark:text-tertiary dark:hover:bg-secondary dark:hover:text-white ;'
        }
      }
    },
    radio: {
      background: 'bg-gray-100 dark:bg-gray-600',
      base: 'h-4 w-4 dark:checked:bg-green-600 dark:checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      label: 'text-sm !important;'
    },
    checkbox: {
      background: 'bg-gray-100 dark:bg-gray-600',
      base: 'h-4 w-4 dark:checked:bg-green-600 dark:checked:border-transparent dark:indeterminate:bg-primary dark:indeterminate:border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus:ring-0 focus:ring-transparent focus:ring-offset-transparent',
      label: 'text-sm !important;'
    },
    pagination: {
      default: {
        activeButton: {
          color: 'primary',
          class:
            'border border-gray-300 dark:bg-theme-dark dark:border dark:border-gray-600 dark:bg-primary/60 dark:text-white text-white bg-primary font-medium'
        },
        inactiveButton: {
          color: 'white',
          class:
            'border border-gray-300 dark:bg-theme-dark dark:border dark:border-gray-600 text-gray-400 hover:text-primary dark:bg-theme-dark dark:text-gray-300 '
        },
        prevButton: {
          color: 'gray',
          class: 'rtl:[&_span:first-child]:rotate-180 text-gray-400',
          icon: 'i-heroicons-chevron-left-20-solid'
        },
        nextButton: {
          color: 'gray',
          class: 'rtl:[&_span:last-child]:rotate-180 dark:border dark:border-gray-600 text-gray-400',
          icon: 'i-heroicons-chevron-right-20-solid'
        }
      }
    },
    accordion: {
      item: {
        size: 'text-lg',
        padding: 'pt-1.5 pb-3 px-2'
      }
    },
    notifications: {
      position: 'top-12 right-0 sm:right-8 md:right-10'
    },
    skeleton: {
      base: 'animate-pulse',
      background: 'bg-theme-light dark:bg-theme-dark',
      rounded: 'rounded-md'
    }
  }
})
