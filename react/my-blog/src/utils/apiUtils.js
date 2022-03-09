/**
 * Api call to get all posts 
 * @returns json array containing all posts
 */
export async function getPosts() {
    const rsp = await fetch('http://localhost:9000/posts');
    const json = await rsp.json();
    return json;
}

/**
 * api call to get a specific post
 * @param {Number} id post id
 * @returns json containing the specific post
 */
export async function getPostsById(id) {
    const rsp = await fetch(`http://localhost:9000/posts/${id}`);
    const json = await rsp.json();
    return json;
}

/**
 * api call to get all comments in one post
 * @param {Number} id post id
 * @returns json array containing the comments of a specific post
 */
export async function getCommentPosts(id) {
    const rsp = await fetch(`http://localhost:9000/posts/${id}/comments`);
    const json = await rsp.json();
    return json;
}

/**
 * api call to insert a comment in a specific post
 * @param {Number} id  post id
 * @param {{}} body json body
 */
export async function addComment(id, body) {
    const rsp = await fetch(`http://localhost:9000/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify(body)
    });
    const json = await rsp.json();
    return json;
}

/**
 * api call to update a comment
 * @param {Number} id post id
 * @param {{}} body json body
 */
export async function updateComment(id, body) {
    await fetch(`http://localhost:9000/comments/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
}