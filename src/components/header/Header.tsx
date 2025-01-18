import { TopNav } from './TopNav';
import { StoreHeader } from './StoreHeader';
import { BottomNav } from './BottomNav';

export const Header = () => {
  return (
    <header className="w-full">
      <TopNav />
      <StoreHeader />
      <BottomNav />
    </header>
  );
};