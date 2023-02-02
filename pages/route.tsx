/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {Key} from "react";
import {Layout, LayoutProps} from "../components/layout";
import {DrupalNode} from "next-drupal";
import {BlockHero} from "../components/block--hero";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF, Marker,
} from '@react-google-maps/api';
import {useMemo, useState} from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import styles from '../styles/Route.module.css';
import {GetStaticPropsResult} from "next";
import {testApiCompatibility} from "next-acms";
import {ENTITY_TYPES} from "./[...slug]";
import {drupal} from "../lib/drupal";
import {DrupalJsonApiParams} from "drupal-jsonapi-params";
import {getMenus} from "../lib/get-menus";
import Icon = google.maps.Icon;

interface RoutePageProps extends LayoutProps {
  places: DrupalNode[];
}


export default function RoutePage({menus, places}: RoutePageProps) {
  const [lat, setLat] = useState(50.849322);
  const [lng, setLng] = useState(5.691917);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({lat: lat, lng: lng}), [lat, lng]);

  const icon: JSX.Element = (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.31 120">
      test
      <path id="download"
            d="m.4,4.44C31.34-1.64,62.11-1.59,93.21,5.28v4.09c0,18.98.26,38.02-.05,57-.31,20.34-9.75,35.08-28.11,44.1-5.61,2.78-10.91,6.13-16.46,9.02-.94.52-2.67.73-3.51.21-8.55-5.14-17.36-9.96-25.43-15.78C7.01,94.89.61,82,.24,66.58-.23,46.5.14,26.36.14,6.23c.05-.52.16-1.15.26-1.78Z"/>
    </svg>
  )

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const locations = [
    {lat: 50.84867750000001, lng: 5.6892651}
  ];

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  function addMarker(e: any) {
    console.log(e);
    // const newPlace = { id: this.state.places.length, lat: e.latLng.lat(), lng: e.latLng.lng() };
    // this.setState({
    //   places: [...this.state.places,newPlace]
    // })
  }

  return (
    <Layout title="Home" menus={menus}>
      <BlockHero heading={"Ben jij klaar voor de start?"}></BlockHero>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <div className={styles.homeWrapper}>
              <div className={styles.sidebar}>
                {/* render Places Auto Complete and pass custom handler which updates the state */}
                <PlacesAutocomplete
                  onAddressSelect={(address) => {
                    getGeocode({address: address}).then((results) => {
                      const {lat, lng} = getLatLng(results[0]);

                      setLat(lat);
                      setLng(lng);
                    });
                  }}
                />
              </div>
              <GoogleMap
                options={mapOptions}
                zoom={17}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{width: '800px', height: '800px'}}
                onLoad={(map) => console.log('Map Loaded')}
                onClick={addMarker.bind(this)}
              >
                <MarkerF
                  position={mapCenter}
                  onLoad={() => console.log('Marker Loaded')}
                />

                {locations.map((latLng, i) => (
                  <MarkerF key={i} position={latLng}
                           icon={{
                             path:
                               "m.4,4.44C31.34-1.64,62.11-1.59,93.21,5.28v4.09c0,18.98.26,38.02-.05,57-.31,20.34-9.75,35.08-28.11,44.1-5.61,2.78-10.91,6.13-16.46,9.02-.94.52-2.67.73-3.51.21-8.55-5.14-17.36-9.96-25.43-15.78C7.01,94.89.61,82,.24,66.58-.23,46.5.14,26.36.14,6.23c.05-.52.16-1.15.26-1.78Z",
                             fillColor: "black",
                             fillOpacity: 0.9,
                             scale: 0.3,
                             strokeColor: "black",
                             strokeWeight: 2,
                             labelOrigin: new google.maps.Point(45, 50),
                           }}
                           label={{
                             text: "Start", // codepoint from https://fonts.google.com/icons
                             fontFamily: "PT Sans",
                             color: "#ffffff",
                             fontSize: "12px",
                           }}
                  />
                ))}
              </GoogleMap>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const PlacesAutocomplete = ({
                              onAddressSelect,
                            }: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {componentRestrictions: {country: 'nl'}},
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: {main_text, secondary_text},
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className={styles.autocompleteWrapper}>
      <input
        value={value}
        className={styles.autocompleteInput}
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="123 Stariway To Heaven"
      />

      {status === 'OK' && (
        <ul className={styles.suggestionWrapper}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<RoutePageProps>> {
  if (process.env.NODE_ENV == 'development') {
    await testApiCompatibility(ENTITY_TYPES, drupal);
  }
  const places = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--place',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addFields('node--place', [
          'id',
          'title',
          'path',
          'body',
        ])
        .addFields('node--person', ['title', 'path'])
        .addPageLimit(3)
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      places,
    },
    revalidate: 60,
  };
}
