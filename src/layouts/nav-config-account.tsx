import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

/** `label` values are i18n keys; translated in AccountPopover after async bundles load. */
export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Account.Home',
    href: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'Account.Profile',
    href: '#',
    icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Account.Settings',
    href: '#',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  },
];
