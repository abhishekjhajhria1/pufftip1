import { Icon, IconProps } from "@chakra-ui/react";

const CandyIcon = (props: IconProps) => (
  <Icon viewBox="0 0 60 36" {...props}>
    {/* Candy oval */}
    <ellipse cx="30" cy="18" rx="16" ry="10" fill="#B967C7" />
    <ellipse cx="30" cy="18" rx="11" ry="7" fill="#fff4fb" />
    {/* Candy wrapper (left) */}
    <polygon points="6,18 17,11 17,25" fill="#fd90ec" />
    {/* Candy wrapper (right) */}
    <polygon points="54,18 43,11 43,25" fill="#fd90ec" />
  </Icon>
);

export default CandyIcon;
