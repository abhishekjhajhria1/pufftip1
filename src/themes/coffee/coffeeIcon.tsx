import Image from 'next/image';

const CoffeeIcon = () => {
  return (
    <Image
      src="/src/public/cup.png"
      alt="Coffee Icon"
      width={64}
      height={64}
    />
  );
};

export default CoffeeIcon;
