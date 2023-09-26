import { useEffect, useRef, MutableRefObject } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import GeopointInterface from '../../../../common/interfaces/Geopoint.interface';

import './GoogleMaps.scss';

interface GoogleMapsInterface {
  center: google.maps.LatLngLiteral;
  zoom: number;
  updateGeopoint?(geopoint: GeopointInterface): void;
}

function MyMapComponent({ center, zoom, updateGeopoint }: GoogleMapsInterface) {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      clickableIcons: true
    });

    const marker = new google.maps.Marker({
      position: center,
      map,
      draggable: true
    });

    map.addListener('drag', () => {
      const lat = map.getCenter()?.lat() || center.lat;
      const lng = map.getCenter()?.lng() || center.lng;
      marker.setPosition({ lat, lng });
      if (updateGeopoint) {
        updateGeopoint({ lat, lng });
      }
    });
  
    marker.addListener('dragend', () => {
      map.setZoom(zoom);
      map.setCenter(marker.getPosition() as google.maps.LatLng);
      if (updateGeopoint) {
        updateGeopoint({ lat: marker.getPosition()?.lat() || center.lat, lng: marker.getPosition()?.lng() || center.lng });
      }
    });
    // eslint-disable-next-line
  }, []);

  return <div ref={ref} className="google-maps" />;
}

function GoogleMaps({ center, zoom, updateGeopoint }: GoogleMapsInterface) {

  const render = (status: Status): React.ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    if (status === Status.FAILURE) return <h3>{status} ...</h3>;
    return <></>;
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API || ''} render={render}>
      <MyMapComponent center={center} zoom={zoom} updateGeopoint={updateGeopoint}/>
    </Wrapper>
  );
}

export default GoogleMaps;
