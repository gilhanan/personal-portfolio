import Image, { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  lightSrc: string;
  darkSrc: string;
  alt: string;
};

export function ThemedImage({
  lightSrc,
  darkSrc,
  alt,
  className = "",
  ...rest
}: Props): ReturnType<typeof Image> {
  return (
    <>
      <Image
        {...rest}
        alt={`${alt} (light)`}
        src={lightSrc}
        className={`dark:hidden ${className}`}
      />
      <Image
        {...rest}
        alt={`${alt} (dark)`}
        src={darkSrc}
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}
