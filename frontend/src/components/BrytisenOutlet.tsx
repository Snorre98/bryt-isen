import { Outlet } from 'react-router';
import NavbarComp from './NavbarComp';
import FooterComp from './FooterComp';

export function BrytisenOutlet() {
  return (
    <>
      <NavbarComp />
      <div className="brytisenOutlet">
        <Outlet />
      </div>
      <FooterComp />
    </>
  );
}
