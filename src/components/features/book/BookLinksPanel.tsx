import { Button } from '@/components/ui/button.tsx';
import { BookOpenIcon, LinkIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';

interface BookLinksPanelProps {
  previewLink?: string;
  infoLink?: string;
}

function BookLinksPanel({ previewLink, infoLink }: BookLinksPanelProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {previewLink && (
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <a
            href={previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <BookOpenIcon className="h-4 w-4" />
            Preview Book
          </a>
        </Button>
      )}

      {infoLink && (
        <Button
          asChild
          variant="outline"
          className="ho border-white/20 text-black hover:bg-white/10 hover:text-white"
        >
          <a
            href={infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <LinkIcon className="h-4 w-4" />
            More Info
          </a>
        </Button>
      )}

      <Button asChild variant="secondary">
        <Link to="/collections">Back to Collections</Link>
      </Button>
    </div>
  );
}

export default BookLinksPanel;
