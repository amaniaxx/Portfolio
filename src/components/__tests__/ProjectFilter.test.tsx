import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectFilter } from '../ProjectFilter';

const mockProjects = [
  {
    id: '1',
    title: 'Web Project',
    description: 'A web project',
    technologies: ['React', 'TypeScript'],
    category: 'Web'
  },
  {
    id: '2',
    title: 'Mobile App',
    description: 'A mobile app',
    technologies: ['React Native'],
    category: 'Mobile'
  }
];

describe('ProjectFilter', () => {
  it('renders all category buttons', () => {
    const onFilter = jest.fn();
    render(<ProjectFilter projects={mockProjects} onFilter={onFilter} />);
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });

  it('filters projects when category is selected', () => {
    const onFilter = jest.fn();
    render(<ProjectFilter projects={mockProjects} onFilter={onFilter} />);
    
    fireEvent.click(screen.getByText('Web'));
    expect(onFilter).toHaveBeenCalledWith([mockProjects[0]]);
  });

  it('shows correct project count', () => {
    const onFilter = jest.fn();
    render(<ProjectFilter projects={mockProjects} onFilter={onFilter} />);
    
    expect(screen.getByText('Showing all 2 projects')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Web'));
    expect(screen.getByText('Showing 1 Web projects')).toBeInTheDocument();
  });
}); 