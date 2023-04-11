import React, {useEffect, useRef} from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.umd.js";
import "@fancyapps/ui/dist/fancybox.css";

function Fancybox(props) {
  const container = useRef(null);

  useEffect(() => {
    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container.current, delegate, options);

    return () => {
      NativeFancybox.unbind(container.current);
      NativeFancybox.close();
    };
  });

  return <div ref={container}>{props.children}</div>;
}

export default Fancybox;
