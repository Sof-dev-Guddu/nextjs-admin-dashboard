import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type CustomAvatarProps = {
  imageSrc: string;
  fallback: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

const CustomAvatar = ({
  imageSrc,
  fallback,
  className = 'w-10 h-10 rounded-full',
  imageClassName = 'object-cover w-full h-full',
  fallbackClassName,
}: CustomAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage className={imageClassName} src={imageSrc} />
      <AvatarFallback className={fallbackClassName}>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
