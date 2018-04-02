module.exports = source => {
  switch (true) {
    case source.includes('react'): {
      return 'react';
    }
    case source.includes('vue'): {
      return 'vue';
    }
    default: {
      return 'html';
    }
  }
};
