function ThemeToggler() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
    >
      Toggle Theme
    </button>
  );
}

export default ThemeToggler;
