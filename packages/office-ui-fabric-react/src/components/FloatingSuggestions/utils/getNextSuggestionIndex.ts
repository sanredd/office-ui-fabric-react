export const getNextSuggestionIndex = <T>(suggestions: T[], currentIndex: number): number => {
  if (suggestions && suggestions.length) {
    if (currentIndex < suggestions.length - 1) {
      return currentIndex + 1;
    } else if (currentIndex === suggestions.length - 1) {
      return 0;
    }
  }

  return -1;
};

export const getPreviousSuggestionIndex = <T>(suggestions: T[], currentIndex: number): number => {
  if (suggestions && suggestions.length) {
    if (currentIndex > 0) {
      return currentIndex - 1;
    } else if (currentIndex === 0) {
      return suggestions.length - 1;
    }
  }

  return -1;
};
