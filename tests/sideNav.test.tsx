import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SideNavBar } from '@/components';
import { PageEnum } from '@/enums';

jest.mock('@/backendApi', () => ({
  BackendApiGet: jest.fn().mockImplementation(() => ({
    localizarUsuario: jest.fn().mockResolvedValue([{ perfil: 'Pedagógico' }]),
  })),
}));

describe('SideNavBar', () => {
  it('should render correctly and respond to clicks Users', () => {
    const mockSetPage = jest.fn();
    const props = {
      hidden: false,
      setPage: mockSetPage,
      activePage: PageEnum.users,
    };

    const { getByText } = render(<SideNavBar {...props} />);

    fireEvent.click(getByText('Usuários'));

    expect(mockSetPage).toHaveBeenCalledWith(PageEnum.users);
  });

  it('should render correctly and respond to clicks Agentes', () => {
    const mockSetPage = jest.fn();
    const props = {
      hidden: false,
      setPage: mockSetPage,
      activePage: PageEnum.users,
    };

    const { getByText } = render(<SideNavBar {...props} />);

    fireEvent.click(getByText('Agentes Externos'));

    expect(mockSetPage).toHaveBeenCalledWith(PageEnum.agentesExterno);
  });
});

describe('SideNavBar - Perfil Pedagógico', () => {
  it('deve esconder botão de "Usuários" para perfil Pedagógico', async () => {
    const props = {
      hidden: true,
      setPage: jest.fn(),
      activePage: PageEnum.users,
    };

    render(<SideNavBar {...props} />);

    const userButton = screen.queryByText('Usuários');

    expect(userButton).toBeInTheDocument();
  });
});
