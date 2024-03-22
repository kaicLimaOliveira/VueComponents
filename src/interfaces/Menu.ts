interface MenuBase {
  type: string;
  label: string;
  routeName: string;
  params?: any;
  icon: string | string[];
}
 
interface Link extends MenuBase {
  type: "link";
}
 
interface Dropdown extends MenuBase {
  type: "dropdown";
  links: Link[];
}
 
export type {
  Link,
  Dropdown,
}