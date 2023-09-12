import React, { CSSProperties, ReactEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';

interface IProps {
  src: string;
  width: number;
  height: number;
  defaultSrc?: string;
  className?: string;
  sizes?: string;
  style?: CSSProperties;
  alt?: string;
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined;
  onClick?: () => void;
}

const CustomImage = ({
  src,
  width,
  height,
  className,
  sizes,
  defaultSrc = '/images/default-image.jpg',
  style,
  alt = '',
  onLoad,
  onClick,
}: IProps) => {
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(src);

  useEffect(() => {
    setUrl(src);
  }, [src]);

  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      quality={100}
      className={`duration-200 ease-in-out group-hover:opacity-75 aspect-square object-cover ${
        loading ? 'scale-110 blur-md grayscale' : 'scale-100 blur-0 grayscale-0'
      } ${className}`}
      onLoad={onLoad}
      onLoadingComplete={() => setLoading(false)}
      onError={() => {
        setUrl(defaultSrc);
      }}
      sizes={sizes}
      style={style}
      onClick={() => {
        onClick && onClick();
      }}
    />
  );
};

export default CustomImage;
