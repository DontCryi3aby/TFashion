import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { UploadFileIcon } from 'src/assets/additionalSvg';

import type { SelectChangeEvent } from '@mui/material/Select';

import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import { alpha } from '@mui/material/styles';
import {
  Card,
  Link,
  Button,
  Collapse,
  Container,
  TextField,
  CardHeader,
  IconButton,
  Breadcrumbs,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { FiltersProps } from '../product-filters';

import { useDropzone } from 'react-dropzone';
// import CloseIcon from '@mui/icons-material/Close';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Iconify } from 'src/components/iconify';
import Editor from 'src/components/editor';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shose', label: 'Shose' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

const PROPERTIES_CATEGORIES = [
  { value: 't-shirts', labelKey: 'Product.Cat.t-shirts' },
  { value: 'apparel', labelKey: 'Product.Cat.apparel' },
  { value: 'accessories', labelKey: 'Product.Cat.accessories' },
  { value: 'shoes', labelKey: 'Product.Cat.shoes' },
] as const;

const PROPERTIES_COLOR_OPTIONS = ['Black', 'White', 'Red', 'Blue', 'Navy', 'Pink'];

const PROPERTIES_SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const PROPERTIES_GENDER = [
  { value: 'men', labelKey: 'Product.Men' },
  { value: 'women', labelKey: 'Product.Women' },
  { value: 'kids', labelKey: 'Product.Kids' },
] as const;

const PROPERTIES_TAG_OPTIONS = [
  { id: 'technology', labelKey: 'Product.TagOption.technology' },
  { id: 'health-wellness', labelKey: 'Product.TagOption.health_wellness' },
  { id: 'travel', labelKey: 'Product.TagOption.travel' },
  { id: 'finance', labelKey: 'Product.TagOption.finance' },
  { id: 'education', labelKey: 'Product.TagOption.education' },
  { id: 'food-beverage', labelKey: 'Product.TagOption.food_beverage' },
  { id: 'fashion', labelKey: 'Product.TagOption.fashion' },
  { id: 'home-garden', labelKey: 'Product.TagOption.home_garden' },
] as const;

type PropertiesTagOption = (typeof PROPERTIES_TAG_OPTIONS)[number];

function ProductPropertiesSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const [productCode, setProductCode] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [category, setCategory] = useState('t-shirts');
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [tags, setTags] = useState<PropertiesTagOption[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [saleEnabled, setSaleEnabled] = useState(false);
  const [saleLabel, setSaleLabel] = useState('');
  const [newEnabled, setNewEnabled] = useState(false);
  const [newLabel, setNewLabel] = useState('');

  const toggleGender = (value: string) => {
    setGender((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleMultiSelect =
    (setter: (v: string[]) => void) => (event: SelectChangeEvent<string[]>) => {
      const v = event.target.value;
      setter(typeof v === 'string' ? v.split(',') : v);
    };

  return (
    <Card sx={{ borderRadius: 3, mt: 3 }}>
      <Box sx={{ pb: 3 }}>
        <CardHeader
          title={t('Product.Properties')}
          subheader={t('Product.Properties subheader')}
          action={
            <IconButton
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={t('Product.Toggle properties')}
              edge="end"
            >
              <Iconify
                icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                width={22}
              />
            </IconButton>
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}
        />
      </Box>

      <Collapse in={open} timeout="auto">
        <CardContent sx={{ pt: 0 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('Product.Product code')}
                placeholder={t('Product.Product code')}
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('Product.Product SKU')}
                placeholder={t('Product.Product SKU')}
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('Product.Quantity')}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="product-category-label">{t('Product.Category')}</InputLabel>
                <Select
                  labelId="product-category-label"
                  value={category}
                  label={t('Product.Category')}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {PROPERTIES_CATEGORIES.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {t(opt.labelKey)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="product-colors-label">{t('Product.Colors')}</InputLabel>
                <Select
                  labelId="product-colors-label"
                  multiple
                  value={colors}
                  onChange={handleMultiSelect(setColors)}
                  input={<OutlinedInput label={t('Product.Colors')} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {PROPERTIES_COLOR_OPTIONS.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={colors.indexOf(name) > -1} size="small" />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="product-sizes-label">{t('Product.Sizes')}</InputLabel>
                <Select
                  labelId="product-sizes-label"
                  multiple
                  value={sizes}
                  onChange={handleMultiSelect(setSizes)}
                  input={<OutlinedInput label={t('Product.Sizes')} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {PROPERTIES_SIZE_OPTIONS.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={sizes.indexOf(name) > -1} size="small" />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Autocomplete<PropertiesTagOption, true, false, false>
                multiple
                disableCloseOnSelect
                options={[...PROPERTIES_TAG_OPTIONS]}
                value={tags}
                onChange={(_, newValue) => setTags(newValue)}
                getOptionLabel={(option) => t(option.labelKey)}
                isOptionEqualToValue={(a, b) => a.id === b.id}
                renderOption={(props, option, state) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{
                      ...(state.selected && {
                        bgcolor: 'action.hover',
                      }),
                    }}
                  >
                    {t(option.labelKey)}
                  </Box>
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.id}
                      label={t(option.labelKey)}
                      size="small"
                      sx={(theme) => ({
                        bgcolor: alpha(theme.palette.primary.main, 0.16),
                        color: 'primary.dark',
                        '& .MuiChip-deleteIcon': {
                          color: 'primary.main',
                          '&:hover': { color: 'primary.dark' },
                        },
                      })}
                    />
                  ))
                }
                slotProps={{
                  listbox: {
                    sx: { maxHeight: 240, overflow: 'auto' },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('Product.Tags')}
                    placeholder={t('Product.Tags placeholder')}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                {t('Product.Gender')}
              </Typography>
              <FormGroup row>
                {PROPERTIES_GENDER.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    control={
                      <Checkbox
                        checked={gender.includes(opt.value)}
                        onChange={() => toggleGender(opt.value)}
                      />
                    }
                    label={t(opt.labelKey)}
                  />
                ))}
              </FormGroup>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Switch
                  checked={saleEnabled}
                  onChange={(e) => setSaleEnabled(e.target.checked)}
                  inputProps={{ 'aria-label': t('Product.Sale label') }}
                />
                <TextField
                  fullWidth
                  placeholder={t('Product.Sale label')}
                  value={saleLabel}
                  onChange={(e) => setSaleLabel(e.target.value)}
                  disabled={!saleEnabled}
                />
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Switch
                  checked={newEnabled}
                  onChange={(e) => setNewEnabled(e.target.checked)}
                  inputProps={{ 'aria-label': t('Product.New label') }}
                />
                <TextField
                  fullWidth
                  placeholder={t('Product.New label')}
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  disabled={!newEnabled}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

/** Digits and at most one decimal point (suitable for price / tax % editing). */
function filterDecimalString(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '');
  const dot = cleaned.indexOf('.');
  if (dot === -1) return cleaned;
  return `${cleaned.slice(0, dot + 1)}${cleaned.slice(dot + 1).replace(/\./g, '')}`;
}

function ProductPricingSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [includesTax, setIncludesTax] = useState(false);
  const [taxPercent, setTaxPercent] = useState('');

  return (
    <Card sx={{ borderRadius: 3, mt: 3 }}>
      <Box sx={{ pb: 3 }}>
        <CardHeader
          title={t('Product.Pricing')}
          subheader={t('Product.Pricing subheader')}
          action={
            <IconButton
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={t('Product.Toggle pricing')}
              edge="end"
            >
              <Iconify
                icon={open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                width={22}
              />
            </IconButton>
          }
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}
        />
      </Box>

      <Collapse in={open} timeout="auto">
        <CardContent sx={{ pt: 0 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label={t('Product.Regular price')}
              placeholder="0.00"
              value={regularPrice}
              onChange={(e) => setRegularPrice(filterDecimalString(e.target.value))}
              inputProps={{ inputMode: 'decimal' }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
            />

            <TextField
              fullWidth
              label={t('Product.Sale price')}
              placeholder="0.00"
              value={salePrice}
              onChange={(e) => setSalePrice(filterDecimalString(e.target.value))}
              inputProps={{ inputMode: 'decimal' }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                },
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={includesTax}
                  onChange={(e) => setIncludesTax(e.target.checked)}
                  inputProps={{ 'aria-label': t('Product.Price includes taxes') }}
                />
              }
              label={t('Product.Price includes taxes')}
            />

            {!includesTax && (
              <TextField
                fullWidth
                label={t('Product.Tax percent')}
                placeholder="0.00"
                value={taxPercent}
                onChange={(e) => setTaxPercent(filterDecimalString(e.target.value))}
                inputProps={{ inputMode: 'decimal' }}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  },
                }}
              />
            )}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export function ProductsCreateView() {
  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const [detailsOpen, setDetailsOpen] = useState(true);

  const [publish, setPublish] = useState(true);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
<Container maxWidth="lg">
      {/* Title */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('Product.Create a new product')}
      </Typography>

      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit">
          {t('Dashboard.Dashboard')}
        </Link>
        <Link underline="hover" color="inherit">
          {t('Dashboard.Product')}
        </Link>
        <Typography color="text.primary">{t('Product.Create')}</Typography>
      </Breadcrumbs>

      {/* Card */}
      <Card sx={{ borderRadius: 3 }}>
        <Box sx={{ pb: 3 }}>
          <CardHeader
            title={t('Product.Details')}
            subheader={t('Product.Title, short description, image...')}
            action={
              <IconButton
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
                aria-label={t('Product.Toggle details')}
                edge="end"
              >
                <Iconify
                  icon={detailsOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                  width={22}
                />
              </IconButton>
            }
            sx={{ '& .MuiCardHeader-action': { alignSelf: 'center', m: 0 } }}
          />
        </Box>

        <Collapse in={detailsOpen} timeout="auto">
          <CardContent sx={{ pt: 0 }}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label={t('Product.Product name')}
                fullWidth
                variant="outlined"
              />

              <TextField
                label={t('Product.Sub description')}
                fullWidth
                multiline
                rows={4}
              />

              <Box>
                <Typography variant="subtitle2" mb={1}>
                  {t('Product.Content')}
                </Typography>
                <Editor />
              </Box>

              <ProductImagesUpload />
            </Box>
          </CardContent>
        </Collapse>
      </Card>

      <ProductPropertiesSection />

      <ProductPricingSection />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent="space-between"
        sx={{ mt: 3 }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              inputProps={{ 'aria-label': t('Product.Publish') }}
            />
          }
          label={t('Product.Publish')}
        />
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={() => {
            // TODO: wire create product API
          }}
          sx={{
            alignSelf: { xs: 'stretch', sm: 'auto' },
            minWidth: { sm: 200 },
            py: 1.5,
            bgcolor: 'grey.900',
            color: 'common.white',
            '&:hover': { bgcolor: 'grey.800' },
          }}
        >
          {t('Product.Create product')}
        </Button>
      </Stack>
    </Container>
    </DashboardContent>
  );
}

export default function ProductImagesUpload() {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mapped = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const newFiles = [...files, ...mapped];
    setFiles(newFiles);

    // validate min 2
    if (newFiles.length < 2) {
      setError('Must have at least 2 items!');
    } else {
      setError('');
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const removeFile = (file: any) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
    setError(newFiles.length < 2 ? 'Must have at least 2 items!' : '');
  };

  const removeAll = () => {
    setFiles([]);
    setError('Must have at least 2 items!');
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {t("Product.Images")}
      </Typography>

      {/* DROP ZONE */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: error ? 'error.main' : '#dfe3e8',
          borderRadius: 3,
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: error
            ? 'rgba(255, 72, 66, 0.08)'
            : isDragActive
            ? 'rgba(0,0,0,0.04)'
            : 'transparent',
          transition: '0.2s',
        }}
      >
        <input {...getInputProps()} />

        <Box
          sx={{
            mx: 'auto',
            mb: 2,
            borderRadius: 2,
          }}
        >
          {UploadFileIcon}
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          color={error ? 'error.main' : 'text.primary'}
        >
          Drop or select files
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Drag files here, or{' '}
          <Link underline="always" color="primary">
            browse
          </Link>{' '}
          your device.
        </Typography>
      </Box>

      {/* ERROR */}
      {error && (
        <Typography color="error.main" mt={1}>
          {error}
        </Typography>
      )}

      {/* PREVIEW */}
      {files.length > 0 && (
        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          {files.map((file) => (
            <Box
              key={file.name}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #ddd',
              }}
            >
              <img
                src={file.preview}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* REMOVE BTN */}
              <IconButton
                size="small"
                onClick={() => removeFile(file)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                }}
              >
                {/* <CloseIcon fontSize="small" /> */}
                <Iconify icon="mdi:close-circle" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* ACTIONS */}
      {files.length > 0 && (
        <Box
          mt={3}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Button variant="outlined" onClick={removeAll}>
            Remove All
          </Button>

          <Button
            variant="contained"
            // startIcon={<CloudUploadIcon />}
            disabled={files.length < 2}
            onClick={() => console.log('Upload', files)}
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
}