import { Link, Dropdown } from "../interfaces/Menu";

export const routerLinks: (Link | Dropdown)[] = [
  {
    type: 'link',
    routeName: 'Paginations',
    label: 'Paginação',
    icon: 'pager',
  },
  {
    type: 'link',
    routeName: 'Datatables',
    label: 'Datatables',
    icon: 'table-list',
  },
  {
    type: 'link',
    routeName: 'Alerts',
    label: 'Alertas',
    icon: 'circle-exclamation',
  },
  {
    type: 'link',
    routeName: 'Loader',
    label: 'Loaders',
    icon: 'spinner',
  },
  {
    type: 'link',
    routeName: 'Modals',
    label: 'Modals',
    icon: 'window-restore',
  },
  {
    type: 'dropdown',
    routeName: '',
    label: 'Forms',
    icon: 'file-signature',
    links: [
      {
        type: 'link',
        routeName: 'FormKit',
        label: 'FormKit',
        icon: ['fab', 'wpforms'],
      },
      {
        type: 'link',
        routeName: 'DebounceInput',
        label: 'Debounce',
        icon: 'magnifying-glass',
      },
      {
        type: 'link',
        routeName: 'Select',
        label: 'Select',
        icon: 'arrow-pointer',
      },
      {
        type: 'link',
        routeName: 'MultipleSelect',
        label: 'MultipleSelect',
        icon: 'object-ungroup',
      },
    ],
  },
  {
    type: 'dropdown',
    routeName: '',
    label: 'Elementos',
    icon: ['fab', 'elementor'],
    links: [
      {
        type: 'link',
        routeName: 'Dropdown',
        label: 'Dropdown',
        icon: ['fab', 'dropbox'],
      }
    ]
  }
]
