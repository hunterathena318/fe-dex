import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_75_11463)">
          <g filter="url(#filter0_bdi_75_11463)">
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
          <g clipPath="url(#clip1_75_11463)">
            <path
              d="M28.8891 12.8981C28.0002 13.3337 27.1291 13.5106 26.2224 13.7781C25.226 12.6537 23.7487 12.5914 22.3291 13.123C20.9095 13.6546 19.9798 14.9541 20.0002 16.4448V17.3337C17.1158 17.4074 14.5469 16.0937 12.8891 13.7781C12.8891 13.7781 9.17177 20.3852 16.4447 23.5559C14.7807 24.6643 13.1211 25.4119 11.1113 25.3337C14.0518 26.9363 17.2562 27.4874 20.0304 26.6821C23.2127 25.7577 25.8278 23.3728 26.8313 19.8003C27.1307 18.7138 27.2793 17.5913 27.2731 16.4643C27.2713 16.243 28.6153 14.0003 28.8891 12.8972V12.8981Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_bdi_75_11463"
            x="-10"
            y="-10"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_11463" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_75_11463" result="effect2_dropShadow_75_11463" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_75_11463" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_75_11463" />
          </filter>
          <clipPath id="clip0_75_11463">
            <rect width="40" height="40" fill="white" />
          </clipPath>
          <clipPath id="clip1_75_11463">
            <rect width="21.3333" height="21.3333" fill="white" transform="translate(9.3335 9.3335)" />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
