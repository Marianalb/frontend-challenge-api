import { render, screen } from '@testing-library/react';
import Feed from './Feed';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Feed component tests', () => {
  let container = null;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{
          "id": 2,
          "title": "Blog post #2",
          "author": "Olene Ogan",
          "publish_date": "2016-03-16",
          "slug": "blog-post-2",
          "description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
          "content": "<p>Ex legere perpetua electram vim, per nisl inermis quaestio ea. Everti adolescens ut nec. Quod labitur assueverit vis at, sea an erat modus delicata.</p> <p>Dico omnesque epicurei te vix. Tota verterem temporibus eu quo, eu iudicabit repudiandae sea. Elitr nihil gloriatur vis in.</p>"
        }])
      })
    );
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('renders a Post component when api call is succeful', async () => {
    await act(async () => {
      container = render(<Router><Feed /></Router>);
    });
    expect(container.container.querySelector('.Post')).not.toBeNull();
    expect(container.container.querySelector('.Posts')).toBeNull();
  });

  it('renders a snackbar when api call isn\'t succeful', async () => {
    global.fetch = null;
    await act(async () => {
      container = render(<Router><Feed /></Router>);
    });
    expect(container.container.querySelector('.Post')).toBeNull();
    expect(container.container.querySelector('.MuiSnackbar-root')).not.toBeNull();
  });
});
