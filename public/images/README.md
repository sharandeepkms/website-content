# Images Directory

## Hero Section Background Image

To add a data center rack setup image for the hero section:

1. Place your data center rack image in this directory as `datacenter-hero.jpg` or `datacenter-hero.png`
2. Recommended dimensions: 1920x1080px or higher
3. Update `app/components/Hero.tsx` line ~40 to use:
   ```tsx
   backgroundImage: `url('/images/datacenter-hero.jpg')`,
   ```

Alternatively, you can use an external image URL or a service like Unsplash.

