import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_75_11485)">
          <g filter="url(#filter0_bdi_75_11485)">
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.7695 11.9221C23.0895 11.2026 23.9245 10.8311 24.6695 11.0756L27.0725 11.8637L29.2935 12.5446C29.498 12.6074 29.6771 12.7342 29.8042 12.9063C29.9314 13.0784 30 13.2867 30 13.5007V28.0007C30 28.1591 29.9624 28.3153 29.8903 28.4564C29.8181 28.5974 29.7134 28.7193 29.5849 28.812C29.4564 28.9047 29.3077 28.9655 29.151 28.9894C28.9944 29.0134 28.8343 28.9997 28.684 28.9496L18.179 25.4481C17.9788 25.3815 17.8049 25.2532 17.682 25.0816L17.0235 24.1617L17.027 27.6322C17.0285 28.5877 16.151 29.2302 15.2435 28.9317L11.1705 27.5917C10.4975 27.3701 10.0105 26.6931 10.0105 25.9841L10 12.3732C9.9995 11.4182 10.8755 10.7761 11.7825 11.0731L15.8515 12.4081C16.1873 12.5221 16.4787 12.739 16.684 13.0281L19.9325 18.3001L22.7695 11.9226V11.9221ZM23.2705 23.7191L27.532 14.1176L24.437 13.0951L21.2035 20.3631L23.2705 23.7191ZM28 26.6202V18.0001L24.6645 25.5101L28 26.6202ZM19.128 23.6656L21.343 24.4036L17.0155 17.3776L17.0195 20.7201L19.128 23.6656ZM12.0005 13.2666L12.002 25.7606L15 26.7592V14.2391L12.0005 13.2666Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_bdi_75_11485"
            x="-10"
            y="-10"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_11485" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_75_11485" result="effect2_dropShadow_75_11485" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_75_11485" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_75_11485" />
          </filter>
          <clipPath id="clip0_75_11485">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
