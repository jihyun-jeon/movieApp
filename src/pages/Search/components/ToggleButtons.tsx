import React from 'react';
import { useGetGenres } from '@/api/movie';
import { Genre } from '@/types/movie';
import { TMDB_LANGUAGE_KR } from '@/contants';
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group';

interface ToggleButtonsProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ selectedGenres, setSelectedGenres }) => {
  const genreIds = useGetGenres({ language: TMDB_LANGUAGE_KR });

  const handleToggleChange = (newValues: string[]) => {
    setSelectedGenres(newValues);
  };

  return (
    <ToggleGroup
      type="multiple"
      value={selectedGenres}
      onValueChange={handleToggleChange}
      aria-label="Genre selection"
      className="flex flex-wrap gap-2"
    >
      {genreIds.data?.genres.map((data: Genre) => {
        return (
          <ToggleGroupItem
            value={`${data.id}`}
            key={data.id}
            className={`${
              selectedGenres?.includes(`${data.id}`) ? 'bg-white border-white' : 'bg-black border-[#84868d]'
            } flex-none mr-1 py-2 px-4 rounded-lg transition-colors duration-200 border text-[#84868d]`}
          >
            {data.name}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};

export default ToggleButtons;
