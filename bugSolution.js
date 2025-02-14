```javascript
import * as React from 'react';
import { Camera, useCameraDevices, BarCodeScanner } from 'expo-camera';

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

export default function App() {
  const devices = useCameraDevices();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = debounce((barcode) => {
    setScanned(true);
    // Process the barcode data here
    console.log('Barcode scanned:', barcode);
  });

  if (hasPermission === null) {
    return <View><Text>Requesting camera permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} barCodeScannerSettings={{
      barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </Camera>
  );
}
```