// store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import locationReducer from "./reducers/LocationReducer";
import departmentReducer from "./reducers/DepartmentReducer";
import locatorReducer from "./reducers/LocatorReducer";
import employeeReducer from "./reducers/EmployeeReducer";
import vendorReducer from "./reducers/VendorReducer";
import organizationReducer from "./reducers/OrganizationReducer";
import userReducer from "./reducers/UserReducer";
import uomReducer from "./reducers/UOMReducer";
const rootReducer = combineReducers({
  locations: locationReducer,
  departments: departmentReducer,
  locators: locatorReducer,
  employees: employeeReducer,
  vendors: vendorReducer,
  organizations: organizationReducer,
  users: userReducer,
  uoms: uomReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
