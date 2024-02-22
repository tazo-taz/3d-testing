/* eslint-disable */
import React, { useEffect } from "react";
import GyroNorm from './gyronorm';
import isMobile from "is-mobile";

const gn = new GyroNorm.GyroNorm();

const DeviceMotionEventButton = ({
  buttonText,
  buttonStyle,
  onPermissionChange,
}) => {
  const [buttonLocalText, setButtonLocalText] = React.useState(buttonText);
  const [buttonVisible, setButtonVisible] = React.useState(false);

  const gyro = () => {
    gn.init({ gravityNormalized: true }).then(() => {
      gn.start(() => { })
    }).catch(e => {
      if (isMobile({ tablet: true })) {
        setButtonVisible(true);
      } else {
        alert("not supported");
      }
    })
  }

  const askPermission = () => {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          console.debug("Device motion permission granted");
          setButtonVisible(false);
          onPermissionChange("granted");
        } else {
          console.debug("Device motion permission still not granted");
          setButtonLocalText("Permission Denied");
          onPermissionChange("denied");
        }
      })
      .catch((error) => {
        setButtonLocalText("Permission Denied");
        console.error("Error requesting device motion permission:", error);
        onPermissionChange("denied");
      });
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          console.log("Device motion permission granted");
          setButtonVisible(false);
          onPermissionChange("granted");
        } else {
          console.log("Device motion permission still not granted");
          setButtonLocalText("Permission Denied");
          onPermissionChange("denied");
        }
      })
      .catch((error) => {
        setButtonLocalText("Permission Denied");
        console.error("Error requesting device motion permission:", error);
        onPermissionChange("denied");
      });
  };

  useEffect(() => {
    gyro();
  }, []);

  return buttonVisible
    ? <button onClick={askPermission} style={buttonStyle}>{buttonLocalText.toString()}</button>
    : <></>;
};

export default DeviceMotionEventButton;
