import DataTable from './DataTable';
import { initialData as users } from './constants';
import houses from './houses';

// Column configurations for users
const userColumns = [
  { key: 'firstName', label: 'First Name', searchable: true, sortable: true },
  { key: 'lastName', label: 'Last Name', searchable: true, sortable: true },
  { key: 'address', label: 'Address', searchable: true, sortable: true },
  { key: 'city', label: 'City', searchable: true, sortable: true },
  { key: 'state', label: 'State', searchable: true, sortable: true },
];

// Column configurations for houses
const houseColumns = [
  { key: 'id', label: 'ID', searchable: false, sortable: true },
  { key: 'street', label: 'Street Address', searchable: true, sortable: true },
  { key: 'city', label: 'City', searchable: true, sortable: true },
  { key: 'state', label: 'State', searchable: true, sortable: true },
  { key: 'zip', label: 'ZIP Code', searchable: true, sortable: true },
  { key: 'built_year', label: 'Year Built', searchable: false, sortable: true },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable
        initialData={users}
        columns={userColumns}
        searchPlaceholder='Search by name, address, city, or state...'
        defaultRowsPerPage={5}
      />

      <br />

      <h2>Houses</h2>
      <DataTable
        initialData={houses}
        columns={houseColumns}
        searchPlaceholder='Search by address, city, state, or ZIP...'
        defaultRowsPerPage={10}
      />
    </div>
  );
}
