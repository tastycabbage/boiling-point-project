const isMobile = window.matchMedia("(any-pointer: coarse)").matches;

const config = {
    mapCenter: [38.936694, 47.208736],
    duration: 1000,
    defaultZoom: isMobile? 18 : 14,
    clickZoom: isMobile? 22 : 18
}

initMap();

let createNewMarker = function() {};
let removeMarkers = function () {};

async function initMap() {
    await ymaps3.ready;
  
    const {YMap, YMapDefaultSchemeLayer, YMapControls, YMapDefaultFeaturesLayer} = ymaps3;
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    const map = new YMap(
        document.querySelector('.map'),
        { location: { center: config.mapCenter, zoom: config.defaultZoom } },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    )
    map.setBehaviors(["drag"]);
  
    let zoomed = false, frame = 0, markerList = [];
  
    removeMarkers = function () {
        markerList.forEach(m => map.removeChild(m));
        markerList = [];
        
        zoomed = false;
        
        cancelAnimationFrame(frame);
    }
  
    createNewMarker = function(coords, data, count) {
        const marker = new YMapDefaultMarker(
            {
                coordinates: [coords.lng, coords.lat],
                popup: 
                {
                    content: `Количество данных на метке: ${count} шт.<br>Средняя загрязненность: ${data.tds} ppm<br>Средняя температура: ${data.temp} C<br>Время создания: ${('0' + data.createdAt.hours).slice(-2)}:${('0' + data.createdAt.minutes).slice(-2)}`,
                    position: isMobile ? "top" : "right"
                }
            }
        )

        marker._container.onclick = () => {
            if(zoomed) return;
            zoomed = true;

            changeMapPosition({ center: [coords.lng, coords.lat], zoom: config.clickZoom }, { azimuth: 0, tilt: (45 * Math.PI) / 180 });
            map.setBehaviors([]);

            setTimeout(startAutoRotationCamera(), config.duration)
        }

        marker._popup.lastChild.onclick = () => {
            if(!zoomed) return;
            zoomed = false;

            marker._togglePopup();

            cancelAnimationFrame(frame);

            changeMapPosition({ center: [coords.lng, coords.lat], zoom: config.defaultZoom }, { azimuth: 0, tilt: 0 });
            map.setBehaviors(["drag"]);
        }
        
        map.addChild(marker);
        markerList.push(marker);
        
        changeMapPosition({ center: [coords.lng, coords.lat], zoom: config.defaultZoom }, { azimuth: 0, tilt: 0 });
    }

    function startAutoRotationCamera() {
        map.update({camera: { azimuth: map.azimuth + (10 * Math.PI) / 180 / 120 }});
        frame = requestAnimationFrame(startAutoRotationCamera);
    }
  
    function changeMapPosition(location, camera) {
        map.update({ location: { ...location, duration: config.duration }, camera });
    }
}