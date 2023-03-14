import React from "react";

type CompProps = {
  name: string;
  surname?: string;
};

const Comp: React.FC<CompProps> = (props) => {
  const { name, surname } = props;

  return <div>Comp...{`${name} ${surname}`}</div>;
};

Comp.defaultProps = {
  surname: "default prop",
};

export default Comp;
