import useDeviceType from './customHooks/useDeviceType';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import TabletNav from './components/TabletNav';

export default function App() {
  const { isMobile, isTablet, isDesktop, deviceType } = useDeviceType();

  return (
    <div>
      {isMobile && <MobileNav />}
      {isTablet && <TabletNav />}
      {isDesktop && <DesktopNav />}
      <p>
        Current device: <strong>{deviceType}</strong>
      </p>
    </div>
  );
}
