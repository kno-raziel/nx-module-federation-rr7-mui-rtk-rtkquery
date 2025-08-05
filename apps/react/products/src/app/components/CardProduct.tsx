import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Product } from '../models/product';

interface CardProductProps {
  product: Product;
  /** Display variant for different layouts */
  variant?: 'grid' | 'list';
  /** Show additional images on hover/click */
  showImageGallery?: boolean;
  /** Maximum height for the card */
  maxHeight?: number;
  /** Enable hover effects */
  enableHover?: boolean;
  /** Currency symbol */
  currency?: string;
}

const CardProduct = ({
  product,
  variant = 'grid',
  showImageGallery = false,
  maxHeight,
  enableHover = true,
  currency = 'USD',
}: CardProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageClick = () => {
    if (showImageGallery && product.images.length > 1) {
      setShowGallery(!showGallery);
    }
  };

  if (variant === 'list') {
    return (
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          maxHeight: maxHeight || 200,
          transition: enableHover ? 'all 0.3s ease-in-out' : 'none',
          '&:hover': enableHover
            ? {
                transform: 'translateY(-2px)',
                boxShadow: 3,
              }
            : {},
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 200,
            height: '100%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
          image={product.images[currentImageIndex] || product.images[0]}
          alt={product.title}
          onClick={handleImageClick}
        />
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6" component="h3" gutterBottom noWrap>
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.description}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h5" color="primary" fontWeight="bold">
              {formatPrice(product.price)}
            </Typography>
            <Chip
              label={product.category.name}
              size="small"
              variant="outlined"
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Grid variant (default)
  return (
    <Card
      sx={{
        width: '100%',
        maxHeight: maxHeight,
        display: 'flex',
        flexDirection: 'column',
        transition: enableHover ? 'all 0.3s ease-in-out' : 'none',
        '&:hover': enableHover
          ? {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            }
          : {},
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {showImageGallery && showGallery && product.images.length > 1 ? (
          <ImageList
            sx={{ width: '100%', height: 250, m: 0 }}
            cols={1}
            rowHeight={250}
          >
            {product.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <CardMedia
            component="img"
            height="250"
            image={product.images[currentImageIndex] || product.images[0]}
            alt={product.title}
            onClick={handleImageClick}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        )}

        {/* Image indicators for multiple images */}
        {product.images.length > 1 && !showGallery && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 0.5,
            }}
          >
            {product.images.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor:
                    index === currentImageIndex
                      ? 'primary.main'
                      : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </Box>
        )}

        {/* Category chip overlay */}
        <Chip
          label={product.category.name}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
          }}
        />
      </Box>

      {/* Content Section */}
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3em',
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ mt: 'auto', pt: 1 }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
            sx={{ textAlign: 'center' }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardProduct;
