import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { lusitana } from 'ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center p-2 leading-none text-white`}
    >
      <ShoppingBagIcon className="h-10 w-10 rotate-[15deg]" />
      <p className="text-[44px]">Sicompre</p>
    </div>
  );
}
