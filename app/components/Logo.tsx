"use client";

import Image from "next/image";

import Link from "next/link";

import React from "react";
import { getImageSrc } from "@/app/utils/image-path";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
  imgClassName?: string;
}

export function Logo({
  href = "/",
  size = "md",
  variant = "light",
  imgClassName = "",
}: LogoProps) {
  // SVG files need basePath prepended manually for unoptimized images
  const baseSrc =
    variant === "light"
      ? "/images/logo/palc-logo-white.svg"
      : "/images/logo/palc-logo-black.svg";
  
  const src = getImageSrc(baseSrc, true); // true = unoptimized (SVG)

  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
  };

  return (
    <Link href={href} className="flex items-center">
      <Image
        src={src}
        alt="PalC Networks Logo"
        width={sizeMap[size]}
        height={sizeMap[size]}
        className={`${imgClassName} select-none`}
        priority
        unoptimized={true}
        style={{
          imageRendering: 'auto',
          WebkitImageRendering: 'auto',
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </Link>
  );
}

