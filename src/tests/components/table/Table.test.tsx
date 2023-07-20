import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Column, Table } from '../../../components/Table';

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    school: 'School A',
    profile: 'Teacher',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    school: 'School B',
    profile: 'Student',
  },
];

const mockColumns: Column<{
  id: number;
  name: string;
  email: string;
  school: string;
  profile: string;
}>[] = [
  { header: 'Name', accessor: 'name' },
  { header: 'Email', accessor: 'email' },
  { header: 'School', accessor: 'school' },
  { header: 'Profile', accessor: 'profile' },
];

describe('Table', () => {
  test('renders the component correctly', () => {
    render(
      <Table
        data={mockData}
        columns={mockColumns}
        labelInput="Search by Name or Email"
      />,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('School')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('School A')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('School B')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('Search by Name or Email');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });
});
