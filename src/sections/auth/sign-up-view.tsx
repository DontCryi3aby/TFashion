import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
import authApi from 'src/api/auth-api';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignUpView() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log(email, password, name, phone);
    if (email && password && name && phone) {
      const res: any = await authApi.register({ email, password, fullname: name, phone_number: phone });
      console.log("response", res);
      if (res?.success) {
        const user = res?.user;
        navigate('/admin/sign-in', {
          state: {
            email: user.email,
            fromRegister: true,
          },
        });
      }
    }
  };

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Email address"
        sx={{ mb: 3 }}
        placeholder="Enter your email"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />

      <TextField
        fullWidth
        name="fullname"
        label="Full name"
        sx={{ mb: 3 }}
        placeholder="Enter your name"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
        }}
      />

      <TextField
        fullWidth
        name="phone"
        label="Phone number"
        sx={{ mb: 3 }}
        placeholder="Phone number"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        value={phone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhone(event.target.value);
        }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignOut}
      >
        Sign up
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign up</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Already have an account?
          <Typography component="span" variant="subtitle2" sx={{ ml: 0.5, cursor: 'pointer', color: 'primary.main' }} onClick={() => navigate('/admin/sign-in')}>
            Sign in
          </Typography>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
