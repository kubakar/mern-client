export const joinStyles = (
  local: { source: object; styles: string[] },
  global: string = ""
): string => {
  const { source, styles } = local;
  const localsJoined = styles
    .map((l) => source[l as keyof typeof source])
    .join(" ");

  return `${global} ${localsJoined}`.trim();
};
