import { INavData } from '@coreui/angular'

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Theme',
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Components',
    title: true,
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Carousel',
        url: '/base/carousel',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Collapse',
        url: '/base/collapse',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'List Group',
        url: '/base/list-group',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Pagination',
        url: '/base/pagination',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Spinners',
        url: '/base/spinners',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Select',
        url: '/forms/select',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Range',
        url: '/forms/range',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Input Group',
        url: '/forms/input-group',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Layout',
        url: '/forms/layout',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Validation',
        url: '/forms/validation',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Charts',
    iconComponent: { name: 'cil-chart-pie' },
    url: '/charts',
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        icon: 'nav-icon-bullet',
        badge: {
          color: 'success',
          text: 'FREE',
        },
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Modal',
        url: '/notifications/modal',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Toast',
        url: '/notifications/toasts',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto',
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' },
  },
]

export const adminNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'User',
  },
  {
    name: 'Tenant',
    url: '/tenant',
    iconComponent: { name: 'cil-tennis-ball' },
  },
  {
    name: 'Customer',
    url: '/customer',
    linkProps: { fragment: 'headings' },
    iconComponent: { name: 'cil-smile' },
  },
  {
    name: 'Apps',
    title: true,
  },
  {
    name: 'Fee Configuration',
    url: '/fee',
    iconComponent: { name: 'cil-money' },
  },
]

export const tenantManagerNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Managerial',
  },
  {
    name: 'Company',
    url: '/company',
    iconComponent: { name: 'cil-factory' },
  },
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-at' },
  },
  {
    name: 'Customer',
    url: '/customer',
    iconComponent: { name: 'cil-smile' },
  },
  {
    name: 'Product',
    title: true,
  },
  {
    name: 'Listing',
    url: '/listing',
    iconComponent: { name: 'cil-lightbulb' },
  },
  {
    name: 'Vehicle',
    url: '/vehicle',
    iconComponent: { name: 'cil-car-alt' },
  },
  {
    name: 'Booking Order',
    title: true,
  },
  {
    name: 'Booking',
    url: '/booking',
    iconComponent: { name: 'cil-clipboard' },
  },
  {
    name: 'Order',
    url: '/order',
    iconComponent: { name: 'cil-basket' },
  },
  {
    name: 'Finance',
    title: true,
  },
  {
    name: 'Balance',
    url: '/balance',
    iconComponent: { name: 'cil-chart-line' },
  },
  {
    name: 'Billing',
    url: '/billing',
    iconComponent: { name: 'cil-credit-card' },
  },
]

export const tenantAdminNavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    title: true,
    name: 'Managerial',
  },
  {
    name: 'Customer',
    url: '/customer',
    iconComponent: { name: 'cil-smile' },
  },
  {
    name: 'Product',
    title: true,
  },
  {
    name: 'Listing',
    url: '/listing',
    iconComponent: { name: 'cil-lightbulb' },
  },
  {
    name: 'Vehicle',
    url: '/vehicle',
    iconComponent: { name: 'cil-car-alt' },
  },
  {
    name: 'Booking Order',
    title: true,
  },
  {
    name: 'Booking',
    url: '/booking',
    iconComponent: { name: 'cil-clipboard' },
  },
  {
    name: 'Order',
    url: '/order',
    iconComponent: { name: 'cil-basket' },
  },
  {
    name: 'Finance',
    title: true,
  },
  {
    name: 'Billing',
    url: '/billing',
    iconComponent: { name: 'cil-credit-card' },
  },
]
