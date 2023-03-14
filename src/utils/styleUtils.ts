export const joinStyles = (
  local: { styles: object; classes: string[] },
  global: string = ""
): string => {
  const { styles, classes } = local;
  const localsJoined = classes
    .map((l) => styles[l as keyof typeof styles])
    .join(" ");

  return `${global} ${localsJoined}`.trim();
};
