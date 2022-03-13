import { render } from '@testing-library/react';
import Comment from './Comment';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Commnent tests', () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });   

    it('renders component correctly', async () => {
        const comment = {
            "id": 1,
            "postId": 1,
            "parent_id": null,
            "user": "DummyUser",
            "date": "2016-02-23",
            "content": "DummyContent"
        };
        await act(async () => {
          container = render(<Router><Comment comment={comment} /></Router>);
        });
        expect(container.container.querySelector('.MuiCardContent-root')).not.toBeNull();
        expect(screen.getByText(/2016-02-23/)).toBeTruthy();
        expect(screen.getByText(/DummyUser/)).toBeTruthy();
        expect(screen.getByText(/DummyContent/)).toBeTruthy();
      });
});