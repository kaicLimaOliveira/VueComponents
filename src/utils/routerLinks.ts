import { Link, Dropdown, Menu } from "../interfaces/Menu";
import { useRouter } from 'vue-router'


export function getNavbarRoutes() {
  const router = useRouter();
  const routes = router.options.routes;
  
  const excludedRoutes = ['NotFound', 'Home', 'Fake'];
  
  const navbarRoutes: Menu = routes
    .filter(route => !excludedRoutes.includes(route.name as string))
    .map(route => {
      const routeName = route.name;

      if (route.children) {
        const links: Link[] = route.children.map(child => ({
          type: 'link',
          routeName: child.name as string,
          label: child.name as string,
          icon: child.meta?.icon,
        }));
        
        return {
          type: 'dropdown',
          routeName: routeName,
          label: routeName,
          icon: route.meta?.icon,
          links,
        } as Dropdown;
        
      } else {
        return {
          type: 'link',
          routeName: routeName,
          label: routeName,
          icon: route.meta?.icon,
        } as Link;
      }
    });

  return navbarRoutes
}