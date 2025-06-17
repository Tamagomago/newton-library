import { TagIcon } from '@heroicons/react/24/outline';

interface BookCategoriesProps {
  categories?: string[];
}
function BookCategories({ categories }: BookCategoriesProps) {
  return (
    <>
      {categories && categories.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-300">Categories:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-blue-400/30 bg-blue-600/50 px-3 py-1 text-xs text-blue-100"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BookCategories;
