import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_75_11472)">
          <g filter="url(#filter0_bdi_75_11472)">
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
            d="M16.248 27.3335H12.9308V16.6511H16.248V27.3335ZM14.5876 15.1939C13.5269 15.1939 12.6665 14.3153 12.6665 13.2546C12.6665 12.7451 12.8689 12.2565 13.2292 11.8962C13.5895 11.5359 14.0781 11.3335 14.5876 11.3335C15.0971 11.3335 15.5858 11.5359 15.9461 11.8962C16.3063 12.2565 16.5087 12.7451 16.5087 13.2546C16.5087 14.3153 15.648 15.1939 14.5876 15.1939ZM28.6633 27.3335H25.3532V22.1334C25.3532 20.8941 25.3282 19.3047 23.6285 19.3047C21.9039 19.3047 21.6396 20.6512 21.6396 22.0441V27.3335H18.3259V16.6511H21.5074V18.1083H21.5538C21.9967 17.269 23.0785 16.3833 24.6925 16.3833C28.0497 16.3833 28.6669 18.594 28.6669 21.4655V27.3335H28.6633Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_bdi_75_11472"
            x="-10"
            y="-10"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            colorInterpolation-filters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_11472" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_75_11472" result="effect2_dropShadow_75_11472" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_75_11472" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_75_11472" />
          </filter>
          <clipPath id="clip0_75_11472">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
