import { BsCheck } from 'react-icons/bs';
import { CommonPropsAndClassName } from 'react-select';

interface Props {
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({ isChecked, onToggle, ...rest }: Props) => {
  return (
    <div
      className={`w-7 h-7 mr-2 relative border border-dark cursor-pointer rounded-lg flex flex-col items-center justify-center bg-transparent`}
      onClick={onToggle}
    >
      <BsCheck className={`text-primary w-5 h-5 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
