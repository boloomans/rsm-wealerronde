import React from "react";
import PropTypes from "prop-types";
import "./shieldMask/shieldMask.scss";



export function shieldMask({ node, ...props }) {
    const className = PropTypes.string;
    const children = PropTypes.node;

    return (
        <div
            style={{
                clipPath: "url(#image-mask)"
            }}
            className={"shield-mask relative" + className}

            {...props}
        >
            <svg>
                <defs>
                    <clipPath id="image-mask" clipPathUnits="objectBoundingBox">
                        <path
                            transform="scale(0.002, 0.005)"
                            d="M492.719 166.008c0-73.486-59.573-133.056-133.059-133.056-47.985 0-89.891 25.484-113.302 63.569-23.408-38.085-65.332-63.569-113.316-63.569C59.556 32.952 0 92.522 0 166.008c0 40.009 17.729 75.803 45.671 100.178l188.545 188.553a17.17 17.17 0 0 0 24.284 0l188.545-188.553c27.943-24.375 45.674-60.169 45.674-100.178z"
                        />
                    </clipPath>
                </defs>
            </svg>
            <div className="shield-mask__children">{children}</div>
        </div>
    );
}

