import {GetStaticPropsResult} from 'next';
import {Layout, LayoutProps} from 'components/layout';
import {getMenus} from 'lib/get-menus';
import {DrupalNode} from 'next-drupal';
import {DrupalJsonApiParams} from 'drupal-jsonapi-params';
import {drupal} from '../lib/drupal';
import {testApiCompatibility} from 'next-acms';
import {ENTITY_TYPES} from './[...slug]';
import {BlockHero} from "../components/block--hero";
import React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";

interface RoutePageProps extends LayoutProps {
  news: DrupalNode[];
}

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
                                   onClick,
                                   onIdle,
                                   children,
                                   style,
                                   ...options
                                 }) => {
  // [START maps_react_map_component_add_map_hooks]
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};



function CustomMap(){
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  <Wrapper apiKey={"AIzaSyCAf71Kso9AZZidmlVoIT8cjnDJyTq8k84"} render={render}>
    <Map style={}>
      <Marker position={position} />
    </Map>
  </Wrapper>
}

export default function RoutePage({menus, news}: RoutePageProps) {
  return (
    <Layout title="Home" menus={menus}>
      <BlockHero heading={"Ben jij klaar voor de start?"}></BlockHero>
      <div className="mt-12 lg:mt-32">
        <section className="container mx-auto px-6">
          <div className="w-full">

          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(
  context,
): Promise<GetStaticPropsResult<RoutePageProps>> {
  if (process.env.NODE_ENV == 'development') {
    await testApiCompatibility(ENTITY_TYPES, drupal);
  }
  const news = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--news',
    context,
    {
      params: new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('field_news_date', 'DESC')
        .addInclude(['field_news_image.image'])
        .addFields('node--news', [
          'id',
          'title',
          'path',
          'body',
          'field_news_date',
          'field_news_image',
        ])
        .addFields('node--place', ['title', 'path'])
        .addPageLimit(3)
        .getQueryObject(),
    },
  );
  return {
    props: {
      menus: await getMenus(context),
      news,
    },
    revalidate: 60,
  };
}
