import { useEffect, useState } from "react";

type AssetSlotProps = {
  src: string;
  fallbackSrc: string;
  className: string;
  alt?: string;
};

export function AssetSlot({ src, fallbackSrc, className, alt = "" }: AssetSlotProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <img
      className={className}
      src={failed ? fallbackSrc : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
