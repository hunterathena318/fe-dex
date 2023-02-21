import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_75_11475)">
          <g filter="url(#filter0_bdi_75_11475)">
            <path
              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z"
              fill="#2B1B4E"
              fillOpacity="0.4"
              shapeRendering="crispEdges"
            />
            <path
              d="M39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5C30.7696 0.5 39.5 9.23045 39.5 20Z"
              stroke="#814BF6"
              strokeOpacity="0.2"
              shapeRendering="crispEdges"
            />
          </g>
          <path
            d="M14 11L30 20.0023L14 29V11Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_bdi_75_11475"
            x="-10"
            y="-10"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_11475" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_75_11475" result="effect2_dropShadow_75_11475" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_75_11475" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_75_11475" />
          </filter>
          <clipPath id="clip0_75_11475">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
