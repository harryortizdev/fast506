interface IconProps{
  icon: React.ReactNode;
}

const Icon = ({ icon }: IconProps) => {
  return <span>{icon}</span>;
};

export default Icon;