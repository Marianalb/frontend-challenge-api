import { render } from '@testing-library/react';
import PostDetails from "./PostDetails";
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

describe('Post details tests', () => {
	let container = null;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
		global.fetch = null;
	});

	it('renders component correctly with comments', async () => {
		const mockPost = {
			"id": 1,
			"title": "Blog post #1",
			"author": "Olene Ogan",
			"publish_date": "2016-03-16",
			"slug": "blog-post-2",
			"description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
			"content": "DummyContent."
		};
		const mockComment = [{
			"id": 1,
			"postId": 1,
			"parent_id": null,
			"user": "Amelia",
			"date": "2016-02-23",
			"content": "DummyContent"
		}];
		global.fetch = (test) => {
			return new Promise((rslv, reject)=>{
				rslv({
					json: () => new Promise((resolve, reject)=>{
						if(test.endsWith('comments')){
							resolve(mockComment);
						}
						else{
							resolve(mockPost);
						}
					})
				})
			});
		}
		await act(async () => {
			container = render(<Router> <PostDetails /></Router>);
		});
		expect(container.container.querySelector('.PostDetails')).not.toBeNull();
		expect(screen.getByText(/Blog post #1/)).toBeTruthy();
		expect(screen.getByText("DummyContent.")).toBeTruthy();
		expect(() => screen.getByText(/Ex legere perpetua electram vim, per nisl inermis quaestio ea./)).toThrow();
		expect(screen.getByText(/2016-03-16/)).toBeTruthy();
		expect(screen.getByText(/Olene Ogan/)).toBeTruthy();
		expect(container.container.querySelector('.MuiCardContent-root')).not.toBeNull();
		expect(screen.getByText(/Amelia/)).toBeTruthy();
		expect(screen.getByText(/2016-02-23/)).toBeTruthy();
		expect(screen.getByText("DummyContent")).toBeTruthy();
	});

	it('renders component correctly without comments', async () => {
		const mockPost = {
			"id": 1,
			"title": "Blog post #1",
			"author": "Olene Ogan",
			"publish_date": "2016-03-16",
			"slug": "blog-post-2",
			"description": "Ex legere perpetua electram vim, per nisl inermis quaestio ea.",
			"content": "DummyContent."
		};
		const mockComment = [];
		global.fetch = (test) => {
			return new Promise((rslv, reject)=>{
				rslv({
					json: () => new Promise((resolve, reject)=>{
						if(test.endsWith('comments')){
							resolve(mockComment);
						}
						else{
							resolve(mockPost);
						}
					})
				})
			});
		}
		await act(async () => {
			container = render(<Router> <PostDetails /></Router>);
		});
		expect(container.container.querySelector('.PostDetails')).not.toBeNull();
		expect(screen.getByText(/Blog post #1/)).toBeTruthy();
		expect(screen.getByText("DummyContent.")).toBeTruthy();
		expect(() => screen.getByText(/Ex legere perpetua electram vim, per nisl inermis quaestio ea./)).toThrow();
		expect(screen.getByText(/2016-03-16/)).toBeTruthy();
		expect(screen.getByText(/Olene Ogan/)).toBeTruthy();
		expect(container.container.querySelector('.MuiCardContent-root')).toBeNull();
	});
});