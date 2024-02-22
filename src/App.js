import { useState } from 'react';
import './App.css';
import Lightbox from './components/lightbox';
import { watermarkImageUrl } from './utils';
import ImageDepthMap from 'react-depth-map-component';
import isMobile from 'is-mobile';
import DeviceMotionEventButton from './components/device-motion-event';

const data = new Array(10).fill([
  {
    depth: "https://res.cloudinary.com/dnhxosqhf/image/upload/v1701091488/Myth%20Maker%20AI%20v1/Locations/bigxpg8sk8uizk9cpja2.jpg",
    url: "https://res.cloudinary.com/dnhxosqhf/image/upload/w_200,g_south_east,x_5,y_5,l_Myth%20Maker%20AI%20v1:MythMakerAI_Watermark_Small_knmirc_rku7ed/v1701091480/Myth%20Maker%20AI%20v1/Locations/yfjkmu4yyuwegiacztvw.jpg",
  },
  {
    depth: "https://res.cloudinary.com/dnhxosqhf/image/upload/v1701091495/Myth%20Maker%20AI%20v1/Locations/py8uwtyxlelbuqm23wt7.jpg",
    url: "https://res.cloudinary.com/dnhxosqhf/image/upload/w_200,g_south_east,x_5,y_5,l_Myth%20Maker%20AI%20v1:MythMakerAI_Watermark_Small_knmirc_rku7ed/v1701091487/Myth%20Maker%20AI%20v1/Locations/nlouvnqoonl4zbpei9vf.jpg"
  },
  {
    depth: "https://res.cloudinary.com/dnhxosqhf/image/upload/v1701091492/Myth%20Maker%20AI%20v1/Locations/utm0nhriyq8he0liv8bl.jpg",
    url: "https://res.cloudinary.com/dnhxosqhf/image/upload/w_200,g_south_east,x_5,y_5,l_Myth%20Maker%20AI%20v1:MythMakerAI_Watermark_Small_knmirc_rku7ed/v1701091485/Myth%20Maker%20AI%20v1/Locations/oyyxq39gfegdurobdmly.jpg"
  }
]).flat().map((a, inx) => ({ ...a, inx }))

function App() {
  const [index, setIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const is3D = true

  const choose = (index) => {
    setIsOpen(true);
    setIndex(index)
  }

  const close = () => {
    setIsOpen(false)
    setIndex(null)
  }

  return (
    <div className="App">
      <div className='imgs'>
        {data.map((item) => (
          <img
            src={item.url}
            style={{ width: 200, height: 200 }}
            alt={item.inx}
            key={item.inx}
            onClick={() => choose(item.inx)}
          />
        ))}
      </div>

      <Lightbox
        key={data.length}
        open={isOpen} close={close} index={index}
        images={(data || []).map((image) => { return { ...image, url: watermarkImageUrl(image.url) }; })}
        slideEnrichment={(image) => image}
        is3D={is3D}
        preload={is3D ? 0 : 3}
        render={{
          ...(is3D ? {
            slide: (slide) => {
              const resolution = Math.min(window.innerHeight, window.innerWidth) - (isMobile({ tablet: true }) ? 10 : 100);
              console.log(slide.inx)
              return (
                <ImageDepthMap
                  key={slide.inx}
                  useGravity={false}
                  originalImg={slide.src}
                  depthImg={slide.depth}
                  verticalThreshold={38}
                  horizontalThreshold={32}
                  multiplier={0.7}
                  rotationCoefX={1}
                  rotationCoefY={1}
                  rotationAmountY={22}
                  rotationAmountX={22}
                  style={{
                    width: resolution, height: resolution,
                  }}
                />
              );
            },
          } : {}),
          ...(isMobile({ tablet: true }) && is3D ? {
            buttonPrev: () => false,
            buttonNext: () => false,
          } : {}),
          slideHeader: () => (
            isMobile({ tablet: true }) && is3D ? (
              <div style={{
                position: "absolute", top: "1rem", left: "80px",
              }}
              >
                <DeviceMotionEventButton buttonStyle={{ color: "#ffffff" }} buttonText="View in 3D" />
              </div>
            ) : ""
          ),
        }}
      />
    </div>
  );
}

export default App;
