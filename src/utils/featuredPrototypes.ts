
export interface FeaturedPrototype {
  id: string;
  title: string;
  author: string;
  genre: string;
  hook: string;
  status: string;
  pages: number;
  words: number;
  themes: string[];
  fullDescription: string;
  targetAudience: string;
  estimatedBudget: string;
  timeline: string;
  contactEmail: string;
  contactNote: string;
  dateAdded: string;
}

const STORAGE_KEY = 'bookers-featured-prototypes';

export const getFeaturedPrototypes = (): FeaturedPrototype[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading featured prototypes:', error);
    return [];
  }
};

export const addFeaturedPrototype = (prototype: Omit<FeaturedPrototype, 'id' | 'dateAdded'>): void => {
  try {
    const existing = getFeaturedPrototypes();
    const newPrototype: FeaturedPrototype = {
      ...prototype,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
    };
    
    const updated = [newPrototype, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving featured prototype:', error);
    throw new Error('Failed to save prototype to featured list');
  }
};

export const removeFeaturedPrototype = (id: string): void => {
  try {
    const existing = getFeaturedPrototypes();
    const updated = existing.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing featured prototype:', error);
  }
};
