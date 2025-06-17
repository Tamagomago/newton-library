import { Button } from '@/components/ui/button.tsx';

function GenreButton({
  name,
  value,
  isSelected,
  onClick,
}: {
  name: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      title={name}
      className={`w-full max-w-[8rem] cursor-pointer rounded-2xl border-white/50 !text-xs whitespace-nowrap text-white/50 backdrop-blur-3xl transition-colors duration-500 md:!text-balance ${
        isSelected ? 'border-orange-primary text-orange-primary' : ''
      }`}
      style={{ backgroundColor: 'rgba(156,163,175,0.1)' }}
      onClick={onClick}
      value={value}
    >
      <span className="!line-clamp-2 block w-full text-center break-words">
        {name}
      </span>
    </Button>
  );
}

export default GenreButton;
