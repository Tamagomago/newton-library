import {
  BookOpenIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  LanguageIcon,
} from '@heroicons/react/24/outline';

interface BookMetaGridProps {
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  language?: string;
}

function BookMetaGrid({
  publishedDate,
  publisher,
  pageCount,
  language,
}: BookMetaGridProps) {
  const booksMeta = [
    { data: publishedDate, icon: CalendarIcon, header: 'Published:' },
    { data: publisher, icon: BuildingLibraryIcon, header: 'Publisher:' },
    { data: pageCount, icon: BookOpenIcon, header: 'Pages:' },
    { data: language?.toUpperCase(), icon: LanguageIcon, header: 'Language:' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
      {booksMeta.map(
        ({ data, icon: Icon, header }) =>
          data && (
            <div className={'flex items-center gap-2'}>
              <Icon className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">{header}</span>
              <span>{data}</span>
            </div>
          )
      )}
    </div>
  );
}

export default BookMetaGrid;
