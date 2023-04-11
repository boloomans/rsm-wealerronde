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
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF, Marker, InfoWindow, PolygonF, Polygon,
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
import {PageHeader} from "../components/page-header";
import {GiKnifeFork} from "react-icons/gi";
import {MdLocationOn} from "react-icons/md";
import {MediaImage} from "../components/media--image";
import classNames from "classnames";

interface RoutePageProps extends LayoutProps {
  locations: DrupalNode[];
}

function SponsorCard({location, i, ...props}) {
  console.log(props);
  return (
    <div key={location.id} className={classNames("relative rounded-b-lg bg-blue-900/20 p-5 pt-10 pb-0", {'mt-7': !props.popup})} {...props}>
      <div className="flex gap-8">
        {location.field_logo && (
          <div className="relative -top-16 max-w-[80px]">
            <MediaImage media={location.field_logo}
                        priority
                        fill
                        imageStyle="coh_small_square"
                        mask={true}
                        sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <div className="">
          <h2
            className="mb-2 font-title text-lg font-bold text-blue-900 md:text-[22px] lg:text-xl">{(i + 1).toString() + ". " + location.title}</h2>
          <span className="flex items-center gap-2 font-body font-bold text-blue-900"><GiKnifeFork
            className="text-xl"/>{location.field_sponsor_type.name}</span>
          <span className="flex items-center gap-2 font-body font-bold text-blue-900"><MdLocationOn
            className="text-xl"/> {location.field_sponsor_address.address_line1}, {location.field_sponsor_address.locality}</span>
        </div>
      </div>
    </div>
  )
}

function SponsorOverview({locations, ...props}) {
  return (
    <div {...props}>
      <PageHeader heading="Onze Sponsoren" text="List of latest articles."
                  className="text-blue-900"/>
      {locations.filter(value => value.field_geofield).map((location, i) => (
        <SponsorCard key={location.id} location={location} i={i}/>
      ))}
    </div>
  )
}

function convertLatLng2dArrayToLatLngArray(array) {
  // Create a loop to convert the array of arrays into an array of LatLng objects
  const arrayLength = array.length;
  const LatLngArray = [];
  for (let i = 0; i < arrayLength; i++) {
    LatLngArray.push({lat: array[i][0], lng: array[i][1]});
  }
  return LatLngArray;
}

export default function RoutePage({menus, locations}: RoutePageProps) {
  const [lat, setLat] = useState(50.849322);
  const [lng, setLng] = useState(5.691917);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  const showInfoWindow = () => {
    setInfoWindowOpen(true);
  };

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({lat: lat, lng: lng}), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      mapId: 'ac5af17b7ff78a0',
    }),
    []
  );
  const polygonOptions = useMemo<google.maps.PolygonOptions>(
    () => ({
      strokeColor: '#ff0000',
      strokeOpacity: 0.8,
      strokeWeight: 4,
      fillColor: '#ff0000',
      fillOpacity: 0.35,
      paths: convertLatLng2dArrayToLatLngArray([[50.84843048727952, 5.689132303161166],[50.84875902068739, 5.689070612353824],[50.849051829832575, 5.689077662135582],[50.849235074302996, 5.689083026553612],[50.84941621970822, 5.689088050081046],[50.849640873460565, 5.689094323259942],[50.849722581540775, 5.689097676021211],[50.849735120536906, 5.689099785747445],[50.8497821131895, 5.689111185135758],[50.84983524446492, 5.689122919800198],[50.849877791777295, 5.689128284218228],[50.849918433949924, 5.689132978084004],[50.849964156351746, 5.6891289547704815],[50.85001571089392, 5.689116214277661],[50.85006776628046, 5.689104479613221],[50.85034492168061, 5.689031451497226],[50.85059285717594, 5.688967413756996],[50.850943867202794, 5.6888682197587],[50.85099889269722, 5.689212774347081],[50.851028604735795, 5.68940861520745],[50.851082955657084, 5.689701245619232],[50.85112134681162, 5.689889743379992],[50.85114063206926, 5.6899654146071965],[50.85117957976423, 5.690078067385822],[50.85119707468033, 5.690118183514601],[50.851211468380086, 5.690130924007422],[50.851234540624816, 5.6901359531493245],[50.85159790366209, 5.690144619154958],[50.851621610726156, 5.690358525323895],[50.85163515761452, 5.690471178102521],[50.85166254976526, 5.690715061200997],[50.85170836969638, 5.691048126689626],[50.851730383347, 5.691206377021505],[50.85174604689978, 5.691373344532682],[50.851756630378375, 5.691472586266233],[50.85172996000767, 5.6915657930295005],[50.851701172923754, 5.691669728628828],[50.851681520208444, 5.691732498119713],[50.8516595065348, 5.6917982122405775],[50.851639234845834, 5.691843655724234],[50.851625264618384, 5.691861760635084],[50.851608331003746, 5.691874836404032],[50.85159838250228, 5.691878859717554],[50.851580813866875, 5.6918848946878375],[50.851500303541606, 5.6919086226026705],[50.85144272907252, 5.69192471585676],[50.85126126110402, 5.691977250412905],[50.85114526481539, 5.692013460234606],[50.85113002440565, 5.692026871279681],[50.85113087109521, 5.692064422205889],[50.851143571436786, 5.692371535138094],[50.851160497767445, 5.692692307011558],[50.851171504723354, 5.692918953673316],[50.851183256179624, 5.693158301372976],[50.85119214640909, 5.693339685757608],[50.85120640613063, 5.693639197422677],[50.85121614304371, 5.693828293158227],[50.85109965173396, 5.693816846029303],[50.8509773048513, 5.693824892656347],[50.85090025578475, 5.693833609835646],[50.85080060610141, 5.693849956691155],[50.85073837393717, 5.693861356079468],[50.850635410135006, 5.69388147264708],[50.85057529449949, 5.693898907005677],[50.85050586507757, 5.6939210352300496],[50.85038358522303, 5.6939593215579976],[50.85032516267136, 5.6939787675733555],[50.850253192760746, 5.694002236902236],[50.85021195502219, 5.694014977395057],[50.850151838840944, 5.694035764514922],[50.85006886144942, 5.694070633232116],[50.849990002345244, 5.694102819740294],[50.84990702466584, 5.694139029561995],[50.849831237953026, 5.694169874965667],[50.849763619670824, 5.6942039017603685],[50.84968148830458, 5.694248828761368],[50.84959841781335, 5.694299360885573],[50.84955001416725, 5.694319660322424],[50.84950615693622, 5.694330755136812],[50.84945281360595, 5.694342825077379],[50.849366448084766, 5.69433947231611],[50.849281698807964, 5.694322166991257],[50.849162310695526, 5.694294003796601],[50.84906747736715, 5.694280592751526],[50.84899084834016, 5.694320730132025],[50.84887425517895, 5.69446506185288],[50.84879296897878, 5.694624653289266],[50.84873107159748, 5.69472255391831],[50.848625229838305, 5.694776198098608],[50.84847705097201, 5.694845935532995],[50.848262737600514, 5.6949223784899194],[50.84809338897037, 5.694986751506277],[50.84795838367495, 5.695011955349769],[50.84774330940606, 5.69497976884159],[50.847567184856835, 5.694947582333412],[50.84738936612777, 5.694899302571144],[50.84725330571412, 5.69486443385395],[50.847122904501695, 5.69485906943592],[50.847126291550794, 5.694362860768165],[50.84711782392759, 5.69361988887104],[50.84712798507525, 5.6932282863548656],[50.84717857125862, 5.692922486712857],[50.84707526626653, 5.692848725964947],[50.84702657568232, 5.692812510832215],[50.84698508422531, 5.692685105904007],[50.84692215234301, 5.692382641396008],[50.84686880605781, 5.692084916195355],[50.84682392738973, 5.69180597192791],[50.84709088012715, 5.691659401448317],[50.84737660245792, 5.69151590326602],[50.847623855050585, 5.691416661532469],[50.84780505988566, 5.691348265202589],[50.84788833856098, 5.690913794226393],[50.847960312120264, 5.690597293562636],[50.84807123585892, 5.690296886152968],[50.84820502139126, 5.689941493458495],[50.84828122816853, 5.689724234528288],[50.84834219350073, 5.689519045538649],[50.84841755331511, 5.689186451620802]])
    }),
    []
  );

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  // Variable zoom level based on screen size
  const zoom = window.matchMedia( '(min-width: 1025px)') ? 16.5 : 15.8;

  return (
    <Layout title="Route" menus={menus}>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">
            <div className={styles.homeWrapper}>
              <div className="max-w-full">
                <PageHeader heading="Wandel de route" className="text-secondary-900"/>
                <p>Wandel mee met de fietsers en ontdek onze sponsors. Geniet van de race met een glas bier in de hand of onder het genot van een stuk Limburgse vlaai.</p>
                  { !isLoaded ? <p>Loading...</p> : (
                      <GoogleMap
                          options={mapOptions}
                          zoom={window.matchMedia( '(min-width: 1025px)').matches ? 16.5 : 15.8}
                          center={mapCenter}
                          mapTypeId={google.maps.MapTypeId.ROADMAP}
                          mapContainerStyle={{width: '600px', height: '700px', maxWidth: '100%'}}
                          onLoad={(map) => console.log('Map Loaded')}
                      >
                          <PolygonF options={polygonOptions}/>
                          {locations.filter(value => value.field_geofield).map((location, i) => (
                              <MarkerF key={location.id} position={new google.maps.LatLng({
                                  lat: location.field_geofield.lat,
                                  lng: location.field_geofield.lon
                              })}
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
                                           text: (i + 1).toString(), // codepoint from https://fonts.google.com/icons
                                           fontFamily: "PT Sans",
                                           color: "#ffffff",
                                           fontSize: "12px",
                                           fontWeight: "700",
                                       }}
                                       onClick={showInfoWindow}
                              >
                                  {infoWindowOpen && (
                                      <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                                          <SponsorCard key={location.id} location={location} i={i} popup/>
                                      </InfoWindow>
                                  )}
                              </MarkerF>
                          ))}
                      </GoogleMap>
                    )}
              </div>
              <div className={styles.sidebar}>
                <SponsorOverview className="hidden lg:block" locations={locations}/>
                {/* render Places Auto Complete and pass custom handler which updates the state */}
                {/*<PlacesAutocomplete*/}
                {/*  onAddressSelect={(address) => {*/}
                {/*    getGeocode({address: address}).then((results) => {*/}
                {/*      const {lat, lng} = getLatLng(results[0]);*/}

                {/*      setLat(lat);*/}
                {/*      setLng(lng);*/}
                {/*    });*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
          <div className="my-6 block lg:hidden">
            <SponsorOverview locations={locations}/>
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
  const locations = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--sponsoren',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addInclude(['field_logo.image', 'field_sponsor_type'])
        .addFields('node--sponsoren', [
          'id',
          'title',
          'path',
          'field_geofield',
          'field_sponsor_address',
          'field_description',
          'field_logo',
          'field_website_link',
          'field_sponsor_type',
        ])
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      locations,
    },
    revalidate: 60,
  };
}
