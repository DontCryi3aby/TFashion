import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard.Dashboard',
    path: '/admin',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Dashboard.User',
    path: '/admin/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Dashboard.Product',
    path: '/admin/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Dashboard.Blog',
    path: '/admin/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Dashboard.Sign in',
    path: 'admin/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Dashboard.Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
