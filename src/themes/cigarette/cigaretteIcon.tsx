import { Icon, IconProps } from '@chakra-ui/react';

const CigaretteIcon = (props: IconProps) => (
  <Icon viewBox="0 0 60 24" {...props}>
    <rect x="5" y="8" width="38" height="8" rx="4" fill="#ececec" />
    <rect x="43" y="8" width="12" height="8" rx="4" fill="#c93030" />
    <circle cx="55" cy="12" r="3" fill="#ff9800" />
  </Icon>
);

export default CigaretteIcon;
