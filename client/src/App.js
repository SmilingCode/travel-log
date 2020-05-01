import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { getAllLogEntries } from "./api";

import MarkerPopupForm from "./MarkerPopupForm";

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
  });

  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const getEntries = async () => {
    const allLogEntries = await getAllLogEntries();
    console.log(allLogEntries);
    setLogEntries(allLogEntries);
  };

  React.useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entries) => (
        <React.Fragment key={entries._id}>
          <Marker latitude={entries.latitude} longitude={entries.longitude}>
            <div
              onClick={() =>
                setShowPopup({
                  [entries._id]: true,
                })
              }
            >
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                color="#f8c102"
                style={{
                  width: `${6 * viewport.zoom}`,
                  height: `${6 * viewport.zoom}`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entries._id] && (
            <Popup
              latitude={entries.latitude}
              longitude={entries.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() =>
                setShowPopup({
                  [entries._id]: false,
                })
              }
              anchor="top"
            >
              <div>
                <h3>{entries.title}</h3>
                <p>{entries.comments}</p>
                <time>Visit Time: </time>
                <small>{new Date().toLocaleDateString()}</small>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      {addEntryLocation && (
        <>
          <Marker
            latitude={addEntryLocation["latitude"]}
            longitude={addEntryLocation["longitude"]}
          >
            <div>
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                color="red"
                style={{
                  width: `${6 * viewport.zoom}`,
                  height: `${6 * viewport.zoom}`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popupForm">
              <MarkerPopupForm
                addEntryLocation={addEntryLocation}
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
              />
            </div>
          </Popup>
        </>
      )}
    </ReactMapGL>
  );
};

export default App;
