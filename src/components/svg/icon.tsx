import { SVGProps } from "react";

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0,0,256,256"
  >
    <defs>
      <linearGradient
        x1="27"
        y1="21.75"
        x2="27"
        y2="28.354"
        gradientUnits="userSpaceOnUse"
        id="color-1_44781_gr1"
      >
        <stop offset="0" stopColor="#6dc7ff"></stop>
        <stop offset="1" stopColor="#d5ced9"></stop>
      </linearGradient>
      <linearGradient
        x1="32"
        y1="5.375"
        x2="32"
        y2="58.524"
        gradientUnits="userSpaceOnUse"
        id="color-2_44781_gr2"
      >
        <stop offset="0" stopColor="#114eb7"></stop>
        <stop offset="1" stopColor="#100314"></stop>
      </linearGradient>
      <linearGradient
        x1="27"
        y1="5.375"
        x2="27"
        y2="58.524"
        gradientUnits="userSpaceOnUse"
        id="color-3_44781_gr3"
      >
        <stop offset="0" stopColor="#114eb7"></stop>
        <stop offset="1" stopColor="#100314"></stop>
      </linearGradient>
      <linearGradient
        x1="30"
        y1="5.375"
        x2="30"
        y2="58.524"
        gradientUnits="userSpaceOnUse"
        id="color-4_44781_gr4"
      >
        <stop offset="0" stopColor="#114eb7"></stop>
        <stop offset="1" stopColor="#100314"></stop>
      </linearGradient>
    </defs>
    <g
      fill="none"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style="mix-blend-mode: normal"
    >
      <g transform="scale(4,4)">
        <path
          d="M32,28h-10c-0.552,0 -1,-0.448 -1,-1v-4c0,-0.552 0.448,-1 1,-1h10c0.552,0 1,0.448 1,1v4c0,0.552 -0.448,1 -1,1z"
          fill="url(#color-1_44781_gr1)"
        ></path>
        <path
          d="M49,6h-13.948c-0.019,0 -0.036,0 -0.054,0c-1.03,0 -2.001,0.386 -2.752,1.099c-0.792,0.752 -1.246,1.809 -1.246,2.901h-15c-2.757,0 -5,2.243 -5,5v38c0,2.757 2.243,5 5,5h28c2.757,0 5,-2.243 5,-5v-25.002c0.618,0.219 1.305,0.236 1.973,0.006c1.231,-0.423 2.027,-1.537 2.027,-2.839v-15.165c0,-2.206 -1.794,-4 -4,-4zM39.027,28.004c0.33,0.113 0.665,0.168 0.994,0.168c0.902,0 1.764,-0.411 2.349,-1.163l0.63,-0.81v15.801h-26v-26h20v9.165c0,1.302 0.796,2.416 2.027,2.839zM33.623,8.549c0.376,-0.357 0.861,-0.549 1.377,-0.549h0.034c0.025,0 0.05,0.001 0.074,0.003c0.99,0.052 1.796,0.933 1.876,1.997h-3.984c0,-0.554 0.222,-1.069 0.623,-1.451zM47,53c0,1.654 -1.346,3 -3,3h-28c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3h28c1.125,0 2.164,-0.373 3,-1.002zM44,48h-28c-1.13,0 -2.162,0.391 -3,1.025v-34.025c0,-1.654 1.346,-3 3,-3h21v2h-20c-1.103,0 -2,0.897 -2,2v26c0,1.103 0.897,2 2,2h26c1.103,0 2,-0.897 2,-2v-17.724c0.299,0 0.599,0.123 0.79,0.369l1.21,1.554v18.801c0,1.654 -1.346,3 -3,3zM51,25.165c0,0.664 -0.518,0.893 -0.677,0.947c-0.159,0.057 -0.707,0.192 -1.115,-0.332l-1.839,-2.363c-0.573,-0.737 -1.437,-1.159 -2.369,-1.159c-0.932,0 -1.796,0.422 -2.368,1.158l-1.84,2.364c-0.407,0.522 -0.956,0.387 -1.115,0.332c-0.159,-0.055 -0.677,-0.283 -0.677,-0.947v-14.995c0,-0.794 -0.212,-1.537 -0.581,-2.17h10.581c1.103,0 2,0.897 2,2z"
          fill="url(#color-2_44781_gr2)"
        ></path>
        <path d="M21,30h12v2h-12z" fill="url(#color-3_44781_gr3)"></path>
        <path d="M21,34h18v2h-18z" fill="url(#color-4_44781_gr4)"></path>
      </g>
    </g>
  </svg>
);
export function User(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function MoreHorizontal(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
