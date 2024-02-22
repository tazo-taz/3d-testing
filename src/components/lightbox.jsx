/* eslint-disable import/no-unresolved */
import YetAnotherReactLightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Lightbox({
  images = [],
  plugins = [],
  slideEnrichment = () => ({}),
  is3D, finite = true,
  preload = 0,
  ...props
}) {
  return (
    <YetAnotherReactLightbox
      carousel={{ finite, preload }}
      plugins={[...DEFAULT_PLUGINS, ...plugins].filter((plugin) => {
        return !(plugin.toString() === "Zoom" && is3D);
      }).map((plugin) => PLUGINS[plugin])}
      controller={{ closeOnBackdropClick: true }}
      thumbnails={{
        border: "none", borderRadius: 0, padding: 0, imageFit: "cover",
      }}
      slides={images.map((image) => ({ src: image.url, ...slideEnrichment(image) }))}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, .8)" },
        captionsDescriptionContainer: { backgroundColor: "unset", display: "none" },
      }}
      {...props}
    />
  );
}

const PLUGINS = { Zoom, Captions, Thumbnails };

const DEFAULT_PLUGINS = ["Zoom", "Captions"];
