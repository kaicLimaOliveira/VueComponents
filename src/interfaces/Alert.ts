type Type = 'success' | 'danger' | 'info' | 'warning'; 

type Alert = {
  id?: string | number;
  type: Type;
  icon?: string;
  title: string;
  content: string;
}

export type {
  Alert
}