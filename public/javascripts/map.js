const config = {
    mapCenter: [38.936694, 47.208736],
    duration: 1000,
    defaultZoom: 14
}

initMap();

async function initMap() {
    await ymaps3.ready;
  
    const {YMap, YMapDefaultSchemeLayer, YMapControls, YMapDefaultFeaturesLayer} = ymaps3;
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    const map = new YMap(
        document.getElementById('map'),
        { location: { center: config.mapCenter, zoom: config.defaultZoom } },
        [new YMapDefaultSchemeLayer({}), new YMapDefaultFeaturesLayer({})]
    )
    map.setBehaviors(["drag"]);

    let parsedData = (await fetch("database").then(res => res.json()))["values"].at(-1),
        parsedDate = new Date(parsedData["timestamp"]),
        dateString = `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()} ${parsedDate.getHours()}:${parsedDate.getMinutes()}:${parsedDate.getSeconds()}`;

    const marker = new YMapDefaultMarker(
        {
            coordinates: [parsedData["lng"], parsedData["lat"]],
            popup: 
            {
                content: `Загрязненность: ${parsedData["tds"]} ppm<br>Температура: ${parsedData["temp"]} C<br>Время создания: ${dateString}`,
                position: "right" 
            }
        }
    )

    const controls = new YMapControls({ position: 'bottom' });

    let zoomed = false, frame = 0;
    
    marker._container.onclick = () => {
        if(zoomed) return;
        zoomed = true;

        changeMapPosition({ center: [parsedData["lng"], parsedData["lat"]], zoom: 18 }, { azimuth: 0, tilt: (45 * Math.PI) / 180 });
        map.setBehaviors([]);

        setTimeout(startAutoRotationCamera(), config.duration)
    }
    
    marker._popup.lastChild.onclick = () => {
        if(!zoomed) return;
        zoomed = false;
        
        marker._togglePopup();
        
        cancelAnimationFrame(frame);
      
        changeMapPosition({ center: config.mapCenter, zoom: config.defaultZoom }, { azimuth: 0, tilt: 0 });
        map.setBehaviors(["drag"]);
    }

    map.addChild(controls);
    map.addChild(marker);

    function startAutoRotationCamera() {
        map.update({camera: { azimuth: map.azimuth + (10 * Math.PI) / 180 / 120 }});
        frame = requestAnimationFrame(startAutoRotationCamera);
    }
  
    function changeMapPosition(location, camera) {
        map.update({ location: { ...location, duration: config.duration }, camera });
    }
}