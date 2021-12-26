export interface LinkModel {
  name: string;
  location: string;
}

export const Link = (name: string, location: string) => ({
  name,
  location,
});
