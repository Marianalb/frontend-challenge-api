import { render } from '@testing-library/react';
import Post from './Post';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Post tests', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{
          "id": 1,
          "postId": 1,
          "parent_id": null,
          "user": "Amelia",
          "date": "2016-02-23",
          "content": "Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor."
        }]),
      })
    );
  });

  it('renders card', async () => {
    await act(async () => {
      container = render(<Router><Post post={{ id: 1}} /></Router>);
    });
    expect(container.container.querySelector('.MuiCardContent-root')).not.toBeNull();
  });

  it('renders card with failed api call when fetching comments', async () => {
    global.fetch = null;
    await act(async () => {
      container = render(<Router><Post post={{ id: 1}} /></Router>);
    });
    expect(container.container.querySelector('.MuiCardContent-root')).not.toBeNull();
    expect(screen.getByText(/unknown/)).toBeTruthy();
  });

  it('renders component correctly', async () => {
    const post = {
      "id": 1,
      "title": "DummyTitle",
      "author": "DummyAuthor",
      "publish_date": "DummyDate",
      "slug": "DummySlug",
      "description": "DummyDescription.",
      "content": "<p>DummyContent.</p>"
    };
    await act(async () => {
      container = render(<Router><Post post={post} /></Router>);
    });
    expect(container.container.querySelector('.MuiCardContent-root')).not.toBeNull();
    expect(() => screen.getByText(/unknown/)).toThrow();
    expect(screen.getByText(/DummyTitle/)).toBeTruthy();
    expect(screen.getByText(/DummyDate/)).toBeTruthy();
    expect(screen.getByText(/DummyDescription/)).toBeTruthy();
    expect(() => screen.getByText(/<p>DummyContent.<\/p>/)).toThrow();
  });
});