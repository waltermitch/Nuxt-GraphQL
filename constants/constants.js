export const HEADER_TABS = [
  {
    id: 1,
    name: 'Home',
    src: require('assets/images/icons/header/home.svg'),
    to: '/home/close-register',
  },
  {
    id: 2,
    name: 'Review',
    src: require('assets/images/icons/header/portfolio.svg'),
    to: '/review/weekly-purchases',
  },
  {
    id: 3,
    name: 'Reports',
    src: require('assets/images/icons/header/graph-line.svg'),
    to: '/reports',
  },
  {
    id: 4,
    name: 'Admin',
    src: require('assets/images/icons/header/person-circle.svg'),
    to: '/admin/fixed-expenses',
  },
]

export const HOME_NAV_TABS = [
  {
    id: 1,
    caption: 'Select Unit',
    pageUrl: '/home/select-unit',
    iconSrc: require('assets/images/icons/home/cube.svg'),
  },
  {
    id: 2,
    caption: 'Close Register',
    pageUrl: '/home/close-register',
    iconSrc: require('assets/images/icons/home/window-close.svg'),
  },
  {
    id: 3,
    caption: 'Catering Sales',
    pageUrl: '/home/catering-sales',
    iconSrc: require('assets/images/icons/home/room_service.svg'),
  },
  {
    id: 4,
    caption: 'Purchase Orders',
    pageUrl: '/home/purchase-orders',
    iconSrc: require('assets/images/icons/home/order.svg'),
  },
  {
    id: 5,
    caption: 'Inventory',
    pageUrl: '/home/inventory',
    iconSrc: require('assets/images/icons/home/inventory.svg'),
  },
  {
    id: 6,
    caption: 'Expenses',
    pageUrl: '/home/expenses',
    iconSrc: require('assets/images/icons/home/account_balance_wallet.svg'),
  },
  {
    id: 7,
    caption: 'Receipts',
    pageUrl: '/home/receipts',
    iconSrc: require('assets/images/icons/home/receipt_long.svg'),
  },
  {
    id: 8,
    caption: 'On-Call Labor',
    pageUrl: '/home/on-call-labor',
    iconSrc: require('assets/images/icons/home/on-call.svg'),
  },
  {
    id: 9,
    caption: 'Accruals',
    pageUrl: '/home/accruals',
    iconSrc: require('assets/images/icons/home/chart-line.svg'),
  },
  {
    id: 10,
    caption: 'ReAccruals',
    pageUrl: '/home/reaccruals',
    iconSrc: require('assets/images/icons/home/chart-line.svg'),
  },
]

export const ADMIN_NAV_TABS = [
  {
    id: 1,
    caption: 'Fixed Expenses',
    pageUrl: '/admin/fixed-expenses',
    iconSrc: require('assets/images/icons/admin/account_balance_wallet.svg'),
  },
  {
    id: 2,
    caption: 'Close week',
    pageUrl: '/admin/close-week',
    iconSrc: require('assets/images/icons/admin/date.svg'),
  },
]

export const REVIEW_NAV_TABS = [
  {
    id: 1,
    caption: 'Register Closeout',
    pageUrl: '/review/register-closeout',
    iconSrc: require('assets/images/icons/review/period.svg'),
  },
  {
    id: 2,
    caption: 'Catering Sales',
    pageUrl: '/review/catering-sales',
    iconSrc: require('assets/images/icons/review/period.svg'),
  },
  {
    id: 3,
    caption: 'Weekly Purchases',
    pageUrl: '/review/weekly-purchases',
    iconSrc: require('assets/images/icons/review/period.svg'),
  },
  {
    id: 3,
    caption: 'Weekly Expenses',
    pageUrl: '/review/weekly-expenses',
    iconSrc: require('assets/images/icons/review/period.svg'),
  },
]
