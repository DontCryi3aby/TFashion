import { CONFIG } from 'src/config-global';

import { SignUpView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  console.log('SignUpPage');
  return (
    <>
      <title>{`Sign up - ${CONFIG.appName}`}</title>

      <SignUpView />
    </>
  );
}
