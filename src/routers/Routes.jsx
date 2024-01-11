// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Organization from '../pages/organization/Organization';
import Location from '../pages/location/Location';
import Items from '../pages/items/Items';
import Locator from '../pages/locator/Locator';
import User from '../pages/user/User';
import Employee from '../pages/employee/Employee';
import Tax from '../pages/tax/Tax';
import Transaction from '../pages/transaction/Transaction';
import UOM from '../pages/UOM/UOM';
import Currency from '../pages/currency/Currency';
import Vendor from '../pages/vendor/Vendor';
import QuickCode from '../pages/quickCode/QuickCode';
import GoodsReceiveNoteForm from '../pages/grn/GoodsReceiveNoteForm';
import DepartmentPage from '../pages/department/Department';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/sub-organization" element={<Organization />} />
      <Route path="/location" element={<Location />} />
      <Route path="/items" element={<Items />} />
      <Route path="/locator" element={<Locator />} />
      <Route path="/department" element={<DepartmentPage />} />
      <Route path="/user" element={<User />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/tax" element={<Tax />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/uom" element={<UOM />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/Vendor" element={<Vendor />} />
      <Route path="/quickcode" element={<QuickCode />} />
      <Route path="/grn" element={<GoodsReceiveNoteForm />} />
    </Routes>
  );
};

export default RoutesComponent;
