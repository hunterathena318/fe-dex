import { Language } from "../LangSelector/types";
import { DiscordIcon, Facebook, InstagramIcon, Internet, Music, Tele, Tiktok, TwitterIcon, Youtube } from "../Svg";
import { FooterLinkType } from "./types";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.pancakeswap.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://pancakeswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.pancakeswap.finance/contact-us/telegram",
      },
      {
        label: "GENI",
        href: "https://docs.pancakeswap.finance/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/gemuniofficial",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "https://discord.com/invite/PnX6qgFvMW",
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.linkedin.com/company/gemuni/",
  },
  {
    label: "Youtube",
    icon: Youtube,
    href: "https://www.youtube.com/channel/UCOawV3einefmFxCNl4dTZxQ",
  },
];

export const secondSocials = [
  {
    label: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/GemUni.Geni",
  },
  {
    label: "Discord",
    icon: Music,
    href: "https://medium.com/@GemUni_Official",
  },
  {
    label: "Tiktok",
    icon: Tiktok,
    href: "https://www.tiktok.com/@gemuniofficial",
  },
  {
    label: "YouInternettube",
    icon: Internet,
    href: "https://www.gemuni.io/#",
  },
];

export const thirdSocials = [
  {
    label: "Tele",
    icon: Tele,
    href: "https://t.me/GemUnichannel",
    text: "Official",
  },
  {
    label: "Tele",
    icon: Tele,
    href: "https://t.me/GemUnicommunity",
    text: "Global",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
