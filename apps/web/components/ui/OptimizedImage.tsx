import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export const OptimizedImage = ({
  src, alt, width, height,
  priority = false, className = "",
}: OptimizedImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={priority}
    loading={priority ? "eager" : "lazy"}
    className={className}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
);
