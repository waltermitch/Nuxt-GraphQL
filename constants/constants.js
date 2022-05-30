export const HEADER_TABS = [
  {
    id: 1,
    name: 'Home',
    src: require('assets/images/icons/header/home.svg'),
    to: '/home',
  },
  {
    id: 2,
    name: 'Review',
    src: require('assets/images/icons/header/portfolio.svg'),
    to: '/review',
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
    to: '/admin',
  },
]

export const HQ_HEADER_TABS = [
  {
    id: 1,
    name: 'Maintenance',
    src: require('assets/images/icons/hqHeader/maintenance.svg'),
    to: '/hq-maintenance',
  },
  {
    id: 2,
    name: 'Unit Setup',
    src: require('assets/images/icons/hqHeader/units.svg'),
    to: '/hq-unit-setup',
  },
  {
    id: 3,
    name: 'Reports',
    src: require('assets/images/icons/hqHeader/reports.svg'),
    to: '/hq-reports',
  },
  {
    id: 4,
    name: 'Accounting',
    src: require('assets/images/icons/hqHeader/accounting.svg'),
    to: '/hq-accounting',
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
    caption: 'On-Call Labor',
    pageUrl: '/home/on-call-labor',
    iconSrc: require('assets/images/icons/home/on-call.svg'),
  },
  {
    id: 8,
    caption: 'Accruals',
    pageUrl: '/home/accruals',
    iconSrc: require('assets/images/icons/home/chart-line.svg'),
  },
  {
    id: 9,
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
    id: 4,
    caption: 'Weekly Expenses',
    pageUrl: '/review/weekly-expenses',
    iconSrc: require('assets/images/icons/review/period.svg'),
  },
]

export const REPORTS_NAV_TABS = [
  {
    id: 1,
    caption: 'Open Report',
    pageUrl: '/reports/open-report',
    iconSrc: require('assets/images/icons/header/graph-line.svg'),
  },
]

export const HQ_MAINTENANCE_TABS = [
  {
    id: 1,
    caption: 'Units Reporting',
    pageUrl: '/hq-maintenance/units-reporting',
    iconSrc: require('assets/images/icons/header/home.svg'),
  },
  {
    id: 2,
    caption: 'Send Unit Update',
    pageUrl: '/hq-maintenance/send-unit-update',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 3,
    caption: 'Export Data',
    pageUrl: '/hq-maintenance/export-purchases',
    iconSrc: require('assets/images/icons/hqIcons/export-purchases.svg'),
  },
]

export const HQ_UNITS_TABS = [
  {
    id: 1,
    caption: 'Units',
    pageUrl: '/hq-unit-setup/unit-info',
    iconSrc: require('assets/images/icons/hqIcons/export-purchases.svg'),
  },
  {
    id: 2,
    caption: 'Unit Type',
    pageUrl: '/hq-unit-setup/unit-type',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 3,
    caption: 'Registers',
    pageUrl: '/hq-unit-setup/registers',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 4,
    caption: 'Unit Vendor',
    pageUrl: '/hq-unit-setup/unit-vendor',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 5,
    caption: 'Unit GL',
    pageUrl: '/hq-unit-setup/unit-gl',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 6,
    caption: 'Employee',
    pageUrl: '/hq-unit-setup/employee',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 7,
    caption: 'Employee To Unit',
    pageUrl: '/hq-unit-setup/employee-to-unit',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 8,
    caption: 'Unit Period Status',
    pageUrl: '/hq-unit-setup/unit-period-status',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
]

export const HQ_REPORT_TABS = [
  {
    id: 1,
    caption: 'Multi Unit Labor Report',
    pageUrl: '/hq-reports/labor-schedule-report',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 2,
    caption: 'Weekly Operating Reports',
    pageUrl: '/hq-reports/weekly-operating-reports',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 3,
    caption: 'Monthly Operating Reports',
    pageUrl: '/hq-reports/monthly-operating-reports',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 4,
    caption: 'Closed Units',
    pageUrl: '/hq-reports/closed-units',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
]

export const HQ_ACCOUNTING = [
  {
    id: 1,
    caption: 'State',
    pageUrl: '/hq-accounting/state',
    iconSrc: require('assets/images/icons/hqIcons/export-purchases.svg'),
  },
  {
    id: 2,
    caption: 'County',
    pageUrl: '/hq-accounting/county',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 3,
    caption: 'City',
    pageUrl: '/hq-accounting/city',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 4,
    caption: 'District',
    pageUrl: '/hq-accounting/district',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 5,
    caption: 'Vendor',
    pageUrl: '/hq-accounting/vendor',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
  {
    id: 6,
    caption: 'Users',
    pageUrl: '/hq-accounting/users',
    iconSrc: require('assets/images/icons/hqIcons/default.svg'),
  },
]
