import { Icon, IconProps } from "@chakra-ui/react";

const PizzaIcon = (props: IconProps) => (
  <Icon viewBox="0 0 64 64" {...props}>
    <path d="M32 6 L60 58 A26 26 0 0 1 4 58 Z" fill="#FAD390"/>
    <path d="M32 12 L53 54 A22 22 0 0 1 11 54 Z" fill="#fa983a"/>
    <circle cx="40" cy="34" r="3" fill="#eb2f06"/>
    <circle cx="28" cy="46" r="2.5" fill="#eb2f06"/>
    <circle cx="24" cy="34" r="2" fill="#eb2f06"/>
    <circle cx="47" cy="42" r="2.5" fill="#eb2f06"/>
    <ellipse cx="34" cy="52" rx="1.5" ry="2" fill="#e17055"/>
  </Icon>
);

export default PizzaIcon;
