import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-red-400 flex items-center justify-center">
          <span className="text-white text-xs">🍅</span>
        </div>
        <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100 tracking-tight">
          番茄钟
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
