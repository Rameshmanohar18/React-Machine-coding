export const initialItems = [
  'JavaScript',
  'HTML',
  'CSS',
  'React',
  'Angular',
  'Zustand',
  'NextJS',
  'TypeScript',
].map((item) => ({
  id: `${item}-${Date.now()}`,
  text: item,
  isEditing: false,
  isCompleted: false,
}));
  