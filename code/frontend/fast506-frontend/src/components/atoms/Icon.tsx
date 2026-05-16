interface Icon{
  icon: React.ReactNode;
}

const Icon = ({ icon }: Icon) => {
  return <span>{icon}</span>;
};

export default Icon;