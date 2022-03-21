export function calCenter(points) {
  if (points && points.length != 0) {
    let lats = 0;
    let lngs = 0;
    points.forEach(point => {
      lats = lats + point.lat;
      lngs += point.lng;
    });
    const center = { lat: lats / points.length, lng: lngs / points.length };
    return center;
  } else {
    return undefined;
  }
}
