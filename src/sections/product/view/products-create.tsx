import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { UploadFileIcon } from 'src/assets/additionalSvg';

import {
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Container,
  Link,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { FiltersProps } from '../product-filters';

import { useDropzone } from 'react-dropzone';
// import CloseIcon from '@mui/icons-material/Close';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Iconify } from 'src/components/iconify';
import Editor from 'src/components/editor';
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

export function ProductsCreateView() {
  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const navigate = useNavigate();

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
        Create a new product
      </Typography>

      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit">
          Product
        </Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>

      {/* Card */}
      <Card sx={{ borderRadius: 3 }}>
        <CardHeader
          title="Details"
          subheader="Title, short description, image..."
        />

        <CardContent>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Product Name */}
            <TextField
              label="Product name"
              fullWidth
              variant="outlined"
            />

            {/* Sub description */}
            <TextField
              label="Sub description"
              fullWidth
              multiline
              rows={4}
            />

            {/* Content (Fake editor for now) */}
            <Box>
              <Typography variant="subtitle2" mb={1}>
                Content
              </Typography>

              {/* <Box
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  p: 2,
                  minHeight: 150,
                  color: 'text.secondary',
                }}
              >
                Write something awesome...
              </Box> */}
              <Editor />
            </Box>

            <ProductImagesUpload />
          </Box>
        </CardContent>
      </Card>
    </Container>
    </DashboardContent>
  );
}

export default function ProductImagesUpload() {
  const [files, setFiles] = useState<any[]>([]);
  const [error, setError] = useState('');

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
        Images
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