export const table = {
  props: {
    headers: {
      'name': 'Name',
      'description': 'Description',
      'type': 'Type',
      'values': 'Values',
      'default': 'Default',
    },
    data: [
      {
        id: 0,
        name: 'headers',
        description: 'Os cabeçalhos que serão exibidos na tabela.',
        type: 'object',
        values: '--',
        default: '--',
      },
      {
        id: 0,
        name: 'data',
        description: 'Todos os dados que a tabela irá manipular.',
        type: 'Generic<any>[]',
        values: '--',
        default: '--',
      },
    ],
    active: true,
  },
  slots: {
    headers: {
      'name': 'Slot name',
      'description': 'Description',
      'props': 'Props (if scoped)',
    },
    data: [],
    active: false,
  },
  emits: {
    headers: {
      'name': 'Name',
      'description': 'Description',
      'type': 'Type',
    },
    data: [
      {
        id: 0,
        name: 'view',
        description: 'Emite um valor de visualização do objeto clicado.',
        type: 'object',
      },
    ],
    active: false,
  }
}