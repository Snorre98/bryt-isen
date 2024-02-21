import { Outlet } from 'react-router';
import NavbarComp from './NavbarComp';
import FooterComp from './FooterComp';

export function BrytisenOutlet() {
  return (
    <>
      <NavbarComp />
      <div style={{ flex: '1', paddingTop: '50px', paddingBottom: '50px' }}>
        <Outlet />
      </div>
      <FooterComp />
    </>
  );
}
