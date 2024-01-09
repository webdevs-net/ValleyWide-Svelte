
<script>
import ProgressiveImage from "$lib/components/layout/ProgressiveImage.svelte";

  
    const images = [
      {
        small: 'https://vwapi.netdevs.net//uploads/small_Heritage_Park_aerials_67421907fe.webp',
        medium: 'https://vwapi.netdevs.net//uploads/medium_Heritage_Park_aerials_67421907fe.webp',
        large: 'https://vwapi.netdevs.net//uploads/large_Heritage_Park_aerials_67421907fe.webp',
      }
    ];
  </script>
  
  <ProgressiveImage {images} />