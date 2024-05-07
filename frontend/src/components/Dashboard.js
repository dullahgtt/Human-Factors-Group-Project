import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function PropertyMap() {
    const center = [29.8833, -97.9414]; // Coordinates for San Marcos, Texas

    const [properties, setProperties] = useState([
        { id: 1, status: 'green', coords: [29.8857, -97.9350], radius: 100 },
        { id: 2, status: 'red', coords: [29.8827, -97.9400], radius: 100 },
        { id: 3, status: 'yellow', coords: [29.8800, -97.9450], radius: 100 },
    ]);

    const [newProperty, setNewProperty] = useState({
        longitude: '',
        latitude: '',
        radius: '',
        status: 'green'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { longitude, latitude, radius, status } = newProperty;
        const newId = properties.length + 1;
        const updatedProperties = [
            ...properties,
            { id: newId, status: status, coords: [parseFloat(latitude), parseFloat(longitude)], radius: parseInt(radius) }
        ];
        setProperties(updatedProperties);
        setNewProperty({ longitude: '', latitude: '', radius: '', status: 'green' }); // Reset form
    };

    return (
        <div>
            <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {properties.map(property => (
                    <Circle
                        key={property.id}
                        center={property.coords}
                        fillColor={property.status === 'green' ? 'rgba(0, 255, 0, 0.5)' :
                                    property.status === 'red' ? 'rgba(255, 0, 0, 0.5)' :
                                    'rgba(255, 255, 0, 0.5)'}
                        color={property.status === 'green' ? 'green' :
                                property.status === 'red' ? 'red' :
                                'yellow'}
                        radius={property.radius}
                        fillOpacity={0.5}
                    >
                        <Popup>
                            Property {property.id} - Status: {property.status}
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
            <div style={{ padding: '20px', background: '#fff' }}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="longitude"
                        value={newProperty.longitude}
                        onChange={handleInputChange}
                        placeholder="Longitude"
                        required
                    />
                    <input
                        type="number"
                        name="latitude"
                        value={newProperty.latitude}
                        onChange={handleInputChange}
                        placeholder="Latitude"
                        required
                    />
                    <input
                        type="number"
                        name="radius"
                        value={newProperty.radius}
                        onChange={handleInputChange}
                        placeholder="Radius (meters)"
                        required
                    />
                    <select
                        name="status"
                        value={newProperty.status}
                        onChange={handleInputChange}
                    >
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                    </select>
                    <button type="submit">Add Property</button>
                </form>
            </div>
        </div>
    );
}

export default PropertyMap;
