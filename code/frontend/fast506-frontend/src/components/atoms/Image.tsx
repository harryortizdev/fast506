import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}

const Image = ({ src, alt, style, className }: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
};

export default Image;