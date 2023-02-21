import * as React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_75_11491)">
          <g filter="url(#filter0_bdi_75_11491)">
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
            d="M17 20C16.0111 20 15.0444 20.2932 14.2222 20.8427C13.3999 21.3921 12.759 22.173 12.3806 23.0866C12.0022 24.0002 11.9031 25.0055 12.0961 25.9754C12.289 26.9454 12.7652 27.8363 13.4645 28.5355C14.1637 29.2348 15.0546 29.711 16.0245 29.9039C16.9945 30.0969 17.9998 29.9978 18.9134 29.6194C19.827 29.241 20.6079 28.6001 21.1573 27.7778C21.7068 26.9556 22 25.9889 22 25V10C22 11.6576 22.6585 13.2473 23.8306 14.4194C25.0027 15.5915 26.5924 16.25 28.25 16.25"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_bdi_75_11491"
            x="-10"
            y="-10"
            width="60"
            height="60"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImage" stdDeviation="5" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_75_11491" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_backgroundBlur_75_11491" result="effect2_dropShadow_75_11491" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_75_11491" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.505882 0 0 0 0 0.294118 0 0 0 0 0.964706 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow_75_11491" />
          </filter>
          <clipPath id="clip0_75_11491">
            <rect width="40" height="40" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Svg>
  );
};

export default Icon;
